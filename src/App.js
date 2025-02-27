import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/share/Header";
import Footer from "./components/share/Footer";

import MainPages from "./pages/MainPages";
import LoginPage from "./pages/login/Login";
import JoinSelectAuthorization from "./pages/login/JoinSelectAuthorization";
import JoinUser from "./pages/login/JoinUser";
import JoinTeam from "./pages/login/JoinTeam";
import Agree from "./pages/login/Agree";
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

import ReservationWindow from "./components/product/ReservationWindow";
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
import KeywordSearchPage from "./pages/search/KeywordSearchPage";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const isReservationPage = location.pathname.startsWith("/reservation");
    const isJoinUserPage = location.pathname === "/register/joinuser";
    const [loading, setLoading] = useState(true);

    // Header와 Footer를 숨길 경로 목록
    const hiddenLayoutRoutes = [
        "/register",
        "/reservation",
        "/register/joinuser",
        "/register/join-user",
        "/register/join-team",
        "/register/agree-user",
        "/register/agree-team",
        "/register/genre-select",
    ];

    const isHiddenLayout = hiddenLayoutRoutes.some((path) => location.pathname.startsWith(path));

    // Redux에서 쿠키 기반 로그인 상태 복구 & 페이지 변경 시 로딩 적용
    useEffect(() => {
        console.log("📌App.js useEffect 실행: location =", location.pathname);
        setLoading(true);
        const fetchData = async () => {
            await dispatch(initializeAuth()); // Redux 인증 상태 가져오기
            setLoading(false);
        };
        fetchData();
    }, [location.pathname, dispatch]);

    return (
        <div className="App">
            {/* 예매 페이지가 아닐 때만 Header 표시 */}
            {loading && <LoadingSpinner />}
            {!isHiddenLayout && <Header />}
            <ScrollToTop />
            <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<MainPages />} />

                {/* 로그인 & 회원가입 */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<JoinSelectAuthorization />} />
                <Route path="/register/join/:userType" element={<JoinUser />} />
                {/* <Route path="/register/join-user" element={<JoinUser />} /> */}
                {/* <Route path="/register/join-team" element={<JoinTeam />} /> */}
                <Route path="/register/agree/:userType" element={<Agree />} />
                <Route path="/register/join/genreselect" element={<GenreSelect />} />

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
                {/* 검색어 검색 */}
                <Route path="/search" element={<KeywordSearchPage />} />

                {/* 기타 페이지 */}
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/product/:festivalId" element={<ProductDetailPage />} />
                <Route path="/reservation" element={<ReservationWindow />} />

                {/* 계정 찾기 */}
                <Route path="/account/find-id" element={<FindAccountId />} />
                <Route path="/account/find-password" element={<FindAccountPassword />} />
                <Route path="/account/find-password/detail" element={<FindAccountPasswordDetail />} />

                {/*토스페이먼츠*/}
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
            </Routes>

            {location.pathname === "/" && <KakaoChannelButton />}

            {!isHiddenLayout && <Footer />}
        </div>
    );
}

export default App;
