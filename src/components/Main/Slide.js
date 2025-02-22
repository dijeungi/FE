import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/Main/TicketOpen.css";

const Slide = ({ data, title, link, isRanking = false }) => {
    const navigate = useNavigate();

    const handleSlideClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <section className={`ticketOpen_section ticketOpen_notice ${isRanking ? "ranking_style" : ""}`}>
            <div className="ticketOpen_header">
                <h2 className="ticketOpen_title">{title}</h2>
                <Link to={link} className="ticketOpen_btn_all">
                    전체보기
                </Link>
            </div>

            <Swiper
                className="ticketOpen_swiper type_col5"
                modules={[Autoplay, Pagination]}
                loop={true}
                rewind={true}
                slidesPerView={5}
                spaceBetween={90}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    1280: { slidesPerView: 4 },
                    1440: { slidesPerView: 5 },
                    1680: { slidesPerView: 5 },
                    1920: { slidesPerView: 5 },
                    2560: { slidesPerView: 5 },
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.id)}>
                        <div className="ticketOpen_imgbox">
                            <img
                                src={item.postImage}
                                alt={item.festivalName}
                                className="ticketOpen_item_image"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        {isRanking && <div className="regionRanking_rankingNumber">{index + 1}</div>}
                        <div className="ticketOpen_info">
                            <h3 className="ticketOpen_item_title">{item.festivalName}</h3>
                            <p className="ticketOpen_item_date">
                                {item.toDate === "9999-12-31"
                                    ? `${item.fromDate} ~ 오픈런`
                                    : `${item.fromDate} ~ ${item.toDate}`}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Slide;
