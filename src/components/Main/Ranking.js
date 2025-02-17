import "../../styles/Main/RegionRanking.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRankingList } from "../../api/festivalApi";

const Ranking = () => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                setLoading(true);
                const data = await getRankingList();
                setRanking(data);
            } catch (err) {
                console.error("Error fetching RankingList:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    if (loading) return <p>서버와 통신 중..</p>;
    if (error) return <p>티켓 판매순위: {error.message}</p>;

    const handleSlideClick = (festivalId) => {
        navigate(`/infodetail/${festivalId}`);
    };

    return (
        <section className="ticketOpen_section ticketOpen_notice">
            <div className="ticketOpen_header">
                <h2 className="ticketOpen_title">인기순위 🌟</h2>
                <Link to="/" className="ticketOpen_btn_all">전체보기</Link>
            </div>

            <Swiper
                className="ticketOpen_swiper type_col5"
                modules={[Autoplay, Pagination]}
                loop={true}
                rewind={true}
                slidesPerView={5}
                spaceBetween={30}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1440: { slidesPerView: 5 },
                    1680: { slidesPerView: 5 },
                    1920: { slidesPerView: 5 },
                    2560: { slidesPerView: 5 },
                }}
            >
                {ranking.slice(0, 10).map((item, index) => (
                    <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.id)}>
                        <div className="ticketOpen_imgbox">
                            <img
                                src={item.postImage}
                                alt={item.festivalName}
                                className="ticketOpen_item_image"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <div className="regionRanking_rankingNumber">{index + 1}</div>
                        <div className="ticketOpen_info">
                            <h3 className="ticketOpen_item_title">{item.festivalName}</h3>
                            <p className="ticketOpen_item_date">
                                {item.toDate === '9999-12-31' ? `${item.fromDate} ~ 오픈런` : `${item.fromDate} ~ ${item.toDate}`}
                            </p>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Ranking;
