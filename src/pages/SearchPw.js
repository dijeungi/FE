import React, {useState} from 'react';
import '../styles/Login/SearchPw.css';
import {Link} from "react-router-dom";


function SearchPw() {
    return (
        <>
           <div className="SearchPw-wrap">
            <h1>계정 찾기</h1>
            <div class="SearchPw-h2_box">
                <div><Link to="/register/SearchId"><h2 className='SearchPw-h2-1'>아이디 찾기</h2></Link></div>
                <div><Link to="/register/SearchPw"><h2 className='SearchPw-h2-2'>비밀번호 찾기</h2></Link></div>
            </div>
            <strong className="SearchPw-strong">
            아이디 확인 후<br/>
            비밀번호를 재설정 할 수 있어요
            </strong>
            <input type="text" placeholder='아이디' className='SearchPw-input1'/>
            <Link to="/register/SearchPw2"><input type="button" value="아이디 확인" className='SearchPw-button'/></Link>
        </div>
        </>
    );
}

export default SearchPw;
