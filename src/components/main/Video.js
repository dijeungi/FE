import "../../styles/main/Video.css";
import { useState, useRef } from "react";

export default function Video() {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);

    const handlePlayVideo = (e) => {
        e.preventDefault(); // 기본 동작 방지
        setIsPlaying(true); // 영상 표시
        setTimeout(() => {
            iframeRef.current.src += "&autoplay=1"; // 자동 재생을 위해 autoplay 파라미터 추가
        }, 100); // 약간의 딜레이를 줘서 iframe이 렌더링된 후 autoplay 추가
    };

    return (
        <div className="video" style={{ background: "black", height: "560px", width: "100%" }}>
            <div className="video_wrap" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div className="video_txt">
                    <p className="video_tit">
                        <span>
                            <img src="http://tkfile.yes24.com/imgNew/main/tit8.png" alt="" />
                        </span>
                    </p>
                    <p className="video_tit2">
                        <a href="/Perf/51288?Gcode=009_212">
                            연극
                            <br />
                            톡톡
                        </a>
                    </p>
                    <p className="video_detail">
                        <a href="/Perf/51288?Gcode=009_212">
                            다시 돌아온 <br /> 6명 강박환자들의 좌충우돌 그룹치료!
                        </a>
                    </p>
                </div>

                <div className="video_con" style={{ textAlign: "center" }}>
                    {isPlaying ? (
                        <iframe
                            ref={iframeRef}
                            id="playerFocusOn"
                            className="video_con_movie"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="YouTube video player"
                            width="640"
                            height="360"
                            src="https://www.youtube.com/embed/oOIOxysu0Vg?enablejsapi=1&origin=http://ticket.yes24.com"
                        ></iframe>
                    ) : (
                        <div className="video_con_img">
                            <a href="#" onClick={handlePlayVideo}>
                                <img
                                    src="http://tkfile.yes24.com/Upload2/Display/202501/20250117/dd.jpg/dims/quality/70/"
                                    alt="Play Video"
                                    style={{ width: "640px", height: "360px" }}
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
