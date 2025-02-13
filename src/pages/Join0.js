import React, {useState} from 'react';
import '../styles/Login/SearchPw2.css';
import {Link} from "react-router-dom";


function Join0() {
    return (
        <>
           <div className="SearchId-wrap">
            <h1>회원가입</h1>
            <Link to="/register/Join" ><input type="button" value="티켓 구매자" className='SearchId-phone'/></Link>
            <Link to="/register/JoinTeam" ><input type="button" value="팀별 회원가입" className='SearchId-phone'/></Link>
        </div>
        </>
    );
}

export default Join0;
