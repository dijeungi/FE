import { createSlice } from "@reduxjs/toolkit";
import {
    getUserIdCookie,
    getAccessTokenCookie,
    setAccessTokenCookie,
    removeAccessTokenCookie,
    setRefreshTokenCookie,
    removeRefreshTokenCookie,
} from "../utils/Cookie";

const initState = {
    id: getUserIdCookie() || null, // ✅ 새로고침 후에도 쿠키에서 가져옴
    roles: [],
    accessToken: getAccessTokenCookie() || "", // ✅ 새로고침 후에도 accessToken 유지
    isAuthenticated: !!getAccessTokenCookie(), // ✅ 토큰이 있으면 로그인 유지
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

            return {
                id,
                roles,
                accessToken,
                isAuthenticated: true, // ✅ 로그인 상태 유지
            };
        },
        logout: (state) => {
            removeAccessTokenCookie();
            removeRefreshTokenCookie();
            return {
                id: null,
                roles: [],
                accessToken: "",
                isAuthenticated: false, // ✅ 로그아웃 상태 반영
            };
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            setAccessTokenCookie(action.payload, 30); // ✅ 쿠키에도 저장
        },
    },
});

export const { login, logout, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
