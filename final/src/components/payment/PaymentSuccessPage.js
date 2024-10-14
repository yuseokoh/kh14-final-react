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
