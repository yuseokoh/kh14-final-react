import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 결제 성공 시 전달된 데이터를 location.state에서 가져옵니다.
  const { itemName = '알 수 없는 상품', totalAmount = 0, memberId = '알 수 없는 계정' } = location.state || {};

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleInstallContent = () => {
    alert('콘텐츠 설치 페이지로 이동합니다. (기능 준비 중)');
  };

  const handlePrintReceipt = () => {
    alert('영수증 인쇄 기능을 구현합니다. (기능 준비 중)');
  };

  const handleGoToLibrary = () => {
    navigate('/library'); // 라이브러리 페이지로 이동
  };
  return (
    <div className="payment-success-container container text-center py-5">
      <h1 className="text-primary mb-4">구매해 주셔서 감사합니다!</h1>
      <p>확인 이메일이 전송되었습니다.</p>
      <p>
        구매하신 디지털 제품이 귀하의 계정에 등록되었습니다. 이제 Steam 라이브러리에서 언제든지 게임을 즐기실 수 있습니다.
      </p>

      <div className="content-install bg-dark text-white rounded p-4 my-4">
        <h2>새 콘텐츠 설치</h2>
        <button onClick={handleInstallContent} className="btn btn-success mt-3">
          콘텐츠 설치
        </button>
      </div>

      <div className="steam-points bg-dark text-white rounded p-4 my-4">
        <h2>STEAM 포인트</h2>
        <p>Steam 포인트를 획득했습니다. 포인트 상점에서 포인트를 사용하세요.</p>
      </div>

      <div className="purchase-receipt bg-dark text-white rounded p-4 my-4">
        <h2>구매 영수증</h2>
        <p>계정 이름: {memberId}</p>
        <p>상품명: {itemName}</p>
        <p>총액: ₩{totalAmount}</p>
        <button onClick={handlePrintReceipt} className="btn btn-info mt-3">
          인쇄
        </button>
      </div>

      <div className="navigation-buttons d-flex justify-content-around mt-4">
        <button onClick={handleGoBack} className="btn btn-primary">
          상점으로 돌아가기
        </button>
        <button onClick={handleGoToLibrary} className="btn btn-secondary">
          라이브러리로 이동하기
        </button>
      </div>
    </div>
  );
};
export default PaymentSuccessPage;
