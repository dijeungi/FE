// src/components/info/UseInfo.js
import '../../styles/info/UseInfo.css';

const UseInfo = ({ setCurrentTab }) => {
    return (
        <div className='Information1Box'>
            <h2>관람시간 정보</h2>
            <strong>[관람시간]</strong>
            <p>월-일 (휴관일 없음)</p>
            <p>오전 10시 - 오후 7시</p>
            <p>매월 마지막주 수요일 문화가 있는날</p>
            <p>오전 10시 - 오후 9시</p>
            <p>관람종료 1시간 전 입장 마감</p>
            <strong>[공휴일 정상개관]</strong>
            <p>5월 5일 부처님 오신날 / 어린이날</p>
            <p>5월 6일 대체 휴일</p>
            <p>6월 6일 현충일</p>

            <h2>할인 정보</h2>
            <p>* 성인 / 청소년 및 어린이 1인 1매 16,500원</p>
            <p>* 단체관람은 02-585-8988 로 문의바랍니다.</p>
        </div>
    );
};

export default UseInfo;
