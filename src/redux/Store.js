// src/redux/Store.js

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";
import detailReducer from "./DetailSlice";

export const store = configureStore({
    reducer: {
        loginSlice: loginSlice,
        detail: detailReducer,
    },
});

export default store;
