import React from "react";
import "../../styles/Main/TicketOpen.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const tickets = [
    {
        id: 1,
        image: "https://via.placeholder.com/200x300", // 임시 이미지 URL
        title: "뮤지컬 <미아 파밀리아>",
        date: "02.10(월) 11:00"
    },
    {
        id: 2,
        image: "https://via.placeholder.com/200x300",
        title: "[대구] 2025 김장훈 전국투어",
        date: "02.11(화) 11:00"
    },
    {
        id: 3,
        image: "https://via.placeholder.com/200x300",
        title: "뮤지컬 <배니싱> 3차 티켓 오픈",
        date: "02.14(금) 14:00"
    },
    {
        id: 4,
        image: "https://via.placeholder.com/200x300",
        title: "[단독판매] 2025 Guns N' Roses",
        date: "02.27(목) 20:00"
    }
];

const TicketOpen = () => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">티켓 오픈</h2>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {tickets.map((ticket) => (
                    <SwiperSlide key={ticket.id}>
                        <div className="ticket-card">
                            <img src={ticket.image} alt={ticket.title} className="ticket-image" />
                            <div className="ticket-info">
                                <h3 className="ticket-title">{ticket.title}</h3>
                                <p className="ticket-date">{ticket.date}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TicketOpen;
