import { createSlice } from "@reduxjs/toolkit";
import {
    getUserIdCookie,
    getAccessTokenCookie,
    getRefreshTokenCookie,
    setAccessTokenCookie,
    removeAccessTokenCookie,
    setRefreshTokenCookie,
    removeRefreshTokenCookie,
    setUserIdCookie,
    removeUserIdCookie,
} from "../utils/Cookie";

// ✅ 새로고침 후 쿠키에서 로그인 상태 복원
const initialState = {
    id: getUserIdCookie() || null, // 쿠키에서 사용자 ID 불러오기
    roles: [],
    accessToken: getAccessTokenCookie() || "",
    refreshToken: getRefreshTokenCookie() || "",
    isAuthenticated: !!getAccessTokenCookie(), // 액세스 토큰이 있으면 로그인 상태 유지
};

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        // ✅ 로그인 성공 시 Redux와 쿠키 업데이트
        login: (state, action) => {
            console.log("🔹 login action:", action.payload);
            const { id, roles, accessToken, refreshToken } = action.payload;

            setAccessTokenCookie(accessToken, 30); // 30분 유지
            setRefreshTokenCookie(refreshToken, 7); // 7일 유지
            setUserIdCookie(id, 7); // 사용자 ID도 저장

            return {
                id,
                roles,
                accessToken,
                refreshToken,
                isAuthenticated: true,
            };
        },
        // ✅ 로그아웃 시 Redux 상태와 쿠키 삭제
        logout: (state) => {
            removeAccessTokenCookie();
            removeRefreshTokenCookie();
            removeUserIdCookie();

            return {
                id: null,
                roles: [],
                accessToken: "",
                refreshToken: "",
                isAuthenticated: false, // 로그아웃 상태 반영
            };
        },
        // ✅ 액세스 토큰 갱신 (자동 로그인 유지)
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            setAccessTokenCookie(action.payload, 30); // ✅ 쿠키에도 저장
        },
        // ✅ 새로고침 시 Redux 상태 초기화 (쿠키에서 불러오기)
        initializeAuth: (state) => {
            const accessToken = getAccessTokenCookie();
            const refreshToken = getRefreshTokenCookie();
            const id = getUserIdCookie();

            if (accessToken && refreshToken) {
                state.id = id;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.isAuthenticated = true;
            }
        },
    },
});

export const { login, logout, setAccessToken, initializeAuth } = loginSlice.actions;
export default loginSlice.reducer;
