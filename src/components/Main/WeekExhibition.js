// src/components/Main/WeekExhibition.js
import "../../styles/Main/WeekExhibition.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation, Autoplay} from "swiper/modules";
import {Link} from "react-router-dom";

const tickets = [
    {
        id: 1,
        image: "//image.toast.com/aaaaab/ticketlink/TKL_9/M(2)(1).jpg",
        title: "뮤지컬 <미아 파밀리아>",
        date: "02.10(월) 11:00"
    },
    {
        id: 2,
        image: "//image.toast.com/aaaaab/ticketlink/TKL_3/IMG_8725.jpeg",
        title: "[대구] 2025 김장훈 전국투어",
        date: "02.11(화) 11:00"
    },
    {
        id: 3,
        image: "//image.toast.com/aaaaab/ticketlink/TKL_3/2025_VANISHING_POSTER_ORIGINAL(1).jpg",
        title: "뮤지컬 <배니싱> 3차 티켓 오픈",
        date: "02.14(금) 14:00"
    },
    {
        id: 4,
        image: "https://image.toast.com/aaaaab/ticketlink/TKL_2/%EC%84%B1%EB%82%A8.jpg",
        title: "<3월의 봄> 정훈희 x 송창식 with 함춘호 콘서트",
        date: "02.27(목) 20:00"
    },
    {
        id: 5,
        image: "https://image.toast.com/aaaaab/ticketlink/TKL_8/s0206.jpg",
        title: "공룡애니멀쇼",
        date: "02.12(수) 09:00"
    },
    {
        id: 6,
        image: "https://image.toast.com/aaaaab/ticketlink/TKL_6/j_0206.jpg",
        title: "[광주] 잠골버스&순순희 화이트데이 콘서트",
        date: "02.10(월) 18:00"
    }
];

const WeekExhibition = () => {
    return (
        <section className="weekExhibition_section weekExhibition_notice">
            <div className="weekExhibition_header">
                <h2 className="weekExhibition_title">이번주 전시 📆 | 수정필요</h2>
                <Link to="/" className="weekExhibition_btn_all">전체보기</Link>
            </div>

            <Swiper
                className="weekExhibition_swiper type_col5"
                modules={[Autoplay, Pagination]}
                loop={true}
                rewind={true}
                slidesPreView={3}
                spaceBetween={30}

                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1280: {
                        slidesPerView: 3,
                    },
                    1440: {
                        slidesPerView: 3,
                    },
                    1680: {
                        slidesPerView: 4,
                    },
                    1920: {
                        slidesPerView: 5,
                    },
                    2560: {
                        slidesPerView: 5,
                    },
                }}
            >
                {tickets.map((ticket, index) => (
                    <SwiperSlide key={ticket.id}>
                        <div className="weekExhibition_imgbox">
                            <img src={ticket.image} alt={ticket.title} className="weekExhibition_item_image"/>
                        </div>
                        <div className="weekExhibition_info">
                            <h3 className="weekExhibition_item_title">{ticket.title}</h3>
                            <p className="weekExhibition_item_date">{ticket.date}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default WeekExhibition;
