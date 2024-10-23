import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RefundPolicy.module.css';

const RefundPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.refundPolicyWrapper}>
      <div className={styles.refundPolicyContainer}>
        <h1 className={styles.title}>{t('refundPolicy.title')}</h1>

        <div className={styles.contentSection}>
          <p className={styles.content}>{t('refundPolicy.overview')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.refundScopeTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.refundScopeContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.dlcRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.dlcRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.inGameRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.inGameRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.preOrderRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.preOrderRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.steamWalletRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.steamWalletRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.subscriptionRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.subscriptionRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.hardwareRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.hardwareRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.bundleRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.bundleRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.outsidePurchaseTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.outsidePurchaseContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.vacBanTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.vacBanContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.videoContentRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.videoContentRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.giftRefundTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.giftRefundContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.euRightsTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.euRightsContent')}</p>
        </div>

        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>{t('refundPolicy.abuseTitle')}</h2>
          <p className={styles.content}>{t('refundPolicy.abuseContent')}</p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
