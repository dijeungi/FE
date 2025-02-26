import "../../styles/login/JoinSelectAuthorization.css";

import { Link } from "react-router-dom";

function JoinSelectAuthorization() {
    return (
        <div className="Select_Authorization_Container">
            <p className="Title">
                회원가입을 위해
                <br />
                가입 유형을 선택해주세요.
            </p>

            <Link to="/register/agree/user">
                <input type="button" value="일반 회원" className="Select_Authorization_Button1" />
                <p className="Explanation">
                    * 티켓을 예매하고 연극을 즐기고 싶다면 <span>🎟</span>
                </p>
            </Link>

            <Link to="/register/agree/team">
                <input type="button" value="연극팀 회원" className="Select_Authorization_Button2" />
                <p className="Explanation">* 티켓을 예매하고 연극을 즐기고 싶다면 🎭</p>
            </Link>
        </div>
    );
}

export default JoinSelectAuthorization;
