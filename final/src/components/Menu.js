
/*
    (주의)
    React는 한 페이지이므로 a태그로 이동 설정하지 않는다
    대신, rect-router-dom에 있는 <NavLink to=주소>를 사용
    NavLink는 Router의 상황에 맞는 주소를 생성하며, a태그로 변환된다
*/

import { NavLink, useNavigate } from "react-router-dom";
import { loginState, memberIdState, memberLevelState } from "../utils/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback } from 'react';
import axios from "axios";

const Menu = () => {
    //navigate
    const navigate = useNavigate();

    //recoil state
    const [memberId, setMemberId] = useRecoilState(memberIdState);
    const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);
    
    //const [login, setLogin] = useRecoilState(loginState);//selector는 이게 아님
    const login = useRecoilValue(loginState);//읽기전용 항목은 이렇게 읽음

    //callback
    const logout = useCallback((e)=>{
        //e.preventDefault();

        //recoil에 저장된 memberId와 memberLevel을 제거
        setMemberId("");
        setMemberLevel("");

        //axios에 설정된 Authorization 헤더도 제거
        delete axios.defaults.headers.common["Authorization"];

        //localStorage, sessionStorage의 refreshToken을 제거
        window.localStorage.removeItem("refreshToken");
        window.sessionStorage.removeItem("refreshToken");

        navigate("/");
    }, [memberId, memberLevel]);

    //view
    return (<>
        <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                {/* 메인 로고 또는 텍스트가 존재하는 위치 */}
                <NavLink className="navbar-brand" to="/">테스트</NavLink>
                {/* 폭이 좁은 경우 메뉴를 숨겼다 펼쳤다 하는 버튼(햄버거 버튼) */}
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#top-menu"
                    aria-controls="top-menu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* 
                실제 메뉴 영역
                - 폭이 충분할 경우에는 상단 메뉴바에 표시
                - 폭이 충분하지 않을 경우에는 접이식으로 표시
                */}
                <div className="collapse navbar-collapse" id="top-menu">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="true" aria-expanded="false">테스트</a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/ex01">테스트</NavLink>
                            </div>
                        </li>
                        
                    
                    {/* 로그인시 보이는 게시판 */}
                        {login === true && (
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown" href="#" role="button"
                                aria-haspopup="true" aria-expanded="false">로그인시 게시판 (테스트)</a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to="/paytest01">로그인시 테스트</NavLink>
                            </div>

                                



                        </li>
                        
                        )}
                       
                    </ul>

                    <ul className="navbar-nav">
                        {/* 로그인이 되어있다면 아이디(등급) 형태로 출력 */}
                        {login ? (<>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/member/mypage">
                                {memberId} 
                                ({memberLevel})
                            </NavLink>
                        </li>


                        <li className="nav-item">
  <NavLink className="nav-link" to="/payment/method">
    <i className="fa-solid fa-right-to-bracket"></i>
    결제 테스트 1
  </NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to="/payment/confirmation">
    <i className="fa-solid fa-right-to-bracket"></i>
    결제 테스트 2
  </NavLink>
</li>

<li className="nav-item">
  <NavLink className="nav-link" to="/payment/confirmation/success/:partnerOrderId">
    <i className="fa-solid fa-right-to-bracket"></i>
    결제 테스트 3
  </NavLink>
</li>



                        <li className="nav-item">
                            <NavLink className="nav-link" to="#"
                                    onClick={logout}>
                                로그아웃
                            </NavLink>
                        </li>
                        </>) : (<>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fa-solid fa-user"></i>
                                회원가입
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/member/login">
                                <i className="fa-solid fa-right-to-bracket"></i>
                                로그인
                            </NavLink>
                        </li>
                      
                        
                        

                        


                      
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
    </>);
};

export default Menu;