import { useEffect, useState } from "react";
import Category from "../components/ranking/Category";
import RankingList from "../components/ranking/RankingList";
import StatsInfo from "../components/ranking/StatsInfo";
import { getCategoryList, getRankingList } from "../api/festivalApi";
import "../styles/ranking/RankingPages.css";

const RankingPages = () => {
    const [rankings, setRankings] = useState([]);
    const [activeCategory, setActiveCategory] = useState("CT01");

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = activeCategory === "CT01" ? getRankingList : () => getCategoryList(activeCategory);
        fetchData()
            .then((data) => {
                // console.log("API 응답 데이터:", data);
                setRankings(data);
            })
            .catch((err) => {
                console.error("API 호출 에러:", err);
                setError(err.message);
            });
    }, [activeCategory]);

    return (
        <div className="RankingPages">
            <Category activeCategory={activeCategory} onCategoryChange={(id) => setActiveCategory(id)} />
            <StatsInfo />
            <RankingList rankings={rankings} />
        </div>
    );
};

export default RankingPages;
