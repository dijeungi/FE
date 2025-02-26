// src/components/main/SubBanner.js
import "../../styles/main/SubBanner.css";

import { Link } from "react-router-dom";

export default function SubBanner() {
    return (
        <section className="subBanner_container">
            <Link to="https://www.ticketlink.co.kr/planning-event/408004fe-85c3-475a-a236-7ac08324a7ca?isAgreed=true">
                <img
                    src="https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_db76304ad7a14f7f9323cec62c2fb963/ticketlink-cdn-origin/tl/banner/bc_vip/MiddleLineBanner_bcvip.png"
                    alt="서브 배너 이미지"
                />
            </Link>
        </section>
    );
}
