// src/components/info/Qna.js

import React, { useState } from 'react';
import {Link} from "react-router-dom";

import '../../styles/info/Qna.css'
import Information2Star from "../../img/Star.png"
import Information2Heart from "../../img/heart.png"

const Qna = () => {
  return (
   <>
       <div className='Information4Box'>


            <div className="Information4Contain">
                <strong>꼭 읽어주세요</strong>
                <div>
                    <p>게시판 운영 규정에 어긋난다고 판단되는 게시글은 사전 통보없이 블라인드 처리될 수 있습니다.</p>
                    <p>특히 티켓 매매 및 양도의 글은 발견 즉시 임의 삭제되며 전화번호, 이메일 등의 개인정보는 악용될 우려가 있으므로 게시를 삼가 주시기 바랍니다.</p>
                    <p>사전 경고에도 불구하고 불량 게시물을 계속적으로 게재한 게시자의 경우 인터파크 티켓 게시판 작성 권한이 제한됩니다.</p>
                </div>
                <div className="Information4-flex">
                    <span>총 <em>0</em>개의 Q&A가 등록되었습니다.</span>
                    <div className='Information4-br'>
                        <select>
                            <option>글제목</option>
                            <option>글제목</option>
                            <option>글제목</option>
                        </select>
                        <input type="text"></input>
                        <input type="button" className='SearchBtn'/>
                    </div>
                    <button className='Information4Submit'>문의하기</button>    

                </div>
            </div>
            <div>
                <div className="Information4Array">
                    <button>최신글순</button>
                    <button>평점순</button>
                </div>
            </div>
            <table>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
                <tr>
                    <td className='Information4Pd'>발권한 티켓도 기간 연장 할 수 있나요?</td>
                    <td>heezin***</td>                   
                    <td>2025.02.13</td>
                    <td>답변<strong>0</strong></td>
                </tr>
            </table>
       </div>
   </>

  );
};

export default Qna;
