import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Header from "./components/Share/Header";
import Footer from "./components/Share/Footer";

import MainPages from "./pages/MainPages";
import LoginPage from "./pages/Login/Login";
import JoinSelectAuthorization from "./pages/Login/JoinSelectAuthorization";
import JoinUser from "./pages/Login/JoinUser";
import JoinTeam from "./pages/Login/JoinTeam";
import UserAgree from "./pages/Login/UserAgree";
import TeamAgree from "./pages/Login/TeamAgree";

import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import NaverRedirectPage from "./pages/NaverRedirectPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";

import Ranking from "./pages/RankingPages";
import ProductDetail from "./pages/ProductDetailPage";

import FindAccountId from "./pages/Login/FindAccountId";
import FindAccountPassword from "./pages/Login/FindAccountPassword";
import FindAccountPasswordDetail from "./pages/Login/FindAccountPasswordDetail";

import ReservationWindow from "./components/Share/ReservationWindow";
import PaymentSuccess from "./components/payments/PaymentSuccess";
import PaymentFail from "./components/payments/PaymentFail";
import ScrollToTop from "./components/ScrollToTop";
import {useEffect, useState} from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import KakaoChannelButton from "./components/Share/KakaoChatButton";

function App() {
    const location = useLocation();
    const isReservationPage = location.pathname.startsWith("/reservation");

    // loading
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="App">
            {/* ✅ 예매 페이지가 아닐 때만 Header 표시 */}
            {loading && <LoadingSpinner />}
            {!isReservationPage && <Header />}
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

                {/* 소셜 로그인 리다이렉트 */}
                <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                <Route path="/member/naver" element={<NaverRedirectPage />} />
                <Route path="/member/google" element={<GoogleRedirectPage />} />

                {/* 기타 페이지 */}
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/product/:festivalId" element={<ProductDetail />} />
                <Route path="/reservation" element={<ReservationWindow />} />

                {/* 계정 찾기 */}
                <Route path="/account/findId" element={<FindAccountId />} />
                <Route path="/account/findPassword" element={<FindAccountPassword />} />
                <Route path="/account/findPassword/detail" element={<FindAccountPasswordDetail />} />

                {/*토스페이먼츠*/}
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
            </Routes>

            {location.pathname === "/" && <KakaoChannelButton/>}

            {/* ✅ 예매 페이지가 아닐 때만 Footer 표시 */}
            {!isReservationPage && <Footer />}
        </div>
    );
}

export default App;
