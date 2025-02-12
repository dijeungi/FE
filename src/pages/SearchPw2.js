import React, {useState} from 'react';
import '../styles/Login/SearchPw2.css';
import {Link} from "react-router-dom";


function Searchpw22() {
    return (
        <>
           <div className="SearchPw2-wrap">
            <h1>계정 찾기</h1>
            <div class="SearchPw2-h2_box">
                <div><Link to="/register/SearchId"><h2 className='SearchPw2-h2-2'>아이디 찾기</h2></Link></div>
                <div><Link to="/register/SearchPw2"><h2 className='SearchPw2-h2-1'>비밀번호 찾기</h2></Link></div>
            </div>
            <input type='radio' name='SearchPw2' className='Search-chk'/><label>휴대폰 번호인증으로 찾기</label>
            <p className='Searchpw2_text'>본인확인(실명인증)이 완료된 아이디는 본인명의 휴대폰 인증으로 아아디를 찾을 수 있어요.</p>
            <input type="button" value="휴대폰 인증" className='SearchPw2-phone'/>
            <input type='radio' name='SearchPw2' className='Search-chk'/><label>이메일로 찾기</label>
        </div>
        </>
    );
}

export default Searchpw22;
