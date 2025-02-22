import { createSlice } from "@reduxjs/toolkit";
import {
    getAccessTokenCookie,
    setAccessTokenCookie,
    removeAccessTokenCookie,
    setRefreshTokenCookie,
    removeRefreshTokenCookie,
} from "../utils/Cookie";

const initState = {
    id: "",
    roles: [],
    accessToken: getAccessTokenCookie() || "",
};

const loginSlice = createSlice({
    name: "loginSlice",
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log("login:", action.payload);
            const { id, roles, accessToken, refreshToken } = action.payload;
            setAccessTokenCookie(accessToken, 30);
            setRefreshTokenCookie(refreshToken, 30);
            return { id, roles, accessToken };
        },
        logout: (state) => {
            removeAccessTokenCookie();
            removeRefreshTokenCookie();
            return { id: "", roles: [], accessToken: "" };
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            setAccessTokenCookie(action.payload, 30); // 쿠키에도 저장
        },
    },
});

// `setAccessToken`을 export할 수 있도록 수정됨
export const { login, logout, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
