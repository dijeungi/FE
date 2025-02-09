// src/components/MainBanner.js

import '../../styles/Main/MainBanner.css';
import {useState, useRef, useCallback, useEffect} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

// 슬라이드 배너
const images = [
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_7/PC_BigBanner_2%EC%9B%94%EB%A7%81%ED%81%AC%ED%94%BD.jpg",
        backgroundColor: "rgb(255, 202, 220)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_1/PC_BigBanner_2025SoundberryTheater.jpg",
        backgroundColor: "rgb(245, 235, 208)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_10/PC_BigBanner_%EC%A7%80%ED%82%AC%EC%95%A4%ED%95%98%EC%9D%B4%EB%93%9C.jpg",
        backgroundColor: "rgb(5, 6, 20)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_8/PC_BigBanner_%EB%82%98%EC%83%81%ED%98%84%EC%94%A8%EB%B0%B4%EB%93%9C.jpg",
        backgroundColor: "rgb(242, 242, 242)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_9/PC_BigBanner_%EC%84%B1%EC%9B%85.jpg",
        backgroundColor: "rgb(18, 18, 18)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_10/PC_BigBanner_%EC%97%B0%EA%B7%B9%EA%BD%83%EC%9D%98%EB%B9%84%EB%B0%80_0107.jpg",
        backgroundColor: "rgb(255, 236, 56)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_4/PC_BigBanner_%EC%96%B4%EC%8D%B8%EB%B6%80%EC%82%B0.jpg",
        backgroundColor: "rgb(6, 10, 16)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_1/PC_BigBanner_%EB%AA%85%EC%84%B1%ED%99%A9%ED%9B%84(1).jpg",
        backgroundColor: "rgb(143, 24, 35)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_5/PC_BigBanner_%EB%B9%84%EC%97%94%EB%82%981900.jpg",
        backgroundColor: "rgb(212, 211, 207)"
    },
    {
        src: "https://image.toast.com/aaaaab/ticketlink/TKL_4/PC_BigBanner_%EC%84%9C%EC%9A%B8%EC%BB%A4%ED%94%BC%EC%97%91%EC%8A%A4%ED%8F%AC.jpg",
        backgroundColor: "rgb(252, 247, 243)"
    }
];

// 커스텀 페이지네이션 이미지
const paginationImages = [
    "//image.toast.com/aaaaab/ticketlink/TKL_4/PC_썸네일_2월링크픽.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_2/thumbnail_pc_2025SoundberryTheater.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_5/thumbnail_pc_지킬앤하이드(1).jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_2/thumbnail_pc_나상현씨밴드.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_4/thumbnail_pc_성웅.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_10/thumbnail_pc_연극꽃의비밀_0107(1).jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_3/thumbnail_pc_어썸부산.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_9/thumbnail_pc_명성황후(1).jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_4/thumbnail_pc_비엔나1900.jpg",
    "//image.toast.com/aaaaab/ticketlink/TKL_1/thumbnail_pc_서울커피엑스포.jpg",
];

export default function MainBanner() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const progressCircle = useRef(null);
    const paginationRef = useRef(null);

    // 자동 재생 기능을 토글하는 함수
    const toggleAutoplay = useCallback(() => {
        if (isPlaying) {
            swiperRef.current.autoplay.stop();
        } else {
            swiperRef.current.autoplay.start();
        }
        setIsPlaying(prev => !prev);
    }, [isPlaying]);

    // 자동 재생 시간 표시 업데이트 함수
    const onAutoplayTimeLeft = useCallback((s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
    }, []);

    // 슬라이드 변경 시 현재 슬라이드 인덱스 업데이트
    const handleSlideChange = useCallback((swiper) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    // 커스텀 페이지 네이션 설정
    useEffect(() => {
        if (!paginationRef.current) return;

        const paginationItems = paginationRef.current.querySelectorAll('.pagination-item');

        paginationItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (swiperRef.current) {
                    swiperRef.current.autoplay.stop();
                    swiperRef.current.params.speed = 0;
                    swiperRef.current.slideTo(index, 500, false);
                    setActiveIndex(index);
                    setTimeout(() => {
                        swiperRef.current.params.speed = 500;
                    }, 50);
                }
            });

            item.addEventListener('mouseleave', () => {
                if (swiperRef.current) {
                    swiperRef.current.autoplay.start();
                }
            });

            item.addEventListener('click', () => {
                window.location.href = paginationImages[index];
            });
        });

        return () => {
            paginationItems.forEach(item => {
                item.removeEventListener('mouseenter', () => {
                });
                item.removeEventListener('mouseleave', () => {
                });
                item.removeEventListener('click', () => {
                });
            });
        };
    }, []);

    return (
        <Swiper
            effect="fade"
            modules={[Autoplay, EffectFade]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={handleSlideChange}
            loop={true}
            spaceBetween={30}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            onInit={(swiper) => (swiperRef.current = swiper)}
            className="hero_banner"
        >
            {images.map((item, index) => (
                <SwiperSlide key={index}>
                    <a href="https://www.ticketlink.co.kr/product/54441" className="hero_banner_link">
                        <div
                            className="hero_banner_wrap"
                            style={{
                                background: `${item.backgroundColor}`
                            }}

                        >
                            <div className="hero_banner_imgbox">
                                <img
                                    src={item.src}
                                    alt={`Slide ${index}`}
                                    className="hero_banner_img"
                                />
                            </div>
                        </div>
                    </a>
                </SwiperSlide>
            ))}



            <div className="autoplay-progress" slot="container-end" onClick={toggleAutoplay}>
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle className="background" cx="24" cy="24" r="20"></circle>
                    <circle className="progress" cx="24" cy="24" r="20"></circle>
                </svg>
                <span className="play-pause-icon">
                        {isPlaying ? 'I I' : '▶'}
                    </span>
            </div>

            <div className="mainbaner_banner_pagination" ref={paginationRef}>
                {paginationImages.map((img, index) => (
                    <div
                        className={`mainbaner_banner_pagination_item ${index === activeIndex ? 'active' : ''}`}
                        key={index}
                    >
                        <img src={img} alt={`Thumbnail ${index + 1}`}/>
                    </div>
                ))}
            </div>

        </Swiper>
    );
}
