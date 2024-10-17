import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import Jumbotron from "../Jumbotron";
import axios from "axios";
import styles from './PaymentConfirmationPage.module.css';
import { useTranslation } from 'react-i18next';

const PaymentConfirmationPage = () => {
    const { t } = useTranslation();
    const [memberId] = useRecoilState(memberIdState);
  //state
  const [gameList, setGameList] = useState([
      { id: 1, title: 'League of Legends', price: 20000, qty: 1 }
  ]);

  const changeGameQty = useCallback((target, qty) => {
      setGameList(gameList.map(game => {
          if (game.id === target.id) {
              return { ...game, qty: qty };
          }
          return { ...game };
      }));
  }, [gameList]);
  
  const checkedGameTotal = useMemo(() => {
    return gameList.reduce((before, current) => {
        return before + (current.price * current.qty);
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

          const game = gameList[0];
          const response = await axios.post(
              "http://localhost:8080/kakaopay/ready",
              {
                  itemName: game.title,
                  totalAmount: game.price * game.qty,
                  approvalUrl: getCurrentUrl() + "/success",
                  cancelUrl: getCurrentUrl() + "/cancel",
                  failUrl: getCurrentUrl() + "/fail",
              }, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          window.sessionStorage.setItem("tid", response.data.tid);
          window.sessionStorage.setItem("game", JSON.stringify(game));

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
                      <tr key={game.id}>
                          <td>{game.id}</td>
                          <td>{game.title}</td>
                          <td>{game.price}{t('payment.currency')}</td>
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
