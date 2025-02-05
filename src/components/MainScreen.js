import '../styles/MainScreen.css';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MainScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setCurrentIndex(swiper.activeIndex);
    };

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className="Main_Screen_Container">
            <Swiper
                modules={[Pagination, Autoplay, Navigation, Scrollbar]}
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
            >
                <SwiperSlide>
                    <img src="http://tkfile.yes24.com/Upload2/Display/202501/20250131/wel_mv_52326.jpg/dims/quality/70/" alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="http://tkfile.yes24.com/Upload2/Display/202501/20250131/wel_mv_52386.jpg/dims/quality/70/" alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="http://tkfile.yes24.com/Upload2/Display/202501/20250121/wel_mv_52272_1.jpg/dims/quality/70/" alt="Slide 3" />
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
}
