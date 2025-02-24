// src/components/Ranking/MiniBanner.js
import "../../styles/ranking/Category.css";

export default function Category() {
    return (
        <div className="Category_Container">
            <div className="Category_Title">
                <h2>장르별 랭킹</h2>
            </div>
            <menu className="Category_Menu">
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="전체">
                        전체
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="로맨틱코미디">
                        로맨틱코미디
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="코믹">
                        코믹
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="드라마">
                        드라마
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="공포">
                        공포
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="어린이연극">
                        어린이연극
                    </button>
                </div>
                <div className="Category_GroupWrap">
                    <button className="Category_Button" title="기타">
                        기타
                    </button>
                </div>
            </menu>
        </div>
    );
}
