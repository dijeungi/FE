import React, { useState } from 'react';
import '../../styles/Login/JoinUser.css';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {signupPost} from "../../api/LoginApi";
import {auth} from "../../config/FirebaseConfig";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";


const JoinUser = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);

    const [formData, setFormData] = useState({
        id:'',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        selectedEmail: '',
        mailYn: 'N',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleEmailChange = (e) => {
        const email = formData.email;
        const {  value } = e.target;
        setFormData((prev) => ({
            ...prev,
            email : email+value,
        }));
        formData.email = email;
    };

    const validateCheck = () => {
        const phoneRegex = /^010\d{4}\d{4}$/;

        if (!phoneRegex.test(formData.phone)) {
            Swal.fire({
                title: '입력 오류',
                text: '전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.',
                icon: 'warning',
                confirmButtonText: '확인',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCheck()) {
            return;
        }

        try {
            await signupPost(
                formData.id,
                formData.name,
                formData.email,
                formData.password,
                formData.phone,
                formData.mailYn
            );
            Swal.fire({
                title: '회원가입 성공',
                text: '회원가입이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } catch (error) {
            console.error('회원가입 실패:', error);
            Swal.fire({
                title: '회원가입 실패',
                text: '회원가입에 실패했습니다. 다시 시도해주세요.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            console.log("🔹 reCAPTCHA 설정 시작");
            window.recaptchaVerifier = new RecaptchaVerifier(auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        console.log("✅ reCAPTCHA 인증 성공:", response);
                    },
                    "expired-callback": () => {
                        console.log("⚠️ reCAPTCHA 인증이 만료되었습니다. 다시 시도하세요.");
                    },
                },
                auth
            );

            window.recaptchaVerifier.render().then((widgetId) => {
                console.log("✅ reCAPTCHA 위젯 ID:", widgetId);
            });
        } else {
            console.log("⚠️ reCAPTCHA가 이미 설정됨");
        }
    };

    const sendOtp = async () => {
        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;

            const confirmationResult = await signInWithPhoneNumber(
                auth,
                "+82" + phoneNumber.replace("-", "").substring(1),
                appVerifier
            );
            setConfirmation(confirmationResult);
            alert("OTP 전송 완료!");
            console.log("✅ OTP 전송 성공:", confirmationResult);
        } catch (error) {
            console.error("❌ OTP 전송 실패:", error);
            if (error.code === "auth/invalid-app-credential") {
                alert("앱 자격 증명이 유효하지 않습니다. Firebase 설정을 확인하세요.");
            } else {
                alert("OTP 전송 실패: " + error.message);
            }
        }
    };


    const verifyOtp = async () => {
        try {
            if (!confirmation) {
                alert("OTP 인증이 먼저 필요합니다.");
                return;
            }

            const result = await confirmation.confirm(otp);
            const idToken = await result.user.getIdToken();
            console.log("✅ Firebase ID 토큰:", idToken);

            const response = await fetch("http://127.0.0.1:8080/api/firebase/auth/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token: idToken})
            });

            const data = await response.text();
            console.log(data);
            alert(data);
        } catch (error) {
            console.error("❌ OTP 인증 실패:", error);
            alert("OTP 인증 실패: " + error.message);
        }
    };

    return (
    <form class="Join-form" onSubmit={handleSubmit}>
      <h2 class="Join-h2">회원가입</h2>
      <div class="Join-form-box">
        <label>아이디</label>
        <input type="text"
               name="id"
               placeholder='6~20자 영문, 숫자'
               value={formData.id}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>비밀번호 </label>
        <input type="password"
               name="password"
               placeholder='8~12자 영문, 숫자, 특수 문자'
               value={formData.password}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>비밀번호 확인</label>
        <input type="password"
               name="confirmPassword"
               placeholder='8~12자 영문, 숫자, 특수 문자'
               value={formData.confirmPassword}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>이름</label>
        <input type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>이메일</label>
          <input type="text"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
          />
          <select onChange={handleEmailChange}>
              <option>직접입력</option>
              <option value="@naver.com">@naver.com</option>
              <option value="@gmail.com">@gmail.com</option>
              <option value="@daum.net">@daum.net</option>

          </select>
      </div>
      <div class="Join-form-box">
        <label>휴대폰</label>
        <input type="text"
               name="phone"
               value={formData.phone}
               onChange={handleChange}
        />
        <button type="button"
                class="Join-btn1"
                onClick={sendOtp}>
            인증번호 받기
        </button>
          {confirmation && (
              <>
                  <input
                      type="text"
                      placeholder="OTP 입력"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                  />
                  <button type="button" onClick={verifyOtp}>
                      인증번호 확인
                  </button>
              </>
          )}
          <div id="recaptcha-container"></div>
      </div>
      <div class="Join-form-box2">
          <input type="checkbox"
                 name="receiveInfo"
                 value={formData.mailYn}
                 onChange={handleChange}
          />
          <label>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
      </div>
      <div class="Join-form-box2">
          <input type="checkbox" name="under14"/>          
          <label>14세 미만입니다.</label>
      </div>
      <div class="Join-form-box3">
          <p>만 14세 미만 회원은 법정대리인(부모님) 동의를 받은 경우만 회원가입이 가능합니다.</p>
      </div>
      <button type="submit" class="Join-submit">가입완료</button>
    </form>
  );
};

export default JoinUser;
