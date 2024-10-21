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
import steamLogo from './steamlogo.svg';
import styles from './Menu.module.css';
import { useTranslation } from 'react-i18next'; // useTranslation import 추가
import LanguageSelector from './LanguageSelector'; // LanguageSelector import 추가

const Menu = () => {
    const { t } = useTranslation(); // useTranslation 훅 사용
    //navigate
    const navigate = useNavigate();

    //recoil state
    const [memberId, setMemberId] = useRecoilState(memberIdState);
    const [memberLevel, setMemberLevel] = useRecoilState(memberLevelState);

    const login = useRecoilValue(loginState);//읽기전용 항목은 이렇게 읽음

    //callback
    const logout = useCallback((e) => {
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
    return (
        <>
            <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar}`} data-bs-theme="dark">
                <div className={`container ${styles.container}`}>
                    <NavLink className="navbar-brand" to="/">
                        <img src={steamLogo} alt="Steam" height={"50px"} />
                    </NavLink>

                    <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#top-menu"
                        aria-controls="top-menu"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="top-menu">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false">{t('menu.shop')}</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/">{t('menu.test')}</NavLink>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="true" aria-expanded="false">{t('menu.community')}</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/community/list">{t('menu.community')}</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link"
                                    data-bs-toggle="dropdown" to="/" role="button"
                                    aria-haspopup="true" aria-expanded="false">{t('menu.info')}</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link"
                                    data-bs-toggle="dropdown" to="/" role="button"
                                    aria-haspopup="true" aria-expanded="false">{t('menu.support')}</a>
                            </li>

                            {login ? (<>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                        aria-haspopup="true" aria-expanded="false">{t('menu.payment')}</a>
                                    <div className="dropdown-menu">
                                       

                                        <NavLink className="dropdown-item" to="/payment/confirmation">
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                            {t('menu.paymentRequestTest')}
                                        </NavLink>

                                        <NavLink className="dropdown-item" to="/payment/success">
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                            {t('menu.paymentSuccessTest')}
                                        </NavLink>

                                        <NavLink className="dropdown-item" to="/payment/cancel">
                                            <i className="fa-solid fa-right-to-bracket"></i>
                                            {t('menu.paymentCancelTest')}
                                        </NavLink>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/member/mypage">
                                        {memberId} ({memberLevel})
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="#"
                                        onClick={logout}>
                                        {t('menu.logout')}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/wishlist">
                                        {t('menu.wishlist')}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cart">
                                        {t('menu.cart')}
                                    </NavLink>
                                </li>
                            </>) : (<>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/member/login">
                                        <i className="fa-solid fa-right-to-bracket"></i>
                                        {t('menu.login')}
                                    </NavLink>
                                </li>
                            </>)}
                        </ul>
                        {/* Language Selector 추가 */}
                        <LanguageSelector />
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Menu;
