import { useParams, useNavigate } from "react-router";
import Jumbotron from "../Jumbotron";
import { useRecoilValue } from "recoil";
import { loginState, memberLoadingState, memberIdState } from "../../utils/recoil";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import styles from './PaymentSuccessPage.module.css';
import '../../router/Steam.css';
import LoginImage from './Login.jpg'; // 파일이 같은 폴더 내에 있기 때문에 './'로 경로 수정

const PaymentSuccessPage = () => {
    const { t } = useTranslation();
    const { partnerOrderId } = useParams();
    const navigate = useNavigate();
    const login = useRecoilValue(loginState);
    const memberLoading = useRecoilValue(memberLoadingState);
    const memberId = useRecoilValue(memberIdState);

    const [result, setResult] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemName, setItemName] = useState(t("paymentSuccess.unknownItem"));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (login && memberLoading) {
            const gameData = JSON.parse(window.sessionStorage.getItem("game"));
            if (gameData) {
                setItemName(gameData.title);
                setTotalAmount(gameData.price * gameData.qty);
            }
            sendApproveRequest();
        }
    }, [login, memberLoading]);

    useEffect(() => {
        // 로딩 상태를 3초 후에 해제
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const sendApproveRequest = useCallback(async () => {
        try {
            const resp = await axios.post(
                "http://localhost:8080/kakaopay/approve",
                {
                    partnerOrderId: partnerOrderId,
                    pgToken: new URLSearchParams(window.location.search).get("pg_token"),
                    tid: window.sessionStorage.getItem("tid")
                }
            );
            setResult(true);
        } catch (e) {
            setResult(false);
        } finally {
            window.sessionStorage.removeItem("tid");
            window.sessionStorage.removeItem("game");
        }
    }, [partnerOrderId]);

    const handleGoToStore = () => navigate("/store");
    const handleGoToLibrary = () => navigate("/library");

    if (isLoading) {
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

    if (result === null) {
        return <h1>{t('paymentSuccess.processingMessage')}</h1>;
    } else if (result === true) {
        return (
            <div className={styles.paymentSuccessContainer}>
                <h1 className="text-primary mb-4">{t('paymentSuccess.thankYouMessage')}</h1>
                <p>{t('paymentSuccess.successMessage')}</p>

                <div className={styles.purchaseReceipt}>
                    <h2>{t('paymentSuccess.purchaseReceipt')}</h2>
                    <p>{t('paymentSuccess.accountName')}: {memberId}</p>
                    <p>{t('paymentSuccess.itemName')}: {itemName}</p>
                    <p>{t('paymentSuccess.totalAmount')}: ₩{totalAmount}</p>
                </div>

                <div className={styles.navigationButtons}>
                    <button onClick={handleGoToStore} className="btn btn-primary">
                        {t('paymentSuccess.goToStore')}
                    </button>
                    <button onClick={handleGoToLibrary} className="btn btn-secondary">
                        {t('paymentSuccess.goToLibrary')}
                    </button>
                </div>
            </div>
        );
    } else {
        return <h1>{t('paymentSuccess.failureMessage')}</h1>;
    }
};

export default PaymentSuccessPage;
