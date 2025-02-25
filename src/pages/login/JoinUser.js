import React, { useEffect, useState } from "react";
import "../../styles/login/JoinUser.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupPost } from "../../api/LoginApi";
import { getCategoryList } from "../../api/CommonApi";
import { auth } from "../../config/FirebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const JoinUser = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [confirmation, setConfirmation] = useState(null);
    const [category, setCategory] = useState([]);

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

    const [formData, setFormData] = useState({
        id: "",
        email: "",
        selectedEmail: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        mailYn: "N",
        favorite1: "",
        favorite2: "",
        favorite3: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (checked ? "Y" : "N") : value,
        }));
    };

    const handleEmailChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            selectedEmail: e.target.value,
        }));
    };

    const handleFavoriteChange = (e, favoriteKey) => {
        const selectedValue = e.target.value;
        const selectedCategory = category.find((item) => String(item.id).trim() === String(selectedValue).trim());

        setFormData((prev) => ({
            ...prev,
            [favoriteKey]: selectedCategory ? selectedCategory.name : "",
        }));
    };

    const validateCheck = () => {
        const phoneRegex = /^010\d{4}\d{4}$/;
        if (!phoneRegex.test(formData.phone)) {
            Swal.fire({
                title: "입력 오류",
                text: "전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
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
            await signupPost({
                id: formData.id,
                name: formData.name,
                email: formData.email + formData.selectedEmail,
                password: formData.password,
                phone: formData.phone,
                mailYn: formData.mailYn,
                favorite1: formData.favorite1,
                favorite2: formData.favorite2,
                favorite3: formData.favorite3,
            });

            Swal.fire({
                title: "회원가입 성공",
                text: "회원가입이 완료되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then(() => navigate("/login"));
        } catch (error) {
            console.error("회원가입 실패:", error);
            Swal.fire({
                title: "회원가입 실패",
                text: "회원가입에 실패했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "invisible",
            });
        }
    };

    const sendOtp = async () => {
        try {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            const formattedPhone = "+82" + formData.phone.substring(1);

            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setConfirmation(confirmationResult);
            Swal.fire("OTP 전송 완료!", "문자로 인증번호를 확인하세요.", "success");
        } catch (error) {
            console.error("OTP 전송 실패:", error);
            Swal.fire("OTP 전송 실패", error.message, "error");
        }
    };

    const verifyOtp = async () => {
        try {
            if (!confirmation) {
                Swal.fire("OTP 인증 필요", "먼저 인증번호를 받아주세요.", "warning");
                return;
            }

            const result = await confirmation.confirm(otp);
            const idToken = await result.user.getIdToken();

            const response = await fetch("http://127.0.0.1:8080/api/firebase/auth/verify-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: idToken }),
            });

            const data = await response.text();
            Swal.fire("인증 결과", data, "info");
        } catch (error) {
            Swal.fire("OTP 인증 실패", error.message, "error");
        }
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
                <label>* 아이디</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} />
            </div>

            <div className="Top_Input">
                <label>* 비밀번호</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="Top_Input">
                <label>* 이메일</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                <select className="EmailSelect_Box" name="selectedEmail" onChange={handleEmailChange}>
                    <option value="">직접입력</option>
                    <option value="@naver.com">@naver.com</option>
                    <option value="@gmail.com">@gmail.com</option>
                </select>
            </div>

            <div className="Top_Input">
                <label>* 휴대폰</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                <button type="button" className="Join-btn1" onClick={sendOtp}>
                    인증번호 받기
                </button>
                <div id="recaptcha-container"></div>
            </div>

            {/* E : Top */}

            <br />
            <div className="Join-form-box-header">
                <label>좋아하는 장르</label>
            </div>
            {[1, 2, 3].map((num) => (
                <div key={num} className="Join-form-box">
                    <label>{num}순위</label>
                    <select onChange={(e) => handleFavoriteChange(e, `favorite${num}`)}>
                        <option value="">선택</option>
                        {category.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <div className="Join-form-box2">
                <input type="checkbox" name="receiveInfo" value={formData.mailYn} onChange={handleChange} />
                <label>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
            </div>
            <div className="Join-form-box2">
                <input type="checkbox" name="under14" />
                <label>14세 미만입니다.</label>
            </div>
            <div className="Join-form-box3">
                <p>만 14세 미만 회원은 법정대리인(부모님) 동의를 받은 경우만 회원가입이 가능합니다.</p>
            </div>

            <br />
            <button type="submit" className="Join-submit">
                가입완료
            </button>
        </form>
    );
};

export default JoinUser;
