import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadTossPayments } from '@tosspayments/payment-sdk';
import "../styles/Components/ReservationWindow.css";

const ReservationWindow = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const festivalName = decodeURIComponent(params.get("festivalName")) || "정보 없음";
    const selectedDate = params.get("selectedDate") || "정보 없음";
    const selectedTime = params.get("selectedTime") || "정보 없음";
    const salePrice = Number(params.get("salePrice")) || 1000;
    const poster = decodeURIComponent(params.get("poster")) || "";

    const rows = "ABCDEFG".split("");
    const seatsPerRow = 10;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // 선택된 좌석 수에 따라 가격 업데이트
    useEffect(() => {
        setTotalPrice(salePrice * selectedSeats.length);
    }, [selectedSeats, salePrice]);

    const handleSeatClick = (seat) => {
        setSelectedSeats((prevSelected) =>
            prevSelected.includes(seat)
                ? prevSelected.filter((s) => s !== seat)
                : [...prevSelected, seat]
        );
    };

    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments("test_ck_O6BYq7GWPVvPRjx6BQL8NE5vbo1d");

            const orderId = `order_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;

            await tossPayments.requestPayment("카드", {
                orderId,
                amount: totalPrice,
                orderName: "공연 티켓",
                customerName: "고객 이름",
                successUrl: `${window.location.origin}/payment/success?orderId=${orderId}&totalPrice=${totalPrice}&seats=${selectedSeats.join(",")}`,
                failUrl: `${window.location.origin}/payment/fail`,
            });

        } catch (error) {
            console.error("결제 오류:", error);
            alert(`결제 실패: ${error.message}`);
        }
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
                        <li className="Reservation_Li"><strong>가격 (1석 기준):</strong> {salePrice.toLocaleString()}원</li>
                    </ul>
                </div>

                <div className="seat-container">
                    <div className="screen">공연 무대</div>
                    {rows.map((row) => (
                        <div key={row} className="seat-row">
                            {Array.from({length: seatsPerRow}, (_, i) => {
                                const seat = `${row}${i + 1}`;
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

                <div className="Reservation_Footer">
                    <p className="selected-seats">
                        <strong>선택한 좌석:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "없음"}
                    </p>

                    <p className="total-price">
                        <strong>총 가격:</strong> {totalPrice.toLocaleString()}원
                    </p>

                    <button className="reservation-button" disabled={selectedSeats.length === 0} onClick={handlePayment}>
                        예매 완료 (결제)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationWindow;
