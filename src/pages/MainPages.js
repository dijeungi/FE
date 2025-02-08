// src/pages/MainPages.js

import "../styles/Main/MainPages.css";
import {useNavigate} from "react-router-dom";

import TicketOpen from "../components/Swiper/TicketOpen";
import MainBanner from "../components/MainBanner";

const categories = [
    { name: "로맨틱코미디", image: "https://cdn.newstnt.com/news/photo/202403/349300_361294_1344.jpg", link: "/category1" },
    { name: "드라마", image: "https://timeticket.co.kr/wys2/file_attach_thumb/2024/11/25/1732500018-95-3_wonbon_N_7_255x357_70_2.jpg", link: "/category1" },
    { name: "코믹", image: "https://timeticket.co.kr/wys2/file_attach_thumb/2024/07/25/1721891319-59-3_wonbon_N_7_255x357_70_2.jpg", link: "/category1" },
    { name: "공포", image: "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621557313-62-0_wonbon_N_7_255x357_70_2.jpg", link: "/category1" },
    { name: "어린이연극", image: "https://timeticket.co.kr/wys2/file_attach_thumb/2025/01/10/1736496363-74-3_wonbon_N_7_255x357_70_2.jpg", link: "/category1" },
    { name: "기타", image: "https://timeticket.co.kr/wys2/file_attach_thumb/2021/05/21/1621549384-67-0_wonbon_N_7_255x357_70_2.jpg", link: "/category1" },
]


export default function MainPages() {

    const navigate = useNavigate();

    return (
        <div className="mainpage_container">
            <MainBanner />

            <div className="category_bar">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category_item"
                        onClick={() => navigate(category.link)}
                        style={{ backgroundImage: `url(${category.image})` }}
                    >
                        <div className="category_overlay"></div>
                        <span className="category_text">{category.name}</span>
                    </div>
                ))}
            </div>

            <TicketOpen/>

        </div>
    );
}
