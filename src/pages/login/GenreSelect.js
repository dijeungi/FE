import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { joinUserPost } from "../../api/LoginApi";

const GenreSelect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // JoinUser에서 받은 데이터
    const [formData, setFormData] = useState(location.state || {});

    console.log("📢 이전 단계에서 받은 데이터:", formData);

    // 좋아하는 장르 선택
    const [selectedGenres, setSelectedGenres] = useState({
        favorite1: "",
        favorite2: "",
        favorite3: "",
    });

    const handleGenreChange = (e, key) => {
        setSelectedGenres((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!selectedGenres.favorite1 || !selectedGenres.favorite2 || !selectedGenres.favorite3) {
            Swal.fire({ icon: "warning", title: "좋아하는 장르를 모두 선택해주세요." });
            return;
        }

        // 기본 데이터
        const requestData = {
            id: formData.id,
            userName: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            userBirth: formData.userBirth,
            favorite1: selectedGenres.favorite1,
            favorite2: selectedGenres.favorite2,
            favorite3: selectedGenres.favorite3,
            mailYn: formData.mailYn || "N",
        };

        // ✅ 팀 가입자의 경우 추가 데이터 포함
        if (formData.userType === "team") {
            requestData.teamName = formData.teamName;
            requestData.teamMembers = formData.teamMembers;
        }

        console.log("📢 최종 전송 데이터:", requestData);

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
            <h2>좋아하는 장르를 선택해주세요</h2>

            <div>
                <label>1순위</label>
                <select onChange={(e) => handleGenreChange(e, "favorite1")}>
                    <option value="">선택</option>
                    <option value="Rock">Rock</option>
                    <option value="Pop">Pop</option>
                    <option value="Jazz">Jazz</option>
                </select>
            </div>

            <div>
                <label>2순위</label>
                <select onChange={(e) => handleGenreChange(e, "favorite2")}>
                    <option value="">선택</option>
                    <option value="Rock">Rock</option>
                    <option value="Pop">Pop</option>
                    <option value="Jazz">Jazz</option>
                </select>
            </div>

            <div>
                <label>3순위</label>
                <select onChange={(e) => handleGenreChange(e, "favorite3")}>
                    <option value="">선택</option>
                    <option value="Rock">Rock</option>
                    <option value="Pop">Pop</option>
                    <option value="Jazz">Jazz</option>
                </select>
            </div>

            {/* 가입 완료 버튼 */}
            <button className="JoinButton" onClick={handleSubmit}>
                가입 완료
            </button>
        </div>
    );
};

export default GenreSelect;
