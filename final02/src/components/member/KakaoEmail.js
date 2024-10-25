import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력한 이메일을 백엔드로 전송하여 저장
    axios.post('http://localhost:8080/kakao/saveEmail', { email })
      .then(response => {
        if (response.status === 200) {
          alert('이메일이 성공적으로 저장되었습니다.');
          // 저장 후 로그인 처리 및 메인 페이지로 리다이렉트
          localStorage.setItem('jwtToken', response.data.jwtToken);
          navigate('/');
        }
      })
      .catch(error => {
        console.error('이메일 저장 실패: ', error);
        alert('이메일 저장에 실패했습니다.');
      });
  };

  return (
    <div>
      <h2>이메일 입력</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일 주소: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default KakaoEmail;
