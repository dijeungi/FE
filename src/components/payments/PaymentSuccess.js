import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/payment/PaymentSuccess.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const orderId = params.get("orderId") || "N/A";
    const totalPrice = params.get("totalPrice") || 0;
    const seats = params.get("seats") ? params.get("seats").split(",") : [];
    const paymentMethod = params.get("paymentMethod") || "신용카드";

    const rawPoster = params.get("poster");
    const poster = rawPoster ? decodeURIComponent(rawPoster) : "https://via.placeholder.com/150";

    console.log("🖼️ URL에서 가져온 포스터 (원본):", rawPoster);
    console.log("📸 디코딩된 포스터 URL:", poster);

    return (
        <>
            <div className="Success_header"></div>
            <div className="Success_Container">
                <div className="Success_Top">
                    <CreditScoreIcon />
                    <h2 className="Success_Icon_txt">회원님, 결제가 성공적으로 완료되었습니다.</h2>
                </div>

                <div className="Success_Wrap">
                    <div className="Success_Poster">
                        {poster ? <img src={poster} alt="공연 포스터" /> : <div className="No_Poster">포스터 없음</div>}
                    </div>
                    <div className="Success_Info">
                        <div className="Success_Main_text">
                            <li className="Success_InfoItem Line">
                                <strong className="Success_Strong">예매번호:</strong>
                                <p className="Success_InfoDesc">{orderId}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">좌석:</strong>
                                <p className="Success_InfoDesc">{seats.length > 0 ? seats.join(", ") : "선택 없음"}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">총 결제 금액:</strong>
                                <p className="Success_InfoDesc">{Number(totalPrice).toLocaleString()}원</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">결제 방식:</strong>
                                <p className="Success_InfoDesc">{paymentMethod}</p>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/">
                <button className="Screen_Phone">홈페이지로 이동하기</button>
            </Link>
        </>
    );
};

export default PaymentSuccess;
