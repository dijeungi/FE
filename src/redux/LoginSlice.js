import { createSlice } from '@reduxjs/toolkit';
import { getAccessTokenCookie, removeAccessTokenCookie } from '../utils/Cookie';

const initState = {
    id: '',
    roles: [],
    accessToken: getAccessTokenCookie() || '',
};

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log('login:', action.payload);
            const payload = action.payload; // { id, roles, accessToken }
            return { ...payload };
        },
        logout: (state) => {
            removeAccessTokenCookie(); // 쿠키 삭제
            return { ...initState };
        },
        setAccessToken: (state, action) => {
            console.log('setAccessToken:', action.payload);
            state.accessToken = action.payload;
        },
    },
});

export const { login, logout, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
