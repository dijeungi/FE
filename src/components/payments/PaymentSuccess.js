import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    return (
        <div className="payment-container">
            <h2>🎉 결제가 성공적으로 완료되었습니다!</h2>
            <p><strong>주문번호:</strong> {params.get("orderId")}</p>
            <p><strong>결제 금액:</strong> {params.get("amount")}원</p>
            <p><strong>결제 방식:</strong> {params.get("paymentMethod")}</p>
        </div>
    );
};

export default PaymentSuccess;
