// src/api/Login.js

import axios from 'axios';
import axiosInstance from './AxiosInstance';

import {API_SERVER_HOST} from '../config/ApiConfig';

const host = `${API_SERVER_HOST}/api/member`;

// 로그인
export const loginPost = async (id, password) => {
    const response = await axios.post(`${host}/login`, {id, password}, {
        withCredentials: true,
    },);
    console.log(response.data);
    return response.data;
};

// 로그아웃
export const logoutPost = async () => {
    const response = await axiosInstance.post(`/member/logout`);
    return response.data;
};

// 회원가입
export const signupPost = async (id, name, email, password, phone,mailYn) => {
    const response = await axios.post(`${host}/join/member`, {
        id, name, email, password, phone,mailYn

    });
    return response.data;
};

// 회원가입, 이메일 중록 확인 요청
export const checkEmailPost = async (email) => {
    const response = await axiosInstance.post(`/member/checkEmail`, {email});
    return response.data;
};

// 회원가입시, 비밀번호 확인 요청
export const checkPasswordPost = async (password) => {
    const response = await axiosInstance.post(`/member/checkPassword`, {
        password,
    });
    return response.data;
};