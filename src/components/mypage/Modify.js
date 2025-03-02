import { useState, useEffect } from "react";
import "../../styles/mypage/Modify.css";
import { updateMemberInfo, getMemberInfo, getDeleteMember } from "../../api/UserApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/LoginSlice";

export default function Modify({ userId }) {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        userId: "",
        userName: "",
        userPhone: "",
        email: "",
        userBirth: "",
        emailAlarm: "Y",
        userFavorite1: "",
        userFavorite2: "",
        userFavorite3: "",
    });

    const handleDeleteAccount = async () => {
        if (!window.confirm("정말로 회원 탈퇴를 진행하시겠습니까?")) return;

        try {
            await getDeleteMember(userId);
            dispatch(logout());
            alert("회원 탈퇴가 완료되었습니다.");
            window.location.href = "/";
        } catch (error) {
            console.error("회원 탈퇴 실패:", error);
            alert("회원 탈퇴에 실패했습니다.");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userId) {
                try {
                    const data = await getMemberInfo(userId);
                    console.log("API 응답 데이터:", data);

                    setUserData({
                        userId: data.id || "",
                        userName: data.name || "",
                        userPhone: data.userPhone || "",
                        email: data.email || "",
                        userBirth: data.userBirth ? formatDateForInput(data.userBirth) : "",
                        emailAlarm: data.emailAlarm || "N",
                        userFavorite1: data.userFavorite1 || "",
                        userFavorite2: data.userFavorite2 || "",
                        userFavorite3: data.userFavorite3 || "",
                    });
                } catch (error) {
                    console.error("회원 정보 불러오기 실패:", error);
                }
            }
        };
        fetchUserInfo();
    }, [userId]);

    const formatDateForInput = (dateString) => {
        if (!dateString || dateString.length !== 8) return "";
        return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // 장르 매핑
    const genreMapping = {
        로맨틱코미디: "CT02",
        코믹: "CT03",
        드라마: "CT04",
        "공포/스릴러": "CT05",
        어린이연극: "CT06",
        기타: "CT07",
    };
    const genres = Object.keys(genreMapping);

    // 선택된 장르 필터링
    const getFilteredGenres = (excludedGenres) => {
        return genres.filter((genre) => !excludedGenres.includes(genre));
    };

    const handleGenreChange = (e, key) => {
        setUserData((prevState) => ({
            ...prevState,
            [key]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedData = {
                ...userData,
                userBirth: userData.userBirth.replace(/-/g, ""),
                userFavorite1: genreMapping[userData.userFavorite1] || "",
                userFavorite2: genreMapping[userData.userFavorite2] || "",
                userFavorite3: genreMapping[userData.userFavorite3] || "",
            };

            console.log("수정완료된 데이터들:", formattedData);

            await updateMemberInfo(formattedData);
            alert("회원 정보가 성공적으로 수정되었습니다.");
        } catch (error) {
            console.error("회원정보 수정 실패:", error);
            alert("회원정보 수정에 실패했습니다.");
        }
    };

    return (
        <>
            <div className="Modify_Title">회원정보 수정</div>
            <div className="Modify_Container">
                <form className="Modify_Form" onSubmit={handleSubmit}>
                    <label>아이디 (수정 불가):</label>
                    <input type="text" name="userId" value={userData.userId} disabled />

                    <label>이름:</label>
                    <input
                        type="text"
                        name="userName"
                        value={userData.userName || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>전화번호:</label>
                    <input
                        type="text"
                        name="userPhone"
                        value={userData.userPhone || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>이메일:</label>
                    <input type="email" name="email" value={userData.email || ""} onChange={handleChange} required />

                    <label>생년월일:</label>
                    <input
                        type="date"
                        name="userBirth"
                        value={userData.userBirth || ""}
                        onChange={handleChange}
                        required
                    />

                    <label>이메일 알림:</label>
                    <select name="emailAlarm" value={userData.emailAlarm} onChange={handleChange}>
                        <option value="Y">수신</option>
                        <option value="N">거부</option>
                    </select>

                    {/* 관심 장르 선택 추가 */}
                    <label>관심 장르 1순위:</label>
                    <select
                        name="userFavorite1"
                        value={userData.userFavorite1}
                        onChange={(e) => handleGenreChange(e, "userFavorite1")}
                    >
                        <option value="">선택</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                    <label>관심 장르 2순위:</label>
                    <select
                        name="userFavorite2"
                        value={userData.userFavorite2}
                        onChange={(e) => handleGenreChange(e, "userFavorite2")}
                    >
                        <option value="">선택</option>
                        {getFilteredGenres([userData.userFavorite1]).map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                    <label>관심 장르 3순위:</label>
                    <select
                        name="userFavorite3"
                        value={userData.userFavorite3}
                        onChange={(e) => handleGenreChange(e, "userFavorite3")}
                    >
                        <option value="">선택</option>
                        {getFilteredGenres([userData.userFavorite1, userData.userFavorite2]).map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="Modify_Button">
                        수정 완료
                    </button>
                </form>
            </div>
            <div className="Delete_Button_Wrap">
                <button type="button" className="Delete_Button" onClick={handleDeleteAccount}>
                    회원탈퇴
                </button>
            </div>
        </>
    );
}
