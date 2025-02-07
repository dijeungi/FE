import '../styles/MainScreen.css';
import {useState, useRef, useCallback, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, EffectFade, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const images = [
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2502/250203091759_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2501/250123112504_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2501/250131042954_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2502/250203101809_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2502/250206090955_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2411/241125051028_24016737.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2501/250124103930_16007528.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2411/241127094407_24017198.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2502/250205012845_24011855.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2501/250109110600_24018317.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2410/241018115721_L0000106.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2411/241119032622_24016831.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2501/250109012728_24018187.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2412/241217020005_24018006.gif",
    "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2411/241128014008_24016349.gif",
];

const paginationImages = [
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/6cc0a00c-4ba5-4865-b462-0f6c05316a9b.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/816ff12a-8306-414f-b1e0-d727275d34e4.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/4bbded56-e950-47ab-8b25-e94f17e4d6ce.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/c02a613b-2254-4be0-8023-ec2a6d36f43c.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2502/e0fccddc-1161-4008-86c9-33c1b3f31e87.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2411/5d284a64-71d5-43ee-b9df-1f2f2fc590d3.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/ea885c72-ff48-417e-ba65-02eb187e83b3.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2411/cc771768-642a-4f4f-a015-a27aef15d126.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2408/a655e874-965a-4caa-b148-2d05c939f209.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/d648761f-5875-4582-bcb3-91cb02109a68.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2410/59da0e0a-1ba3-4565-844f-ce2dbd10ed41.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2411/392ece87-5eaf-4a4d-9b36-9db3a18d2881.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2501/0ee4982e-fc70-43f1-a9f9-c79f62891f8c.jpg",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2412/9105fb44-5704-4e22-b570-2268b1dbd1ba.png",
        link: "/"
    },
    {
        src: "http://ticketimage.interpark.com/TCMS3.0//NMain/BbannerPC/2411/8af4c98c-e2bd-4a45-92bd-087de3a408ac.jpg",
        link: "/"
    },
];

export default function MainScreen() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 슬라이드 인덱스
    const swiperRef = useRef(null);
    const progressCircle = useRef(null);
    const paginationRef = useRef(null);

    const toggleAutoplay = useCallback(() => {
        if (isPlaying) {
            swiperRef.current.autoplay.stop();
        } else {
            swiperRef.current.autoplay.start();
        }
        setIsPlaying(prev => !prev);
    }, [isPlaying]);

    const onAutoplayTimeLeft = useCallback((s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
    }, []);

    // 현재 슬라이드 인덱스 업데이트
    const handleSlideChange = useCallback((swiper) => {
        setActiveIndex(swiper.realIndex);
    }, []);

    // 커스텀 페이지 네이션
    useEffect(() => {
        const paginationItems = paginationRef.current.querySelectorAll('.pagination-item');
        paginationItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                swiperRef.current.slideTo(index);
            });

            item.addEventListener('click', () => {
                window.location.href = paginationImages[index].link;
            });
        });

        return () => {
            paginationItems.forEach(item => {
                item.removeEventListener('mouseenter', () => {});
                item.removeEventListener('click', () => {});
            });
        };
    }, []);


    return (
        <div className="main-screen-container">
            <Swiper
                effect="fade"
                modules={[Autoplay, EffectFade]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSlideChange}
                loop
                spaceBetween={30}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                onInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img src={src} alt={`Slide ${index}`} />
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

                {/* 커스텀 페이지네이션 - 이미지 목록 */}
                <div className="custom-pagination" ref={paginationRef}>
                    {paginationImages.map((img, index) => (
                        <div
                            className={`pagination-item ${index === activeIndex ? 'active' : ''}`}
                            key={index}
                        >
                            <img src={img.src} alt={`Thumbnail ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </Swiper>
        </div>
    );
}