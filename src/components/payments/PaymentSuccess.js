import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {addSeatTickets} from "../../api/TicketApi";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import "../../styles/Payment/PaymentSuccess.css";

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = useSelector((state) => state.loginSlice.id);
    const hasSentRequest = useRef(false);
    // console.log("유저명"+userId);
    const [seat, setSeat] = useState({
        orderId: "",
        festivalId: 0,
        dateId: 0,
        paymentDate: "",
        memberId: "",
        seat: "" });

    useEffect(() => {
        if (params && params.get("seats") && params.get("seats").length > 3) {
            const seatsParam = params.get("seats");
            const orderId = params.get("orderId");

            if (seatsParam && orderId) {
                // orderId를 '-'로 분리
                const orderParts = orderId.split("-");
                const festivalId = Number(orderParts[1]) || 0;
                const dateId = Number(orderParts[2]) || 0;
                const commonPart = orderParts.slice(0, -1).join("-"); // 마지막 요소 제외한 공통 부분
                const lastPart = orderParts[orderParts.length - 1]; // 마지막 요소 (쉼표로 구분된 값)

                // 쉼표로 구분된 값을 분리하여 공통 부분과 합침
                const expandedOrderIds = lastPart.split("_").map((item) => `${commonPart}-${item}`);

                // 현재 날짜 포맷 변환
                const currentDate = new Date();
                const formattedDate = currentDate
                    .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    })
                    .replace(/\. /g, "-")
                    .replace(".", "");
                console.log(commonPart);
                setSeat({
                    orderId: commonPart,
                    festivalId: Number(festivalId),
                    dateId: Number(dateId),
                    memberId: userId,
                    paymentDate: formattedDate,
                    seat: params.get("seats").split(",")
                });
                console.log(params.get("seats").split(","));
                const requestBody = {
                    orderId: commonPart,
                    festivalId: festivalId,
                    dateId: dateId,
                    memberId: userId,
                    paymentDate: seat.paymentDate,
                    seats: params.get("seats").split(",")
                }
                console.log(requestBody);
                console.log("DB Insert 전 : "+params.get("closed"));
                if (window.opener) {

                    addSeatTickets(requestBody);
                    window.close();
                    console.log("opener 테스트 성공");
                }else {
                    console.log("closed 실행 완료");
                }
            }
        }
    }, []);
    const orderId = params.get("id") || "N/A";
    const totalPrice = params.get("totalPrice") || 0;
    const seats = params.get("seats") ? params.get("seats").split(",") : [];
    const paymentMethod = params.get("paymentMethod") || "신용카드";

    const rawPoster = params.get("poster");
    const poster = rawPoster ? decodeURIComponent(rawPoster) : "https://via.placeholder.com/150";
    console.log("DB Insert 밖 : "+params.get("closed"));
    if (window.opener) {
        window.opener.location.href = `${
            window.location.origin
        }/payment/success?orderId=${orderId}&totalPrice=${totalPrice}&seats=${params.get("seats")}&poster=${encodeURIComponent(poster)}&closed=${true}`;
        console.log("성공");

    }
    else{
        console.log("실패");
    }

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
                                <strong className="Success_Strong">구매해주신 티켓 정보입니다.</strong>
                                {/*<p className="Success_InfoDesc"></p>*/}
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
    )
};

export default PaymentSuccess;
