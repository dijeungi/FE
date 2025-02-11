import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPages from "./pages/MainPages";
import Kakao from './components/Kakao';
import LoginPage from "./pages/Login";
import JoinForm from "./pages/Join";

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPages />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<JoinForm />} />

                {/*<Route path="/login" element={< />} />*/}
            </Routes>

            <Kakao />
            <Footer/>
        </div>
    );
}

export default App;
