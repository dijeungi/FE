// src/redux/Store.js

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import detailReducer from "./DetailSlice";

export const store = configureStore({
    // 여러 리듀서들을 하나로 결합
    reducer: {
        loginSlice: loginSlice,
        detail: detailReducer,
    },
});

export default store;
