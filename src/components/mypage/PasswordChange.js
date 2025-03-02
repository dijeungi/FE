import { useState } from "react";
import "../../styles/mypage/PasswordChange.css";
import { getChangePassword } from "../../api/UserApi";

export default function PasswordChange({ userId }) {
    const [passwordData, setPasswordData] = useState({
        beforePassword: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(""); // 오류 메시지 상태
    const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // 비밀번호 확인 체크
        if (passwordData.password !== passwordData.confirmPassword) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await getChangePassword({
                userId,
                beforePassword: passwordData.beforePassword,
                password: passwordData.password,
            });

            setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
            setPasswordData({
                beforePassword: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            setError("비밀번호 변경에 실패했습니다. 기존 비밀번호를 확인하세요.");
        }
    };

    return (
        <>
            <div className="PS_Title">비밀번호 변경</div>
            <div className="PS_Container">
                <form className="PS_Form" onSubmit={handleSubmit}>
                    <label>현재 비밀번호:</label>
                    <input
                        type="password"
                        name="beforePassword"
                        value={passwordData.beforePassword}
                        onChange={handleChange}
                        required
                    />

                    <label>새 비밀번호:</label>
                    <input
                        type="password"
                        name="password"
                        value={passwordData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>새 비밀번호 확인:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    {error && <p className="PS_Error">{error}</p>}
                    {successMessage && <p className="PS_Success">{successMessage}</p>}

                    <button type="submit" className="PS_Button">
                        비밀번호 변경
                    </button>
                </form>
            </div>
        </>
    );
}
