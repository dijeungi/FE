import React, {useState} from "react";
import '../../styles/info/Information.css';
import {Rating} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
    Favorite,
    FavoriteBorder,
    CalendarMonth,
    AccessTime,
    LocationOn,
    PersonOutline,
    AirlineSeatReclineNormalIcon,
    Discount
} from "@mui/icons-material";

import Calendar from 'react-calendar';

const Information = ({festivalData = {}}) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const isPrevDisabled = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return (
            activeStartDate.getFullYear() === currentYear &&
            activeStartDate.getMonth() <= currentMonth
        );
    };

    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
    };

    const ratingValue = 4.5;

    const {
        festivalName = "정보 없음",
        placeName = "정보 없음",
        fromDate = "정보 없음",
        toDate = "정보 없음",
        festivalPrice = 0,
        salePrice = 0,
        postImage = "",
        ranking = "정보 없음",
        runningTime = "정보 없음",
        age = "정보 없음"
    } = festivalData;

    const placeNameMap = {
        PL01: "지역 전체",
        PL02: "대학로",
        PL03: "서울",
        PL04: "경기·인천",
        PL05: "충청·대전",
        PL06: "경상·대구·부산",
        PL07: "전라·광주",
        PL08: "강원",
        PL09: "제주"
    };

    const regionName = placeNameMap[placeName] || "정보 없음";

    return (
        <div className="Information_Container">
            <div className="Information_Top">
                <div className="Information_TopHeader">
                    <div className="Information_BadgeList">
                        <a className="Information_BadgePopup" role="button">좌석우위
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                 fill="none">
                                <path d="M4.53506 3L7.5 5.98237L4.5 9" stroke="#29292D" strokeOpacity="0.8"
                                      strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </a>
                        <a className="badgeItem Information_BadgePopup" role="button">예매대기
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                 fill="none">
                                <path d="M4.53506 3L7.5 5.98237L4.5 9" stroke="#29292D" strokeOpacity="0.8"
                                      strokeWidth="1.5" strokeLinecap="Round" stroke-linejoin="round"></path>
                            </svg>
                        </a>

                    </div>
                    <h2 className="Information_Title">{festivalName}</h2>
                    <div className="Information_Rating">
                        <div className="Information_TagText">
                            <p>연극 주간 {ranking}위 ·</p>
                        </div>
                        <Rating className="Information_RatingValue" value={ratingValue} precision={0.5} readOnly/>
                        <span className="Information_RatingScore">{ratingValue.toFixed(1)}</span>
                    </div>
                    <span>{ratingValue.toFixed(1)}</span>
                </div>
            </div>
            <div className="Information_Wrap">

                <div className="Information_Left">
                    <div className="Information_PosterBox">
                        <div className="Information_PosterBoxTop">
                            <img src={postImage} className="Information_PosterBoxImage" alt="연극 이미지"/>
                        </div>

                        <div className="Information_PosterBoxBottom">
                            <div className="Information_CastHeart">
                                <div className="Information_CastWrap">
                                    <a className="Information_CastBtn" onClick={handleFavoriteToggle}>
                                        {isFavorite ? (
                                            <Favorite className="Information_HeartOn"/>
                                        ) : (
                                            <FavoriteBorder className="Information_HeartOff"/>
                                        )}
                                        티켓캐스트
                                    </a>
                                    <div className="Information_HoverCast">
                                        <div className="Information_PopupWrap">
                                            <div className="Information_PopupHead">
                                                <strong className="Information_PopupTitle">티켓캐스트란?</strong>
                                            </div>
                                            <div className="Information_PopupBody">
                                                <p>관심공연, 관심인물을 등록하시면 모바일 알림과 이메일로<br/>티켓오픈일을 알려드리는 맞춤형 티켓정보입니다.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="Information_CastNum">API숫자</p>
                            </div>
                            <div className="Information_Share">
                                <ul className="Information_ShareList">
                                    <li className="Information_ShareItem">
                                        <IconButton
                                            aria-label="facebook"
                                            onClick={() => window.open("https://www.facebook.com", "_blank")}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                                alt="Facebook"
                                                style={{width: "24px", height: "24px"}}
                                            />
                                        </IconButton>
                                    </li>
                                    <li className="Information_ShareItem">
                                        <IconButton
                                            aria-label="instagram"
                                            onClick={() => window.open("https://www.instagram.com", "_blank")}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                                alt="Instagram"
                                                style={{width: "24px", height: "24px"}}
                                            />
                                        </IconButton>
                                    </li>
                                    ㄴ
                                    <li className="Information_ShareItem">
                                        <IconButton
                                            aria-label="kakao"
                                            onClick={() => window.open("https://developers.kakao.com/assets/img/about/logos/kakaotalk-sharing-btn-50x50.png", "_blank")}
                                        >
                                            <img
                                                src="data:image/png;base64,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"
                                                alt="Kakao"
                                                style={{width: "24px", height: "24px"}}
                                            />
                                        </IconButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <ul className="Information_Info">
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">장소</strong>
                            <p className="Information_InfoDesc">{regionName}</p>
                        </li>
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">공연기간</strong>
                            <p className="Information_InfoDesc">{fromDate} ~ {toDate === '9999-12-31' ? '오픈런' : toDate}</p>
                        </li>
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">공연시간</strong>
                            <p className="Information_InfoDesc">{runningTime}분</p>
                        </li>
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">관람연령</strong>
                            <p className="Information_InfoDesc">{age}세 이상 관람가</p>
                        </li>
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">가격</strong>
                            <p className="Information_InfoDesc">전석 {festivalPrice.toLocaleString()}원</p>
                        </li>
                        <li className="Information_InfoItem">
                            <strong className="Information_InfoLabel">할인 적용가</strong>
                            <div className="Information_InfoText">
                                <p className="Information_InfoDesc">{salePrice.toLocaleString()}원</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="Calendar_Container">
                    <div className="Calendar_Main">

                        <div className="Calendar_SideWrap Calendar_WrapTop Calendar_SideToogle">
                            <div className="Calendar_SideHeader">
                                <h4 className="Calendar_SideTitle">관람일</h4>
                            </div>
                            <div className="Calendar_Content">
                                <div className="Calendar_SideCalendar">

                                    {/*라이브러리 내부 ClassName 우선순위 설정 및 추가*/}
                                    <Calendar
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        next2Label={null}
                                        prev2Label={null}
                                        calendarType="hebrew"
                                        formatDay={(locale, date) => date.getDate()}
                                        tileClassName={({date}) => {
                                            const today = new Date().setHours(0, 0, 0, 0);
                                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                                            const isPastDate = date < today;
                                            const isSunday = date.getDay() === 0;
                                            const threeMonthsLater = new Date(today);
                                            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

                                            if (isSelected) return 'selected-date';
                                            if (isPastDate && isSunday) return 'past-sunday';
                                            if (isPastDate) return 'past-date';
                                            if (date > threeMonthsLater && isSunday) return 'future-sunday-disabled'; // 3개월 이후 일요일
                                            if (date > threeMonthsLater) return 'future-disabled'; // 3개월 이후 날짜
                                            if (isSunday) return 'future-sunday';
                                            return 'future-date';
                                        }}
                                        tileDisabled={({date}) => {
                                            const today = new Date().setHours(0, 0, 0, 0);
                                            const threeMonthsLater = new Date(today);
                                            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

                                            return date < today || date > threeMonthsLater; // 오늘 이전 및 3개월 이후 날짜는 클릭 불가
                                        }}
                                        navigationLabel={({date}) => (
                                            <span style={{cursor: 'default'}}>
                                                {date.toLocaleDateString('ko-KR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                })}
                                            </span>
                                        )}
                                        showNeighboringMonth={false}
                                    />


                                </div>
                            </div>
                        </div>

                        <div className="Calendar_SideWrap Calendar_WrapMiddle Calendar_SideToogle">

                        </div>
                        <div className="Calendar_SideWrap Calendar_WrapBottom">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Information;
