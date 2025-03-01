// import axios from "axios";
import axiosInstance from "../api/AxiosInstance";

export const getMemberInfo = async (userId) => {
    const response = await axiosInstance.get(`/member/api/user?userId=${userId}`);
    return response.data;
};
