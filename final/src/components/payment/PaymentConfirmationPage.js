// PaymentConfirmationPage.js
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentConfirmationPage.css';

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  // 결제 완료 페이지로 navigate하는 함수 정의 (useCallback 사용)
  const handleNavigateToLoading = useCallback(() => {
    console.log('Navigating to Loading Page...');
    navigate('/loading', { replace: true });
  }, [navigate]);

  const handleContinue = () => {
    if (isChecked) {
      handleNavigateToLoading();
    } else {
      alert('약관에 동의해주세요.');
    }
  };

return (
    <div className="payment-confirmation-container">
      <div className="confirmation-box">
        <h1>Review + Purchase</h1>
        <div className="purchase-details">
          <img src="/images/oneshot.png" alt="OneShot" className="product-image" />
          <div className="details">
            <h2>OneShot</h2>
            <p>Subtotal: ₩11,000</p>
            <p>Total: ₩11,000</p>
          </div>
        </div>
        <div className="payment-info">
          <p>Earn Steam Points for this purchase</p>
          <div className="payment-method">Payment method: KakaoPay (Change)</div>
          <div className="steam-account">Steam account: rjalsjcjf430</div>
          <div className="terms">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="terms-checkbox"
            />
            <label htmlFor="terms-checkbox">
              I agree to the terms of the <a href="#">Steam Subscriber Agreement</a> (last updated 27 Sep, 2024.)
              KakaoPay transactions are authorized through the Smart2Pay website. Click the button below to open a new web browser to initiate the transaction.
            </label>
          </div>
        </div>
        <button onClick={handleContinue} className="continue-button">
          Continue to Smart2Pay
        </button>
        <p className="confirmation-email">
          Confirmation will be emailed to your address at gmail.com
        </p>
      </div>
      <div className="purchasing-info">
        <h2>Purchasing on Steam</h2>
        <p>Once you've completed this transaction, your payment method will be debited, and you'll receive an email message confirming receipt of your purchase.</p>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;