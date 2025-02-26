// src/redux/Store.js

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import detailReducer from "./DetailSlice";
// import rankingReducer from "./RankingSlice";

export const store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        detail: detailReducer,
        // ranking: rankingReducer,
    },
});

export default store;
