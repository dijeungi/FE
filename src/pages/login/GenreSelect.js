import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { signupPost } from "../../api/LoginApi";

const GenreSelect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // JoinUser에서 받은 데이터
    const [formData, setFormData] = useState(location.state?.formData || {});

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

        // ✅ 서버에서 요구하는 JSON 형식에 맞게 데이터 정리
        const requestData = {
            id: formData.id, // ✅ ID 값 사용
            userName: formData.name, // ✅ userName 추가
            email: formData.email, // ✅ 이메일
            password: formData.password, // ✅ 비밀번호
            phone: formData.phone.replace(/-/g, ""), // ✅ 하이픈 제거 (01012345678)
            favorite1: selectedGenres.favorite1, // ✅ 선택한 장르
            favorite2: selectedGenres.favorite2,
            favorite3: selectedGenres.favorite3,
            mailYn: formData.mailYn || "N", // ✅ 기본값 "N" 설정
        };

        console.log("📢 최종 전송 데이터:", requestData); // ✅ 최종 데이터 확인

        try {
            await signupPost(requestData); // ❌ JSON.stringify() 제거!!

            Swal.fire({ icon: "success", title: "회원가입이 완료되었습니다!" }).then(() => {
                navigate("/login"); // ✅ 로그인 페이지로 이동
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
