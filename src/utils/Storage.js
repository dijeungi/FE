// 좋아요 상태 저장 (localStorage)
export const setLikeStatusStorage = (festivalId, isLiked) => {
    localStorage.setItem(`like_${festivalId}`, JSON.stringify(isLiked));
};

// 좋아요 상태 불러오기 (localStorage)
export const getLikeStatusStorage = (festivalId) => {
    const savedStatus = localStorage.getItem(`like_${festivalId}`);
    return savedStatus ? JSON.parse(savedStatus) : false;
};

// 특정 공연의 좋아요 상태 삭제
export const removeLikeStatusStorage = (festivalId) => {
    localStorage.removeItem(`like_${festivalId}`);
};
