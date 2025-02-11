// src/components/Pop.js
import '../styles/Components/Pop.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // React Router 사용

export default function Pop() {
    const [showPopup, setShowPopup] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const popupStatus = localStorage.getItem('hidePopup');
        if (!popupStatus || new Date().getTime() > parseInt(popupStatus)) {
            setShowPopup(true);
        }
    }, []);

    const closeMainPopup = () => {
        setShowPopup(false);
    };

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    const applyHidePopup = () => {
        if (isChecked) {
            const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 하루 뒤 시간 설정
            localStorage.setItem('hidePopup', expireTime.toString());
        }
        closeMainPopup();
    };

    return (
        showPopup && (
            <div className="pop">
                <div className="pop_wrap">
                    <div className="pop_left">
                        <ul>
                            <li>
                                <Link to="/Perf/52554?Gcode=009_217_001" title="도쿄卍리벤저스展 (3.29~6.29 기간 내 자유관람)">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250205/20250205-52554.jpg/dims/quality/70/"
                                        alt="도쿄卍리벤저스展 (3.29~6.29 기간 내 자유관람)"
                                    />
                                    <div>
                                        <p>도쿄卍리벤저스展</p>
                                        <p>2. 10.(월) 10시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52586?Gcode=009_217_001" title="2025 푸에르자 부르타 〈아벤〉 - 서울">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250206/20250206-52586.jpg/dims/quality/70/"
                                        alt="2025 푸에르자 부르타 〈아벤〉 - 서울"
                                    />
                                    <div>
                                        <p>푸에르자부르타 - 아벤</p>
                                        <p>2. 10.(월) 11시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52336?Gcode=009_217_001" title="2025 JUNGWOO B-day PARTY [CANDY FACTORY]">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202501/20250131/20250131-52336_1.jpg/dims/quality/70/"
                                        alt="2025 JUNGWOO B-day PARTY [CANDY FACTORY]"
                                    />
                                    <div>
                                        <p>JUNGWOO B-day</p>
                                        <p>2. 10.(월) 14시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52615?Gcode=009_217_001" title="뮤지컬 [니진스키]">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250206/20250206-52615.jpg/dims/quality/70/"
                                        alt="뮤지컬 [니진스키]"
                                    />
                                    <div>
                                        <p>뮤지컬 니진스키</p>
                                        <p>2. 10.(월) 14시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/New/Genre/GenreBridge.aspx?genre=15459&amp;id=1289&amp;Gcode=009_217_001" title="김해문화의전당 2025 상반기">
                                    <img
                                        src="http://tkfile.yes24.com/Upload2/Display/202502/20250210/패키지-포스터(yes-용).jpg/dims/quality/70/"
                                        alt="김해문화의전당 2025 상반기"
                                    />
                                    <div>
                                        <p>김해문화의전당 25시즌</p>
                                        <p>2. 10.(월) 14시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52620?Gcode=009_217_001" title="체리블라썸 뮤직페스티벌">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250208/20250208-52620.jpg/dims/quality/70/"
                                        alt="체리블라썸 뮤직페스티벌"
                                    />
                                    <div>
                                        <p>체리블라썸 뮤직페스티벌</p>
                                        <p>2. 10.(월) 14시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/New/Genre/GenreBridge.aspx?genre=15456&amp;id=1294&amp;Gcode=009_217_001" title="[서울] 오월오일 전국 클럽 투어 〈Harvest Days〉">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250206/20250206-52594.jpg/dims/quality/70/"
                                        alt="[서울] 오월오일 전국 클럽 투어 〈Harvest Days〉"
                                    />
                                    <div>
                                        <p>오월오일 전국 클럽 투어</p>
                                        <p>전국투어 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52393?Gcode=009_217_001" title="2025 HIGHLIGHT FAN CON [WELCOME TO THE HIGH-MART]">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250203/20250203-52393.jpg/dims/quality/70/"
                                        alt="2025 HIGHLIGHT FAN CON [WELCOME TO THE HIGH-MART]"
                                    />
                                    <div>
                                        <p>HIGHLIGHT FAN CON</p>
                                        <p>2. 10.(월) 20시 티켓오픈</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Perf/52338?Gcode=009_217_001" title="2025 JISUNG B-day PARTY [FM 2.05 Mhz 〈Happy JISUN]">
                                    <img
                                        src="http://tkfile.yes24.com/upload2/perfblog/202502/20250203/20250203-52338.jpg/dims/quality/70/"
                                        alt="2025 JISUNG B-day PARTY [FM 2.05 Mhz 〈Happy JISUN]"
                                    />
                                    <div>
                                        <p>JISUNG B-day</p>
                                        <p>2. 10.(월) 20시 선예매</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pop_right" style={{ display: 'none' }}></div>
                </div>
                <div className="pop_bottom">
                    <input type="checkbox" id="chkToday" checked={isChecked} onChange={handleCheckboxClick} />
                    <label htmlFor="chkToday">오늘 그만보기</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); applyHidePopup(); }}>닫기</a>
                </div>
            </div>
        )
    );
}
