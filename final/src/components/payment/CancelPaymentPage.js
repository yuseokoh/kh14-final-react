// CancelPaymentPage.js
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CancelPaymentPage = () => {
  const { paymentNo: paramPaymentNo } = useParams();
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 세션 스토리지에서 paymentNo 가져오기
    const paymentNo = window.sessionStorage.getItem('paymentNo');

    // paymentNo가 존재하지 않을 경우 오류 처리
    if (!paymentNo) {
      setError('결제 번호가 없습니다.');
      setLoading(false);
      return;
    }

    console.log('PaymentNo from sessionStorage:', paymentNo); // 디버깅용 로그

    // 결제 정보 조회
    loadPaymentInfo(paymentNo);
  }, [paramPaymentNo]);

  const loadPaymentInfo = useCallback(async (paymentNo) => {
    try {
      console.log('Fetching payment info with paymentNo:', paymentNo); // 디버깅용 로그

      const token = sessionStorage.getItem('refreshToken');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      console.log('Authorization token:', token); // 토큰 확인용 디버그 로그

      // 결제 정보 조회를 위한 백엔드 엔드포인트 호출
      const response = await axios.get(
        `http://localhost:8080/kakaopay/detail/${paymentNo}`,
       
      );

      if (response.status === 200) {
        setPaymentInfo(response.data);
      } else if (response.status === 404) {
        setError('결제 정보를 찾을 수 없습니다.');
      } else {
        setError('결제 정보를 확인할 수 없습니다. 서버 관리자에게 문의하세요.');
      }
    } catch (e) {
      console.error('Error fetching payment info:', e);
      setError('결제 정보를 확인할 수 없습니다. 서버 관리자에게 문의하세요.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancelAllPayment = useCallback(async () => {
    try {
      const paymentNo = paramPaymentNo;

      console.log('Attempting to cancel payment with paymentNo:', paymentNo); // 디버깅용 로그

      // 결제 전체 취소 요청
      const response = await axios.delete(
        `http://localhost:8080/kakaopay/cancelAll/${paymentNo}`
      );

      if (response.status === 200) {
        alert('결제가 성공적으로 취소되었습니다.');
        loadPaymentInfo(paymentNo); // 화면 갱신
      } else {
        throw new Error('결제 취소 요청에 실패했습니다.');
      }
    } catch (e) {
      console.error('Error while canceling payment:', e);
      setError('결제 취소 중 오류가 발생했습니다. 서버 관리자에게 문의하세요.');
    }
  }, [paramPaymentNo, loadPaymentInfo]);

  if (loading) {
    return <h1>결제 정보를 확인 중입니다...</h1>;
  }

  if (error && !paymentInfo) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>결제 상세 정보 보기</h1>

      <div className="row mt-4">
        <div className="col">
          <h2>결제 요약 정보</h2>

          <div className="row mt-2">
            <div className="col-3">결제상품명</div>
            <div className="col-3">{paymentInfo.paymentDto.paymentName}</div>
          </div>
          <div className="row mt-2">
            <div className="col-3">총 결제금액</div>
            <div className="col-3">{paymentInfo.paymentDto.paymentTotal}원</div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <button className="btn btn-danger"
                disabled={paymentInfo.paymentDto.paymentRemain <= 0}
                onClick={handleCancelAllPayment}>
                전체취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPaymentPage;
