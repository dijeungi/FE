// src/components/Main/Category.js

import "../../styles/Main/Category.css";
import {useNavigate} from "react-router-dom";

export default function MainPages() {

    // const navigate = useNavigate();

    return (
        <article className="category_panel_wrap">
            <section className="category_panel_subWrap">
                <div className="category_panel_contents">
                    <div className="category_miniBanner">

                        <ul className="category_miniBannerInner">
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/goods/22001159"><img
                                alt="연극〈늘근도둑이야기〉" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                                data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2502/250207121803_22001159.gif"/></a>
                            </li>
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/goods/25001318"><img
                                alt="호페쉬 쉑터의 ‘꿈의 극장’" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                                data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2502/250207122010_25001318.gif"/></a>
                            </li>
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/contents/bridge/25001245"><img
                                alt="2025 화성 시즈닝" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                                data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2502/250207122120_16007528.gif"/></a>
                            </li>
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/goods/24017198"><img
                                alt="뮤지컬 〈베르테르〉 25주년 공연 일정" crossOrigin="anonymous" fetchpriority="high"
                                decoding="async" data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2412/241213045801_24017198.gif"/></a>
                            </li>
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/goods/25000716"><img
                                alt="뮤지컬 〈인간탐구생활〉 일정" crossOrigin="anonymous" fetchpriority="high" decoding="async"
                                data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2501/250122123558_25000716.gif"/></a>
                            </li>
                            <li className=""><a className="Ticket_Minibanner_PC"
                                                href="https://tickets.interpark.com/goods/25001114"><img
                                alt="연극 〈지킬 앤 하이드〉 (Jekyll and Hyde) 일정" crossOrigin="anonymous" fetchpriority="high"
                                decoding="async" data-nimg="fill" className="MiniBanner_promotionImage__36e77"
                                // style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="https://ticketimage.interpark.com/TCMS3.0/NMain/MiniBanner/2501/250122035037_25001114.gif"/></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </section>
        </article>
    );
}