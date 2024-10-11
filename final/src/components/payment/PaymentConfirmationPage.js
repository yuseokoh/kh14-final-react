// PaymentConfirmationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api'; // 생성한 axios 인스턴스 가져오기
import './PaymentConfirmationPage.css';

const PaymentConfirmationPage = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = async () => {
    if (isChecked) {
      try {
        // localStorage에서 저장된 JWT 토큰 가져오기
        const token = localStorage.getItem('jwtToken');

        // 결제 준비 요청 보내기
        const response = await axios.post('/ready', {
          itemName: 'OneShot',
          totalAmount: 11000,
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