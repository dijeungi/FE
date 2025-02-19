// src/api/reviewApi.js

import axiosInstance from '../api/AxiosInstance';

// ticket Open
export const getTotalStar = async (festivalId) => {
    const response = await axiosInstance.get(`/review/total-star?festivalId=${festivalId}`);
    return response.data;
}
