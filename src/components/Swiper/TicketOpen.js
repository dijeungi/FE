// src/components/Swiper/TicketOpen.js

import React from "react";
import "../../styles/Swiper/TicketOpen.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

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
                {[1, 2, 3, 4].map((item) => (
                    <SwiperSlide key={item}>
                        <div className="h-60 bg-gray-300 flex items-center justify-center">
                            <p>Slide {item}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TicketOpen;
