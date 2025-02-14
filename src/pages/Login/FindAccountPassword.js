import React, {useState} from 'react';
import '../../styles/Login/FindAccountPassword.css';
import {Link} from "react-router-dom";


function FindAccountPassword() {
    return (
        <>
           <div className="SearchPw-wrap">
            <h1>비밀번호 찾기</h1>
            <div class="SearchPw-h2_box">
                <div><Link to="/account/findId"><h2 className='SearchPw-h2-1'>아이디 찾기</h2></Link></div>
                <div><Link to="/account/findPassword"><h2 className='SearchPw-h2-2'>비밀번호 찾기</h2></Link></div>
            </div>
            <strong className="SearchPw-strong">
            아이디 확인 후<br/>
            비밀번호를 재설정 할 수 있어요
            </strong>
            <input type="text" placeholder='아이디' className='SearchPw-input1'/>
            <Link to="/account/findPassword/detail"><input type="button" value="아이디 확인" className='SearchPw-button'/></Link>
        </div>
        </>
    );
}

export default FindAccountPassword;
