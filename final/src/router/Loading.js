import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState, memberLoadingState } from "../../utils/recoil";
import { Navigate } from 'react-router';
import './Steam.css';


const Loading = (props) => {
    const memberLoading = useRecoilValue(memberLoadingState);
    const login = useRecoilValue(loginState);
    
    // 새로운 상태 정의 (local loading state)
    const [isLocalLoading, setIsLocalLoading] = useState(true);

    useEffect(() => {
        // 3초 후에 로딩이 완료되도록 설정
        const timer = setTimeout(() => {
            setIsLocalLoading(false);
        }, 3000); // 3000ms = 3초

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, []);

    // 로딩 중일 때 보여줄 화면
    if (isLocalLoading || memberLoading === false) {
        return (
            <div>
                <h1>Loading...</h1>
                {/* 추가적인 로딩 애니메이션 */}
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader">
                    {/* 로딩 애니메이션 관련 SVG 코드 */}
                    <g className="dash">
                        <path style={{ "--sped": "4s" }} pathLength="360" d="..." className="big"></path>
                        <path pathLength="360" d="..." className="aaa"></path>
                        {/* 나머지 SVG 코드 */}
                    </g>
                    <path pathLength="360" d="..." fill="#212121"></path>
                    <path className="fill" pathLength="360" d="..." fill="url(#SteamGradient)"></path>
                </svg>
            </div>
        );
    } else {
        return login === true ? props.element : <Navigate to="/member/login" />;
    }
};

export default Loading;
