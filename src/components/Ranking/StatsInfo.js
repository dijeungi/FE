// src/components/Ranking/StatsInfo.js
import '../../styles/Ranking/StatsInfo.css'

export default function StatsInfo() {

    // 실시간 시간
    const getCurrentTimeInGMT8 = () => {
        const date = new Date();
        const utc = date.getTime() + date.getTimezoneOffset() * 60000; // UTC 시간 계산
        const gmt8Time = new Date(utc - 8 * 3600000); // GMT-8 시간으로 변환

        // 년.월.일 시간:분 포맷 생성
        const year = gmt8Time.getFullYear();
        const month = String(gmt8Time.getMonth() + 1).padStart(2, '0');
        const day = String(gmt8Time.getDate()).padStart(2, '0');
        const hours = String(gmt8Time.getHours()).padStart(2, '0');
        const minutes = String(gmt8Time.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    return (
        <section className="StatsInfo_Container">
            <div className="StatsInfo_Wrap">
                <div className="StatsInfo_Date">2025.02.13 11:30 기준</div>
                <button className="StatsInfo_i">
                    <img alt="stats-info" crossOrigin="anonymous"
                         loading="lazy" decoding="async" data-nimg="fill"
                         className="StatsInfo_Image"
                         src="https://tickets.interpark.com/contents/images/icon/stats-info-icon.svg"/>
                </button>
            </div>
            <menu className="stats-info_subWrap__ji32u">
                <button className="stats-info_active__26bF6" name="일간">일간</button>
                <button className="" name="주간">주간</button>
                <button className="" name="월간">월간</button>
            </menu>
        </section>
    )
}