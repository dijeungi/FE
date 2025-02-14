import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ReservationPopup = ({ children, onClose }) => {
    const [container, setContainer] = useState(null);
    const [win, setWin] = useState(null);

    useEffect(() => {
        // 새 창 생성
        const newWindow = window.open("", "_blank", "width=600,height=400");
        const newContainer = document.createElement("div");
        newWindow.document.body.appendChild(newContainer);

        setContainer(newContainer);
        setWin(newWindow);

        // 창이 닫히면 부모 컴포넌트에 알림
        newWindow.onbeforeunload = () => {
            if (onClose) onClose();
        };

        return () => {
            newWindow.close();
        };
    }, []);

    if (!container) return null;

    return ReactDOM.createPortal(children, container);
};

export default ReservationPopup;
