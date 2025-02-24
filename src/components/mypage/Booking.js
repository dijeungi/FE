import "../../styles/mypage/Booking.css";

import { getTicketList } from "../../api/TicketApi";
import { useEffect, useState } from "react";
import Paginations from "./Paginations";

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [userId, setUserId] = useState(null);

    // API 호출을 위한 함수
    const fetchTicketList = async () => {
        const params = {
            page: page,
            size: 10,
            sort: "desc",
            userId: userId,
        };

        try {
            const response = await getTicketList(params);
            setBookings(response.dtoList || []);
            setTotalPages(response.totalPage || 0);
        } catch (error) {
            console.error("공연 목록 로딩 실패:", error);
        }
    };

    // page나 userId가 변경될 때마다 데이터 호출
    useEffect(() => {
        fetchTicketList();
    }, [page, userId]);

    // 페이지 변경 핸들러
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <div className="booking-container">
                <div className="MyPage_Right_Title">예매내역</div>

                {/* 헤더 부분: 예매일 / 예약번호 / 공연명 / 관람일 / 매수 / 취소가능일 / 상태 */}
                <div className="booking-header">
                    <div>예매일</div>
                    <div>예약번호</div>
                    <div>공연명</div>
                    <div>관람일</div>
                    <div>매수</div>
                    <div>취소가능일</div>
                    <div>상태</div>
                </div>

                {/* 예매 내역이 없는 경우와 있는 경우를 조건부 렌더링 */}
                {bookings.length === 0 ? (
                    <div style={{ paddingBottom: "10px" }}>
                        <p style={{ width: "100%", textAlign: "center", fontSize: "18px", paddingTop: "100px" }}>
                            예매 내역이 없습니다.
                        </p>
                    </div>
                ) : (
                    // map 함수를 사용해 API로 받아온 예매 내역 데이터를 출력합니다.
                    bookings.map((booking, index) => (
                        <div key={index} className="booking-row">
                            <div>{booking.bookingDate}</div>
                            <div>{booking.reservationNumber}</div>
                            <div>{booking.performanceName}</div>
                            <div>{booking.viewingDate}</div>
                            <div>{booking.ticketCount}</div>
                            <div>{booking.cancellationDeadline}</div>
                            <div>{booking.status}</div>
                        </div>
                    ))
                )}
            </div>
            <Paginations page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
            <div />
        </>
    );
};

export default Booking;
