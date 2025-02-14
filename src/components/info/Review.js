// src/components/info/Review.js

import React, { useState } from 'react';
import {Link} from "react-router-dom";

import '../../styles/info/Review.css'
import Information2Star from "../../img/Star.png"
import Information2Heart from "../../img/heart.png"

const Review = ({ setCurrentTab }) => {
  return (
   <>
       <div className='Information2Box'>
            <div className="Information2Contain">
                <strong>꼭 읽어주세요</strong>
                <div>
                    <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
                    <p>특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.</p>
                    <p>사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 인터파크 티켓 게시판 작성 권한이 제한됩니다.</p>
                </div>
                <div className="Information2-flex">
                    <span>총 <em>0</em>개의 이용후기가 등록되었습니다.</span>
                    <div className='Information2-br'>
                        <select>
                            <option>글제목</option>
                            <option>글제목</option>
                            <option>글제목</option>
                        </select>
                        <input type="text"></input>
                        <input type="button" className='SearchBtn'/>
                    </div>
                    <button className='Information2Submit'>이용후기 작성</button>    

                </div>
            </div>
            <div>
                <div className="Information2Array">
                    <button>최신글순</button>
                    <button>평점순</button>
                    <button>공감순</button>
                </div>
            </div>
            <div className='InformationBox'>
                <div className='InformationBoxTop'>
                    <div className='InformationBoxLeft'>
                        <img src={Information2Star} className='Information2star'/>
                        <img src={Information2Star} className='Information2star'/>
                        <img src={Information2Star} className='Information2star'/>
                        <img src={Information2Star} className='Information2star'/>
                        <img src={Information2Star} className='Information2star'/>
                    </div>
                    <div className='InformationBoxRight'>
                        <span><em>special***</em>예매자</span>
                        <span>|</span>
                        <span>2025.02.13</span>
                        <span>|</span>
                        <span>조회<strong>20</strong></span>
                        <span>|</span>
                        <span>공감<b>0</b></span>                    
                        <img src={Information2Heart}/>
                    </div>
                </div>
                <div className='InformationBoxBt'>
                    <strong>너무 재밌어요!</strong>
                    <p>
                        여자친구랑 데이트하러 와서 연극을 구매했는데 정말 재밌어요! 배우분들도 연기를 잘하시고 데이트할때 추천합니다! 정말 웃겨요
                    </p>
                </div>
            </div>
       </div>
   </>

  );
};

export default Review;
