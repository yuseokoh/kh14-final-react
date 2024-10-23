import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerCopyright}>
          <p>© 2024 Valve Corporation. {t('footer.allRightsReserved')}<br/>
          {t('footer.vatIncluded')} | <NavLink to="/privacy-policy" className={styles.footerLink}>{t('footer.privacyPolicy')}</NavLink> | <NavLink to="/terms-of-use" className={styles.footerLink}>{t('footer.termsOfUse')}</NavLink> | <NavLink to="/steam-agreement" className={styles.footerLink}>{t('footer.steamAgreement')}</NavLink> | <NavLink to="/refund-policy" className={styles.footerLink}>{t('footer.refundPolicy')}</NavLink></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
