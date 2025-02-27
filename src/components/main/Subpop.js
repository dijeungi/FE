import { useState } from "react";
import "../../styles/main/Subpop.css";
import { Link } from "react-router-dom";

export default function Subpop() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="float-bnr">
            <div className="float-bnrs" id="divCircle">
                <button className="close-btn" onClick={() => setIsVisible(false)}>
                    ✕
                </button>
                <Link
                    to="#"
                    className="float-bnr-btn"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src="http://tkfile.yes24.com/Upload2/Display/202502/20250210/wing_s_tosspay.png/dims/quality/70/"
                        alt="떠있는 배너"
                        className="lazyload"
                    />
                </Link>
                <Link
                    to="/pages/events/HotEvent/PromotionInfo?id=3738&Gcode=009_216"
                    className={`float-bnr-img ${isHovered ? "show" : "hide"}`}
                >
                    <img
                        src="http://tkfile.yes24.com/Upload2/Display/202502/20250210/wing_tosspay.png/dims/quality/70/"
                        alt="프로모션 배너"
                        className="lazyload"
                    />
                </Link>
            </div>
        </div>
    );
}
