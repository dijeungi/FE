import React, {useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import {addSeatTickets} from "../../api/TicketApi";

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
                addSeatTickets(requestBody);
            }
        }
    }, []);
};

export default PaymentSuccess;
