import React, { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import "../../styles/mypage/MyPageLayout.css";
import {useSelector} from "react-redux";

export default function MyPageLayout() {
    // 기본적으로 예매내역이 active 상태입니다.
    const [activeMenu, setActiveMenu] = useState("예매내역");
    const navigate = useNavigate();

    const userName = useSelector((state) => state.loginSlice.id);
    // 각 메뉴 항목에 대해 표시할 이름과 이동할 URL 경로를 정의합니다.
    const menuRoutes = {
        예매내역: "booking",
        "나의 이용후기": "reviews",
        "나의 좋아요": "likes",
        "회원정보 수정": "modify",
        회원탈퇴: "secession",
        공지사항: "notice",
        // 자주묻는질문: "faq",
        // "1:1 문의": "inquiry",
    };

    // 메뉴 클릭 시 active 상태 변경과 함께 해당 메뉴의 경로로 이동합니다.
    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
        const targetRoute = menuRoutes[menuName];
        navigate(`/mypage/${targetRoute}`);
    };

    return (
        <div className="MyPage_Container clearfix">
            <div className="MyPage_Top">
                <div className="MyPage_Top_Left">

                    {/*<img src="https://dijeungi.github.io/imageHosting/images/CClogo.png" alt="로고"/>*/}
                </div>
                <div className="MyPage_Top_Right">
                    <div className="MyPage_Contents" style={{marginLeft: "10px"}}>
                            <div className="MyPage_Title" style={{fontWeight: "noraml", paddingTop: "2px"}}>
                                어서오세요&nbsp;🧩
                            </div>
                            <Link to="/mypage/userinfo">
                                <div style={{marginTop: "6px"}}>
                                    <span className="MyPage_Top_Name">{userName}</span>
                                    <span className="MyPage_Top_Nim">님</span>
                                </div>
                            </Link>
                        </div>
                        <div className="MyPage_Contents">
                            {/*<Link to="/">*/}
                                <div className="MyPage_Top_Title">
                                    티켓 구매 횟수&nbsp;
                                    {/*<span className="Arrow_gt">&gt;</span>*/}
                                </div>
                                <div className="MyPage_Top_Number">0</div>
                            {/*</Link>*/}
                        </div>
                        <div className="MyPage_Contents">
                            {/*<Link to="/">*/}
                                <div className="MyPage_Top_Title">
                                    리뷰 횟수&nbsp;
                                    {/*<span className="Arrow_gt">&gt;</span>*/}
                                </div>
                                <div className="MyPage_Top_Number">0</div>
                            {/*</Link>*/}
                        </div>
                        <div className="MyPage_Contents">
                            {/*<Link to="/">*/}
                                <div className="MyPage_Top_Title">
                                    좋아요 횟수&nbsp;
                                    {/*<span className="Arrow_gt">&gt;</span>*/}
                                </div>
                                <div className="MyPage_Top_Number">0</div>
                            {/*</Link>*/}
                        </div>
                        <div className="MyPage_Contents"></div>
                        {/* 예비칸 */}
                    </div>
                </div>
                <div className="MyPage_Wrap">
                    {/* S : 왼쪽 메뉴 영역 */}
                <div className="MyPage_Wrap_Left">
                    <div className="MyPage_Left_Title">마이티켓</div>
                    <ul>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("예매내역")}>
                            <span className={activeMenu === "예매내역" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                예매내역
                            </span>
                        </li>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("나의 이용후기")}>
                            <span
                                className={activeMenu === "나의 이용후기" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}
                            >
                                나의 이용후기
                            </span>
                        </li>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("나의 좋아요")}>
                            <span className={activeMenu === "나의 좋아요" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                나의 포인트
                            </span>
                        </li>
                    </ul>
                    <ul>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("회원정보 수정")}>
                            <span
                                className={activeMenu === "회원정보 수정" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}
                            >
                                회원정보 수정
                            </span>
                        </li>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("회원탈퇴")}>
                            <span className={activeMenu === "회원탈퇴" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                회원탈퇴
                            </span>
                        </li>
                    </ul>
                    <ul>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("공지사항")}>
                            <span className={activeMenu === "공지사항" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                공지사항
                            </span>
                        </li>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("이벤트")}>
                            <span className={activeMenu === "이벤트" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                이벤트
                            </span>
                        </li>
                        {/* <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("자주묻는질문")}>
                            <span
                                className={activeMenu === "자주묻는질문" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}
                            >
                                자주묻는질문
                            </span>
                        </li>
                        <li className="MyPage_Left_Sub" onClick={() => handleMenuClick("1:1 문의")}>
                            <span className={activeMenu === "1:1 문의" ? "MyPage_Left_SubOn" : "MyPage_Left_SubOff"}>
                                1:1 문의
                            </span>
                        </li> */}
                    </ul>
                    <ul>
                        <Link to="/">
                            <div
                                style={{
                                    width: "158px",
                                    marginTop: "15px",
                                    borderRadius: "8px",
                                    border: "1px solid rgb(168, 213, 186)",
                                    background: "rgb(234, 244, 234)",
                                    color: "rgb(51, 51, 51)",
                                    fontSize: "16px",
                                    padding: "15px 10px 10px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                친구를 초대하면
                                <span
                                    style={{
                                        color: "green",
                                        lineHeight: "150%",
                                        fontWeight: "700",
                                        fontSize: "14.3px",
                                    }}
                                >
                                    <br />
                                    각각 10% 바로적용
                                </span>
                                <br />
                            </div>
                        </Link>
                    </ul>
                </div>
                {/* E : 왼쪽 메뉴 영역 */}
                {/* S : 오른쪽 컨텐츠 영역 */}
                <div className="MyPageLayout_Wrap_Right">
                    <Outlet />
                </div>
                {/* E : 오른쪽 메뉴 영역 */}
            </div>
            <div style={{ clear: "both" }}></div>
            <div className="footer_pd"></div>
        </div>
    );
}
