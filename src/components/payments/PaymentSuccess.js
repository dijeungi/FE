import { useEffect } from "react";
import axios from "axios";

const PaymentSuccess = ({ orderId, customerPhone }) => {
    useEffect(() => {
        const sendSMS = async () => {
            try {
                const response = await axios.post("https://api.coolsms.co.kr/sms/2/send", {
                    api_key: "NCSDPEI5IS9E676W",  // ✅ CoolSMS API Key 입력
                    api_secret: "AVAF0C5ASHV7W7X2THWCZ6IFXWFRUBFV", // ✅ CoolSMS API Secret 입력
                    to: customerPhone, // 📩 고객의 전화번호
                    from: "01053577933", // ✅ 발신번호 등록 필요
                    text: `[Sweethome] 주문 ${orderId} 결제가 완료되었습니다. 감사합니다!`,
                });

                console.log("SMS 전송 성공:", response.data);
            } catch (error) {
                console.error("SMS 전송 실패:", error);
            }
        };

        sendSMS();
    }, [orderId, customerPhone]);

    return (
        <div>
            <h1>✅ 결제가 완료되었습니다!</h1>
            <p>주문번호: {orderId}</p>
            <p>📩 고객님께 결제 완료 문자가 발송되었습니다.</p>
        </div>
    );
};

export default PaymentSuccess;
