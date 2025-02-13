import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPages from "./pages/MainPages";
import Kakao from './components/Kakao';
import LoginPage from "./pages/Login";
import JoinForm from "./pages/Join";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import NaverRedirectPage from "./pages/NaverRedirectPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";
import Ranking from "./pages/RankingPages";
function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPages />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<JoinForm />} />
                <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                <Route path="/member/naver" element={<NaverRedirectPage />} />
                <Route path="/member/google" element={<GoogleRedirectPage />} />
                <Route path="/ranking" element={<Ranking />}/>

                {/*<Route path="/login" element={< />} />*/}
            </Routes>

            <Kakao />
            <Footer/>
        </div>
    );
}

export default App;
