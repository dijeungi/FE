import Cookies from 'js-cookie';

const COOKIE_NAME = 'CC_LoginToken';

// 쿠키 저장 (30분 만료)
export const setAccessTokenCookie = (token) => {
    Cookies.set(COOKIE_NAME, token, { expires: 1 / 48 }); // 1/48일 = 30분
};

// 쿠키 가져오기
export const getAccessTokenCookie = () => {
    return Cookies.get(COOKIE_NAME);
};

// 쿠키 삭제 (로그아웃 시 호출)
export const removeAccessTokenCookie = () => {
    Cookies.remove(COOKIE_NAME);
};
