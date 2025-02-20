import React from "react";
import "../styles/Components/LoadingSpinner.css";
import {SyncLoader} from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="spinner-overlay">
            <SyncLoader
                size={15}
                speedMultiplier={0.7}
                color={"#FCA472"}
            />
            <h3>로딩 중입니다. 잠시만 기다려 주세요.</h3>
        </div>
    );
};

export default LoadingSpinner;
