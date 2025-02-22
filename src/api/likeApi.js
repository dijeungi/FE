// src/api/likeApi.js

import axiosInstance from "../api/AxiosInstance";

// 좋아요 개수 가져오기
export const getLikeCount = async (festivalId) => {
    const response = await axiosInstance.get(`/like/count?festivalId=${festivalId}`);
    return response.data;
};

// 유저가 이미 좋아요를 눌렀는지 확인
export const getIsLiked = async (userId, festivalId) => {
    const response = await axiosInstance.get(`/like/one?userId=${userId}&festivalId=${festivalId}`);
    return response.data;
};

// 좋아요 추가 (POST 요청)
export const postLike = async (userId, festivalId) => {
    const response = await axiosInstance.post(`/like/add?userId=${userId}&festivalId=${festivalId}`, {
        festivalId,
        userId,
    });
    return response.data;
};

// 좋아요 삭제 (DELETE 요청)
export const deleteLike = async (userId, festivalId) => {
    const response = await axiosInstance.delete(`/like/delete?userId=${userId}&festivalId=${festivalId}`, {
        festivalId,
        userId,
    });
    return response.data;
};
