// src/components/Main/Ranking.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "../components/Ranking/Category";
import RankingList from "../components/Ranking/RankingList";
import StatsInfo from "../components/Ranking/StatsInfo";
import { fetchRankingList } from "../redux/RankingSlice"; // 여기에서 import 경로 수정

import "../styles/Ranking/RankingPages.css";

const RankingPages = () => {
    const dispatch = useDispatch();
    const { rankings, loading, error } = useSelector((state) => state.ranking || {}); // 빈 객체 디폴트 처리

    useEffect(() => {
        if (rankings?.length === 0) {
            dispatch(fetchRankingList());
        }
    }, [dispatch, rankings]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading rankings!</div>;

    if (!rankings || rankings.length === 0) {
        return <div>No rankings available</div>; // 데이터가 없을 경우 추가 처리
    }

    return (
        <div className="RankingPages">
            <Category />
            <StatsInfo />
            <RankingList rankings={rankings} />
        </div>
    );
};

export default RankingPages;
