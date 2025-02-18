// src/components/Main/MiniBanner.js
import "../../styles/Main/MiniBanner.css";
import {Link} from "react-router-dom";

export default function MainPages() {
    return (
        <section className="MiniBanner_Container">
            <ul className="MiniBanner_UL">
                <li>
                    <Link to="https://tickets.interpark.com/goods/22001159">
                        <img
                            alt="연극〈늘근도둑이야기〉" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                            data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            src="https://github.com/user-attachments/assets/4d7c6ea6-d764-4b37-9e84-7615077cf313"/>
                    </Link>
                </li>
                <li>
                    <Link to="https://tickets.interpark.com/goods/25001318">
                        <img
                            alt="호페쉬 쉑터의 ‘꿈의 극장’" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                            data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2502/250207122010_25001318.gif"/>
                    </Link>
                </li>
                <li>
                    <Link to="https://tickets.interpark.com/contents/bridge/25001245">
                        <img
                            alt="2025 화성 시즈닝" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                            data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2502/250207122120_16007528.gif"/>
                    </Link>
                </li>
                <li>
                    <a href="https://tickets.interpark.com/goods/24017198">
                        <img
                            alt="뮤지컬 〈베르테르〉 25주년 공연 일정" crossOrigin="anonymous" fetchpriority="high"
                            decoding="async" data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2412/241213045801_24017198.gif"/>
                    </a>
                </li>
                <li>
                    <Link to="https://tickets.interpark.com/goods/25000716">
                        <img
                            alt="뮤지컬 〈인간탐구생활〉 일정" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                            data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2501/250122123558_25000716.gif"/>
                    </Link>
                </li>
                <li>
                    <Link to="https://tickets.interpark.com/goods/25001114">
                        <img
                            alt="연극 〈지킬 앤 하이드〉 (Jekyll and Hyde) 일정" crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async" data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2501/250122035037_25001114.gif"/>
                    </Link>
                </li>
            </ul>
        </section>
    );
}