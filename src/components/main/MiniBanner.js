// src/components/Main/MiniBanner.js
import "../../styles/main/MiniBanner.css";
import { Link } from "react-router-dom";

export default function MainPages() {
    return (
        <section className="MiniBanner_Container">
            <ul className="MiniBanner_UL">
                <li>
                    <Link to="product/1">
                        <img
                            alt="연극〈늘근도둑이야기〉"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_Image"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner1.jpg"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="product/2">
                        <img
                            alt="호페쉬 쉑터의 ‘꿈의 극장’"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner2.jpg"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="product/3">
                        <img
                            alt="2025 화성 시즈닝"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner3.jpg"
                        />
                    </Link>
                </li>
                <li>
                    <a href="product/4">
                        <img
                            alt="뮤지컬 〈베르테르〉 25주년 공연 일정"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner4.jpg"
                        />
                    </a>
                </li>
                <li>
                    <Link to="product/5">
                        <img
                            alt="뮤지컬 〈인간탐구생활〉 일정"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner5.jpg"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="product/6">
                        <img
                            alt="연극 〈지킬 앤 하이드〉 (Jekyll and Hyde) 일정"
                            crossOrigin="anonymous"
                            fetchpriority="high"
                            decoding="async"
                            data-nimg="fill"
                            className="MiniBanner_promotionImage__36e77"
                            // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                            src="https://dijeungi.github.io/imageHosting/images/MiniBanner6.jpg"
                        />
                    </Link>
                </li>
            </ul>
        </section>
    );
}
