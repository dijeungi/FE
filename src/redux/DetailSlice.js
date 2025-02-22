import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetail, getCastingList } from "../api/festivalApi";
import { getTotalStar } from "../api/reviewApi";
import { getLikeCount, getIsLiked } from "../api/likeApi";

// 초기 상태
const initialState = {
    festivalData: null,
    likeCount: 0,
    isLiked: false,
    totalStar: 0,
    placeDetailName: "",
    placeLocation: "",
    castingList: [],
    loading: false,
    error: null,
};

// 비동기 액션: API 데이터 로드
export const fetchFestivalDetail = createAsyncThunk(
    "detail/fetchFestivalDetail",
    async ({ festivalId, userId }, { rejectWithValue }) => {
        try {
            const [festivalDetails, likeCountData, likeStatus, totalStarData, castings] = await Promise.all([
                getProductDetail(festivalId),
                getLikeCount(festivalId),
                userId ? getIsLiked(festivalId, userId) : { isLiked: false }, // 로그인 안 했을 경우 기본값
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

// Redux Slice 생성
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
                state.festivalData = festivalDetails;
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

// 액션 및 리듀서 내보내기
export const { setLikeCount, setIsLiked } = detailSlice.actions;
export default detailSlice.reducer;
