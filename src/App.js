import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Share/Header";
import Footer from "./components/Share/Footer";
import MainPages from "./pages/MainPages";
import LoginPage from "./pages/Login/Login";
import JoinSelectAuthorization from "./pages/Login/JoinSelectAuthorization";
import JoinUser from "./pages/Login/JoinUser";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import NaverRedirectPage from "./pages/NaverRedirectPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import Ranking from "./pages/RankingPages";
import ProductDetail from "./pages/ProductDetailPage";
import FindAccountId from "./pages/Login/FindAccountId";
import FindAccountPassword from "./pages/Login/FindAccountPassword";
import FindAccountPasswordDetail from "./pages/Login/FindAccountPasswordDetail";
import JoinTeam from "./pages/Login/JoinTeam";
import TeamAgree from "./pages/Login/TeamAgree";
import UserAgree from "./pages/Login/UserAgree";
import ReservationWindow from "./components/ReservationWindow";

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPages />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<JoinSelectAuthorization />} />
                <Route path="/register/JoinUser" element={<JoinUser />} />
                <Route path="/register/JoinTeam" element={<JoinTeam />} />
                <Route path="/register/AgreeUser" element={<UserAgree />} />
                <Route path="/register/AgreeTeam" element={<TeamAgree />} />

                <Route path="/member/kakaoMap" element={<KakaoRedirectPage />} />
                <Route path="/member/naver" element={<NaverRedirectPage />} />
                <Route path="/member/google" element={<GoogleRedirectPage />} />
                <Route path="/ranking" element={<Ranking />}/>

                <Route path="/product/:festivalId" element={<ProductDetail />} />

                <Route path="/reservation" element={<ReservationWindow />} />


                {/*  계정 찾기  */}
                <Route path="/account/findId" element={<FindAccountId />} />
                <Route path="/account/findPassword" element={<FindAccountPassword />} />
                <Route path="/account/findPassword/detail" element={<FindAccountPasswordDetail />} />

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
