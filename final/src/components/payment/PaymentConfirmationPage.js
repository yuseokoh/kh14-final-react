import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentConfirmationPage.css';

const PaymentConfirmationPage = ({ itemName, totalAmount, userAccount }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = async () => {
    if (isChecked) {
      try {
        const token = localStorage.getItem('jwtToken');

        const response = await axios.post('/ready', {
          itemName: itemName,
          totalAmount: totalAmount,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="payment-confirmation-page">
     <div className="tab-container">
  <div className="payment-info-tab">Payment Info</div>
  <div className="triangle"></div>
  <div className="review-purchase-tab">Review + Purchase</div>
</div>


      <div className="main-content">
        <div className="confirmation-box">
          <div className="purchase-details">
            <img src={`/images/${itemName?.toLowerCase() || 'default'}.png`} alt={itemName} className="product-image" />
            <div className="details">
              <h2>{itemName}</h2>
              <p>Subtotal: ₩{totalAmount}</p>
              <p>Total: ₩{totalAmount}</p>
              <p className="vat-info">All prices include VAT where applicable</p>
            </div>
          </div>
          
          <div className="payment-info">
            <p>Payment method: <span className="text-info">KakaoPay (Change)</span></p>
            <p>Steam account: {userAccount}</p>
          </div>
          <div className="terms">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              id="terms-checkbox"
            />
            <label htmlFor="terms-checkbox">
              I agree to the terms of the <a href="#" className="text-link">Steam Subscriber Agreement</a> (last updated 27 Sep, 2024.)
              KakaoPay transactions are authorized through the Smart2Pay website. Click the button below to open a new web browser to initiate the transaction.
            </label>
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
    </div>
  );
};

export default PaymentConfirmationPage;
