import React, { useState } from 'react';
import '../../styles/Login/JoinUser.css';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {signupPost} from "../../api/LoginApi";

const JoinUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id:'',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        selectedEmail: '',
        mailYn: 'N',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleEmailChange = (e) => {
        const email = formData.email;
        const {  value } = e.target;
        setFormData((prev) => ({
            ...prev,
            email : email+value,
        }));
        formData.email = email;
    };

    const validateCheck = () => {
        const phoneRegex = /^010\d{4}\d{4}$/;

        if (!phoneRegex.test(formData.phone)) {
            Swal.fire({
                title: '입력 오류',
                text: '전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.',
                icon: 'warning',
                confirmButtonText: '확인',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCheck()) {
            return;
        }

        try {
            await signupPost(
                formData.id,
                formData.name,
                formData.email,
                formData.password,
                formData.phone,
                formData.mailYn
            );
            Swal.fire({
                title: '회원가입 성공',
                text: '회원가입이 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } catch (error) {
            console.error('회원가입 실패:', error);
            Swal.fire({
                title: '회원가입 실패',
                text: '회원가입에 실패했습니다. 다시 시도해주세요.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

  return (
    <form class="Join-form" onSubmit={handleSubmit}>
      <h2 class="Join-h2">회원가입</h2>
      <div class="Join-form-box">
        <label>아이디</label>
        <input type="text"
               name="id"
               placeholder='6~20자 영문, 숫자'
               value={formData.id}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>비밀번호 </label>
        <input type="password"
               name="password"
               placeholder='8~12자 영문, 숫자, 특수 문자'
               value={formData.password}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>비밀번호 확인</label>
        <input type="password"
               name="confirmPassword"
               placeholder='8~12자 영문, 숫자, 특수 문자'
               value={formData.confirmPassword}
               onChange={handleChange}
        />
      </div>
      <div class="Join-form-box">
        <label>이름</label>
        <input type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
        />
      </div>
        <div class="Join-form-box">
            <label>이메일</label>
            <input type="text"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
            />
            <select onChange={handleEmailChange}>
                <option>직접입력</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@daum.net">@daum.net</option>

            </select>
        </div>
        <div class="Join-form-box">
            <label>휴대폰</label>
            <input type="text"
                   name="phone"
                   value={formData.phone}
                   onChange={handleChange}
            />
            <button type="button" class="Join-btn1">인증번호 받기</button>
      </div>
      <div class="Join-form-box2">
          <input type="checkbox"
                 name="receiveInfo"
                 value={formData.mailYn}
                 onChange={handleChange}/>
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

export default JoinUser;
