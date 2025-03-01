import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/login/Agree.css";

const Agree = () => {
    const { userType } = useParams(); // "user" or "team"
    const navigate = useNavigate();

    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        finance: false,
        privacy: false,
    });

    const isAllChecked = Object.values(checkedItems).every(Boolean);

    const handleCheckboxChange = (key) => {
        setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // "다음단계" 클릭 시 단순히 페이지 이동만 수행 (state 제거)
    const handleNextStep = () => {
        if (!isAllChecked) return;
        navigate(`/register/join/${userType}`);
    };

    return (
        <div className="Agree_Container">
            <h2 className="Agree_Title">서비스 이용을 위해 약관에 동의해주세요.</h2>

            <div className="Agree_Wrap">
                <h3 className="Agree_SubTitle">필수 약관에 동의해야 가입이 가능합니다.</h3>

                {[
                    { key: "terms", label: "[필수] 이용약관", desc: "서비스 이용을 위한 기본 약관" },
                    { key: "finance", label: "[필수] 전자금융거래 이용약관", desc: "결제 및 금융거래 관련 규정" },
                    { key: "privacy", label: "[필수] 개인정보 수집 및 이용 동의", desc: "회원 정보 보호 및 관리" },
                ].map((item) => (
                    <div className="Agree_Essential" key={item.key}>
                        <input
                            type="checkbox"
                            className="Agree_Checkbox"
                            checked={checkedItems[item.key]}
                            onChange={() => handleCheckboxChange(item.key)}
                        />
                        <div className="Agree_Text">
                            <span>{item.label}</span>
                            <small>({item.desc})</small>
                        </div>
                    </div>
                ))}
            </div>

            {/* 선택 동의 항목 */}
            <div className="Agree_Wrap">
                <h3 className="Agree_SubTitle">선택 동의 항목</h3>
                {[
                    { label: "개인정보 수집 및 이용 동의", desc: "맞춤 서비스 제공을 위한 선택 동의" },
                    { label: "위치기반서비스 이용약관", desc: "위치 정보를 활용한 서비스 제공" },
                ].map((item, index) => (
                    <div className="Agree_Essential" key={index}>
                        <input type="checkbox" className="Agree_Checkbox" />
                        <div className="Agree_Text">
                            <span>(선택)</span> {item.label}
                            <small>({item.desc})</small>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className={`Agree_NextButton ${isAllChecked ? "active" : ""}`}
                disabled={!isAllChecked}
                onClick={handleNextStep}
            >
                다음단계
            </button>
        </div>
    );
};

export default Agree;
