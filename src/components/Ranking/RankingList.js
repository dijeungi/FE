import { useEffect, useState } from "react";
import { getRankingList } from "../../api/festivalApi";
import "../../styles/Ranking/RankingList.css";

const RankingList = ({ rankings }) => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (ranking.length === 0) {
            const fetchRanking = async () => {
                try {
                    setLoading(true);
                    const data = await getRankingList();
                    setRanking(data);
                } catch (err) {
                    console.error("Error fetching RankingList:", err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchRanking();
        }
    }, [ranking]); // 의존성 배열을 ranking으로 바꾸기

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
                                                    fill="#8E43E7"
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
                                                    {item.placeDetailName}
                                                    <div className="RankingList_Date">
                                                        {item.fromDate} ~ {item.toDate}
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>

                                    {/* <img src={item.postImage} alt={item.festivalName} className="top-ranking-image" />
                                    <div className="top-ranking-info">
                                        <h2 className="top-ranking-title">
                                            {index + 1}. {item.festivalName}
                                        </h2>
                                        <p className="top-ranking-venue">{item.venue}</p>
                                        <p className="top-ranking-date">
                                            {item.fromDate} ~ {item.toDate}
                                        </p>
                                    </div> */}
                                </div>
                            ))}
                        </div>

                        {/* 4위부터 끝까지 리스트 */}
                        <div className="ranking-list">
                            {ranking.slice(3).map((item, index) => (
                                <div key={item.id} className="ranking-item">
                                    <span className="ranking-number">{index + 4}</span>
                                    <img src={item.postImage} alt={item.festivalName} className="ranking-image" />
                                    <div className="ranking-info">
                                        <h3 className="ranking-title">{item.festivalName}</h3>
                                        <p className="ranking-venue">{item.venue}</p>
                                        <p className="ranking-date">
                                            {item.fromDate} ~ {item.toDate}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default RankingList;
