import { useEffect, useState } from "react";
import Category from "../components/ranking/Category";
import RankingList from "../components/ranking/RankingList";
import StatsInfo from "../components/ranking/StatsInfo";
import { getCategoryList, getRankingList } from "../api/festivalApi";
import "../styles/ranking/RankingPages.css";

const RankingPages = () => {
    const [rankings, setRankings] = useState([]);
    const [activeCategory, setActiveCategory] = useState("CT01");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // console.log("현재 선택된 카테고리:", activeCategory);
        setLoading(true);

        const fetchData = activeCategory === "CT01" ? getRankingList : () => getCategoryList(activeCategory);

        fetchData()
            .then((data) => {
                // console.log("API 응답 데이터:", data);
                setRankings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API 호출 에러:", err);
                setError(err.message);
                setLoading(false);
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
