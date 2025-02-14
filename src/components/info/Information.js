import {Rating} from "@mui/material";

const Information = ({ festivalData = {} }) => {
    const {
        festivalName = "정보 없음",
        placeName = "정보 없음",
        fromDate = "정보 없음",
        toDate = "정보 없음",
        salePrice = 0,
        postImage = "",
        ranking = "정보 없음",
        runningTime = "정보 없음",
        age = "정보 없음"
    } = festivalData;

    const ratingValue = 4.5;

    return (
        <div className="Information-wrap">
            <h1 className="Information-h1">{festivalName}</h1>
            <strong>연극 주간 {ranking}위</strong>
            <div className="rating-wrap">
                <Rating value={ratingValue} precision={0.5} readOnly />
                <span>{ratingValue.toFixed(1)}</span>
            </div>
            <div className="information-box">
                <img src={postImage} className="Information-img" alt="연극 이미지" />
                <table>
                    <tbody>
                    <tr><th>장소</th><td>{placeName}</td></tr>
                    <tr><th>기간</th><td>{fromDate} ~ {toDate === '9999-12-31' ? '오픈런' : toDate}</td></tr>
                    <tr><th>러닝타임</th><td>{runningTime}분</td></tr>
                    <tr><th>관람연령</th><td>{age}세 이상</td></tr>
                    <tr>
                        <th>가격</th>
                        <td>
                            <p className="information-red-text">할인 적용가 {salePrice.toLocaleString()}원</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button className="information-btn1">예매하기</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Information;
