import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { addSeatTickets } from "../../api/TicketApi";

import CreditScoreIcon from "@mui/icons-material/CreditScore";

import "../../styles/payment/PaymentSuccess.css";

const PaymentSuccess = () => {
  // 현재 URL에서 쿼리 파라미터를 가져오기 위한 Hook
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = useSelector((state) => state.loginSlice.name);

  // Redux에서 사용자 ID 가져오기
  const userId = useSelector((state) => state.loginSlice.id);

  // 중복 요청 방지를 위한 useRef
  const hasSentRequest = useRef(false);

  // 콘솔 로그로 사용자 ID 확인
  console.log("유저명" + userId);

  // 좌석 정보 상태값
  const [seat, setSeat] = useState({
    orderId: "",
    festivalId: 0,
    dateId: 0,
    paymentDate: "",
    memberId: "",
    seat: "",
  });

  useEffect(() => {
    // URL 파라미터에서 좌석 정보가 존재하고, 길이가 3 이상일 때만 실행
    if (params && params.get("seats") && params.get("seats").length > 3) {
      const seatsParam = params.get("seats");
      const orderId = params.get("orderId");

      if (seatsParam && orderId) {
        // orderId를 '-'로 분리하여 각 정보 추출
        const orderParts = orderId.split("-");
        const festivalId = Number(orderParts[1]) || 0;
        const dateId = Number(orderParts[2]) || 0;
        const commonPart = orderParts.slice(0, -1).join("-");
        const lastPart = orderParts[orderParts.length - 1];

        // 쉼표로 구분된 값을 분리하여 공통 부분과 합침
        const expandedOrderIds = lastPart
          .split("_")
          .map((item) => `${commonPart}-${item}`);

        // 현재 날짜를 'YYYY-MM-DD' 형식으로 변환
        const currentDate = new Date();
        const formattedDate = currentDate
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\. /g, "-")
          .replace(".", "");

        // 콘솔에서 확인
        console.log(commonPart);

        // 상태 업데이트
        setSeat({
          orderId: commonPart,
          festivalId: festivalId,
          dateId: dateId,
          memberId: userId,
          paymentDate: formattedDate,
          seat: seatsParam.split(","),
        });

        console.log(seatsParam.split(","));

        // API 요청을 위한 데이터 객체
        const requestBody = {
          orderId: commonPart,
          festivalId: festivalId,
          dateId: dateId,
          memberId: userId,
          paymentDate: formattedDate,
          seats: seatsParam.split(","),
        };

        console.log(requestBody);
        console.log("DB Insert 전 : " + params.get("closed"));

        // 팝업 창이 열려 있는 경우 API 요청 실행 후 창 닫기
        if (window.opener) {
          addSeatTickets(requestBody);
          window.close();
          console.log("opener 테스트 성공");
        } else {
          console.log("closed 실행 완료");
        }
      }
    }
  }, []);

  // URL에서 필요한 결제 정보 추출
  const orderId = params.get("orderId") || "N/A";
  const totalPrice = params.get("totalPrice") || 0;
  const seats = params.get("seats") ? params.get("seats").split(",") : [];
  const paymentMethod = params.get("paymentMethod") || "신용카드";

  // 포스터 이미지 URL 디코딩
  const rawPoster = params.get("poster");
  const poster = rawPoster
    ? decodeURIComponent(rawPoster)
    : "https://via.placeholder.com/150";

  console.log("DB Insert 밖 : " + params.get("closed"));

  // 결제 성공 후 부모 창 URL 업데이트
  if (window.opener) {
    setTimeout(() => {
      console.log("부모 창 URL 업데이트 시작");
      console.log("orderId: " + orderId);
      window.opener.location.href = `${
        window.location.origin
      }/payment/success?orderId=${orderId}&totalPrice=${totalPrice}&seats=${params.get(
        "seats"
      )}&poster=${encodeURIComponent(poster)}&closed=${true}`;
      console.log("성공");
    }, 500);
  } else {
    console.log("실패");
  }

  console.log("🖼️ URL에서 가져온 포스터 (원본):", rawPoster);
  console.log("📸 디코딩된 포스터 URL:", poster);

  const currentDate = new Date()
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "-")
    .replace(".", "");

  return (
    <>
      <div className="Success_header"></div>
      <div className="Success_Container">
        <div className="Success_Top">
          <CreditScoreIcon />
          <h2 className="Success_Icon_txt">
            결제가 <span>성공적으로 완료</span>되었습니다.
          </h2>
        </div>

        <div className="Success_Wrap">
          <div className="Success_Poster">
            <img src={poster} alt="공연 포스터" />
          </div>
          {/* 결제 정보 표시 */}
          <div className="Success_InfoContainer">
            <div className="Success_Main_text">
              <li className="Success_InfoItem">
                <strong className="Success_Strong">사용자 ID:</strong>
                <p className="Success_InfoDesc">{userId}</p>
              </li>

              <li className="Success_InfoItem">
                <strong className="Success_Strong">주문 ID:</strong>
                <p className="Success_InfoDesc">{orderId}</p>
              </li>
              <li className="Success_InfoItem">
                <strong className="Success_Strong">결제 수단:</strong>
                <p className="Success_InfoDesc">{paymentMethod}</p>
              </li>
              <li className="Success_InfoItem">
                <strong className="Success_Strong">선택한 좌석:</strong>
                <p className="Success_InfoDesc">
                  {seats.length > 0 ? seats.join(", ") : "선택 없음"}
                </p>
              </li>
              <li className="Success_InfoItem">
                <strong className="Success_Strong">총 결제 금액:</strong>
                <p className="Success_InfoDesc">
                  {Number(totalPrice).toLocaleString()}원
                </p>
              </li>
              <li className="Success_InfoItem">
                <strong className="Success_Strong">결제일자:</strong>
                <p className="Success_InfoDesc">{currentDate}</p>
              </li>
            </div>
          </div>
        </div>

        <Link to="/">
          <button className="Screen_Phone">홈페이지로 이동하기</button>
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;

// return (
// 	<>
// 		{/* 결제 완료 화면 헤더 */}
// 		<div className="Success_header"></div>

// 		{/* 결제 성공 메시지 컨테이너 */}
// 		<div className="Success_Container">
// 			<div className="Success_Top">
// 				<CreditScoreIcon />
// 				<h2 className="Success_Icon_txt">
// 					고객님, <span>결제가 성공적으로 완료</span>되었습니다.
// 				</h2>
// 			</div>

// 			<div className="Success_Wrap">
// 				{/* 포스터 이미지 표시 */}
// 				<div className="Success_Poster">
// 					{poster ? <img src={poster} alt="공연 포스터" /> : <div className="No_Poster">포스터 없음</div>}
// 				</div>

// 				{/* 결제 정보 표시 */}
// 				<div className="Success_Info">
// 					<div className="Success_Main_text">
// 						<li className="Success_InfoItem Line">
// 							<strong className="Success_Strong_Title">구매해주신 티켓 정보입니다.</strong>
// 							<p className="Success_InfoDesc"></p>
// 						</li>
// 						<li className="Success_InfoItem">
// 							<strong className="Success_Strong">좌석:</strong>
// 							<p className="Success_InfoDesc">{seats.length > 0 ? seats.join(", ") : "선택 없음"}</p>
// 						</li>
// 						<li className="Success_InfoItem">
// 							<strong className="Success_Strong">총 결제 금액:</strong>
// 							<p className="Success_InfoDesc">{Number(totalPrice).toLocaleString()}원</p>
// 						</li>
// 						<li className="Success_InfoItem">
// 							<strong className="Success_Strong">결제 방식:</strong>
// 							<p className="Success_InfoDesc">{paymentMethod}</p>
// 						</li>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		{/* 홈페이지 이동 버튼 */}
// 		<Link to="/">
// 			<button className="Screen_Phone">홈페이지로 이동하기</button>
// 		</Link>
// 	</>
// );
// };
