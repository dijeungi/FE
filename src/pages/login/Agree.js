import { useState } from "react";
import "../../styles/login/Agree.css";
import { Link, useParams } from "react-router-dom";

const Agree = () => {
    const { userType } = useParams();
    const nextPage = userType === "team" ? "/register/join-team" : "/register/join-user";

    // 필수 동의 항목 상태 관리
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        finance: false,
        privacy: false,
    });

    // 모든 필수 항목이 체크되었는지 확인
    const isAllChecked = Object.values(checkedItems).every(Boolean);

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (key) => {
        setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <div className="Agree_Container">
            <h2 className="Agree_Title">서비스 이용을 위해 약관에 동의해주세요.</h2>

            {/* 필수 동의 항목 */}
            <div className="Agree_Wrap">
                <h3 className="Agree_SubTitle">
                    아래 항목을 확인하고 <br />
                    필수 약관에 동의해야 가입이 가능합니다.
                </h3>
                <div className="Agree_Essential">
                    <input
                        type="checkbox"
                        className="Agree_Checkbox"
                        checked={checkedItems.terms}
                        onChange={() => handleCheckboxChange("terms")}
                    />
                    <div className="Agree_Text">
                        <span>[필수]</span> 이용약관
                        <small>(서비스 이용을 위한 기본 약관)</small>
                    </div>
                </div>

                <div className="Agree_Essential">
                    <input
                        type="checkbox"
                        className="Agree_Checkbox"
                        checked={checkedItems.finance}
                        onChange={() => handleCheckboxChange("finance")}
                    />
                    <div className="Agree_Text">
                        <span>[필수]</span> 전자금융거래 이용약관
                        <small>(결제 및 금융거래 관련 규정)</small>
                    </div>
                </div>

                <div className="Agree_Essential">
                    <input
                        type="checkbox"
                        className="Agree_Checkbox"
                        checked={checkedItems.privacy}
                        onChange={() => handleCheckboxChange("privacy")}
                    />
                    <div className="Agree_Text">
                        <span>[필수]</span> 개인정보 수집 및 이용 동의
                        <small>(회원 정보 보호 및 관리)</small>
                    </div>
                </div>
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

            {/* 다음단계 버튼 - 필수 항목 체크 시 활성화 */}
            <Link to={isAllChecked ? nextPage : "#"} onClick={(e) => !isAllChecked && e.preventDefault()}>
                <input
                    type="submit"
                    value="다음단계"
                    className={`Agree_NextButton ${isAllChecked ? "active" : ""}`}
                    disabled={!isAllChecked}
                />
            </Link>
        </div>
    );
};

export default Agree;
