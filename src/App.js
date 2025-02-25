import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/share/Header";
import Footer from "./components/share/Footer";

import MainPages from "./pages/MainPages";
import LoginPage from "./pages/login/Login";
import JoinSelectAuthorization from "./pages/login/JoinSelectAuthorization";
import JoinUser from "./pages/login/JoinUser";
import JoinTeam from "./pages/login/JoinTeam";
import UserAgree from "./pages/login/UserAgree";
import TeamAgree from "./pages/login/TeamAgree";
import GenreSelect from "./pages/login/GenreSelect";

import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import NaverRedirectPage from "./pages/NaverRedirectPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import ProductDetailPage from "./pages/ProductDetailPage";

import Ranking from "./pages/RankingPages";

import FindAccountId from "./pages/login/FindAccountId";
import FindAccountPassword from "./pages/login/FindAccountPassword";
import FindAccountPasswordDetail from "./pages/login/FindAccountPasswordDetail";

import MyPageLayout from "./components/mypage/MyPageLayout";

import ReservationWindow from "./components/share/ReservationWindow";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentFail from "./components/payments/PaymentFail";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import KakaoChannelButton from "./components/share/KakaoChatButton";

import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/LoginSlice";
import Reviews from "./components/mypage/Reviews";
import Like from "./components/mypage/Like";
import Modify from "./components/mypage/Modify";
import Secession from "./components/mypage/Secession";
import Booking from "./components/mypage/Booking";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isReservationPage = location.pathname.startsWith("/reservation");
    const isJoinUserPage = location.pathname === "/register/JoinUser";
    const [loading, setLoading] = useState(true);

    // Redux에서 쿠키 기반 로그인 상태 복구 & 페이지 변경 시 로딩 적용
    useEffect(() => {
        console.log("📌App.js useEffect 실행: location =", location.pathname);

        setLoading(true); // ✅ 로딩 시작

        const fetchData = async () => {
            await dispatch(initializeAuth()); // ✅ Redux 인증 상태 가져오기 (비동기)

            setLoading(false); // ✅ 비동기 작업이 끝난 즉시 로딩 종료
        };

        fetchData(); // ✅ 비동기 함수 실행
    }, [location.pathname, dispatch]);

    return (
        <div className="App">
            {/* 예매 페이지가 아닐 때만 Header 표시 */}
            {loading && <LoadingSpinner />}
            {!isReservationPage && !isJoinUserPage && <Header />}
            <ScrollToTop />
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<MainPages />} />

                {/* 로그인 & 회원가입 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<JoinSelectAuthorization />} />
                <Route path="/register/JoinUser" element={<JoinUser />} />
                <Route path="/register/JoinTeam" element={<JoinTeam />} />
                <Route path="/register/AgreeUser" element={<UserAgree />} />
                <Route path="/register/AgreeTeam" element={<TeamAgree />} />
                <Route path="/register/GenreSelect" element={<GenreSelect />} />

                {/* 소셜 로그인 리다이렉트 */}
                <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                <Route path="/member/naver" element={<NaverRedirectPage />} />
                <Route path="/member/google" element={<GoogleRedirectPage />} />

                {/* 마이페이지 */}
                <Route path="/mypage" element={<MyPageLayout />}>
                    <Route index element={<Link to="booking" replace />} />
                    <Route path="booking" element={<Booking />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="likes" element={<Like />} />
                    <Route path="modify" element={<Modify />} />
                    <Route path="withdraw" element={<Secession />} />
                </Route>

                {/* 기타 페이지 */}
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/product/:festivalId" element={<ProductDetailPage />} />
                <Route path="/reservation" element={<ReservationWindow />} />

                {/* 계정 찾기 */}
                <Route path="/account/findId" element={<FindAccountId />} />
                <Route path="/account/findPassword" element={<FindAccountPassword />} />
                <Route path="/account/findPassword/detail" element={<FindAccountPasswordDetail />} />

                {/*토스페이먼츠*/}
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
            </Routes>

            {location.pathname === "/" && <KakaoChannelButton />}

            {!isReservationPage && !isJoinUserPage && <Footer />}
        </div>
    );
}

export default App;
