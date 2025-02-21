import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { getProductDetail, getCastingList } from "../api/festivalApi";
import { getTotalStar } from "../api/reviewApi";
import { getLikeCount, getIsLiked } from "../api/likeApi";

const DetailContext = createContext();

export const DetailProvider = ({ festivalId, children }) => {
    const userId = useSelector((state) => state.loginSlice.id);

    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [totalStar, setTotalStar] = useState(0);
    const [festivalData, setFestivalData] = useState(null);
    const [placeDetailName, setPlaceDetailName] = useState(""); // 추가
    const [placeLocation, setPlaceLocation] = useState(""); // 추가
    const [castingList, setCastingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            if (!festivalId) return;
            setLoading(true);

            // API 병렬 호출
            const [festivalDetails, likeCountData, likeStatus, totalStarData, castings] = await Promise.all([
                getProductDetail(festivalId),
                getLikeCount(festivalId),
                userId ? getIsLiked(festivalId, userId) : { isLiked: false }, // 로그인 안 했을 경우 기본값
                getTotalStar(festivalId),
                getCastingList(festivalId),
            ]);

            if (!festivalDetails) throw new Error("공연 정보를 가져오지 못했습니다.");

            setFestivalData(festivalDetails);
            setLikeCount(likeCountData);
            setIsLiked(likeStatus.isLiked);
            setTotalStar(totalStarData);
            setCastingList(castings);

            // 추가된 필드 값 저장
            setPlaceDetailName(festivalDetails.placeDetailName || "");
            setPlaceLocation(festivalDetails.placeLocation || "");

            console.log("🎯 API 데이터 로딩 완료!", { festivalDetails, likeCountData, likeStatus, totalStarData, castings });

        } catch (err) {
            console.error("❌ 데이터 불러오기 실패:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [festivalId, userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <DetailContext.Provider value={{
            festivalId,
            festivalData,
            totalStar,
            likeCount,
            isLiked,
            placeDetailName,
            placeLocation,
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
