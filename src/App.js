import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPages from "./pages/MainPages";
import Kakao from './components/Kakao';
import LoginPage from "./pages/Login";
import JoinForm from "./pages/Join";
import Ranking from "./pages/RankingPages";

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPages />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<JoinForm />} />

                <Route path="/ranking" element={<Ranking />}/>

                {/*<Route path="/register/Team" element={<Join-Team />} />*/}
                {/*<Route path="loginSearch" element={< />} />*/}
            </Routes>

            <Kakao />
            <Footer/>
        </div>
    );
}

export default App;
