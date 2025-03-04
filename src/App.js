import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./components/share/Header";
import Footer from "./components/share/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import KakaoChannelButton from "./components/share/KakaoChatButton";

import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/LoginSlice";
import ChannelService from "./api/ChannelService";

// 🚀 Lazy Loading 적용 (코드 스플리팅)
const MainPages = lazy(() => import("./pages/MainPages"));
const LoginPage = lazy(() => import("./pages/login/Login"));
const JoinSelectAuthorization = lazy(() => import("./pages/login/JoinSelectAuthorization"));
const JoinUser = lazy(() => import("./pages/login/JoinUser"));
const Agree = lazy(() => import("./pages/login/Agree"));
const GenreSelect = lazy(() => import("./pages/login/GenreSelect"));
const KakaoRedirectPage = lazy(() => import("./pages/KakaoRedirectPage"));
const NaverRedirectPage = lazy(() => import("./pages/NaverRedirectPage"));
const GoogleRedirectPage = lazy(() => import("./pages/GoogleRedirectPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const Ranking = lazy(() => import("./pages/RankingPages"));
const FindAccountId = lazy(() => import("./pages/login/FindAccountId"));
const FindAccountPassword = lazy(() => import("./pages/login/FindAccountPassword"));
const FindAccountPasswordDetail = lazy(() => import("./pages/login/FindAccountPasswordDetail"));
const MyPageLayout = lazy(() => import("./components/mypage/MyPageLayout"));
const ReservationWindow = lazy(() => import("./components/product/ReservationWindow"));
const PaymentSuccess = lazy(() => import("./components/payments/PaymentSuccess"));
const PaymentFail = lazy(() => import("./components/payments/PaymentFail"));
const Reviews = lazy(() => import("./components/mypage/Reviews"));
const Like = lazy(() => import("./components/mypage/Like"));
const Modify = lazy(() => import("./components/mypage/Modify"));
const PasswordChange = lazy(() => import("./components/mypage/PasswordChange"));
const Booking = lazy(() => import("./components/mypage/Booking"));
const KeywordSearchPage = lazy(() => import("./pages/search/KeywordSearchPage"));

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    ChannelService.loadScript();
    ChannelService.boot({
        pluginKey: window.env.REACT_APP_CHANNELTALK_PLUGIN_KEY,
    });

    // Header와 Footer를 숨길 경로 목록
    const hiddenLayoutRoutes = [
        "/login",
        "/register",
        "/reservation",
        "/register/joinuser",
        "/register/join-user",
        "/register/join-team",
        "/register/agree-user",
        "/register/agree-team",
        "/register/genre-select",
        "/payment/success",
    ];

    const isHiddenLayout = hiddenLayoutRoutes.some((path) => location.pathname.startsWith(path));

    // Redux에서 로그인 상태 복구 & 페이지 변경 시 로딩 적용
    useEffect(() => {
        console.log("📌 App.js useEffect 실행: location =", location.pathname);
        setLoading(true);
        const fetchData = async () => {
            await dispatch(initializeAuth());
            setLoading(false);
        };
        fetchData();
    }, [location.pathname, dispatch]);

    return (
        <div className="App">
            {/* Suspense를 사용하여 페이지 로딩 시 로딩 스피너 표시 */}

            {!isHiddenLayout && <Header />}
            <ScrollToTop />
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={<MainPages />} />

                    {/* 로그인 & 회원가입 */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<JoinSelectAuthorization />} />
                    <Route path="/register/join/:userType" element={<JoinUser />} />
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
                        <Route path="password-change" element={<PasswordChange />} />
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

                    {/* 토스페이먼츠 */}
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/fail" element={<PaymentFail />} />
                </Routes>
            </Suspense>

            <KakaoChannelButton />
            {!isHiddenLayout && <Footer />}
        </div>
    );
}

export default App;
