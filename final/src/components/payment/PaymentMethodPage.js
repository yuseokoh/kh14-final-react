import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethodPage.css';

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleNavigateToConfirmation = useCallback(() => {
    navigate('/payment-confirmation', { replace: true });
  }, [navigate]);

  const handleContinue = () => {
    if (selectedMethod) {
      handleNavigateToConfirmation();
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="payment-method-page p-4">

      <div className="tabs-container">
        <div className="payment-info-tab">Payment Info</div>
        <div className="triangle-right"></div>
        <div className="review-purchase-tab">Review + Purchase</div>
      </div>
      <h1 className="page-title">PAYMENT METHOD</h1>
      <div className="payment-method-content">
        <div className="payment-method-select">
          <p>Please select a payment method</p>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="select-method"
          >
            <option value="">Select a method</option>
            <option value="kakaoPay">KakaoPay</option>
          </select>
          <p className="billing-info">
            If your billing address is not in Korea, Republic of, please{' '}
            <a href="#" className="text-link">set your store region preference</a>
          </p>
          <p>You'll have a chance to review your order before it's placed.</p>
        </div>
        <div className="payment-method-icons-container">
          <h2>PAYMENT METHODS</h2>
          <div className="payment-method-icons">
            <img src="kakaopay.png" alt="KakaoPay" />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleContinue} className="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
