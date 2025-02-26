import React, { useEffect, useState } from "react";
import "../../styles/login/JoinUser.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupPost } from "../../api/LoginApi";
import { getCategoryList } from "../../api/CommonApi";
import { auth } from "../../config/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import EventNoteIcon from "@mui/icons-material/EventNote";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    position: "top",
});

const JoinUser = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const [buttonState, setButtonState] = useState("sendOtp");
    const [category, setCategory] = useState([]);
    const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategoryList("CT");
                setCategory(response || []);
            } catch (error) {
                console.error("category fetch failed", error);
                setCategory([]);
            }
        };
        fetchCategories();
    }, []);

    const location = useLocation();
    const [formData, setFormData] = useState(location.state || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // 아이디, 비밀번호, 이메일, 생년월일에 한글 입력 방지
        if (["id", "password", "email", "userBirth"].includes(name)) {
            newValue = newValue.replace(/[ㄱ-ㅎ|가-힣]/g, ""); // 한글 제거
        }

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        if (name === "password") {
            validatePassword(newValue);
        }

        if (name === "id") {
            validateId(newValue);
        }
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

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
            });
        }
    };

    const sendOtp = async () => {
        if (!formData.phone || formData.phone.length < 10) {
            Toast.fire({ icon: "warning", title: "올바른 휴대폰 번호를 입력하세요." });
            return;
        }

        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const formattedPhone = "+82" + formData.phone.replace(/-/g, "").substring(1);

            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmation(confirmationResult);
            setButtonState("verifyOtp");

            Toast.fire({ icon: "success", title: "OTP 전송 완료! 문자로 인증번호를 확인하세요." });
        } catch (error) {
            console.error("OTP 전송 실패:", error);
            Toast.fire({ icon: "error", title: "OTP 전송 실패", text: error.message });
        }
    };

    const validateId = (id) => {
        const idRegex = /^[a-z][a-z0-9]*([-_][a-z0-9]+)*$/;

        // 5글자 미만일 경우 유효성 검사 실행 안 함
        if (id.length < 5) return true;

        if (id.length > 20) {
            Swal.fire({ icon: "error", title: "아이디는 5~20자여야 합니다." });
            return false;
        }

        if (!idRegex.test(id)) {
            Swal.fire({ icon: "error", title: "사용할 수 없는 아이디입니다." });
            return false;
        }

        return true;
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError("비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
            return false;
        }

        setPasswordError("");
        return true;
    };

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
            Toast.fire({ icon: "error", title: "OTP 인증 실패", text: "입력한 인증번호가 올바르지 않습니다." });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.id) {
            Toast.fire({ icon: "warning", title: "아이디를 입력하세요." });
            return;
        }

        if (!formData.password) {
            Toast.fire({ icon: "warning", title: "패스워드를 입력하세요." });
            return;
        }

        if (!formData.phone || formData.phone.length < 10) {
            Toast.fire({ icon: "warning", title: "올바른 휴대폰 번호를 입력하세요." });
            return;
        }

        if (buttonState !== "confirmed") {
            Toast.fire({ icon: "warning", title: "휴대폰 인증을 완료해주세요." });
            return;
        }

        try {
            await signupPost({
                id: formData.id,
                name: formData.userName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                userBirth: formData.userBirth,
                mailYn: formData.mailYn,
                favorite1: formData.favorite1,
                favorite2: formData.favorite2,
                favorite3: formData.favorite3,
            });

            Toast.fire({ icon: "success", title: "회원가입이 완료되었습니다." }).then(() => navigate("/login"));
        } catch (error) {
            console.error("회원가입 실패:", error);
            Toast.fire({ icon: "error", title: "회원가입 실패", text: "다시 시도해주세요." });
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
            Toast.fire({ icon: "warning", title: "올바른 휴대폰 번호를 입력하세요." });
            return;
        }
        if (buttonState !== "confirmed") {
            Toast.fire({ icon: "warning", title: "휴대폰 인증을 완료해주세요." });
            return;
        }

        // ✅ 전화번호에서 "-" 제거
        const cleanedPhone = formData.phone.replace(/-/g, "");

        // ✅ 기존 formData를 복사 후, phone 값만 "-" 없는 형태로 업데이트
        const sendData = {
            ...formData,
            phone: cleanedPhone,
        };

        console.log("📢 GenreSelect로 보낼 데이터:", sendData);

        // 장르 선택 페이지로 이동하면서 데이터 전달
        navigate("/register/genreselect", { state: sendData });
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
                <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="아이디" />
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
                    onChange={handleChange}
                    placeholder="비밀번호"
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
                    onChange={handleChange}
                    maxLength="8"
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

            {buttonState === "confirmed" && <p style={{ color: "green" }}>✅ 확인되었습니다.</p>}

            <br />

            <button
                type="button"
                className="JoinButton"
                onClick={buttonState === "sendOtp" ? sendOtp : buttonState === "verifyOtp" ? verifyOtp : handleNextStep}
            >
                {buttonState === "sendOtp" ? "인증번호 받기" : buttonState === "verifyOtp" ? "인증하기" : "다음 단계"}
            </button>
        </form>
    );
};

export default JoinUser;
