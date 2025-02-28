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
    로맨틱코미디: [
        {
            id: 1,
            title: "뮤지컬 <베르테르> 25주년 공연",
            videoUrl:
                "https://www.youtube.com/embed/tA1ID8J5k0M?autoplay=0&mute=1&controls=0&origin=https%3A%2F%2Ftickets.interpark.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&disablekb=1&enablejsapi=1&widgetid=37",
            imgSrc: "https://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif",
        },
        {
            id: 2,
            title: "뮤지컬 알라딘",
            videoUrl: "https://www.youtube.com/embed/S_l-EPvirwc",
            imgSrc: "http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif",
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
    코믹: [
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
    드라마: [
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
    "공포/스릴러": [
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
    어린이연극: [
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
    기타: [
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const selectedVideos = videoData[selectedCategory] || [];
    const groupedData = [];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    for (let i = 0; i < selectedVideos.length; i += 3) {
        groupedData.push(selectedVideos.slice(i, i + 3));
    }

    useEffect(() => {
        if (swiperInstance) {
            swiperInstance.slideTo(0);
            swiperInstance.update();
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
                            <button
                                key={category}
                                className={`CategoryVideo_Button ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </menu>
                </div>

                {/* CC PLAY */}
                <div className="CCPlay_SwiperWrap">
                    <div className="CCPlay_PlayWrap">
                        {/* Swiper */}
                        <Swiper
                            key={selectedCategory}
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
                            allowTouchMove={false}
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
                                                        src={`${item.videoUrl}?autoplay=0&mute=1&controls=1&loop=1&playsinline=1&modestbranding=1`}
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
                        </Swiper>

                        {/* 네비게이션 버튼 */}
                        <button
                            className="custom-prev"
                            onClick={() => swiperInstance?.slidePrev()}
                            style={{ display: currentIndex === 0 ? "none" : "block" }}
                        ></button>
                        <button
                            className="custom-next"
                            onClick={() => swiperInstance?.slideNext()}
                            style={{ display: currentIndex === groupedData.length - 1 ? "none" : "block" }}
                        ></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryVideo;
