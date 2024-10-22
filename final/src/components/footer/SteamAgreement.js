import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SteamAgreement.module.css';

const SteamAgreement = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.steamAgreementContainer}>
      <h1 className={styles.title}>{t('steamAgreement.title')}</h1>
      <div className={styles.contentSection}>
        <p className={styles.content}>{t('steamAgreement.introductionContent')}</p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>1. {t('steamAgreement.section1Title')}</h2>
        <p className={styles.content}>{t('steamAgreement.section1Content')}</p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>A. {t('steamAgreement.section1SubTitleA')}</h2>
        <p className={styles.content}>{t('steamAgreement.section1SubContentA')}</p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>B. {t('steamAgreement.section1SubTitleB')}</h2>
        <p className={styles.content}>{t('steamAgreement.section1SubContentB')}</p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>C. {t('steamAgreement.section1SubTitleC')}</h2>
        <p className={styles.content}>{t('steamAgreement.section1SubContentC')}</p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.sectionTitle}>D. {t('steamAgreement.section1SubTitleD')}</h2>
        <p className={styles.content}>{t('steamAgreement.section1SubContentD')}</p>
      </div>
    </div>
  );
};

export default SteamAgreement;
