import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { joinUserPost } from "../../api/LoginApi";
import "../../styles/login/Genreselect.css";

const GenreSelect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(location.state || {});
    const [selectedGenres, setSelectedGenres] = useState({
        favorite1: "",
        favorite2: "",
        favorite3: "",
    });

    // 장르와 코드 매핑
    const genreMapping = {
        로맨틱코미디: "CT02",
        코믹: "CT03",
        드라마: "CT04",
        "공포/스릴러": "CT05",
        어린이연극: "CT06",
        기타: "CT07",
    };

    const genres = Object.keys(genreMapping);

    const handleGenreChange = (e, key) => {
        setSelectedGenres((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const getFilteredGenres = (excludedKeys) => {
        return genres.filter((genre) => !excludedKeys.includes(genre));
    };

    const handleSubmit = async () => {
        if (!selectedGenres.favorite1 || !selectedGenres.favorite2 || !selectedGenres.favorite3) {
            Swal.fire({
                icon: "warning",
                title: "선호하는 장르를 모두 선택해주세요.",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });

            return;
        }

        const requestData = {
            id: formData.id,
            userName: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userBirth: formData.userBirth,
            favorite1: genreMapping[selectedGenres.favorite1],
            favorite2: genreMapping[selectedGenres.favorite2],
            favorite3: genreMapping[selectedGenres.favorite3],
            mailYn: formData.mailYn || "N",
        };

        if (formData.userType === "team") {
            requestData.teamName = formData.teamName;
            requestData.teamMembers = formData.teamMembers;
        }

        try {
            await joinUserPost(requestData);
            Swal.fire({ icon: "success", title: "회원가입이 완료되었습니다!" }).then(() => {
                navigate("/login");
            });
        } catch (error) {
            console.error("❌ 회원가입 실패:", error);
            Swal.fire({ icon: "error", title: "회원가입 실패", text: "다시 시도해주세요." });
        }
    };

    return (
        <div className="GenreSelect_Container">
            <h2>
                선호하는 장르를 선택해주세요.
                <br />
                <span>* 선택한 장르에 맞춘 맞춤 추천 서비스로 준비해드리겠습니다 !</span>
            </h2>

            <div className="Rank">
                <label>1순위:</label>
                <select onChange={(e) => handleGenreChange(e, "favorite1")}>
                    <option value="">선택</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="Rank">
                <label>2순위:</label>
                <select onChange={(e) => handleGenreChange(e, "favorite2")}>
                    <option value="">선택</option>
                    {getFilteredGenres([selectedGenres.favorite1]).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="Rank">
                <label>3순위:</label>
                <select onChange={(e) => handleGenreChange(e, "favorite3")}>
                    <option value="">선택</option>
                    {getFilteredGenres([selectedGenres.favorite1, selectedGenres.favorite2]).map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <button className="GenreSelect_Button" onClick={handleSubmit}>
                가입 완료
            </button>
        </div>
    );
};

export default GenreSelect;
