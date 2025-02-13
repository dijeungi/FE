// src/components/Ranking/MiniBanner.js
import "../../styles/Ranking/Category.css";

export default function Category() {
    return (
        <div className="Category_Container">
            <h2 className="Category_Title">장르별 랭킹</h2>
            <menu className="Category_Menu">
                <button className="Category_Button">로맨틱코미디</button>
                <button className="Category_Button">코믹</button>
                <button className="Category_Button">드라마</button>
                <button className="Category_Button">공포</button>
                <button className="Category_Button">어린이연극</button>
                <button className="Category_Button">기타</button>
            </menu>
        </div>
    );
}