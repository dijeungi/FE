import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { addSeatTickets } from "../../api/TicketApi";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import "../../styles/payment/PaymentSuccess.css";

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const userId = useSelector((state) => state.loginSlice.id);

    useEffect(() => {
        const seatsParam = params.get("seats");
        const orderId = params.get("orderId");

        if (seatsParam && orderId && userId) {
            const orderParts = orderId.split("-");
            const festivalId = Number(orderParts[1]) || 0;
            const dateId = Number(orderParts[2]) || 0;
            const commonPart = orderParts.slice(0, -1).join("-");

            const locationNum = seatsParam.split(",").filter(Boolean);

            if (locationNum.length > 0) {
                const requestBody = {
                    orderId: commonPart,
                    festivalId: festivalId,
                    dateId: dateId,
                    memberId: userId,
                    locationNum: locationNum,
                };

                addSeatTickets(requestBody);
            }
        }

        // 부모 창이 존재하면 URL 변경 후 팝업 닫기 추가
        if (window.opener) {
            window.opener.location.href = `${
                window.location.origin
            }/payment/success?orderId=${orderId}&totalPrice=${params.get(
                "totalPrice"
            )}&seats=${seatsParam}&poster=${encodeURIComponent(params.get("poster") || "")}&closed=true`;

            console.log("부모 창 이동 완료");
            window.close(); // 팝업 창 닫기
        } else {
            console.log("opener가 존재하지 않음");
        }
    }, [userId]);

    const orderId = params.get("orderId") || "N/A";
    const totalPrice = params.get("totalPrice") || 0;
    const seats = params.get("seats") ? params.get("seats").split(",").filter(Boolean) : [];
    const paymentMethod = params.get("paymentMethod") || "신용카드";

    const rawPoster = params.get("poster");
    const poster = rawPoster ? decodeURIComponent(rawPoster) : "https://via.placeholder.com/150";

    const currentDate = new Date()
        .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        .replace(/\. /g, "-")
        .replace(".", "");

    return (
        <>
            <div className="Success_header"></div>
            <div className="Success_Container">
                <div className="Success_Top">
                    <CreditScoreIcon />
                    <h2 className="Success_Icon_txt">
                        결제가 <span>성공적으로 완료</span>되었습니다.
                    </h2>
                </div>

                <div className="Success_Wrap">
                    <div className="Success_Poster">
                        <img src={poster} alt="공연 포스터" />
                    </div>
                    <div className="Success_InfoContainer">
                        <div className="Success_Main_text">
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">사용자 ID:</strong>
                                <p className="Success_InfoDesc">{userId}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">주문 ID:</strong>
                                <p className="Success_InfoDesc">{orderId}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">결제 수단:</strong>
                                <p className="Success_InfoDesc">{paymentMethod}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">선택한 좌석:</strong>
                                <p className="Success_InfoDesc">{seats.length > 0 ? seats.join(", ") : "선택 없음"}</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">총 결제 금액:</strong>
                                <p className="Success_InfoDesc">{Number(totalPrice).toLocaleString()}원</p>
                            </li>
                            <li className="Success_InfoItem">
                                <strong className="Success_Strong">결제일자:</strong>
                                <p className="Success_InfoDesc">{currentDate}</p>
                            </li>
                        </div>
                    </div>
                </div>

                <Link to="/">
                    <button className="Screen_Phone">홈페이지로 이동하기</button>
                </Link>
            </div>
        </>
    );
};

export default PaymentSuccess;
