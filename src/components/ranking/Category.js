// src/components/ranking/Category.js
import "../../styles/ranking/Category.css";

const Category = ({ activeCategory, onCategoryChange }) => {
    // 고정된 카테고리 매핑 정보
    const categoryMapping = [
        { id: "CT01", name: "전체" },
        { id: "CT02", name: "로맨틱코미디" },
        { id: "CT03", name: "코믹" },
        { id: "CT04", name: "드라마" },
        { id: "CT05", name: "공포/스릴러" },
        { id: "CT06", name: "어린이연극" },
        { id: "CT07", name: "기타" },
    ];

    return (
        <div className="Category_Container">
            <div className="Category_Title">
                <h2>장르별 랭킹</h2>
            </div>
            <menu className="Category_Menu">
                {categoryMapping.map((category) => (
                    <div key={category.id} className="Category_GroupWrap">
                        <button
                            className={`Category_Button ${activeCategory === category.id ? "active" : ""}`}
                            title={category.name}
                            onClick={() => onCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    </div>
                ))}
            </menu>
        </div>
    );
};

export default Category;
