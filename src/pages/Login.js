import React, {useState} from 'react';
import '../styles/Login/Login.css';
import Loginicon1 from '../img/kakao_icon.png'
import Loginicon2 from '../img/naver_icon.png'
import Loginicon3 from '../img/apple_icon.png'
import LoginIcon from "@mui/icons-material/Login";
import {Link} from "react-router-dom";

function LoginPage() {
    return (
        <div className="Login-container">
            <div className="Login-logo">logo</div>
            <input
                type="text"
                placeholder="아이디"
                className="Login-input1 Login-input"
            />
            <input
                type="password"
                placeholder="비밀번호"
                className="Login-input2 Login-input"
            />
            <div className="Login-keep-logged-in">
                <label for="chk">
                    <input type="checkbox"/>
                    <span class="Login-text">로그인 상태 유지</span>
                </label>
            </div>
            <button className="Login-button">
                로그인
            </button>

            <div className="Login-links">
                <Link to="/register/SearchId" className="Login-link"><span>아이디 찾기</span></Link>
                <span>|</span>
                <Link to="/register/SearchPw" className="Login-link">비밀번호 찾기</Link>
                <span>|</span>
                <Link to="/register/Join0" className="Login-link">회원가입</Link>
            </div>

            <div className="Login-social-icons">
                <img src={Loginicon1} alt="KakaoTalk" className="Login-icon"/>
                <img src={Loginicon2} alt="Naver" className="Login-icon"/>
                <img src={Loginicon3} alt="Apple" className="Login-icon"/>
            </div>
        </div>
    );
}

export default LoginPage;
