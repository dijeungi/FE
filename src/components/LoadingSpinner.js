import React from "react";
import "../styles/Components/LoadingSpinner.css";
import { MoonLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="Spinner_Container">
            <div className="spinner-overlay">
                <MoonLoader size={50} speedMultiplier={0.7} color={"#2e88ff"} />
                <h3>로딩 중입니다...</h3>
            </div>
        </div>
    );
};

export default LoadingSpinner;
