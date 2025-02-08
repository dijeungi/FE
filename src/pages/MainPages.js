import MainBanner from "../components/MainBanner";
import "../styles/Main/MainPages.css";
import {useNavigate} from "react-router-dom";

const categories = [
    { name: "뮤지컬", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: "콘서트", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
    { name: " ", image: "https://via.placeholder.com/300", link: "/category1" },
]

export default function MainPages() {

    const navigate = useNavigate();

    return (
        <div className="MainPages_Container">
            <MainBanner />

            <div className="category-bar">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="category-item"
                        onClick={() => navigate(category.link)}
                        style={{ backgroundImage: `url(${category.image})` }}
                    >
                        <div className="category-overlay"></div>
                        <span className="category-text">{category.name}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
