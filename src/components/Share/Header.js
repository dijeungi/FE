import React, { useState, useEffect } from 'react';
import '../../styles/Components/Header.css';

import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function Header() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="header">
            <div className="header_topNavContainer">
                <div className="header_topNav">
                    <div className="header_logo_navGroup">
                        <div className="header_logo">
                            <Link to="/">
                                <img src="//tkfile.yes24.com/imgNew/common/pf-logoN.png" alt="로고" />
                            </Link>
                        </div>
                        {/*<nav className="header_mainMenu">*/}
                        {/*    <ul className="header_nav_list">*/}
                        {/*        <li className="header_nav_item">*/}
                        {/*            <Link to="/" className="header_nav_item_link" aria-current="true">공연/전시</Link>*/}
                        {/*            <Link to="/" className="header_nav_item_link" aria-current="false">스포츠</Link>*/}
                        {/*            <Link to="/" className="header_nav_item_link" aria-current="false">여행</Link>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</nav>*/}
                    </div>
                    <div className="header_userMenu">
                        <Link to="/login" className="header_userMenuItem" title="로그인">
                            <LoginIcon className="header_icon" />
                            <span>로그인</span>
                        </Link>
                        <Link to="/register" className="header_userMenuItem" title="회원가입">
                            <PersonAddAltIcon className="header_icon" />
                            <span>회원가입</span>
                        </Link>
                        <Link to="/mypage" className="header_userMenuItem" title="마이페이지">
                            <PersonOutlineIcon className="header_icon" />
                            <span>마이페이지</span>
                        </Link>
                    </div>

                </div>

            </div>

            <div className="header_mainNav">
                <div className="header_mainNavContainer">
                    <nav className="header_nav">
                        <ul className="header_navList">
                            <li className="header_navItem first_nav_item">
                                <Link to="/" className="header_navLink header_nav_Link_First">공지사항</Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">티켓오픈</Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">공연장</Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/" className="header_navLink">이벤트</Link>
                            </li>
                            <li className="header_navItem">
                                <Link to="/ranking" className="header_navLink">랭킹</Link>
                            </li>
                        </ul>
                        <div className="header_searchBar">
                            <input type="text" placeholder="검색어를 입력하세요" />
                            <ManageSearchIcon className="header_searchIcon" />
                        </div>
                    </nav>
                    {/*테스트*/}
                    <div className="header_viewportInfo">
                        {viewportWidth}px
                    </div>
                </div>
            </div>

        </header>
    );
}
