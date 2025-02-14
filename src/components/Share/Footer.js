// src/components/Footer.js

import React from 'react';
import '../../styles/Components/Footer.css';

import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer_container">
            <div className="footer_menu">
                <ul className="footer_menu_list">
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">회사소개</Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">
                            <span className="text_bold">개인정보 처리방침</span>
                        </Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">청소년 보호정책</Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">이용약관</Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">고객센터</Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">티켓판매안내</Link>
                    </li>
                    <li className="footer_menu_item">
                        <Link className="footer_menu_link" to="/">광고안내</Link>
                    </li>
                </ul>
            </div>
            <div className="footer_inner">
                <span className="footer_corp_title">CC공연 주식회사</span>
                <address className="footer_address">
                    <p>
                        <span className="footer_address_item">주소 : 서울 서초구 강남대로 405 통영빌딩 8층</span>
                        <span className="footer_address_item">대표: 김범석, 최준호, 안희연, 조민환, 김지애</span>
                        <span className="footer_address_item">사업자등록번호: 123-45-67890</span>
                    </p>
                    <p>
                        <span className="footer_address_item">연락처: 1588-1234</span>
                        <span className="footer_address_item">cc-Company@cc.co.kr</span>
                        <span className="footer_address_item">통신판매업 신고번호: 제2025-서울서초-0000호</span>
                        <span className="footer_address_item">
                            <Link to="/" className="btn_hyperlink" target="_blank" rel="noreferrer">사업자정보확인</Link>
                        </span>
                        <span className="footer_address_item">개인정보보호 책임자: 김범석</span>
                    </p>
                </address>
                <span className="footer_copyright">Copyright © NHN LINK Corporation. All rights reserved.</span>
                <div className="footer_etc">
                    <ul className="footer_sns">
                        <li className="footer_sns_item">
                            <Link className="footer_sns_link" to="/" target="_blank" rel="noreferrer">
                                <span className="common_icon icon_naverblog_gray">
                                    <span className="blind">네이버 블로그</span>
                                </span>
                            </Link>
                        </li>
                        <li className="footer_sns_item">
                            <Link className="footer_sns_link" to="/" target="_blank" rel="noreferrer">
                                <span className="common_icon icon_youtube_gray">
                                    <span className="blind">유튜브</span>
                                </span>
                            </Link>
                        </li>
                        <li className="footer_sns_item">
                            <Link className="footer_sns_link" to="/" target="_blank" rel="noreferrer">
                                <span className="common_icon icon_facebook_gray">
                                    <span className="blind">페이스북</span>
                                </span>
                            </Link>
                        </li>
                        <li className="footer_sns_item">
                            <Link className="footer_sns_link" to="/" target="_blank" rel="noreferrer">
                                <span className="common_icon icon_instagram_gray">
                                    <span className="blind">인스타그램</span>
                                </span>
                            </Link>
                        </li>
                        <li className="footer_sns_item">
                            <Link className="footer_sns_link" to="/" target="_blank" rel="noreferrer">
                                <span className="common_icon icon_twitter_gray">
                                    <span className="blind">트위터</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
