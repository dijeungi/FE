import { useEffect, useState } from "react";

import "../../styles/Ranking/RankingList.css";

import QueryStatsIcon from "@mui/icons-material/QueryStats";

const RankingList = ({ rankings }) => {
    const [ranking, setRanking] = useState(rankings);

    // 예매율을 순위에 맞춰서 배분하는 함수
    const generateRankingBookingPercent = (totalItems) => {
        let remainingPercent = 100;
        let bookingPercentages = [];

        // 1등은 가장 높은 예매율 (예: 11.4%)
        const highestPercent = 11.4; // 1등 예매율
        bookingPercentages.push(highestPercent);
        remainingPercent -= highestPercent;

        // 2등부터 50등까지 예매율을 점차적으로 낮추는 방식
        const baseDecrement = 0.2; // 예매율을 줄여주는 기본 차이 (단위: %)
        const minPercent = 0.5; // 예매율의 최소 값 (0% 대신 최소 0.5% 이상으로 설정)

        for (let i = 1; i < totalItems - 1; i++) {
            let percentForThisRank = Math.max(highestPercent - baseDecrement * i, minPercent);
            bookingPercentages.push(parseFloat(percentForThisRank.toFixed(1)));
            remainingPercent -= percentForThisRank;
        }

        // 남은 예매율을 마지막 항목에 할당
        bookingPercentages.push(parseFloat(remainingPercent.toFixed(1)));

        // 만약 남은 예매율이 0이 아닌데 부정확하다면 마지막 항목을 다시 조정
        let total = bookingPercentages.reduce((acc, val) => acc + val, 0);
        if (total !== 100) {
            let diff = 100 - total;
            bookingPercentages[bookingPercentages.length - 1] += diff;
        }

        return bookingPercentages;
    };

    useEffect(() => {
        const totalItems = rankings.length; // rankings 길이 계산
        const bookingPercentages = generateRankingBookingPercent(totalItems); // 예매율 계산

        setRanking(
            rankings.map((item, index) => ({
                ...item,
                bookingPercent: bookingPercentages[index], // 예매율 추가
                randomTrend: getRandomTrend(), // 랜덤 트렌드 추가
                rankChange: getRandomRankChange(), // 랜덤 rankChange 추가
            }))
        );
    }, [rankings]); // rankings가 변경될 때마다 실행

    // 상승/하락에 따른 랜덤 숫자 생성 (-10 ~ 10)
    const getRandomRankChange = () => {
        const rankChange = Math.floor(Math.random() * 21) - 10; // -10 ~ 10 사이의 숫자
        console.log("Generated rankChange:", rankChange); // 확인용 로그
        return rankChange;
    };

    // 랜덤 상승/하락 아이콘을 결정하는 함수
    const getRandomTrend = () => {
        return Math.random() < 0.5 ? "up" : "down";
    };

    // 랜덤 클래스 선택 함수
    const getRandomClass = () => {
        const classes = ["RankingList_ExclusiveSale", "RankingList_AdvantageSeat", "none"];
        const randomIndex = Math.floor(Math.random() * classes.length);
        return classes[randomIndex];
    };

    return (
        <article className="RankingList_Container">
            <section className="RankingList_Wrap">
                <div className="RankingList_Panel">
                    <div className="RankingList_subWrap">
                        {/* 1~3위 상단 고정 */}
                        <div className="RankingList_Top">
                            {ranking.slice(0, 3).map((item, index) => (
                                <div key={item.id} className={`RankingList_TopItem rank-${index + 1}`}>
                                    <div className="RankingList_Badge">
                                        <div className="RankingList_BadgeNumber">{index + 1}</div>
                                        <div className="RankingList_ImageWrap">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="35"
                                                height="41"
                                                fill="none"
                                                viewBox="0 0 35 41"
                                            >
                                                <path
                                                    className={`rank-${index + 1}`}
                                                    d="M0 4a4 4 0 0 1 4-4h27a4 4 0 0 1 4 4v34.84a2 2 0 0 1-2.717 1.867l-14.382-5.523a2 2 0 0 0-1.458.01L2.74 40.656A2 2 0 0 1 0 38.8z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="RankingList_ItemInner">
                                        <img
                                            src={item.postImage}
                                            alt={item.festivalName}
                                            className="RankingList_ImageContainer"
                                        ></img>
                                        <ul className="RankingList_Info">
                                            <div className="RankingList_ContentsInner">
                                                <li className="RankingList_MainTitle">{item.festivalName}</li>
                                                <div className="RankingList_Location">
                                                    {/* {item.placeDetailName} */}
                                                    블루스퀘어 신한카드홀
                                                    <div className="RankingList_Date">
                                                        {item.fromDate} ~{" "}
                                                        {item.toDate === "9999-12-31" ? "오픈런" : item.toDate}
                                                    </div>
                                                    <div className="RankingList_ReservationRate">
                                                        <span className="RankingList_BookingPercentText">예매율</span>
                                                        <li className="RankingList_BookingPercent">
                                                            {item.bookingPercent}%
                                                        </li>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 4위부터 50까지 리스트 */}
                        <div className="RankingList_AllItemList">
                            {ranking.slice(3, 50).map((item, index) => (
                                <>
                                    <div key={item.id} className="RankingList_ItemList_Container">
                                        <div className="RankingList_ItemList_Wrap">
                                            <div className="RankingList_ItemList_Badge">
                                                <div className="RankingList_ItemList_NumberColor">{index + 4}</div>
                                            </div>
                                            <div className="RankingList_ItemList_curRank">
                                                <div
                                                    className={`RankingList_ItemList_rank ${
                                                        item.randomTrend === "up"
                                                            ? "RankingList_ItemList_rankUp"
                                                            : "RankingList_ItemList_rankDown"
                                                    }`}
                                                ></div>
                                                <span
                                                    className="RankingList_ItemList_rankDownText"
                                                    style={{
                                                        color: item.randomTrend === "up" ? "green" : "gray",
                                                    }}
                                                >
                                                    {isNaN(item.rankChange) ? 0 : Math.abs(item.rankChange)}
                                                </span>
                                            </div>
                                        </div>
                                        {/* 이미지 표시 */}
                                        <div className="RankingList_ItemListInner">
                                            <div className="RankingList_ImageListWrap">
                                                <img
                                                    src={item.postImage}
                                                    alt={item.festivalName}
                                                    className="RankingList_Image"
                                                />
                                            </div>
                                            <ul className="RankingList_RankingContents">
                                                <div className="RankingList_BadgeWrap">
                                                    <div className={getRandomClass()}></div>
                                                </div>
                                                <div className="RankingList_RankingContentsInner">
                                                    <li className="RankingList_GoodsName">{item.festivalName}</li>
                                                    <div className="RankingList_RankList_Wrap">
                                                        <li className="RankinList_PlaceName">블루스퀘어 신한카드홀</li>
                                                        <div className="RankingList_SubContainer">
                                                            <li className="RankingList_DateWrap">
                                                                {item.fromDate} ~{" "}
                                                                {item.toDate === "9999-12-31" ? "오픈런" : item.toDate}
                                                            </li>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="RankingList_ContentsBookingPercent">
                                                    <span className="RankingList_BookingPercentText1">
                                                        <QueryStatsIcon />
                                                    </span>
                                                    <li className="RankingList_BookingPercent">
                                                        {item.bookingPercent}%
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default RankingList;
