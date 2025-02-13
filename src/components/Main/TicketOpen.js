// src/components/MainTicketOpen.js
import "../../styles/Main/TicketOpen.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTickOpenList } from "../../api/festivalApi";

const TicketOpen = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const data = await getTickOpenList();
                setTickets(data);
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tickets: {error.message}</p>;

    return (
        <section className="ticketOpen_section ticketOpen_notice">
            <div className="ticketOpen_header">
                <h2 className="ticketOpen_title">티켓오픈 🌟</h2>
                <Link to="/" className="ticketOpen_btn_all">
                    전체보기
                </Link>
            </div>

            <Swiper
                className="ticketOpen_swiper type_col5"
                modules={[Autoplay, Pagination]}
                loop={true}
                rewind={true}
                slidesPerView={5}
                spaceBetween={30}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1280: { slidesPerView: 3 },
                    1440: { slidesPerView: 3 },
                    1680: { slidesPerView: 4 },
                    1920: { slidesPerView: 5 },
                    2560: { slidesPerView: 5 },
                }}
            >
                {tickets.map((ticket) => (
                    <SwiperSlide key={ticket.id}>
                        <div className="ticketOpen_imgbox">
                            <img src={ticket.image} alt={ticket.title} className="ticketOpen_item_image" />
                        </div>
                        <div className="ticketOpen_info">
                            <h3 className="ticketOpen_item_title">{ticket.title}</h3>
                            <p className="ticketOpen_item_date">{ticket.date}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TicketOpen;
