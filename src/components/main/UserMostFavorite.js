import { useEffect, useState } from "react";
import { getUserFavoriteList } from "../../api/festivalApi";
import Slide from "./Slide";

const UserMostFavorite = ({ userId }) => {
    const [userRanking, setUserRanking] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const fetchUserMostFavorite = async () => {
            const data = await getUserFavoriteList(userId);
            setUserRanking(data);
        };

        fetchUserMostFavorite();
    }, [userId]); // userId가 바뀔 때만 실행됨

    return <Slide data={userRanking.slice(0, 10)} title="좋아하는 장르 추천 👀" link="/ranking" isRanking={false} />;
};

export default UserMostFavorite;
