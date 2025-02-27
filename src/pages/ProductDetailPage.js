// src/pages/ProductDetailPage.js

// React & 관련 라이브러리
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// Redux 관련
import { fetchFestivalDetail } from "../redux/DetailSlice";

// API 호출
import { getFestivalDetailTimeDate } from "../api/festivalApi";
import { getLikeCount, getIsLiked, postLike, deleteLike } from "../api/likeApi";

// 유틸리티 (쿠키, 로컬스토리지)
import { getUserIdCookie } from "../utils/Cookie";

// 스타일
import "../styles/info/Information.css";
import "../styles/info/Calendar.css";
import "../styles/info/KakaoMap.css";

// UI 라이브러리
import { Rating } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Calendar from "react-calendar";

// 컴포넌트
import DetailFooter from "../components/product/DetailFooter";

// KakaoMap
const { kakao } = window;

const ProductDetailPage = () => {
    const { festivalId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 사용자 정보 가져오기 (Redux + 쿠키)
    const userId = useSelector((state) => state.loginSlice.id) || getUserIdCookie();

    // Redux에서 공연 상세 정보 가져오기
    const { festivalDetails, totalStar, placeLocation } = useSelector((state) => state.detail);

    // 상태 관리
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [festivalTimeData, setFestivalTimeData] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [selectedDateId, setSelectedDateId] = useState(null);

    // Kakao 지도 관련 Ref
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // festivalDetails 데이터 추출
    const {
        festivalName = "",
        ranking = "",
        fromDate = "",
        toDate = "",
        festivalPrice = 0,
        salePrice = 0,
        postImage = "",
        runningTime = "",
        age = "",
        placeDetailName = "",
        imgSrc1 = "",
        imgSrc2 = "",
        imgSrc3 = "",
    } = festivalDetails || {};

    // Kakao 지도 열기/닫기
    const toggleMap = () => {
        setIsMapOpen((prevState) => !prevState);
    };

    // 날짜 선택 시 공연 시간 불러오기
    const handleDateChange = async (date) => {
        console.log("📅 선택한 날짜:", date);

        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedDateId(null); // ✅ 날짜 바뀌면 DateId 초기화 (주의)

        try {
            const formattedDate = date
                .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })
                .replace(/\. /g, "-")
                .replace(".", "");

            console.log("🕒 포맷팅된 날짜:", formattedDate);

            const timeData = await getFestivalDetailTimeDate(festivalId, formattedDate);
            console.log("📡 서버에서 받아온 timeData:", timeData);

            setFestivalTimeData(
                timeData?.timeDTOS?.map((item) => ({
                    ...item,
                    time: item.time.slice(0, 5),
                    dateId: item.id,
                })) || []
            );

            console.log("✅ 공연 시간 데이터 업데이트 완료:", timeData.timeDTOS);
        } catch (error) {
            console.error("❌ 공연 시간 데이터 불러오기 실패:", error);
            setFestivalTimeData([]);
        }
    };

    // 공연 시간 선택
    const handleTimeClick = (time, dateId) => {
        console.log("⏰ 클릭한 시간:", time);
        console.log("📌 클릭한 DateId:", dateId);

        if (!dateId) {
            console.error("❌ DateId가 undefined입니다! 데이터 확인 필요");
            return;
        }

        setSelectedTime((prev) => {
            const newTime = prev === time ? null : time;
            console.log("🔄 선택한 시간 업데이트됨:", newTime);
            return newTime;
        });

        setSelectedDateId((prev) => {
            const newDateId = prev === dateId ? null : dateId;
            console.log("🔄 선택한 DateId 업데이트됨:", newDateId);
            return newDateId;
        });

        console.log("✅ 최종 저장된 selectedDateId:", dateId);
    };

    // 예매 버튼 활성화 여부
    const isButtonEnabled = selectedDate && selectedTime;

    // 별점 평균 계산
    const ratingValue = totalStar?.["별점 총점"] || 0;

    // 예매하기 버튼 클릭
    const handleReservationClick = () => {
        if (!userId) {
            Swal.fire({
                toast: true,
                position: "top",
                icon: "warning",
                title: "로그인이 필요합니다.",
                timer: 3000,
                timerProgressBar: true,
                allowOutsideClick: false,
                showConfirmButton: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }

        console.log("🛒 예매하기 버튼 클릭!");
        console.log("📅 선택한 날짜 (로컬 시간):", selectedDate);
        console.log("📌 선택한 DateId:", selectedDateId);

        if (!selectedDate || !selectedTime || !selectedDateId) {
            console.error("❌ 예매 실패: 날짜, 시간 또는 DateId가 없습니다.");
            return;
        }

        // ✅ `toISOString()` 대신 `toLocaleDateString()` 사용
        const formattedDate = selectedDate
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, "-")
            .replace(".", "");

        console.log("🚀 URL에 포함되는 날짜:", formattedDate);

        const queryParams = new URLSearchParams({
            festivalId,
            festivalName: encodeURIComponent(festivalDetails?.festivalName || ""),
            selectedDate: formattedDate, // ✅ 변환된 날짜 사용
            selectedTime: selectedTime || "",
            dateId: selectedDateId,
            salePrice: festivalDetails?.salePrice || 0,
            poster: encodeURIComponent(festivalDetails?.postImage || ""),
        }).toString();

        console.log("🔗 최종 URL 파라미터:", queryParams);
        // 테스트용
        navigate(`/reservation?${queryParams}`);
        // window.open(`/reservation?${queryParams}`, "_blank", "width=980,height=745,resizable=no,scrollbars=no");
    };

    // 좋아요 데이터 불러오기 & 공연 상세 정보 가져오기
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!userId) return;

            try {
                const count = await getLikeCount(festivalId);
                const likedStatus = await getIsLiked(userId, festivalId);
                setLikeCount(count);
                setIsLiked(likedStatus);
            } catch (error) {
                console.error("❌ 좋아요 데이터 불러오기 실패:", error);
            }
        };

        if (festivalId) {
            dispatch(fetchFestivalDetail({ festivalId, userId }));
            fetchLikeData();
        }

        handleDateChange(selectedDate);

        if (isMapOpen && kakao && kakao.maps && mapRef.current) {
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 위치: 서울시청
                level: 3,
            });

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(placeLocation, (result, status) => {
                if (status === kakao.maps.services.Status.OK && result.length > 0) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    map.setCenter(coords);

                    if (markerRef.current) markerRef.current.setMap(null);
                    markerRef.current = new kakao.maps.Marker({ position: coords, map: map });
                }
            });
        }
    }, [festivalId, userId, selectedDate, isMapOpen, placeLocation]);

    // 좋아요 버튼 클릭
    const handleLikeClick = async () => {
        if (!userId) {
            Swal.fire({
                toast: true,
                position: "top",
                icon: "warning",
                title: "로그인이 필요합니다.",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        try {
            if (isLiked) {
                await deleteLike(userId, festivalId);
                setLikeCount((prev) => Math.max(prev - 1, 0)); // 좋아요 감소
            } else {
                await postLike(userId, festivalId);
                setLikeCount((prev) => prev + 1); // 좋아요 증가
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("❌ 좋아요 처리 실패:", error);
        }
    };

    return (
        <div className="Information_Container">
            <div className="Information_Wrap">
                <div className="Information_ProductMain">
                    <div className="Information_MainTop">
                        <div className="Information_TopHeader">
                            <div className="Information_BadgeList">
                                <a className="Information_BadgePopup" role="button">
                                    좌석우위
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M4.53506 3L7.5 5.98237L4.5 9"
                                            stroke="#29292D"
                                            strokeOpacity="0.8"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </a>
                                <a className="badgeItem Information_BadgePopup" role="button">
                                    예매대기
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            d="M4.53506 3L7.5 5.98237L4.5 9"
                                            stroke="#29292D"
                                            strokeOpacity="0.8"
                                            strokeWidth="1.5"
                                            strokeLinecap="Round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                            <h2 className="Information_Title">{festivalDetails?.festivalName}</h2>

                            <div className="Information_Rating">
                                <div className="Information_TagText">
                                    <p>연극 주간 {ranking}위 ·</p>
                                </div>
                                <Rating
                                    className="Information_RatingValue"
                                    value={ratingValue}
                                    precision={0.5}
                                    readOnly
                                />
                                <span className="Information_RatingScore">{ratingValue.toFixed(1)}</span>
                            </div>
                            <span>{ratingValue.toFixed(1)}</span>
                        </div>

                        <div className="Information_Body">
                            <div className="Information_PosterBox">
                                <div className="Information_PosterBoxTop">
                                    <img src={postImage} className="Information_PosterBoxImage" alt="연극 이미지" />
                                </div>

                                <div className="Information_PosterBoxBottom">
                                    <div className="Information_CastHeart">
                                        <div className="Information_CastWrap">
                                            <a className="Information_CastBtn" onClick={handleLikeClick}>
                                                {isLiked ? (
                                                    <Favorite className="Information_HeartOn" />
                                                ) : (
                                                    <FavoriteBorder className="Information_HeartOff" />
                                                )}
                                                티켓캐스트
                                            </a>
                                            <div className="Information_HoverCast">
                                                <div className="Information_PopupWrap">
                                                    <div className="Information_PopupHead">
                                                        <strong className="Information_PopupTitle">
                                                            티켓캐스트란?
                                                        </strong>
                                                    </div>
                                                    <div className="Information_PopupBody">
                                                        <p>
                                                            관심공연, 관심인물을 등록하시면 모바일 알림과 이메일로
                                                            <br />
                                                            티켓오픈일을 알려드리는 맞춤형 티켓정보입니다.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="Information_CastNum">{likeCount}</p>
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
                                                        style={{ width: "24px", height: "24px" }}
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
                                                        style={{ width: "24px", height: "24px" }}
                                                    />
                                                </IconButton>
                                            </li>

                                            <li className="Information_ShareItem">
                                                <IconButton
                                                    aria-label="kakaoMap"
                                                    onClick={() =>
                                                        window.open("https://developers.kakao.com/", "_blank")
                                                    }
                                                >
                                                    <img
                                                        src="data:image/png;base64,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"
                                                        alt="Kakao"
                                                        style={{ width: "24px", height: "24px" }}
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
                                    <p className="Information_InfoDesc clickable-text" onClick={toggleMap}>
                                        {placeDetailName.length > 12 ? (
                                            <>
                                                {placeDetailName.slice(0, 12)}
                                                <br />
                                                {placeDetailName.slice(12)}
                                            </>
                                        ) : (
                                            placeDetailName
                                        )}
                                        <span>(지도보기)</span>
                                    </p>
                                </li>
                                <li className="Information_InfoItem">
                                    <strong className="Information_InfoLabel">공연기간</strong>
                                    <p className="Information_InfoDesc">
                                        {fromDate} ~ {toDate === "9999-12-31" ? "오픈런" : toDate}
                                    </p>
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
                                    <p className="Information_InfoDesc">{salePrice.toLocaleString()}원</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <DetailFooter
                        festivalId={festivalId}
                        festivalDetails={festivalDetails}
                        totalStar={totalStar}
                        placeLocation={placeLocation}
                        festivalName={festivalName}
                        ranking={ranking}
                        fromDate={fromDate}
                        toDate={toDate}
                        // festivalPrice={festivalPrice}
                        // salePrice={salePrice}
                        // postImage={postImage}
                        runningTime={runningTime}
                        age={age}
                        placeDetailName={placeDetailName}
                        castingList={useSelector((state) => state.detail.castingList)}
                        imgSrc1={imgSrc1}
                        imgSrc2={imgSrc2}
                        imgSrc3={imgSrc3}
                    />
                </div>

                {/* 캘린더 */}
                <div className="Calendar_Container">
                    <div className="Calendar_Sticky">
                        <div className="Calendar_Main">
                            <div className="">
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
                                            tileClassName={({ date }) => {
                                                const today = new Date().setHours(0, 0, 0, 0);
                                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                                const isPastDate = date < today;
                                                const isSunday = date.getDay() === 0;
                                                const threeMonthsLater = new Date(today);
                                                threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 1);

                                                if (isSelected) return "selected-date";
                                                if (isPastDate && isSunday) return "past-sunday";
                                                if (isPastDate) return "past-date";
                                                if (date > threeMonthsLater && isSunday)
                                                    return "future-sunday-disabled";
                                                if (date > threeMonthsLater) return "future-disabled";
                                                if (isSunday) return "future-sunday";
                                                return "future-date";
                                            }}
                                            tileDisabled={({ date }) => {
                                                const today = new Date().setHours(0, 0, 0, 0);
                                                const threeMonthsLater = new Date(today);
                                                threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 1);

                                                return date < today || date > threeMonthsLater;
                                            }}
                                            navigationLabel={({ date }) => (
                                                <span style={{ cursor: "default" }}>
                                                    {date.toLocaleDateString("ko-KR", {
                                                        year: "numeric",
                                                        month: "long",
                                                    })}
                                                </span>
                                            )}
                                            showNeighboringMonth={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="Calendar_SideWrap">
                                <div className="Calendar_SideHeader">
                                    <h4 className="Calendar_SideTitle">회차</h4>
                                </div>
                                <div className="Calendar_Content">
                                    <div className="Calendar_SideTimeTable">
                                        <ul className="Calendar_TimeTableList">
                                            {festivalTimeData.length > 0 ? (
                                                festivalTimeData.map((time, index) => (
                                                    <li key={index} className="Calendar_TimeTableItem">
                                                        <button
                                                            className={`Calendar_TimeTableLabel ${
                                                                selectedTime === time.time ? "selected" : ""
                                                            }`}
                                                            onClick={() => handleTimeClick(time.time, time.dateId)} // ✅ dateId 전달 확인!
                                                        >
                                                            {`${index + 1}회 ${time.time}`}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <p>해당 날짜에 공연 시간이 없습니다.</p>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="Calendar_SideWrap Calendar_WrapBottom">
                                <div className="Calendar_SideHeader">
                                    <p className="Calendar_SideSubTitle">
                                        * 예매 후 변경 및 환불은 규정에 따라 진행되며
                                        <br />
                                        공연 24시간 전까지만 가능합니다.
                                        <br />
                                        <br />
                                        모바일 티켓을 사용하면 빠른 입장이 가능합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            className={`Reservation_Button ${isButtonEnabled ? "active" : "disabled"}`}
                            disabled={!isButtonEnabled}
                            onClick={handleReservationClick}
                        >
                            예매하기
                        </button>
                    </div>
                </div>
            </div>

            {/*Kakao Map*/}
            {isMapOpen && (
                <div id="KakaoMap_Popup" className="KakaoMap_PopupContainer">
                    <div className="KakaoMap_Wrap">
                        <div className="KakaoMap_Head">
                            <strong className="KakaoMap_Title">공연장 정보</strong>
                            <button className="KakaoMap_CloseBtn" onClick={toggleMap}>
                                <span className="blind">닫기</span>
                            </button>
                        </div>
                        <div className="KakaoMap_Body">
                            <div className="KakaoMap_PlaceWrap">
                                <div className="KakaoMap_PlaceTitle">
                                    <span className="KakaoMap_PlaceName">{placeDetailName}</span>
                                </div>
                                <div className="KakaoMap_PlaceInfo">
                                    <p>
                                        전화번호 : <span>"공연정보" 에서 확인해주세요.</span>
                                    </p>
                                    <p>
                                        주소 : <span>{placeLocation}</span>
                                    </p>
                                </div>
                                <div className="KakaoMap_PlaceMap">
                                    <div
                                        id="map"
                                        ref={mapRef}
                                        tabIndex="0"
                                        style={{ width: "660px", height: "440px" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
