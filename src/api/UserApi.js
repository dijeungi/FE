// import axios from "axios";
import axiosInstance from "./AxiosInstance";

export const getMemberInfo = async (userId) => {
    const response = await axiosInstance.get(`/member/api/user?userId=${userId}`);
    return response.data;
};

// 회원정보 수정
export const updateMemberInfo = async (userData) => {
    const queryString = new URLSearchParams({
        userId: userData.userId,
        userName: userData.userName,
        userPhone: userData.userPhone,
        email: userData.email,
        userBirth: userData.userBirth,
        emailAlarm: userData.emailAlarm,
        userFavorite1: userData.userFavorite1,
        userFavorite2: userData.userFavorite2,
        userFavorite3: userData.userFavorite3,
    }).toString();

    const url = `/member/update?${queryString}`;

    const response = await axiosInstance.put(url);
    return response.data;
};

// 비밀번호 변경
export const getChangePassword = async (passwordData) => {
    const response = await axiosInstance.put(`/api/member/change-password`, passwordData);
    return response.data;
};

// 회원탈퇴
export const getDeleteMember = async (userId) => {
    const response = await axiosInstance.delete(`/member/delete?userId=${userId}`);
    return response.data;
};
