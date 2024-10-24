import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

function KakaoLoginPage() {
  const REST_API_KEY = "e027bcf677db65dbc9a5954313eb0a3f";
  const REDIRECT_URI = "http://localhost:3000/member/KakaoLoginPage";
  const navigate = useNavigate();

  const KakaoLogin = () => {
    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  useEffect(() => {
  const code = new URL(window.location.href).searchParams.get("code");
  if (code) {
    axios.post("http://localhost:8080/kakao/login", { code }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        localStorage.setItem('jwtToken', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("로그인 실패: ", error.response.data);
        alert('로그인에 실패했습니다.');
      });
  }
}, [navigate]);

  

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div>
      <button onClick={KakaoLogin}>카카오 로그인</button>
      <div>
        <h3>카카오 로그인 QR 코드</h3>
        <QRCodeCanvas value={kakaoURL} size={256} /> 
        <p>QR코드를 스캔하여 로그인하세요</p>
      </div>
    </div>
  );
}

export default KakaoLoginPage;
