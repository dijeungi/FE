// src/api/festivalApi.js

// import axios from "axios";
import axiosInstance from "../api/AxiosInstance";

// ticket Open
export const getTickOpenList = async () => {
  const response = await axiosInstance.get("/festival/ticket-open");
  return response.data;
};

// list
export const getProductList = async () => {
  const response = await axiosInstance.get("/festival/list");
  return response.data;
};

// Ranking
export const getRankingList = async () => {
  const response = await axiosInstance.get("/festival/ranking");
  return response.data;
};

// KeywordSearch
export const getKeywordSearch = async (keyword) => {
  console.log("keyword", keyword);
  if (keyword === undefined) {
    return;
  }
  const response = await axiosInstance.get(
    `/festival/search?searchKeyword=${keyword}`
  );
  return response.data;
};

// Product Detail
export const getProductDetail = async (festivalId) => {
  const response = await axiosInstance.get(
    `/festival/detail?festivalId=${festivalId}`
  );
  return response.data;
};

// User Favorite Festival List
export const getUserFavoriteList = async (userId) => {
  if (userId == undefined) {
    return;
  }
  const response = await axiosInstance.get(
    `/festival/favorite/ranking-limit?userId=${userId}`
  );
  return response.data;
};

// festival Category
export const getCategoryList = async (categoryId) => {
  console.log("API 호출 시 전달된 categoryId:", categoryId);
  const response = await axiosInstance.get(
    `/festival/list?categoryId=${categoryId}`
  );
  console.log("API 응답 데이터:", response.data);
  return response.data;
};

// Festival Time
export const getFestivalDetailTimeDate = async (festivalId, date) => {
  try {
    const response = await axiosInstance.get(`/time/detail/date`, {
      params: { festivalId, date },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 공연 시간 데이터 요청 실패:", error);
    throw error;
  }
};

// Festival Date
export const getFestivalDate = async (festivalId) => {
  try {
    const response = await axiosInstance.get(`/time/list`, {
      params: { festivalId },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 공연 날짜짜 데이터 요청 실패:", error);
    throw error;
  }
};

// Casting List
export const getCastingList = async (festivalId) => {
  const response = await axiosInstance.get(
    `/festival/casting-list?festivalId=${festivalId}`
  );
  return response.data;
};
