import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TermsOfUse.module.css';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.termsOfUseContainer}>
      <h1 className={styles.title}>{t('termsOfUse.title')}</h1>

      <div className={styles.contentBox}>
        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>{t('termsOfUse.copyrightTitle')}</h2>
          <p className={styles.content}>{t('termsOfUse.copyrightContent')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>{t('termsOfUse.videoPolicyTitle')}</h2>
          <p className={styles.content}>
            {t('termsOfUse.videoPolicyContent')}
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>{t('termsOfUse.thirdPartyTitle')}</h2>
          <p className={styles.content}>{t('termsOfUse.thirdPartyContent')}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionHeader}>{t('termsOfUse.copyrightInfringementTitle')}</h2>
          <p className={styles.content}>{t('termsOfUse.copyrightInfringementContent')}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
