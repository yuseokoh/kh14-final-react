import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { memberIdState } from "../../utils/recoil";
import { useParams } from "react-router";
import Jumbotron from "../Jumbotron";
import axios from "axios";
import styles from './PaymentConfirmationPage.module.css';
import { useTranslation } from 'react-i18next';

const PaymentConfirmationPage = () => {
    const { t } = useTranslation();
    const [memberId] = useRecoilState(memberIdState);
    //state
    const [gameList, setGameList] = useState([]);
    const { partnerOrderId } = useParams(); // URL에서 파라미터 가져오기

    useEffect(() => {
        loadGameList();
    }, []);

    // 게임 목록 로드하는 함수
    const loadGameList = useCallback(async () => {
        try {
            const resp = await axios.get("http://localhost:8080/game/"); // 서버에서 게임 목록 가져오기
            setGameList(resp.data.map(game => {
                return {
                    ...game,
                    select: false, // 체크박스용 상태값 추가
                    qty: 1 // 수량을 1로 고정
                };
            }));
        } catch (error) {
            console.error("게임 목록을 불러오는데 실패했습니다.", error);
        }
    }, []);

    const changeGameQty = useCallback((target, qty) => {
        setGameList(gameList.map(game => {
            if (game.gameNo === target.gameNo) {
                return { ...game, qty: qty };
            }
            return { ...game };
        }));
    }, [gameList]);
  
    const checkedGameTotal = useMemo(() => {
        return gameList.reduce((before, current) => {
            return before + (current.gamePrice * current.qty);
        }, 0);
    }, [gameList]);
  
    const getCurrentUrl = useCallback(() => {
        return window.location.origin
            + window.location.pathname
            + (window.location.hash || '');
    }, []);

    const sendPurchaseRequest = useCallback(async () => {
        if (gameList.length === 0) return;
    
        try {
            const token = sessionStorage.getItem('refreshToken');
            if (!token) {
                throw new Error(t('payment.errorNoToken'));
            }
    
            const response = await axios.post(
                "http://localhost:8080/game/purchase",
                {
                    gameList: gameList.map(game => ({
                        gameNo: game.gameNo,
                        qty: game.qty,
                    })),
                    approvalUrl: getCurrentUrl() + "/success",
                    cancelUrl: getCurrentUrl() + "/cancel",
                    failUrl: getCurrentUrl() + "/fail",
                },
                {
                    
                }
            );
    
            window.sessionStorage.setItem("tid", response.data.tid);
            window.sessionStorage.setItem("game", JSON.stringify(gameList));
    
            const savedTid = sessionStorage.getItem("tid");
            if (!savedTid) {
                throw new Error("tid 저장에 실패했습니다.");
            }
    
            window.location.href = response.data.next_redirect_pc_url;
        } catch (error) {
            console.error(t('payment.errorDuringPurchase'), error);
            alert(t('payment.errorPurchaseFailed'));
        }
    }, [gameList, getCurrentUrl, t]);
    
    
    //view
    return (<>
        <Jumbotron title={t('payment.pageTitle')} />

        <div className="row mt-4">
            <div className="col">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('payment.table.number')}</th>
                            <th>{t('payment.table.title')}</th>
                            <th>{t('payment.table.price')}</th>
                            <th>{t('payment.table.quantity')}</th>
                        </tr>
                    </thead>
                    <tbody>{gameList.map(game => (
                        <tr key={game.gameNo}>
                            <td>{game.gameNo}</td>
                            <td>{game.gameTitle}</td>
                            <td>{game.gamePrice}{t('payment.currency')}</td>
                            <td>
                                <input type="number" className="form-control"
                                    min="1" step="1"
                                    style={{ width: "100px" }}
                                    value={game.qty}
                                    onChange={e => changeGameQty(game, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className={styles.paymentConfirmationPage}>
            <div className={styles.tabContainer}>
                <div className={styles.paymentInfoTab}>{t('payment.paymentInfoTab')}</div>
                <div className={styles.triangle}></div>
                <div className={styles.reviewPurchaseTab}>{t('payment.reviewPurchaseTab')}</div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.confirmationBox}>
                    <div className={styles.purchaseDetails}>
                        <img src={`/images/league_of_legends.png`} alt={t('payment.productImageAlt')} className={styles.productImage} />

                        <div className={styles.details}>
                            <h2>League of Legends</h2>
                            <p>{t('payment.total')}: ₩{checkedGameTotal}</p>
                            <p className={styles.vatInfo}>{t('payment.vatInfo')}</p>
                        </div>
                    </div>

                    <div className={styles.paymentInfo}>
                        <p>{t('payment.method')}: <span className={styles.textInfo}>KakaoPay ({t('payment.change')})</span></p>
                        <p>{t('payment.steamAccount')}: {memberId}</p>
                    </div>
                    <div className={styles.terms}>
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                        /> <label htmlFor="terms-checkbox">
                            {t('payment.agreeTerms')} <a href="#" className={styles.textLink}>{t('payment.steamSubscriberAgreement')}</a> (last updated 27 Sep, 2024).
                            {t('payment.kakaoPayNotice')}
                        </label>
                    </div>
                    <button className={styles.continueButton} onClick={sendPurchaseRequest}>
                        {t('payment.continueButton')}
                    </button>
                    <p className={styles.confirmationEmail}>
                        {t('payment.confirmationEmail')}
                    </p>
                </div>
                <div className={styles.purchasingInfo}>
                    <h2>{t('payment.purchasingOnSteam')}</h2>
                    <p>{t('payment.purchaseDescription')}</p>
                </div>
            </div>
        </div>
    </>);
};

export default PaymentConfirmationPage;
