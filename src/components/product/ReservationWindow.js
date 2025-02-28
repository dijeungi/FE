import React, { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { getSeatTickets } from "../../api/TicketApi";
import "../../styles/components/ReservationWindow.css";

const ReservationWindow = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const festivalId = params.get("festivalId") || "";
    const festivalName = decodeURIComponent(params.get("festivalName")) || "";
    const selectedDate = params.get("selectedDate") || "";
    const selectedTime = params.get("selectedTime") || "";
    const salePrice = Number(params.get("salePrice")) || 1000;
    const poster = decodeURIComponent(params.get("poster")) || "";
    const dateId = params.get("dateId") || "";
    const [reservedSeats, setReservedSeats] = useState([]);
    const navigate = useNavigate();
    console.log("🎭 공연명:", festivalName);
    console.log("📅 날짜:", selectedDate);
    console.log("⏰ 시간:", selectedTime);
    console.log("💰 가격 (1석 기준):", salePrice);
    console.log("🖼️ 포스터 URL:", poster);
    console.log("📌 Date Id:", dateId);

    const rows = "ABCDEFG".split("");
    const seatsPerRow = 10;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchReservedSeats = async () => {
            if (!festivalId || !dateId) return;

            try {
                console.log("🎟️ 예약된 좌석 불러오는 중...");
                const response = await getSeatTickets({ festivalId, dateId });
                console.log("✅ 예약된 좌석 데이터:", response);

                setReservedSeats(response || []);
            } catch (error) {
                console.error("❌ 예약된 좌석 데이터를 불러오는 데 실패:", error);
            }
        };

        fetchReservedSeats();

        console.log("📌 업데이트 발생! 좌석 개수:", selectedSeats.length, "| DateId:", dateId, "| 가격:", salePrice);
        setTotalPrice(salePrice * selectedSeats.length);
    }, [selectedSeats, salePrice, dateId, festivalId]);

    const handleSeatClick = (seat) => {
        const isReserved = reservedSeats.includes(seat);

        if (isReserved) {
            console.warn(`⛔ 이미 예약된 좌석입니다: ${seat}`);
            return;
        }

        setSelectedSeats((prevSelected) =>
            prevSelected.includes(seat) ? prevSelected.filter((s) => s !== seat) : [...prevSelected, seat]
        );
    };

    const handlePayment = async () => {
        try {
            const tossPayments = await loadTossPayments("test_ck_O6BYq7GWPVvPRjx6BQL8NE5vbo1d");

            // tid-페스티벌Id/DateId/A03,A08,09 이런식으로
            // tid-1-2025-02-20T12:30:00-A03
            const orderId = `tid-${festivalId}-${dateId}-${selectedSeats.join("_")}`;

            tossPayments.requestPayment("카드", {
                orderId,
                amount: totalPrice,
                orderName: "공연 티켓",
                seat:selectedSeats,
                customerName: "고객 이름",
                successUrl: `${
                    window.location.origin
                }/payment/success?orderId=${orderId}&totalPrice=${totalPrice}&seats=${selectedSeats.join(
                    ","
                )}&poster=${encodeURIComponent(poster)}&closed=${false}`,
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
                        <li className="Reservation_Li">
                            <strong>공연명:</strong> {festivalName}
                        </li>
                        <li className="Reservation_Li">
                            <strong>날짜:</strong> {selectedDate}
                        </li>
                        <li className="Reservation_Li">
                            <strong>시간:</strong> {selectedTime}
                        </li>
                        <li className="Reservation_Li">
                            <strong>가격 (1석 기준):</strong> {salePrice.toLocaleString()}원
                        </li>
                    </ul>
                </div>

                <div className="seat-container">
                    <div className="screen">공연 무대</div>
                    {rows.map((row) => (
                        <div key={row} className="seat-row">
                            {Array.from({ length: seatsPerRow }, (_, i) => {
                                const seat = `${row}${(i + 1).toString().padStart(2, "0")}`;
                                const isReserved = reservedSeats.includes(seat);

                                return (
                                    <button
                                        key={seat}
                                        className={`seat ${
                                            isReserved ? "reserved" : selectedSeats.includes(seat) ? "selected" : ""
                                        }`}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={isReserved}
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

                    <button
                        className="reservation-button"
                        disabled={selectedSeats.length === 0}
                        onClick={handlePayment}
                    >
                        예매 완료 (결제)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationWindow;
