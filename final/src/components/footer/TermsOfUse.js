import React from 'react';
import styles from './TermsOfUse.module.css';
import { useTranslation } from 'react-i18next';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.termsOfUseContainer}>
      <h1 className={styles.title}>{t('termsOfUse.title')}</h1>

      <div className={styles.copyrightSection}>
        <h3>{t('termsOfUse.copyrightTitle')}</h3>
        <p>{t('termsOfUse.copyrightContent')}</p>
      </div>

      <div className={styles.copyrightSection}>
        <h3>{t('termsOfUse.videoPolicyTitle')}</h3>
        <p>
          <a href="#">{t('termsOfUse.videoPolicyLink')}</a>
        </p>
      </div>

      <div className={styles.copyrightSection}>
        <h3>{t('termsOfUse.thirdPartyTitle')}</h3>
        <p>{t('termsOfUse.thirdPartyContent')}</p>
      </div>

      <div className={styles.copyrightSection}>
        <h3>{t('termsOfUse.copyrightInfringementTitle')}</h3>
        <p>{t('termsOfUse.copyrightInfringementContent')}</p>
        <p>
          <a href="http://lcweb.loc.gov/copyright/">{t('termsOfUse.copyrightLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
