// React 관련 Hooks
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// 스타일 및 CSS
import "../../styles/login/JoinUser.css";

// 라이브러리 및 UI 관련
import Swal from "sweetalert2";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SchoolIcon from "@mui/icons-material/School";

// API 및 Firebase 관련 함수
import { joinUserPost } from "../../api/LoginApi";
import { getCategoryList } from "../../api/CommonApi";
import { auth } from "../../config/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// SweetAlert2 설정
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  position: "top",
});

const JoinUser = () => {
  const { userType } = useParams(); // URL의 userType 파라미터 ("user" 또는 "team")
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 변수
  const [otp, setOtp] = useState(""); // OTP 코드 입력값
  const [confirmation, setConfirmation] = useState(null); // Firebase 인증 결과 저장
  const [buttonState, setButtonState] = useState("sendOtp"); // OTP 버튼 상태 관리
  const [category, setCategory] = useState([]); // 카테고리 목록
  const [idError, setIdError] = useState(""); // 아이디 입력 에러 메시지
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 입력 에러 메시지
  const [formData, setFormData] = useState(location.state || {}); // 폼 입력 데이터
  const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(true); // 유효성 검사

  // 카테고리 목록 불러오기 + 유효성 검사
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryList("CT");
        setCategory(response || []);
      } catch (error) {
        console.error("category fetch failed", error);
        setCategory([]);
      }
    };

    fetchCategory();

    const isIdValid = formData.id ? validateId(formData.id) : false;
    const isPasswordValid = formData.password
      ? validatePassword(formData.password)
      : false;
    const isNameValid = formData.name && formData.name.trim().length > 1; // 이름 최소 2자 이상
    const isBirthValid =
      formData.userBirth &&
      /^\d{8}$/.test(formData.userBirth.replace(/\./g, "")); // 8자리 숫자 (YYYYMMDD)
    const isPhoneValid =
      formData.phone && /^010-\d{3,4}-\d{4}$/.test(formData.phone); // 최소 10자리 숫자

    console.log("ID 유효성:", isIdValid);
    console.log("비밀번호 유효성:", isPasswordValid);
    console.log("이름 유효성:", isNameValid);
    console.log("생년월일 유효성:", isBirthValid);
    console.log("전화번호 유효성:", isPhoneValid);

    // 모든 조건이 충족될 경우에만 버튼 활성화
    setIsOtpButtonDisabled(
      !(
        isIdValid &&
        isPasswordValid &&
        isNameValid &&
        isBirthValid &&
        isPhoneValid
      )
    );
  }, [formData]);

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // 아이디, 이메일, 생년월일 입력 시 한글 제거
    if (["id", "email"].includes(name)) {
      newValue = newValue.replace(/[ㄱ-ㅎ|가-힣]/g, ""); // 한글 제거
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "id") {
      validateId(newValue);
    }
  };

  // 비밀번호 입력이 끝난 후(onBlur) 유효성 검사 실행
  const handlePasswordBlur = () => {
    validatePassword(formData.password);
  };

  // 비밀번호 입력 시 (입력 중에는 유효성 검사 X)
  const handlePasswordChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handlePasswordFocus = () => {
    if (!formData.id) {
      setIdError("아이디: 필수 정보입니다.");
    } else {
      setIdError("");
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    setFormData((prev) => ({ ...prev, phone: value }));
  };

  // Firebase Recaptcha 설정
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  // 휴대폰 인증 OTP 전송
  const sendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      Toast.fire({
        icon: "warning",
        title: "올바른 휴대폰 번호를 입력하세요.",
      });
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone =
        "+82" + formData.phone.replace(/-/g, "").substring(1);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      setConfirmation(confirmationResult);
      setButtonState("verifyOtp");

      Toast.fire({
        icon: "success",
        title: "OTP 전송 완료! 문자로 인증번호를 확인하세요.",
      });
    } catch (error) {
      console.log(`${window.env.REACT_APP_FIREBASE_API_KEY}`);
      console.error("OTP 전송 실패:", error);
      Toast.fire({
        icon: "error",
        title: "OTP 전송 실패",
        text: error.message,
      });
    }
  };

  // OTP 인증 확인
  const verifyOtp = async () => {
    if (!otp) {
      Toast.fire({ icon: "warning", title: "인증번호를 입력하세요." });
      return;
    }

    try {
      if (!confirmation) {
        Toast.fire({ icon: "warning", title: "먼저 인증번호를 받아주세요." });
        return;
      }

      await confirmation.confirm(otp);

      setButtonState("confirmed");
      Toast.fire({ icon: "success", title: "휴대폰 인증이 완료되었습니다." });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "OTP 인증 실패",
        text: "입력한 인증번호가 올바르지 않습니다.",
      });
    }
  };

  // 아이디 유효성 검사
  const validateId = (id) => {
    if (!id) {
      setIdError("아이디: 필수 정보입니다.");
      return false;
    }

    const idRegex = /^[a-z][a-z0-9]*([-_][a-z0-9]+)*$/;

    if (id.length < 5) {
      setIdError("아이디는 최소 5자 이상이어야 합니다.");
      return false;
    }

    if (id.length > 20) {
      setIdError("아이디는 5~20자여야 합니다.");
      Swal.fire({ icon: "error", title: "아이디는 5~20자여야 합니다." });
      return false;
    }

    if (!idRegex.test(id)) {
      setIdError(
        "사용할 수 없는 아이디입니다. 영문 소문자로 시작하고, 영문·숫자·'-'·'_'만 사용할 수 있습니다."
      );
      Swal.fire({ icon: "error", title: "사용할 수 없는 아이디입니다." });
      return false;
    }

    setIdError(""); // 에러 메시지 초기화
    return true;
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("비밀번호: 필수 정보입니다.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (password.length < 8 || password.length > 16) {
      setPasswordError("비밀번호는 8~16자여야 합니다.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "비밀번호: 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return false;
    }

    setPasswordError(""); // 유효성 검사 통과 시 에러 메시지 제거
    return true;
  };

  // 생년월일 . 자동 입력 합수
  const handleBirthChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력

    if (value.length > 4 && value.length <= 6) {
      value = value.replace(/(\d{4})(\d{1,2})/, "$1.$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
    }

    // 최대 8자리까지만 허용 . 포함
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, userBirth: value }));
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력값 검증
    if (!formData.id) {
      Toast.fire({ icon: "warning", title: "아이디를 입력하세요." });
      return;
    }

    if (!formData.password) {
      Toast.fire({ icon: "warning", title: "패스워드를 입력하세요." });
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      Toast.fire({
        icon: "warning",
        title: "올바른 휴대폰 번호를 입력하세요.",
      });
      return;
    }

    if (buttonState !== "confirmed") {
      Toast.fire({ icon: "warning", title: "휴대폰 인증을 완료해주세요." });
      return;
    }

    // 휴대폰 번호와 생년월일 정리 ('-'과 '.' 제거)
    const cleanedPhone = formData.phone.replace(/-/g, "");
    const cleanedBirth = formData.userBirth.replace(/\./g, "");
    // const num = e.target.value.split(".");
    // const num1 = num[0];
    // const num2 = num[1];
    // const num3 = num[2];
    // const birthDay = num1+num2+num3;

    try {
      await joinUserPost({
        id: formData.id,
        name: formData.userName,
        email: formData.email,
        password: formData.password,
        phone: cleanedPhone,
        userBirth: cleanedBirth,
        mailYn: formData.mailYn,
        favorite1: formData.favorite1,
        favorite2: formData.favorite2,
        favorite3: formData.favorite3,
        ...(userType === "team" && {
          teamName: formData.teamName,
          teamMembers: formData.teamMembers,
        }),
      });

      Toast.fire({ icon: "success", title: "회원가입이 완료되었습니다." }).then(
        () => navigate("/login")
      );
    } catch (error) {
      console.error("회원가입 실패:", error);
      Toast.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "다시 시도해주세요.",
      });
    }
  };

  const handleNextStep = () => {
    // 필수 정보 검증
    if (!formData.id) {
      Toast.fire({ icon: "warning", title: "아이디를 입력하세요." });
      return;
    }
    if (!formData.password) {
      Toast.fire({ icon: "warning", title: "패스워드를 입력하세요." });
      return;
    }
    if (!formData.phone || formData.phone.length < 10) {
      Toast.fire({
        icon: "warning",
        title: "올바른 휴대폰 번호를 입력하세요.",
      });
      return;
    }
    if (buttonState !== "confirmed") {
      Toast.fire({ icon: "warning", title: "휴대폰 인증을 완료해주세요." });
      return;
    }

    const cleanedPhone = formData.phone.replace(/-/g, "");
    const cleanedBirth = formData.userBirth.replace(/\./g, "");
    const sendData = {
      ...formData,
      phone: cleanedPhone,
      userBirth: cleanedBirth,
    };

    console.log("📢 GenreSelect로 보낼 데이터:", sendData);

    // 장르 선택 페이지로 이동하면서 데이터 전달
    navigate("/register/join/genreselect", { state: sendData });
  };

  return (
    <form className="Join_Container" onSubmit={handleSubmit}>
      <h2 className="Join_Title">
        회원가입을 위해
        <br />
        정보를 입력해주세요.
      </h2>

      {/* S : Top */}
      <div className="Top_Input">
        <label>
          <PersonOutlineIcon />
        </label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
        />
      </div>
      {idError && <p className="Error_Message">{idError}</p>}

      <div className="Top_Input">
        <label>
          <PasswordIcon />
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
          onBlur={handlePasswordBlur}
          onFocus={handlePasswordFocus}
        />
      </div>
      {passwordError && <p className="Error_Message">{passwordError}</p>}

      <div className="Top_Input">
        <label>
          <MailOutlineIcon />
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
        />
      </div>

      <br />

      <div className="Top_Input">
        <label>
          <PersonOutlineIcon />
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="6"
          placeholder="이름"
        />
        <div id="recaptcha-container"></div>
      </div>
      <div className="Top_Input">
        <label>
          <EventNoteIcon />
        </label>
        <input
          type="text"
          name="userBirth"
          value={formData.userBirth}
          onChange={handleBirthChange}
          maxLength="9"
          placeholder="생년월일"
        />
        <div id="recaptcha-container"></div>
      </div>

      <div className="Top_Input">
        <label>
          <PhoneIphoneIcon />
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          maxLength="13"
          placeholder="휴대폰 번호"
        />
        <div id="recaptcha-container"></div>
      </div>

      {buttonState === "verifyOtp" && (
        <div className="Top_Input">
          <label>
            <MobileFriendlyIcon />
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            placeholder="인증번호 입력"
          />
        </div>
      )}
      {/* E : Top */}

      {/* 팀 회원 전용 필드 */}
      {userType === "team" && (
        <>
          <br />
          <div className="Top_Input">
            <label>
              <SchoolIcon />
            </label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="소속"
            />
          </div>
          <div className="Top_Input">
            <label>
              <PeopleOutlineIcon />
            </label>
            <input
              type="text"
              name="teamMembers"
              value={formData.teamMembers}
              onChange={handleChange}
              placeholder="총 활동 인원"
            />
          </div>
        </>
      )}

      <br />
      <div className="Join_Essential">
        <input
          type="checkbox"
          className="Join_Checkbox"
          name="receiveInfo"
          value={formData.mailYn}
          onChange={handleChange}
        />
        <span>(선택)</span>이벤트 및 혜택 알림
        <small>(마케팅 활용 동의 광고 수신 동의)</small>
      </div>
      {/* <div className="Join-form-box2">
                <input type="checkbox" name="under14" />
                <label>14세 미만입니다. (선택)</label>
            </div>
            <div className="Join-form-box3">
                <p>만 14세 미만 회원은 법정대리인(부모님) 동의를 받은 경우만 회원가입이 가능합니다.</p>
            </div> */}

      {buttonState === "confirmed" && (
        <p style={{ color: "green" }}>✅ 확인되었습니다.</p>
      )}

      <br />

      <button
        type="button"
        className="JoinButton"
        onClick={
          buttonState === "sendOtp"
            ? sendOtp
            : buttonState === "verifyOtp"
            ? verifyOtp
            : handleNextStep
        }
        disabled={buttonState === "sendOtp" && isOtpButtonDisabled}
      >
        {buttonState === "sendOtp"
          ? "인증번호 받기"
          : buttonState === "verifyOtp"
          ? "인증하기"
          : "다음 단계"}
      </button>
    </form>
  );
};

export default JoinUser;
