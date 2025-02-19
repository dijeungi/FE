import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Components/ReservationWindow.css"; // 스타일 적용

const ReservationWindow = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    // ✅ URL에서 가져온 데이터
    // const festivalId = params.get("festivalId") || "정보 없음";
    const festivalName = decodeURIComponent(params.get("festivalName")) || "정보 없음";
    const selectedDate = params.get("selectedDate") || "정보 없음";
    const selectedTime = params.get("selectedTime") || "정보 없음";
    const salePrice = Number(params.get("salePrice")) || 0;
    const poster = decodeURIComponent(params.get("poster")) || "";

    // 좌석 데이터 생성
    const rows = "ABCDEFG".split("");
    const seatsPerRow = 10;

    // 선택된 좌석 상태 관리
    const [selectedSeats, setSelectedSeats] = useState([]);

    // 좌석 클릭 이벤트 핸들러
    const handleSeatClick = (seat) => {
        setSelectedSeats((prevSelected) =>
            prevSelected.includes(seat)
                ? prevSelected.filter((s) => s !== seat)
                : [...prevSelected, seat]
        );
    };

    return (
        <div className="Reservation_Container">
            <div className="Reservation_Poster">
                {poster ? (
                    <img src={poster} alt="공연 포스터" className="Reservation_PosterImage" />
                ) : (
                    <div className="Reservation_NoPoster">포스터 없음</div>
                )}
            </div>
            <div className="Reservation_SeatWrap">
                <div className="Reservation_Header">
                    <ul className="Reservation_Ul">
                        <li className="Reservation_Li"><strong>공연명:</strong> {festivalName}</li>
                        <li className="Reservation_Li"><strong>날짜:</strong> {selectedDate}</li>
                        <li className="Reservation_Li"><strong>시간:</strong> {selectedTime}</li>
                        <li className="Reservation_Li"><strong>할인 가격:</strong> {salePrice.toLocaleString()}원</li>
                    </ul>
                </div>

                <div className="seat-container">
                    {rows.map((row) => (
                        <div key={row} className="seat-row">
                            {Array.from({ length: seatsPerRow }, (_, i) => {
                                const seat = `${row}${i + 1}`; // 🔥 여기서 1부터 시작하도록 변경
                                return (
                                    <button
                                        key={seat}
                                        className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        {seat}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <p className="selected-seats">
                    <strong>선택한 좌석:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "없음"}
                </p>

                <button className="reservation-button" disabled={selectedSeats.length === 0}>
                    예매 완료
                </button>
            </div>
        </div>
    );
};

export default ReservationWindow;
