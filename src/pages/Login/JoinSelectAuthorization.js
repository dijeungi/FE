import React, {useState} from 'react';
import '../../styles/Login/FindAccountPasswordDetail.css';
import {Link} from "react-router-dom";


function JoinSelectAuthorization() {
    return (
        <>
           <div className="SearchId-wrap">
            <h1>회원가입</h1>
            <Link to="/register/AgreeUser" ><input type="button" value="티켓 구매자" className='SearchId-phone'/></Link>
            <Link to="/register/AgreeTeam" ><input type="button" value="팀별 회원가입" className='SearchId-phone'/></Link>
        </div>
        </>
    );
}

export default JoinSelectAuthorization;
