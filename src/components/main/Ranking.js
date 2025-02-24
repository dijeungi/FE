import { useEffect, useState } from "react";
import { getRankingList } from "../../api/festivalApi";
import Slide from "./Slide";

const Ranking = () => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    if (loading) return <p>서버와 통신 중..</p>;
    if (error) return <p>티켓 판매순위: {error.message}</p>;

    return (
        <Slide
            data={ranking.slice(0, 10)}
            title="인기순위 🌟"
            link="/ranking"
            isRanking={true}
        />
    );
};

export default Ranking;
