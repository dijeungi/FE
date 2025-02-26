import { Link } from "react-router-dom";
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
        <div className="Focuson">
            <div className="Focuson_Wrap">
                <div className="Focus_txt">
                    <p className="Focus_Tit_Top">
                        <span>
                            <img
                                src="http://tkfile.yes24.com/imgNew/main/tit8.png"
                                className="Focus_Tit_Link"
                                alt="title"
                            />
                        </span>
                    </p>
                    <div className="Focus_Tit_Middle">
                        <Link to="/">
                            <span className="Focus_Tit_Middle_a1">
                                연극
                                <br />
                                톡톡
                            </span>
                        </Link>
                    </div>
                    <div className="Focus_Tit_Bottom">
                        <Link to="/">
                            <span className="Focus_Tit_Bottom_a2">
                                다시 돌아온 6명 강박환자들의
                                <br />
                                좌충우돌 그룹치료 !
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="Focus_Con">
                    {isPlaying ? (
                        <iframe
                            id="playerFocusOn"
                            className="Focus_Con_Movie"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="YouTube video player"
                            width="640"
                            height="360"
                            ref={iframeRef}
                            src="https://www.youtube.com/embed/oOIOxysu0Vg?enablejsapi=1&origin=http://ticket.yes24.com"
                        ></iframe>
                    ) : (
                        <div className="Focus_Con_Img">
                            <a href="#" onClick={handlePlayVideo} style={{ display: "block", position: "relative" }}>
                                <img
                                    src="http://tkfile.yes24.com/Upload2/Display/202501/20250117/dd.jpg/dims/quality/70/"
                                    alt="뮤지컬 알라딘"
                                    className="Focus_Lazyload"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
