import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 결제 성공 시 전달된 데이터를 location.state에서 가져옵니다.
  const { itemName, totalAmount, memberId } = location.state || {};

  const handleGoBack = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="payment-success-container">
      <h1>구매해 주셔서 감사합니다!</h1>
      <p>확인 이메일이 전송되었습니다.</p>
      <p>
        구매하신 디지털 제품이 귀하의 계정에 등록되었습니다. 이제 Steam 라이브러리에서 언제든지 게임을 즐기실 수 있습니다.
      </p>

      <div className="content-install">
        <h2>새 콘텐츠 설치</h2>
        <button onClick={() => alert('콘텐츠 설치 페이지로 이동합니다.')}>
          콘텐츠 설치
        </button>
      </div>

      <div className="steam-points">
        <h2>STEAM 포인트</h2>
        <p>Steam 포인트를 획득했습니다. 포인트 상점에서 포인트를 사용하세요.</p>
      </div>

      <div className="purchase-receipt">
        <h2>구매 영수증</h2>
        <p>계정 이름: {memberId}</p>
        <p>상품명: {itemName}</p>
        <p>총액: ₩{totalAmount}</p>
        <button onClick={() => alert('영수증 인쇄 기능을 구현합니다.')}>
          인쇄
        </button>
      </div>

      <button onClick={handleGoBack} className="back-to-store-button">
        상점으로 돌아가기
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
