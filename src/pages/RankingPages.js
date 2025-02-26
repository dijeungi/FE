// src/pages/RankingPages.js
import { useEffect, useState } from "react";
import Category from "../components/ranking/Category";
import RankingList from "../components/ranking/RankingList";
import StatsInfo from "../components/ranking/StatsInfo";
import { getCategoryList } from "../api/festivalApi"; // API 호출 함수
import "../styles/ranking/RankingPages.css";

const RankingPages = () => {
    // ranking 데이터를 받아올 상태, activeCategory 기본값은 "CT01" (전체)
    const [rankings, setRankings] = useState([]);
    const [activeCategory, setActiveCategory] = useState("CT01");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // activeCategory가 변경되면 해당 카테고리의 ranking 데이터를 불러옵니다.
    useEffect(() => {
        console.log("현재 선택된 카테고리:", activeCategory);
        setLoading(true);
        getCategoryList(activeCategory)
            .then((data) => {
                console.log("API 응답 데이터:", data);
                setRankings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("API 호출 에러:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [activeCategory]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="RankingPages">
            {/* Category 컴포넌트에 현재 선택된 카테고리와 변경함수를 전달합니다. */}
            <Category activeCategory={activeCategory} onCategoryChange={(id) => setActiveCategory(id)} />
            <StatsInfo />
            {/* RankingList에는 API로 받아온 ranking 데이터를 전달합니다. */}
            <RankingList rankings={rankings} />
        </div>
    );
};

export default RankingPages;
