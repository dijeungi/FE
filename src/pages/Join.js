import React, { useState } from 'react';
import '../styles/Login/Join.css';

const JoinForm = () => {
  return (
    <form class="Join-form">
      <h2 class="Join-h2">회원가입</h2>
      <div class="Join-form-box">
        <label>아이디</label>
        <input type="text" name="id" placeholder='6~20자 영문, 숫자'/>
      </div>
      <div class="Join-form-box">
        <label>비밀번호 </label>
        <input type="password" name="password" placeholder='8~12자 영문, 숫자, 특수 문자'/>
      </div>
      <div class="Join-form-box">
        <label>비밀번호 확인</label>
        <input type="password" name="confirmPassword" placeholder='8~12자 영문, 숫자, 특수 문자'/>
      </div>
      <div class="Join-form-box">
        <label>이름</label>
        <input type="text" name="name" />
      </div>
      <div class="Join-form-box">
        <label>이메일</label>
        <select>
          <option>직접입력</option>
          <option>honggildong@gamil.com</option>
        </select>
      </div>
      <div class="Join-form-box">
        <label>휴대폰</label>
        <input type="text" name="phone"/>
        <button type="button" class="Join-btn1">인증번호 받기</button>
      </div>
      <div class="Join-form-box2">
          <input type="checkbox" name="receiveInfo"/>          
          <label>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
      </div>
      <div class="Join-form-box2">
          <input type="checkbox" name="under14"/>          
          <label>14세 미만입니다.</label>
      </div>
      <div class="Join-form-box3">
          <p>만 14세 미만 회원은 법정대리인(부모님) 동의를 받은 경우만 회원가입이 가능합니다.</p>
      </div>
      <button type="submit" class="Join-submit">가입완료</button>
    </form>
  );
};

export default JoinForm;
