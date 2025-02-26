// src/redux/DetailSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetail, getCastingList } from "../api/festivalApi";
import { getTotalStar } from "../api/reviewApi";
import { getLikeCount, getIsLiked } from "../api/likeApi";

// 초기 상태
const initialState = {
    festivalDetails: null,
    likeCount: 0,
    isLiked: false,
    totalStar: 0,
    placeDetailName: "",
    placeLocation: "",
    castingList: [],
    loading: false,
    error: null,
};

export const fetchFestivalDetail = createAsyncThunk(
    "detail/fetchFestivalDetail",
    async ({ festivalId, userId }, { rejectWithValue }) => {
        try {
            // festivalId가 유효한지 검사
            if (!festivalId || festivalId === "undefined") {
                throw new Error("유효하지 않은 festivalId입니다.");
            }

            const [festivalDetails, likeCountData, likeStatus, totalStarData, castings] = await Promise.all([
                getProductDetail(festivalId),
                getLikeCount(festivalId),
                userId ? getIsLiked(userId, festivalId) : { isLiked: false },
                getTotalStar(festivalId),
                getCastingList(festivalId),
            ]);

            if (!festivalDetails) throw new Error("공연 정보를 가져오지 못했습니다.");

            return {
                festivalDetails,
                likeCount: likeCountData,
                isLiked: likeStatus.isLiked,
                totalStar: totalStarData,
                castingList: castings,
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        setLikeCount(state, action) {
            state.likeCount = action.payload;
        },
        setIsLiked(state, action) {
            state.isLiked = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFestivalDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFestivalDetail.fulfilled, (state, action) => {
                const { festivalDetails, likeCount, isLiked, totalStar, castingList } = action.payload;
                state.festivalDetails = festivalDetails;
                state.likeCount = likeCount;
                state.isLiked = isLiked;
                state.totalStar = totalStar;
                state.placeDetailName = festivalDetails.placeDetailName || "";
                state.placeLocation = festivalDetails.placeLocation || "";
                state.castingList = castingList;
                state.loading = false;
            })
            .addCase(fetchFestivalDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setLikeCount, setIsLiked } = detailSlice.actions;
export default detailSlice.reducer;
