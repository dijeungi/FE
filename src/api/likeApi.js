// src/api/likeApi.js

import axiosInstance from "../api/AxiosInstance";

// 좋아요 개수 가져오기
export const getLikeCount = async (festivalId) => {
    try {
        const response = await axiosInstance.get(`/like/count?festivalId=${festivalId}`);
        return response.data["좋아요 개수"] || 0; // 객체에서 숫자 값만 반환
    } catch (error) {
        console.error("❌ 좋아요 개수 가져오기 실패:", error);
        return 0;
    }
};

// 유저가 이미 좋아요를 눌렀는지 확인
export const getIsLiked = async (userId, festivalId) => {
    try {
        const response = await axiosInstance.get(`/like/one?userId=${userId}&festivalId=${festivalId}`);

        // console.log("✅ 좋아요 상태여부 API 응답:", response.data);

        // 응답이 String이므로 FE에서 설정해주었습니다.
        if (response.data === "좋아요 설정됨") {
            return true;
        } else if (response.data === "좋아요 설정안됨") {
            return false;
        }

        return false;
    } catch (error) {
        console.error("❌ 좋아요 상태 확인 실패:", error);
        return false;
    }
};

// 좋아요 추가 (POST 요청)
export const postLike = async (userId, festivalId) => {
    try {
        const response = await axiosInstance.post(`/like/add?userId=${userId}&festivalId=${festivalId}`);
        return response.data;
    } catch (error) {
        console.error("❌ 좋아요 추가 실패:", error);
        return null;
    }
};

// 좋아요 삭제 (DELETE 요청)
export const deleteLike = async (userId, festivalId) => {
    try {
        const response = await axiosInstance.delete(`/like/delete?userId=${userId}&festivalId=${festivalId}`);
        return response.data;
    } catch (error) {
        console.error("❌ 좋아요 삭제 실패:", error);
        return null;
    }
};
