// src/api/festivalApi.js

import axiosInstance from '../api/AxiosInstance';
import axios from "axios";

// ticket Open
export const getTickOpenList = async () => {
    // http://localhost:8080/api/festival/ticket-open
    const response = await axios.get('http://localhost:8080/api/festival/ticket-open');
    return response.data;
}