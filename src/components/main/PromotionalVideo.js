import "../../styles/main/PromotionalVideo.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const videoData = {
    추천영상: [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    뮤지컬: [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    콘서트: [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    "전시/행사": [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    "클래식/무용": [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    "아동/가족": [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
    연극: [
        {
            id: 1,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 지킬앤하이드",
            videoUrl: "https://www.youtube.com/embed/O0H5cknTcAA",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif",
        },
        {
            id: 3,
            title: "뮤지컬 베르테르",
            videoUrl: "https://www.youtube.com/embed/9SG7eRD_j0M",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 4,
            title: "뮤지컬 여신님이 보고 계셔",
            videoUrl: "https://www.youtube.com/embed/lW5pz6uDIvk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif",
        },
        {
            id: 5,
            title: "뮤지컬 이프덴",
            videoUrl: "https://www.youtube.com/embed/3XGHq6P8wsk",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif",
        },
        {
            id: 6,
            title: "뮤지컬 오지게 재밌는 가시나들",
            videoUrl: "https://www.youtube.com/embed/1hJj2gHh4HU",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif",
        },
    ],
};

const CategoryVideo = () => {
    const [selectedCategory, setSelectedCategory] = useState("추천영상");
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 상태
    const [swiperInstance, setSwiperInstance] = useState(null); // Swiper 인스턴스 저장

    const selectedVideos = videoData[selectedCategory] || [];
    const groupedData = [];

    for (let i = 0; i < selectedVideos.length; i += 3) {
        groupedData.push(selectedVideos.slice(i, i + 3));
    }

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.slideTo(0); // 카테고리 변경 시 첫 번째 슬라이드로 이동
            setCurrentIndex(0);
        }
    }, [selectedCategory, swiperInstance]);

    return (
        <section className="CategoryVideo_Container">
            <h2 className="CategoryVideo_Title">CC PLAY</h2>
            <div className="CategoryVideo_Section">
                <div role="presentation" className="CategoryVideo_Category">
                    <menu className="CategoryVideo_Menu">
                        {Object.keys(videoData).map((category) => (
                            <div key={category} className="CategoryVideo__Wrapper">
                                <button
                                    className={`CategoryVideo_Button ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            </div>
                        ))}
                    </menu>
                </div>
                <div className="interpark-play_swiperWrap">
                    <Swiper
                        className="interpark-play_wrap swiper-backface-hidden swiper-pointer-events"
                        modules={[Pagination, Navigation]}
                        loop={false}
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation={{
                            prevEl: ".custom-prev",
                            nextEl: ".custom-next",
                        }}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    >
                        {groupedData.map((group, index) => (
                            <SwiperSlide key={index} className="swiper-slide">
                                <div className="slide-group" style={{ display: "flex" }}>
                                    {group.map((item) => (
                                        <div key={item.id} className="Slide_Item">
                                            <div className="Video_Container">
                                                <iframe
                                                    width="100%"
                                                    height="200px"
                                                    src={`${item.videoUrl}?autoplay=0&mute=1&controls=0`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="Video_Info_Container">
                                                <img src={item.imgSrc} alt={item.title} />
                                                <div className="Video_Info_Text">{item.title}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                        <button
                            className="custom-prev"
                            onClick={() => swiperInstance?.slidePrev()}
                            style={{ display: currentIndex === 0 ? "none" : "block" }}
                        >
                            ←
                        </button>

                        {/* 오른쪽 버튼 */}
                        <button
                            className="custom-next"
                            onClick={() => swiperInstance?.slideNext()}
                            style={{ display: currentIndex === groupedData.length - 1 ? "none" : "block" }}
                        >
                            →
                        </button>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CategoryVideo;
