import { Route, Routes } from 'react-router-dom';

import './App.css'

import Header from "./components/Header";
import MainScreen from "./components/MainScreen";

function App() {

    return (
        <div className="App">

            <Header/>

            <Routes>
                <Route path="/" element={<MainScreen />} />
            </Routes>

        </div>
    );
}

export default App;
