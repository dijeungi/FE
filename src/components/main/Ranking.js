import { useEffect, useState } from "react";
import { getRankingList } from "../../api/festivalApi";
import Slide from "./Slide";

const Ranking = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const fetchRanking = async () => {
            const data = await getRankingList();
            setRanking(data);
        };

        fetchRanking();
    }, []);

    return <Slide data={ranking.slice(0, 10)} title="인기순위 🌟" link="/ranking" isRanking={true} />;
};

export default Ranking;
