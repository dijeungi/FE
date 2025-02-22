// src/components/Main/Ranking.js
import Category from "../components/Ranking/Category";
import RankingList from "../components/Ranking/RankingList";
import StatsInfo from "../components/Ranking/StatsInfo";

import "../styles/Ranking/RankingPages.css";

export default function RankingPages() {
    return (
        <div className="RankingPages">
            <Category />
            <StatsInfo />
            <RankingList />
        </div>
    );
}
