import "../../styles/Main/PromotionalVideo.css";
// import "../../styles/1.css";
// import "../../styles/2.css";
// import "../../styles/3.css";

import {Swiper, SwiperSlide} from "swiper/react";
import React, {useState, useRef} from "react";
import {Autoplay, Pagination} from "swiper/modules";

const fakeData = [
    {
        id: 1,
        title: '뮤지컬 알라딘',
        videoUrl: 'https://www.youtube.com/embed/cE3u0EoUWyw',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24012498_p.gif'
    },
    {
        id: 2,
        title: '뮤지컬 지킬앤하이드',
        videoUrl: 'https://www.youtube.com/embed/dXOG9DuZDG8',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24013928_p.gif'
    },
    {
        id: 3,
        title: '뮤지컬 베르테르',
        videoUrl: 'https://www.youtube.com/embed/aDXK3sbzmJ4',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24017198_p.gif'
    },
    {
        id: 4,
        title: '뮤지컬 여신님이 보고 계셔',
        videoUrl: 'https://www.youtube.com/embed/lW5pz6uDIvk',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24014618_p.gif'
    },
    {
        id: 5,
        title: '뮤지컬 이프덴',
        videoUrl: 'https://www.youtube.com/embed/3XGHq6P8wsk',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24014511_p.gif'
    },
    {
        id: 6,
        title: '뮤지컬 오지게 재밌는 가시나들',
        videoUrl: 'https://www.youtube.com/embed/1hJj2gHh4HU',
        imgSrc: 'http://ticketimage.interpark.com/Play/image/large/24/24017978_p.gif'
    }
];

const CategoryVideo = () => {

    const groupedData = [];
    for (let i = 0; i < fakeData.length; i += 3) {
        groupedData.push(fakeData.slice(i, i + 3));
    }

    return (
        <section className="CategoryVideo_Container">
            <h2 className="CategoryVideo_Title">CC PLAY</h2>
            <div className="CategoryVideo_Section">
                <div role="presentation" className="CategoryVideo_Category">
                    <menu className="CategoryVideo_Menu">
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="추천영상" title="선택됨">추천영상</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="뮤지컬" title="">뮤지컬</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="콘서트" title="">콘서트</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="전시/행사" title="">전시/행사</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="클래식/무용" title="">클래식/무용</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="아동/가족" title="">아동/가족</button>
                        </div>
                        <div className="CategoryVideo__Wrapper">
                            <button className="CategoryVideo_Button" name="연극" title="">연극</button>
                        </div>
                    </menu>
                </div>
                <div className="interpark-play_swiperWrap__jYOxg">
                    <Swiper
                        className="interpark-play_wrap__rk2iu swiper-backface-hidden swiper-pointer-events"
                        modules={[Pagination]}
                        loop={true}
                        rewind={true}
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                    >
                        {groupedData.map((group, index) => (
                            <SwiperSlide key={index} className="swiper-slide interpark-play_subWrap__JD4Ko swiper-slide-active">
                                <div className="slide-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {group.map(item => (
                                        <div key={item.id} className="slide-item" style={{width: '32%'}}>
                                            <div className="video-container">
                                                <iframe
                                                    width="100%"
                                                    height="200"
                                                    src={item.videoUrl}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="title">{item.title}</div>
                                            <img src={item.imgSrc} alt={item.title}
                                                 style={{width: '100%', height: '150px'}}/>
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default CategoryVideo;