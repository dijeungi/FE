// src/components/mypage/Booking.js
import "../../styles/mypage/Booking.css";
import { getTicketList } from "../../api/TicketApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Paginations from "./Paginations";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 리덕스 스토어에서 userId 가져오기
  const userId = useSelector((state) => state.loginSlice.id);

  // API 호출 함수 (userId가 있을 때만 호출)
  const fetchTicketList = async () => {
    console.log("현재 userId:", userId);
    const params = {
      page: page,
      size: 10,
      sort: "desc",
      userId: userId,
    };

    try {
      const response = await getTicketList(params);
      console.log("MyPage API:", response);
      setBookings(response.dtoList || []);
      setTotalPages(response.totalPage || 0);
    } catch (error) {
      console.error("공연 목록 로딩 실패:", error);
    }
  };

  // page 혹은 userId가 변경될 때 데이터 호출
  useEffect(() => {
    if (userId) {
      fetchTicketList();
    }
  }, [page, userId]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="booking-container">
        <div className="MyPage_Right_Title">예매내역</div>
        <div className="booking-header">
          <div>예매일</div>
          <div>예약번호</div>
          <div>공연명</div>
          <div>관람일</div>
          <div>매수</div>
          <div>취소가능일</div>
          <div>상태</div>
        </div>
        {bookings.length === 0 ? (
          <div style={{ paddingBottom: "10px" }}>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "18px",
                paddingTop: "100px",
              }}
            >
              예매 내역이 없습니다.
            </p>
          </div>
        ) : (
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
      <Paginations
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Booking;
