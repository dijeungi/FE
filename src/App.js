import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPages from "./pages/MainPages";
import Kakao from './components/Kakao';

function App() {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPages />} />
            </Routes>

            <Kakao />
            <Footer/>
        </div>
    );
}

export default App;
