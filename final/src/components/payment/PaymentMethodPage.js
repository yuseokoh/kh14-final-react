import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './PaymentMethodPage.module.css';

const PaymentMethodPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleNavigateToConfirmation = useCallback(() => {
    navigate('/payment/confirmation', {
      replace: true,
      state: { selectedMethod }, // 결제 방식 데이터를 전달
    });
  }, [navigate, selectedMethod]);

  const handleContinue = () => {
    if (selectedMethod) {
      handleNavigateToConfirmation();
    } else {
      alert(t('paymentMethod.selectMethodAlert'));
    }
  };

  return (
    <div className={styles.paymentMethodPage}>
      <div className={styles.tabsContainer}>
        <div className={styles.paymentInfo2Tab}>{t('paymentMethod.paymentInfoTab')}</div>
        <div className={styles.triangleRight}></div>
        <div className={styles.reviewPurchase2Tab}>{t('paymentMethod.reviewPurchaseTab')}</div>
      </div>
      <h1 className={styles.pageTitle}>{t('paymentMethod.pageTitle')}</h1>
      <div className={styles.paymentMethodContent}>
        <div className={styles.paymentMethodSelect}>
          <p>{t('paymentMethod.selectPaymentMethod')}</p>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className={styles.selectMethod}
          >
            <option value="">{t('paymentMethod.selectMethodPlaceholder')}</option>
            <option value="kakaoPay">{t('paymentMethod.kakaoPay')}</option>
          </select>
          <p className={styles.billingInfo}>
            {t('paymentMethod.billingInfo')}{' '}
            <a href="#" className={styles.textLink}>{t('paymentMethod.storeRegionPreference')}</a>
          </p>
          <p>{t('paymentMethod.reviewOrderInfo')}</p>
        </div>
        <div className={styles.paymentMethodIconsContainer}>
          <h2>{t('paymentMethod.paymentMethods')}</h2>
          <div className={styles.paymentMethodIcons}>
            <img src="kakaopay.png" alt={t('paymentMethod.kakaoPayAlt')} />
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleContinue} className={styles.continueButton}>
          {t('paymentMethod.continueButton')}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
