import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaymentMethodPage.module.css';

const PaymentMethodPage = () => {
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
      alert('Please select a payment method.');
    }
  };

  return (
    <div className={styles.paymentMethodPage}>
      <div className={styles.tabsContainer}>
        <div className={styles.paymentInfo2Tab}>Payment Info</div>
        <div className={styles.triangleRight}></div>
        <div className={styles.reviewPurchase2Tab}>Review + Purchase</div>
      </div>
      <h1 className={styles.pageTitle}>PAYMENT METHOD</h1>
      <div className={styles.paymentMethodContent}>
        <div className={styles.paymentMethodSelect}>
          <p>Please select a payment method</p>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className={styles.selectMethod}
          >
            <option value="">Select a method</option>
            <option value="kakaoPay">KakaoPay</option>
          </select>
          <p className={styles.billingInfo}>
            If your billing address is not in Korea, Republic of, please{' '}
            <a href="#" className={styles.textLink}>set your store region preference</a>
          </p>
          <p>You'll have a chance to review your order before it's placed.</p>
        </div>
        <div className={styles.paymentMethodIconsContainer}>
          <h2>PAYMENT METHODS</h2>
          <div className={styles.paymentMethodIcons}>
            <img src="kakaopay.png" alt="KakaoPay" />
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleContinue} className={styles.continueButton}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodPage;

