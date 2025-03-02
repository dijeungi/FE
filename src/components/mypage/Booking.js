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
        {/*<div className="booking-header">*/}
        {/*    <div>예매일</div>*/}
        {/*    <div>예약번호</div>*/}
        {/*    <div>공연명</div>*/}
        {/*    <div>관람일</div>*/}
        {/*    <div>매수</div>*/}
        {/*    <div>취소가능일</div>*/}
        {/*    <div>상태</div>*/}
        {/*</div>*/}
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
            <div key={index} className="booking-card">
              <div className="status">예매완료</div>
              <div className="date">{booking.date}</div>
              <hr />
              <div className="content">
                <img
                  src={booking.postImage}
                  alt={booking.festivalName}
                  className="thumbnail"
                />
                <div className="info">
                  <h3>{booking.festivalName}</h3>
                  <p>{booking.locationNum.size()}매</p>
                  <strong>
                    {booking.totalPrice.toLocaleString("ko-KR")}원
                  </strong>
                  <div className="buttons">
                    {/*<button className="detail-btn">좌석번호</button>*/}
                    {/*{booking.isReviewable && (*/}
                    <button className="review-btn">
                      좌석번호 : {booking.locationNum}
                    </button>
                    {/*// )}*/}
                  </div>
                </div>
              </div>
            </div>
            //         <div key={index} className="booking-row">
            //     <div>{booking.date}</div>
            //     <div>{booking.orderId}</div>
            //     <div>{booking.festivalName}</div>
            //     <div>{booking.paymentDate}</div>
            //     <div>1</div>
            //     {/*<div>{booking.cancellationDeadline}</div>*/}
            //     <div>예매완료</div>
            // </div>
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
