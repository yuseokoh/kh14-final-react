import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './CancelPaymentPage.module.css';
import LoginImage from './Login.jpg';


const CancelPaymentPage = () => {
  const { paymentNo: paramPaymentNo } = useParams();
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCentralAlert, setShowCentralAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    let paymentNo = window.sessionStorage.getItem('paymentNo');
    if (paymentNo && !isNaN(Number(paymentNo))) {
      paymentNo = Number(paymentNo);
    } else {
      setError('결제 번호가 올바르지 않습니다.');
      setLoading(false);
      return;
    }

    loadPaymentInfo(paymentNo);

    return () => clearTimeout(timer);
  }, [paramPaymentNo]);

  const loadPaymentInfo = useCallback(async (paymentNo) => {
    try {
      const token = sessionStorage.getItem('refreshToken');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await axios.get(
        `http://localhost:8080/kakaopay/detail/${paymentNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setPaymentInfo(response.data);
      } else if (response.status === 404) {
        setError('결제 정보를 찾을 수 없습니다.');
      } else {
        setError('결제 정보를 확인할 수 없습니다. 서버 관리자에게 문의하세요.');
      }
    } catch (e) {
      setError('결제 정보를 확인할 수 없습니다. 서버 관리자에게 문의하세요.');
    }
  }, []);

  const handleCancelAllPayment = useCallback(async () => {
    try {
      setLoading(true);

      const paymentNo = Number(paramPaymentNo);
      if (isNaN(paymentNo)) {
        throw new Error('결제 번호가 올바르지 않습니다.');
      }

      const response = await axios.delete(
        `http://localhost:8080/kakaopay/cancelAll/${paymentNo}`
      );

      if (response.status === 200) {
        setTimeout(() => {
          setShowCentralAlert(true);
          loadPaymentInfo(paymentNo);
          setTimeout(() => {
            setShowCentralAlert(false);
          }, 3000);
        }, 3000);
      } else {
        throw new Error('결제 취소 요청에 실패했습니다.');
      }
    } catch (e) {
      console.error('Error while canceling payment:', e);
      setError('결제 취소 중 오류가 발생했습니다. 서버 관리자에게 문의하세요.');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [paramPaymentNo, loadPaymentInfo]);

  if (loading) {
    return (
      <div className="loading-container"
      style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh'
      }}
  >
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader">
          <g className="dash">
              <path style={{ "--sped": "4s" }} pathLength="360" d="M 31.9463 1 C 15.6331 1 2.2692 13.6936 1 29.8237 L 17.644 36.7682 C 19.0539 35.794 20.7587 35.2264 22.5909 35.2264 C 22.7563 35.2264 22.9194 35.231 23.0803 35.2399 L 30.4828 24.412 L 30.4828 24.2601 C 30.4828 17.7446 35.7359 12.4423 42.1933 12.4423 C 48.6507 12.4423 53.9038 17.7446 53.9038 24.2601 C 53.9038 30.7756 48.6507 36.08 42.1933 36.08 C 42.104 36.08 42.0168 36.0778 41.9275 36.0755 L 31.3699 43.6747 C 31.3766 43.8155 31.3811 43.9562 31.3811 44.0947 C 31.3811 48.9881 27.4374 52.9675 22.5909 52.9675 C 18.3367 52.9675 14.7773 49.902 13.9729 45.8443 L 2.068 40.8772 C 5.7548 54.0311 17.7312 63.6748 31.9463 63.6748 C 49.0976 63.6748 63 49.6428 63 32.3374 C 63 15.0297 49.0976 1 31.9463 1 Z" className="big"></path>
          </g>
          <path pathLength="360" d="M 31.9463 1 C 15.6331 1 2.2692 13.6936 1 29.8237 L 17.644 36.7682 C 19.0539 35.794 20.7587 35.2264 22.5909 35.2264 C 22.7563 35.2264 22.9194 35.231 23.0803 35.2399 L 30.4828 24.412 L 30.4828 24.2601 C 30.4828 17.7446 35.7359 12.4423 42.1933 12.4423 C 48.6507 12.4423 53.9038 17.7446 53.9038 24.2601 C 53.9038 30.7756 48.6507 36.08 42.1933 36.08 C 42.104 36.08 42.0168 36.0778 41.9275 36.0755 L 31.3699 43.6747 C 31.3766 43.8155 31.3811 43.9562 31.3811 44.0947 C 31.3811 48.9881 27.4374 52.9675 22.5909 52.9675 C 18.3367 52.9675 14.7773 49.902 13.9729 45.8443 L 2.068 40.8772 C 5.7548 54.0311 17.7312 63.6748 31.9463 63.6748 C 49.0976 63.6748 63 49.6428 63 32.3374 C 63 15.0297 49.0976 1 31.9463 1 Z" fill="#212121"></path>
      </svg>
  </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!paymentInfo) {
    return <h1>결제 정보를 불러오는 중 오류가 발생했습니다.</h1>;
  }

  return (
    
      <div className="mainContent">
        <div className={styles.paymentSummaryContainer}>
          <h2 className={styles.paymentTitle}>결제 요약 정보</h2>
    
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>결제상품명</span>
            <span className={styles.summaryValue}>{paymentInfo.paymentDto.paymentName}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>총 결제금액</span>
            <span className={styles.summaryValue}>{paymentInfo.paymentDto.paymentTotal}원</span>
          </div>
    
          <button
            className={styles.cancelButton}
            disabled={paymentInfo.paymentDto.paymentRemain <= 0}
            onClick={handleCancelAllPayment}
          >
            전체취소
          </button>
        </div>
    
        {showCentralAlert && (
          <div className={styles.centralAlert}>
            <div className={styles.iconContainer}>
              <FiCheckCircle size={50} color="#4caf50" />
            </div>
            <h2 className={styles.alertTitle}>결제 취소 성공!</h2>
            <p className={styles.alertMessage}>결제가 성공적으로 취소되었습니다.</p>
          </div>
        )}
      </div>
    );
    
};

export default CancelPaymentPage;