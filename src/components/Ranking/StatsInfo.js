import { useState, useEffect } from "react";
import "../../styles/Ranking/StatsInfo.css";

export default function StatsInfo() {
    // 30분 단위로 반올림된 현재 시간 반환
    const getRoundedTime = () => {
        const date = new Date();
        const utc = date.getTime() + date.getTimezoneOffset() * 60000; // UTC 시간 계산
        const gmt8Time = new Date(utc + 8 * 3600000); // GMT+8 시간으로 변환

        let minutes = gmt8Time.getMinutes();
        let roundedMinutes = minutes < 30 ? 30 : 0; // 30분 단위 반올림
        let hours = gmt8Time.getHours();

        if (minutes >= 30 && roundedMinutes === 0) {
            hours += 1; // 30분 이상이면 다음 시간으로 반올림
        }

        // 년.월.일 시간:분 포맷 생성
        const year = gmt8Time.getFullYear();
        const month = String(gmt8Time.getMonth() + 1).padStart(2, "0");
        const day = String(gmt8Time.getDate()).padStart(2, "0");
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(roundedMinutes).padStart(2, "0");

        return `${year}.${month}.${day} ${formattedHours}:${formattedMinutes} 기준`;
    };

    const [currentTime, setCurrentTime] = useState(getRoundedTime());

    useEffect(() => {
        // 1분마다 업데이트하여 시간이 바뀌면 다시 반올림된 시간 계산
        const interval = setInterval(() => {
            setCurrentTime(getRoundedTime());
        }, 60000); // 1분(60000ms)마다 갱신

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    return (
        <article className="StatsInfo_Container">
            <section className="StatsInfo_Wrap">
                <div className="StatsInfo_Date">
                    <div className="StatusInfo_DateTitle">{currentTime}</div>
                    <button className="StatsInfo_i">
                        <img
                            alt="stats-info"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="StatsInfo_Image"
                            src="https://tickets.interpark.com/contents/images/icon/stats-info-icon.svg"
                            referrerPolicy="no-referrer"
                        />
                    </button>
                </div>
                {/* <menu className="StatsInfo_SubWrap">
                    <button className="stats-info_active__26bF6" name="일간">
                        일간
                    </button>
                    <button className="" name="주간">
                        주간
                    </button>
                    <button className="" name="월간">
                        월간
                    </button>
                </menu> */}
            </section>
        </article>
    );
}
