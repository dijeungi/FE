// src/components/Header.js

import '../styles/Header.css';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function Header() {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // 검색창 포커스 핸들러
    const handleSearchFocus = () => {
        setIsSearchFocused(true);
    };

    // 검색창 포커스 아웃 핸들러
    const handleSearchBlur = () => {
        setIsSearchFocused(false);
    };

    // 검색어 입력 핸들러
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container">
            <nav className="main-nav">

                {/*사이드 바 추후 추가*/}

                <div className="logo">
                    <Link to="/">
                        <img src="//tkfile.yes24.com/imgNew/common/pf-logoN.png"
                             alt="Microsoft Logo" />
                    </Link>
                </div>

                {/* Main Menu */}
                <ul className="main-menu">
                    <li><Link to="/announcement">공지사항</Link></li>
                    <li><Link to="/">공연장</Link></li>
                    <li><Link to="/">랭킹</Link></li>
                </ul>

                {/* 검색창 추가 */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        onFocus={handleSearchFocus}
                        onBlur={handleSearchBlur}
                        onChange={handleSearchChange}
                        value={searchTerm}
                        className={isSearchFocused ? 'focused' : ''}
                    />
                    <button className="search-button">
                        <SearchIcon />
                    </button>

                    {/* 검색창 하단에 표시될 내용 */}
                    {isSearchFocused && (
                        <div className="search-results">
                            <div className="recent-searches">
                                <h3>최근 검색어</h3>
                                <ul>
                                    <li>검색어 1</li>
                                    <li>검색어 2</li>
                                    <li>검색어 3</li>
                                </ul>
                            </div>
                            <div className="recent-works">
                                <h3>최근 본 작품</h3>
                                <ul>
                                    <li>작품 1</li>
                                    <li>작품 2</li>
                                    <li>작품 3</li>
                                </ul>
                            </div>
                            <div className="real-time-searches">
                                <h3>실시간 검색어</h3>
                                <ul>
                                    <li>실시간 검색어 1</li>
                                    <li>실시간 검색어 2</li>
                                    <li>실시간 검색어 3</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Menu */}
                <ul className="right-menu">
                    <li><Link to="/sitemap" className="sitemap fas fa-chevron-down">Microsoft 전체</Link></li>
                    <li><Link to="/search" className="search fas fa-search fa-rotate-90">검색</Link></li>
                    <li><Link to="/cart" className="cart fas fa-shopping-cart">카트</Link></li>
                    <li><Link to="/login" className="login far fa-user-circle large">로그인</Link></li>
                </ul>

                <div className="main-btn">
                    <i className="fas fa-bars fa-2x"></i>
                </div>
            </nav>
        </div>
    );
}