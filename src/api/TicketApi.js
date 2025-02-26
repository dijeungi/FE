// src/api/reviewApi.js
import axiosInstance from "../api/AxiosInstance";

// Ticket
export const getTicketList = async (pageParam) => {
    const { page, size, sort, userId } = pageParam;
    const response = await axiosInstance.get(`/ticket/list`, {
        params: {
            page: page,
            size: size,
            sort: sort,
            userId: userId,
        },
    });
    return response.data;
};
