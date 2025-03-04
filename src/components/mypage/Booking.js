import "../../styles/mypage/Booking.css";
import { getTicketList } from "../../api/TicketApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Paginations from "./Paginations";

const Booking = ({ updateTicketCount }) => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const userId = useSelector((state) => state.loginSlice.id);

    // API 호출 함수
    const fetchTicketList = async () => {
        if (!userId) return;

        const params = {
            page: page,
            size: 10,
            sort: "desc",
            userId: userId,
        };

        try {
            console.log("API 호출 실행됨");
            const response = await getTicketList(params);
            console.log("MyPage API:", response);

            // 기존 데이터와 비교 후 중복 방지
            setBookings((prev) => {
                if (JSON.stringify(prev) === JSON.stringify(response.dtoList)) return prev;
                return response.dtoList || [];
            });

            setTotalPages(response.totalPage || 0);
            updateTicketCount(response.dtoList.length || 0); // 부모 컴포넌트로 예매 개수 전달
        } catch (error) {
            console.error("공연 목록 로딩 실패:", error);
        }
    };

    // useEffect에서 API 호출 (userId가 있고, 데이터가 없을 때만 실행)
    useEffect(() => {
        if (userId && bookings.length === 0) {
            fetchTicketList();
        }
    }, [page, userId]);

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <div className="booking-container">
                <div className="MyPage_Right_Title">예매내역</div>
                {bookings.length === 0 ? (
                    <div style={{ paddingBottom: "10px" }}>
                        <p style={{ width: "100%", textAlign: "center", fontSize: "18px", paddingTop: "100px" }}>
                            예매 내역이 없습니다.
                        </p>
                    </div>
                ) : (
                    bookings.map((booking, index) => (
                        <div key={index} className="booking-card">
                            <div className="status">예매완료</div>
                            <div className="date">{booking.date}</div>
                            <hr />
                            <div className="content">
                                <img src={booking.postImage} alt={booking.festivalName} className="thumbnail" />
                                <div className="info">
                                    <h3>{booking.festivalName}</h3>
                                    <p>{booking.locationNum.split(",").length}매</p>
                                    <strong>{booking.totalPrice.toLocaleString("ko-KR")}원</strong>
                                    <div className="buttons">
                                        <button className="review-btn">좌석번호 : {booking.locationNum}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Paginations page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </>
    );
};

export default Booking;
