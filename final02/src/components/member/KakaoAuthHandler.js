import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";  

const KakaoAuthHandler = () => {
    console.log("KakaoAuthHandler 컴포넌트가 마운트 되었습니다."); // 추가된 로그
    const location = useLocation();

    useEffect(() => {
        console.log("KakaoAuthHandler 컴포넌트가 렌더링되었습니다.");
        const code = new URL(window.location.href).searchParams.get("code");
        if (code) {
            console.log("인가 코드: ", code);
            console.log("백엔드로 로그인 요청 시도");
            // 인가 코드를 백엔드로 전달
            axios.post("http://localhost:8080/member/kakaoLogin", { code })
                .then((response) => {
                    console.log("로그인 성공: ", response.data);
                    // JWT 토큰 저장 (예: localStorage)
                    localStorage.setItem('accessToken', response.data.accessToken);
                    // URL에서 인가 코드 제거 및 메인 페이지로 이동
                    window.location.replace("/");
                })
                .catch((error) => {
                    console.error("로그인 실패: ", error);
                });
        } else {
            console.log("인가 코드가 URL에 존재하지 않습니다.");
        }
    }, [location]);

    return (
        <div>
            카카오 로그인 처리 중...
        </div>
    );
};


export default KakaoAuthHandler;
