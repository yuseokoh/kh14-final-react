import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const REST_API_KEY = "e027bcf677db65dbc9a5954313eb0a3f";
  const REDIRECT_URI = "http://localhost:3000/member/KakaoLogin";
  const navigate = useNavigate();

  const KakaoLogin = () => {
    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  useEffect(() => {
    // URL에서 인증 코드 가져오기
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      console.log("인증 코드 확인: ", code); // 로그 추가: 인증 코드 확인

      // 인증 코드를 백엔드로 전송하는 로직
      axios.post("http://localhost:8080/member/kakaoLogin", { code }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // 성공적으로 로그인한 경우 처리 (예: 사용자 정보 출력, 세션 관리 등)
          console.log("백엔드 응답: ", response.data);

          // JWT 토큰을 로컬 스토리지에 저장하여 로그인 상태 유지
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          navigate('/');
        })
        .catch(error => {
          console.error("로그인 실패: ", error);
          alert('로그인에 실패했습니다.');
        });
    } else {
      console.log("인증 코드가 없습니다.");
    }
  }, [navigate]);

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <div>
      <button onClick={KakaoLogin}>카카오 로그인</button>
      <div>
        <h3>카카오 로그인 QR 코드</h3>
        <QRCodeCanvas value={kakaoURL} size={256}  /> 
        <p>QR코드를 스캔하여 로그인하세요</p>
      </div>
    </div>
  );
}

export default App;
