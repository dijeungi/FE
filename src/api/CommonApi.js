// src/api/festivalApi.js
import axiosInstance from "../api/AxiosInstance";

// Category
export const getCategoryList = async (id) => {
    const response = await axiosInstance.get(`/common/list/category?id=${id}`);
    return response.data;
};
