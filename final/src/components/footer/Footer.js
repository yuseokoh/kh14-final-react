import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src="/images/valve_logo.png" alt="Valve Logo" />
        </div>
        <div className={styles.footerCopyright}>
          <p>© 2024 Valve Corporation. All rights reserved. 모든 상표는 미국 및 기타 국가에서 해당하는 소유자의 재산입니다.<br/>
          부가가치세 포함 | <NavLink to="/privacy-policy" className={styles.footerLink}>개인정보 처리방침</NavLink> | <NavLink to="/terms-of-use" className={styles.footerLink}>사용권</NavLink> | <NavLink to="/steam-agreement" className={styles.footerLink}>Steam 이용 약관</NavLink> | <NavLink to="/refund-policy" className={styles.footerLink}>환불</NavLink> | <NavLink to="/cookies" className={styles.footerLink}>쿠키</NavLink></p>
        </div>
        <div className={styles.footerLinks}>
          <NavLink to="/valve-info" className={styles.footerLink}>Valve 정보</NavLink>
          <NavLink to="/career-info" className={styles.footerLink}>채용 정보</NavLink>
          <NavLink to="/steamworks" className={styles.footerLink}>Steamworks</NavLink>
          <NavLink to="/steam-distribution" className={styles.footerLink}>Steam 배포</NavLink>
          <NavLink to="/support" className={styles.footerLink}>지원</NavLink>
          <NavLink to="/gift-card" className={styles.footerLink}>기프트 카드</NavLink>
          <NavLink to="/steam" className={styles.footerLink}>Steam</NavLink>
          <NavLink to="/steam-social" className={styles.footerLink}>@steam</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;