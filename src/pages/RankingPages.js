// src/components/Main/Ranking.js
import { useEffect } from "react";
import Category from "../components/Ranking/Category";
import RankingList from "../components/Ranking/RankingList";
import StatsInfo from "../components/Ranking/StatsInfo";

import "../styles/Ranking/RankingPages.css";

const RankingPages = () => {
    return (
        <div className="RankingPages">
            <Category />
            <StatsInfo />
            <RankingList />
        </div>
    );
};

export default RankingPages;
