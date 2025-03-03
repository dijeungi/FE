// src/components/ranking/RankingList.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ranking/RankingList.css";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LoadingSpinner from "../LoadingSpinner";

const RankingList = ({ rankings }) => {
    const [ranking, setRanking] = useState(rankings);

    // 예매율을 순위에 맞춰 배분하는 함수 (기존 로직 유지)
    const generateRankingBookingPercent = (totalItems) => {
        let remainingPercent = 100;
        let bookingPercentages = [];

        const highestPercent = 11.4;
        bookingPercentages.push(highestPercent);
        remainingPercent -= highestPercent;

        const baseDecrement = 0.2;
        const minPercent = 0.5;

        for (let i = 1; i < totalItems - 1; i++) {
            let percentForThisRank = Math.max(highestPercent - baseDecrement * i, minPercent);
            bookingPercentages.push(parseFloat(percentForThisRank.toFixed(1)));
            remainingPercent -= percentForThisRank;
        }

        bookingPercentages.push(parseFloat(remainingPercent.toFixed(1)));

        let total = bookingPercentages.reduce((acc, val) => acc + val, 0);
        if (total !== 100) {
            let diff = 100 - total;
            bookingPercentages[bookingPercentages.length - 1] += diff;
        }

        return bookingPercentages;
    };

    useEffect(() => {
        const totalItems = rankings.length;
        const bookingPercentages = generateRankingBookingPercent(totalItems);

        setRanking(
            rankings.map((item, index) => ({
                ...item,
                bookingPercent: bookingPercentages[index],
                randomTrend: Math.random() < 0.5 ? "up" : "down",
                rankChange: Math.floor(Math.random() * 21) - 10,
            }))
        );
    }, [rankings]);

    if (ranking.length === 0) return <LoadingSpinner />;

    return (
        <article className="RankingList_Container">
            <section className="RankingList_Wrap">
                <div className="RankingList_Panel">
                    <div className="RankingList_subWrap">
                        {/* 상위 3개 아이템 렌더링 */}
                        <div className="RankingList_Top">
                            {ranking.slice(0, 3).map((item, index) => (
                                <Link
                                    key={item.id}
                                    to={`/product/${item.id}`}
                                    className={`RankingList_TopItem rank-${index + 1}`}
                                >
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
                                        />
                                        <ul className="RankingList_Info">
                                            <div className="RankingList_ContentsInner">
                                                <li className="RankingList_MainTitle">{item.festivalName}</li>
                                                <div className="RankingList_Location">
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
                                </Link>
                            ))}
                        </div>

                        {/* 4위부터 나머지 리스트 렌더링 */}
                        <div className="RankingList_AllItemList">
                            {ranking.slice(3, 50).map((item, index) => (
                                <Link
                                    key={item.id}
                                    to={`/product/${item.id}`}
                                    className="RankingList_ItemList_Container"
                                >
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
                                                <div
                                                    className={
                                                        [
                                                            "RankingList_ExclusiveSale",
                                                            "RankingList_AdvantageSeat",
                                                            "none",
                                                        ][Math.floor(Math.random() * 3)]
                                                    }
                                                ></div>
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
                                                <li className="RankingList_BookingPercent">{item.bookingPercent}%</li>
                                            </div>
                                        </ul>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default RankingList;
