// src/redux/RankingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductList } from "../api/festivalApi";

// 비동기 작업을 위한 thunk
export const fetchRankingList = createAsyncThunk("ranking/fetchRankingList", async () => {
    const data = await getProductList();
    return data;
});

const initialState = {
    rankings: [],
    loading: false,
    error: null,
};

const rankingSlice = createSlice({
    name: "ranking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRankingList.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRankingList.fulfilled, (state, action) => {
                state.loading = false;
                state.rankings = action.payload;
            })
            .addCase(fetchRankingList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default rankingSlice.reducer;
