import React from "react";
import { useLocation } from "react-router-dom";

const ReservationWindow = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    // ✅ URL에서 가져온 데이터 (한글 디코딩 포함)
    const festivalId = params.get("festivalId") || "정보 없음";
    const festivalName = decodeURIComponent(params.get("festivalName")) || "정보 없음";
    const selectedDate = params.get("selectedDate") || "정보 없음";
    const selectedTime = params.get("selectedTime") || "정보 없음";
    const salePrice = Number(params.get("salePrice")) || 0;

    return (
        <div className="Reservation_Container">
            <h2>예매하기</h2>
            <p><strong>공연명:</strong> {festivalName}</p>
            <p><strong>날짜:</strong> {selectedDate}</p>
            <p><strong>시간:</strong> {selectedTime}</p>
            <p><strong>할인 가격:</strong> {salePrice.toLocaleString()}원</p>
            <button className="Reservation_ConfirmButton">예매 완료</button>
        </div>
    );
};

export default ReservationWindow;
