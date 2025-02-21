// src/redux/Store.js

import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './LoginSlice';

export const store = configureStore({
    // 여러 리듀서들을 하나로 결합
    reducer: {
        loginSlice: loginSlice,
    },
});

export default store;