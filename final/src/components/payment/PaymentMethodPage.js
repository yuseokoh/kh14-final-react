// PaymentMethodPage.js
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethodPage.css';

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');

  // 결제 수단 선택 후 navigate를 위한 함수 정의 (useCallback 사용)
  const handleNavigateToConfirmation = useCallback(() => {
    console.log('Navigating to payment confirmation page...');
    navigate('/payment-confirmation', { replace: true });
  }, [navigate]);

  const handleContinue = () => {
    if (selectedMethod) {
      console.log('Payment method selected:', selectedMethod);
      handleNavigateToConfirmation();
    } else {
      alert('결제 수단을 선택해주세요.');
    }
  };
  return (
    <div className="payment-method-page">
      <h1>Payment Method</h1>
      <div className="payment-method-container">
        <div className="payment-method-select">
          <p>Please select a payment method</p>
          <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="">Select a method</option>
            <option value="kakaoPay">KakaoPay</option>
          </select>
          <p className="billing-info">
            If your billing address is not in Korea, Republic of, please{' '}
            <a href="#">set your store region preference</a>
          </p>
          <p>You'll have a chance to review your order before it's placed.</p>
        </div>
        <div className="payment-methods">
          <h2>PAYMENT METHODS</h2>
          <div className="payment-method-icons">
            <img src="visa.png" alt="Visa" />
            <img src="mastercard.png" alt="Mastercard" />
            <img src="jcb.png" alt="JCB" />
            {/* 여기에 모든 아이콘 추가 */}
          </div>
        </div>
      </div>
      <button onClick={handleContinue} className="continue-button">
        Continue
      </button>
    </div>
  );
};

export default PaymentMethodPage;