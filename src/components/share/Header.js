import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/LoginSlice";
import { setAccessTokenCookie, removeRefreshTokenCookie } from "../../utils/Cookie";
import Swal from "sweetalert2";
import "../../styles/components/Header.css";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import { logoutPost } from "../../api/LoginApi";

export default function Header() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [lastApiCallTime, setLastApiCallTime] = useState(Date.now());

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.loginSlice.accessToken);

    useEffect(() => {
        // 화면 크기 변경 감지
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        // Access Token이 변경되면 쿠키에 저장
        if (accessToken) {
            setAccessTokenCookie(accessToken);
        }

        // 30분 동안 API 요청이 없으면 자동 로그아웃
        const interval = setInterval(() => {
            if (Date.now() - lastApiCallTime >= 30 * 60 * 1000) {
                dispatch(logout());
            }
        }, 60 * 1000);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, [accessToken, lastApiCallTime, dispatch]);

    // API 요청 시 호출할 함수 (API 호출이 일어나면 시간 리셋)
    const updateApiCallTime = () => {
        setLastApiCallTime(Date.now());
    };

    const handleLogout = async () => {
        try {
            await logoutPost();
            dispatch(logout());

            Swal.fire({
                icon: "success",
                title: "로그아웃 성공",
                text: "정상적으로 로그아웃되었습니다.",
            });
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <header className="header">
            <div className="header_topNavContainer">
                <div className="header_topNav">
                    <div className="header_logo_navGroup">
                        <div className="header_logo">
                            <Link to="/">
                                <img src="https://dijeungi.github.io/imageHosting/images/CClogo.png" alt="로고" />
                            </Link>
                        </div>
                    </div>
                    <div className="header_userMenu">
                        {accessToken ? (
                            <>
                                <span className="header_userMenuItem logout" onClick={handleLogout} title="로그아웃">
                                    <LogoutIcon className="header_icon" />
                                    <span>로그아웃</span>
                                </span>
                                <Link to="/mypage/booking" className="header_userMenuItem" title="마이페이지">
                                    <PersonOutlineIcon className="header_icon" />
                                    <span>마이페이지</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="header_userMenuItem" title="로그인">
                                    <LoginIcon className="header_icon" />
                                    <span>로그인</span>
                                </Link>
                                <Link to="/register" className="header_userMenuItem" title="회원가입">
                                    <PersonAddAltIcon className="header_icon" />
                                    <span>회원가입</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="header_mainNav">
                <div className="header_mainNavContainer">
                    <nav className="header_nav">
                        <ul className="header_navList">
                            <li className="header_navItem first_nav_item">
                                <Link to="/" className="header_navLink header_nav_Link_First">
                                    공지사항
                                </Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">
                                    티켓오픈
                                </Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">
                                    공연장
                                </Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">
                                    이벤트
                                </Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/ranking" className="header_navLink">
                                    랭킹
                                </Link>
                            </li>
                        </ul>
                        <div className="header_searchBar">
                            <input type="text" placeholder="검색어를 입력하세요" onFocus={updateApiCallTime} />
                            <ManageSearchIcon className="header_searchIcon" />
                        </div>
                    </nav>
                    <div className="header_viewportInfo">{viewportWidth}px</div>
                </div>
            </div>
        </header>
    );
}
