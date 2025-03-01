import "swiper/css";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/main/TicketOpen.css";

const Slide = ({ data, title, link }) => {
    const navigate = useNavigate();

    const handleSlideClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <section className="ticketOpen_section ticketOpen_notice">
            <div className="ticketOpen_header">
                <h2 className="ticketOpen_title">{title}</h2>
                <Link to={link} className="ticketOpen_btn_all">
                    {/*전체보기*/}
                </Link>
            </div>

            <Swiper
                className="ticketOpen_swiper type_col5"
                modules={[Autoplay, Grid]}
                loop={false}
                slidesPerView={4}
                grid={{ rows: 2, fill: "row" }}
                spaceBetween={20}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1280: { slidesPerView: 3, grid: { rows: 2, fill: "row" } },
                    1440: { slidesPerView: 4, grid: { rows: 2, fill: "row" } },
                    1680: { slidesPerView: 4, grid: { rows: 2, fill: "row" } },
                    1920: { slidesPerView: 4, grid: { rows: 10, fill: "row" } },
                    2560: { slidesPerView: 5, grid: { rows: 2, fill: "row" } },
                }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.id)}>
                        <div className="ticketOpen_imgbox">
                            <img
                                src={item.postImage}
                                alt={item.festivalName}
                                className="ticketOpen_item_image"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
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
