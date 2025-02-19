// src/context/DetailContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { getProductDetail, getCastingList, getFestivalDetailTimeDate } from "../api/festivalApi";
import { getTotalStar } from "../api/reviewApi";
import { getLikeCount, getIsLiked } from "../api/likeApi";

const DetailContext = createContext();

export const DetailProvider = ({ festivalId, children }) => {
    const userId = 1;

    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [totalStar, setTotalStar] = useState(0);
    const [festivalData, setFestivalData] = useState(null);
    const [festivalTimeData, setFestivalTimeData] = useState(null);
    const [castingList, setCastingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect 내에서 API요청이 실행되며,
    // fastivalId 를 기반으로 여러 API를 호출하여 데이터를 가져옵니다.
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Festival 데이터 가져오기
                const festivalDetails = await getProductDetail(festivalId);
                if (!festivalDetails) throw new Error("공연 정보를 가져오지 못했습니다.");
                setFestivalData(festivalDetails);

                // 좋아요 개수 가져오기
                const likeCountData = await getLikeCount(festivalId);
                setLikeCount(likeCountData);

                // 유저가 좋아요 눌렀는지 확인
                const likeStatus = await getIsLiked(festivalId, userId);
                setIsLiked(likeStatus.isLiked);

                // 총 평점 가져오기
                const totalStarData = await getTotalStar(festivalId);
                setTotalStar(totalStarData);

                // Casting List 가져오기
                const castings = await getCastingList(festivalId);
                setCastingList(castings);

                console.log("🎯 API 데이터 로딩 완료!");
                console.log("📌 likeCountData:", likeCountData);
                console.log("📌 likeStatus:", likeStatus);
                console.log("📌 totalStarData:", totalStarData);
                console.log("📌 festivalDetails:", festivalDetails);
                console.log("📌 castings:", castings);
                // console.log("📌 festivalTime:", festivalTime);

            } catch (err) {
                console.error("❌ 데이터 불러오기 실패:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [festivalId]);


    return (
        <DetailContext.Provider value={{
            festivalId,
            festivalData,
            totalStar,
            likeCount,
            isLiked,
            setLikeCount,
            setIsLiked,
            loading,
            error,
        }}>
            {children}
        </DetailContext.Provider>
    );
};

export const useDetailContext = () => {
    return useContext(DetailContext);
};
