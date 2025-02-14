// src/api/festivalApi.js

import axios from "axios";
import axiosInstance from '../api/AxiosInstance';

// ticket Open
export const getTickOpenList = async () => {
    // http://localhost:8080/api/festival/ticket-open
    const response = await axiosInstance.get('/festival/ticket-open');
    return response.data;
}

// Ranking
export const getRankingList = async () => {
    // http://localhost:8080/api/festival/ticket-open
    const response = await axiosInstance.get('/festival/ranking');
    return response.data;
}

// Info Detail
export const getInfoDetails = async (festivalId) => {
    const response = await axiosInstance.get(`/festival/detail?festivalId=${festivalId}`);
    return response.data;
}