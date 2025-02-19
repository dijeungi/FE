import React, { useState } from 'react';
import '../../styles/Login/TeamAgree.css';
import {Link} from "react-router-dom";

const TeamAgree = () => {
  return (
    <div className='wrap'>
      <h2 className='Agree-h2'>약관 전체 동의</h2>
      <div className='Agree-box'>
        <h3 className='Agree-h3'>필수 동의 항목</h3>
        <div className="Agree-row1">
          <input type='checkbox'/>
          <label>[필수] 이용약관 </label>
          {/*<img src={Agree1}/> */}
        </div>
        <div className="Agree-row1">
          <input type='checkbox'/>
          <label>[필수] 전자금융거래 이용약관 </label>
          {/*<img src={Agree1}/> */}
        </div>
        <div className="Agree-row1">
          <input type='checkbox'/>
          <label>[필수] 개인정보 수집동의서 </label>
          {/*<img src={Agree1}/> */}
        </div>
      </div>
      <div className='Agree-box'>
        <h3 className='Agree-h3'>선택 동의 항목</h3>
        <div className="Agree-row2">
          <input type='checkbox'/>
          <label>[선택] 개인정보 수집동의서  </label>
          {/*<img src={Agree1}/> */}
        </div>
        <div className="Agree-row2">
          <input type='checkbox'/>
          <label>[선택] 위치기반서비스 이용약관</label>
          {/*<img src={Agree1}/> */}
        </div>
      </div>
      <Link to="/register/JoinTeam" ><input type="submit" value="다음단계" className='Agree-submit'/></Link>
    </div>

  );
};

export default TeamAgree;
