import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initState = {
    email: '',
    roles: [],
    accessToken: '',
};

// createSlice를 사용한 슬라이스 생성
const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log('login: {}', action.payload);
            const payload = action.payload; // email, roles, accessToken으로 구성
            return { ...payload };
        },
        logout: (state) => {
            // email 삭제
            // accessToken 삭제
            return { ...initState };
        },
        setAccessToken: (state, action) => {
            console.log('setAccessToken: accessToken', action.payload);
            state.accessToken = action.payload;
        },
    },
});

export const { login, logout, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;