import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentSuccessPage.css';
import { memberIdState } from '../../utils/recoil';
import { useRecoilState } from 'recoil';

const PaymentSuccessPage = () => {
  const [memberId,] = useRecoilState(memberIdState);
  const location = useLocation();
  const navigate = useNavigate();

  // 결제 성공 시 전달된 데이터를 location.state에서 가져옵니다.
  const { itemName = '알 수 없는 상품', totalAmount = 0,} = location.state || {};

  const handleGoToStore = () => {
    navigate('/store'); // 상점 페이지로 이동
  };

  const handleGoToLibrary = () => {
    navigate('/library'); // 라이브러리 페이지로 이동
  };

  return (
    <div className="payment-success-container container text-center py-5">
      <h1 className="text-primary mb-4">구매해 주셔서 감사합니다!</h1>
     
      <p>구매하신 게임이 귀하의 계정에 등록되었습니다. 이제 Steam 라이브러리에서 언제든지 게임을 즐기실 수 있습니다.</p>

      <div className="purchase-receipt text-white rounded p-4 my-4">
        <h2>구매 영수증</h2>
        <p>계정 이름: {memberId}</p>
        <p>상품명: {itemName}</p>
        <p>총액: ₩{totalAmount}</p>
      </div>

      <div className="navigation-buttons d-flex justify-content-around mt-4">
        <button onClick={handleGoToStore} className="btn btn-primary">
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
