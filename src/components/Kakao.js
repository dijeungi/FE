// src/components/Kakao.js

import '../styles/Kakao.css';
import KakaoImg from '../img/kakao.png';

const FloatingImage = ({ onClick }) => (
    <div className="floating-image" onClick={onClick}>
        <img src={KakaoImg} alt="Floating Kakao" className="floating-image-img" />
    </div>
);

const Kakao = () => {
    const handleClick = () => {
        window.open('https://open.kakao.com/o/sN3lpt8g', '_blank');
    };

    return (
        <div className="kakao-container">
            <FloatingImage onClick={handleClick} />
        </div>
    );
};

export default Kakao;
