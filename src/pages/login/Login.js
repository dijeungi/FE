import React, { useState } from "react";
import "../../styles/login/Login.css";
import Naver_Login from "../../img/Naver_Login.png";
import Kakao_Login from "../../img/Kakao_Login.png";
import Google_Login from "../../img/Google_Login.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../../redux/LoginSlice";
import { loginPost } from "../../api/LoginApi";
import { getKakaoLoginLink } from "../../api/KakaoApi";
import { getNaverLoginLink } from "../../api/NaverApi";
import { getGoogleLoginLink } from "../../api/GoogleApi";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [idError, setIdError] = useState("");
    const [loginForm, setLoginForm] = useState({
        id: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginPost(loginForm.id, loginForm.password);
            // console.log("로그인 성공:", response);

            dispatch(login(response));
            Swal.fire({
                title: "로그인 성공",
                text: "로그인 되었습니다.",
                icon: "success",
                confirmButtonText: "확인",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        } catch (error) {
            console.error("로그인 실패:", error);
            Swal.fire({
                title: "로그인 실패",
                text: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };

    const handleKakaoLogin = () => {
        const link = getKakaoLoginLink();
        window.location.href = link;
    };
    const handleNaverLogin = () => {
        const link = getNaverLoginLink();
        window.location.href = link;
    };
    const handleGoogleLogin = () => {
        const link = getGoogleLoginLink();
        window.location.href = link;
    };
    return (
        <>
            <div className="Login_Logo">
                <Link to="/">
                    <img src="https://dijeungi.github.io/imageHosting/images/CClogo.png" alt="로고" />
                </Link>
            </div>
            <div className="Login_Container">
                <div className="Login_Input">
                    <label>
                        <PersonOutlineIcon />
                    </label>
                    <input type="text" name="id" placeholder="아이디" value={loginForm.id} onChange={handleChange} />
                    {idError && <p className="Error_Message">{idError}</p>}
                </div>

                <div className="Login_Input">
                    <label>
                        <PasswordIcon />
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={loginForm.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="Login_Essential">
                    <input type="checkbox" className="Login_Checkbox" name="receiveInfo" />
                    <span>로그인 상태 유지</span>
                </div>
                <button className="Login_Button" onClick={handleSubmit}>
                    로그인
                </button>

                <div className="Login_Link">
                    <Link to="/account/findId" className="Login-link">
                        아이디 찾기
                    </Link>
                    <span>|</span>
                    <Link to="/account/findPassword" className="Login-link">
                        비밀번호 찾기
                    </Link>
                    <span>|</span>
                    <Link to="/register/agree/user" className="Login-link">
                        회원가입
                    </Link>
                </div>

                <div className="Social_Login_Icon">
                    <img src={Naver_Login} alt="KakaoTalk" className="Login-icon Naver" onClick={handleNaverLogin} />
                    <img src={Kakao_Login} alt="Naver" className="Login-icon" onClick={handleKakaoLogin} />
                    <img src={Google_Login} alt="Google" className="Login-icon1" onClick={handleGoogleLogin} />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
