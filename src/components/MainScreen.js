import '../styles/MainScreen.css';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import {Autoplay, EffectFade, Navigation, Pagination, Scrollbar} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

export default function MainScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true); // autoplay 상태 관리
    const swiperRef = useRef(null); // Swiper 인스턴스를 참조하기 위한 ref
    const progressCircle = useRef(null);

    const toggleAutoplay = () => {
        if (isPlaying) {
            swiperRef.current.autoplay.stop(); // autoplay 멈추기
        } else {
            swiperRef.current.autoplay.start(); // autoplay 재시작
        }
        setIsPlaying(!isPlaying);
    };

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`; // 숫자 표시를 원하지 않으면 주석 처리
    };

    return (
        <div className="Main_Screen_Container">
            <Swiper
                effect={"fade"}
                modules={[Pagination, Autoplay, Navigation, Scrollbar, EffectFade]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                loop={true}
                spaceBetween={30}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                scrollbar={{ draggable: true }}
                onSlideChange={handleSlideChange}
                onInit={(swiper) => { swiperRef.current = swiper; }} // Swiper 인스턴스를 참조
            >
                <SwiperSlide>
                    <img src="http://tkfile.yes24.com/Upload2/Display/202501/20250131/wel_mv_52326.jpg/dims/quality/70/" alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="http://tkfile.yes24.com/Upload2/Display/202501/20250131/wel_mv_52386.jpg/dims/quality/70/" alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2502/250204094955_25001426.gif" alt="Slide 3" />
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end" onClick={toggleAutoplay}>
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle className="background" cx="24" cy="24" r="20"></circle>
                        <circle className="progress" cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span className="play-pause-icon">
                        {isPlaying ? 'I I' : '▶'}
                    </span>
                </div>
            </Swiper>
        </div>
    );
}
