import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './PaymentConfirmationPage.css';

const PaymentConfirmationPage = ({ itemName, totalAmount, userAccount }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = async () => {
    if (isChecked) {
      try {
        // localStorage에서 저장된 JWT 토큰 가져오기
        const token = localStorage.getItem('jwtToken');

        // 결제 준비 요청 보내기
        const response = await axios.post('/ready', {
          itemName: itemName,
          totalAmount: totalAmount,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // 저장된 JWT 토큰을 사용
          },
        });

        // 결제 준비 성공 시, 카카오페이에서 제공한 리다이렉트 링크로 이동
        console.log('Payment Ready Response:', response.data);
        window.location.href = response.data.nextRedirectPcUrl;
      } catch (error) {
        console.error('Error preparing payment:', error);
        alert('결제 준비 중 오류가 발생했습니다.');
      }
    } else {
      alert('약관에 동의해주세요.');
    }
  };
  return (
    <div className="container payment-confirmation-page">
      <div className="card p-4 confirmation-box">
        <h1 className="mb-4">Review + Purchase</h1>
        <div className="card mb-4 purchase-details">
        <img src={`/images/${itemName?.toLowerCase() || 'default'}.png`} alt={itemName} className="card-img-top product-image" />

          <div className="card-body details">
            <h2 className="card-title">{itemName}</h2>
            <p className="card-text">Subtotal: ₩{totalAmount}</p>
            <p className="card-text">Total: ₩{totalAmount}</p>
          </div>
        </div>
        <div className="mb-4 payment-info">
          <p>Earn Steam Points for this purchase</p>
          <div className="payment-method mb-2">Payment method: KakaoPay (Change)</div>
          <div className="steam-account mb-4">Steam account: {userAccount}</div>
          <div className="form-check terms">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="terms-checkbox"
            />
            <label htmlFor="terms-checkbox" className="form-check-label">
              I agree to the terms of the <a href="#" className="text-info">Steam Subscriber Agreement</a> (last updated 27 Sep, 2024.) KakaoPay transactions are authorized through the Smart2Pay website. Click the button below to open a new web browser to initiate the transaction.
            </label>
          </div>
        </div>
        <button onClick={handleContinue} className="btn btn-success w-100 continue-button">
          Continue to Smart2Pay
        </button>
        <p className="confirmation-email mt-3">
          Confirmation will be emailed to your address at gmail.com
        </p>
      </div>
      <div className="card mt-4 p-4 purchasing-info">
        <h2>Purchasing on Steam</h2>
        <p>Once you've completed this transaction, your payment method will be debited, and you'll receive an email message confirming receipt of your purchase.</p>
      </div>
    </div>
  );
};
export default PaymentConfirmationPage;