import React, {useState} from 'react';
import '../../styles/Login/Login.css';
import Loginicon1 from '../../img/kakao_icon.png'
import Loginicon2 from '../../img/naver_icon.png'
import Loginicon3 from '../../img/google.png'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Swal from 'sweetalert2';
import {login} from "../../redux/LoginSlice";
import {loginPost} from "../../api/LoginApi";
import {getKakaoLoginLink} from "../../api/KakaoApi";
import {getNaverLoginLink} from "../../api/NaverApi";
import {getGoogleLoginLink} from "../../api/GoogleApi";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        id: '',
        password: '',
    });

    const [isOpen, setIsOpen] = useState(false);

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
            console.log('로그인 성공:', response);

            dispatch(login(response));
            Swal.fire({
                title: '로그인 성공',
                text: '로그인 되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error('로그인 실패:', error);
            Swal.fire({
                title: '로그인 실패',
                text: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
                icon: 'error',
                confirmButtonText: '확인',
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
        <div className="Login-container">
            <div className="Login-logo">logo</div>
            <input
                type="text"
                name="id"
                placeholder="아이디"
                className="Login-input1 Login-input"
                value={loginForm.id}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호"
                className="Login-input2 Login-input"
                value={loginForm.password}
                onChange={handleChange}
            />
            <div className="Login-keep-logged-in">
                <label for="chk">
                    <input type="checkbox"/>
                    <span class="Login-text">로그인 상태 유지</span>
                </label>
            </div>
            <button className="Login-button" onClick={handleSubmit}>
                로그인
            </button>

            <div className="Login-links">
                <Link to="/account/findId" className="Login-link">아이디 찾기</Link>
                <span>|</span>
                <Link to="/account/findPassword" className="Login-link">비밀번호 찾기</Link>
                <span>|</span>
                <Link to="/register" className="Login-link">회원가입</Link>
            </div>

            <div className="Login-social-icons">
                <img src={Loginicon1} alt="KakaoTalk" className="Login-icon" onClick={handleKakaoLogin}/>
                <img src={Loginicon2} alt="Naver" className="Login-icon" onClick={handleNaverLogin}/>
                <img src={Loginicon3} alt="Google" className="Login-icon" onClick={handleGoogleLogin}/>
            </div>
            {/*<button className="Reservation" onClick={() => setIsOpen(true)}>*/}
            {/*    예매하기*/}
            {/*</button>*/}

            {/*{isOpen && (*/}
            {/*    <ReservationPopup onClose={() => setIsOpen(false)}>*/}
            {/*        <h2>새 창에서 렌더링된 컴포넌트</h2>*/}
            {/*        <button onClick={() => setIsOpen(false)}>닫기</button>*/}
            {/*    </ReservationPopup>*/}
            {/*)}*/}
        </div>
    );
}

export default LoginPage;
