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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading tickets: {error.message}</p>;

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
                {ranking.slice(0, 10).map((item, index) => (
                    <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.id)}>
                        <div className="ticketOpen_imgbox">
                            <img src={item.postImage} alt={item.festivalName} className="ticketOpen_item_image" />
                        </div>
                        <div className="regionRanking_rankingNumber">{index + 1}</div>
                        <div className="ticketOpen_info">
                            <h3 className="ticketOpen_item_title">{item.festivalName}</h3>
                            <p className="ticketOpen_item_date">{`${item.fromDate} ~ ${item.toDate}`}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Ranking;
