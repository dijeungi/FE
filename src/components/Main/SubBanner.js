// src/components/Main/SubBanner.js
import "../../styles/Main/SubBanner.css";

import {Link} from "react-router-dom";

export default function SubBanner() {
    return (
        <div className="subBanner_container">
            <Link to="/">
                <img
                    src="https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_db76304ad7a14f7f9323cec62c2fb963/ticketlink-cdn-origin/tl/banner/bc_vip/MiddleLineBanner_bcvip.png"
                    alt="서브 배너 이미지"
                />
            </Link>
        </div>
    );
}
