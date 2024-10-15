import { useParams, useNavigate } from "react-router";
import Jumbotron from "../Jumbotron";
import { useRecoilValue } from "recoil";
import { loginState, memberLoadingState, memberIdState } from "../../utils/recoil";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./PaymentSuccessPage.css";

const PaymentSuccessPage = () => {
    const { partnerOrderId } = useParams();
    const navigate = useNavigate();
    const login = useRecoilValue(loginState);
    const memberLoading = useRecoilValue(memberLoadingState);
    const memberId = useRecoilValue(memberIdState);

    const [result, setResult] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemName, setItemName] = useState("알 수 없는 상품");
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
            <div className="loading-container">
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
        return <h1>결제 진행 중입니다...</h1>;
    } else if (result === true) {
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
    } else {
        return <h1>결제 승인 실패...</h1>;
    }
};

export default PaymentSuccessPage;