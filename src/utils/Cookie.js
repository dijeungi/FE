import Cookies from "js-cookie";

const ACCESS_COOKIE_NAME = "CC_LoginToken";
const REFRESH_COOKIE_NAME = "refreshToken";

// 현재 환경이 HTTPS인지 확인 (배포 환경이면 true)
const isProduction = window.location.protocol === "https:";

// access token 저장 (30분 만료)
export const setAccessTokenCookie = (token) => {
    Cookies.set(ACCESS_COOKIE_NAME, token, {
        expires: 1 / 48, // 30분
        secure: isProduction, // 운영 환경(HTTPS)에서만 Secure 적용
        sameSite: "Strict", // CSRF 방지
    });
};

// userId 쿠키 가져오기
export const getUserIdCookie = () => {
    return Cookies.get("userId") || "";
};

// access token 가져오기
export const getAccessTokenCookie = () => {
    return Cookies.get(ACCESS_COOKIE_NAME);
};

// access token 삭제 (로그아웃 시 호출)
export const removeAccessTokenCookie = () => {
    Cookies.remove(ACCESS_COOKIE_NAME);
};

// refresh token 저장 (30분 만료)
export const setRefreshTokenCookie = (token) => {
    Cookies.set(REFRESH_COOKIE_NAME, token, {
        expires: 1 / 48,
        secure: isProduction,
        sameSite: "Strict",
    });
};

// refresh token 가져오기
export const getRefreshTokenCookie = () => {
    return Cookies.get(REFRESH_COOKIE_NAME);
};

// refresh token 삭제 (로그아웃 시 호출)
export const removeRefreshTokenCookie = () => {
    Cookies.remove(REFRESH_COOKIE_NAME);
};

// 좋아요 상태 저장
export const setLikeStatusCookie = (festivalId, isLiked) => {
    Cookies.set(`like_${festivalId}`, isLiked, { expires: 30 }); // 30일 유지
};

// 좋아요 상태 불러오기
export const getLikeStatusCookie = (festivalId) => {
    return Cookies.get(`like_${festivalId}`) === "true"; // Boolean 값으로 변환
};
