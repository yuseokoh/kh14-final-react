import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { memberIdState, memberLevelState } from "../../utils/recoil";
import Jumbotron from "../Jumbotron";
import axios from "axios";
import styles from './PaymentConfirmationPage.module.css';

const PaymentConfirmationPage = ()=>{
    const [memberId] = useRecoilState(memberIdState);
  //state
  const [gameList, setGameList] = useState([
      { id: 1, title: 'League of Legends', price: 20000, qty: 1 }
  ]);

  const changeGameQty = useCallback((target, qty)=>{
      setGameList(gameList.map(game=>{
          if(game.id === target.id) {
              return {...game, qty: qty};
          }
          return {...game};
      }));
  }, [gameList]);
  const checkedGameTotal = useMemo(()=>{
    return gameList.reduce((before, current)=>{
        //return 누적합계 + (현재게임가격 * 현재게임수량)
        return before + (current.price * current.qty);
    }, 0);
}, [gameList]);
const getCurrentUrl = useCallback(()=>{
  return window.location.origin 
              + window.location.pathname 
              + (window.location.hash || '');
}, []);

const sendPurchaseRequest = useCallback(async ()=>{
  if(gameList.length === 0) return;

  try {
      const token = sessionStorage.getItem('refreshToken');
      if (!token) {
          throw new Error('토큰이 없습니다. 다시 로그인해주세요.');
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
    console.error('결제 준비 중 오류가 발생했습니다:', error);
    alert('결제 준비에 실패했습니다. 다시 시도해주세요.');
}
}, [gameList, getCurrentUrl]);

//view
return (<>
<Jumbotron title="게임 결제 페이지"/>

<div className="row mt-4">
    <div className="col">
        <table className="table">
        <thead>
                      <tr>
                          <th>번호</th>
                          <th>제목</th>
                          <th>가격</th>
                          <th>수량</th>
                      </tr>
                  </thead>
                  <tbody>{gameList.map(game=>(
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.title}</td>
                            <td>{game.price}원</td>
                            <td>
                                <input type="number" className="form-control"
                                        min="1" step="1"
                                        style={{width:"100px"}}
                                        value={game.qty}
                                        onChange={e=>changeGameQty(game, e.target.value)}
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
                <div className={styles.paymentInfoTab}>Payment Info</div>
                <div className={styles.triangle}></div>
                <div className={styles.reviewPurchaseTab}>Review + Purchase</div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.confirmationBox}>
                    <div className={styles.purchaseDetails}>
                        <img src={`/images/league_of_legends.png`} alt="League of Legends" className={styles.productImage} />

                        <div className={styles.details}>
                            <h2>League of Legends</h2>
                            <p>Total: ₩{checkedGameTotal}</p>
                            <p className={styles.vatInfo}>All prices include VAT where applicable</p>
                        </div>
                    </div>

                    <div className={styles.paymentInfo}>
                        <p>Payment method: <span className={styles.textInfo}>KakaoPay (Change)</span></p>
                        <p>Steam account: {memberId}</p>
                    </div>  <div className={styles.terms}>
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                        /> <label htmlFor="terms-checkbox">
                        I agree to the terms of the <a href="#" className={styles.textLink}>Steam Subscriber Agreement</a> (last updated 27 Sep, 2024).
                        KakaoPay transactions are authorized through the Smart2Pay website. Click the button below to open a new web browser to initiate the transaction.
                    </label>
                </div>
                <button className={styles.continueButton} onClick={sendPurchaseRequest}>
                    Continue to Smart2Pay
                </button>
                <p className={styles.confirmationEmail}>
                    Confirmation will be emailed to your address at gmail.com
                </p>
            </div>
            <div className={styles.purchasingInfo}>
                <h2>Purchasing on Steam</h2>
                <p>Once you've completed this transaction, your payment method will be debited, and you'll receive an email message confirming receipt of your purchase.</p>
            </div>
        </div>
    </div>
</>);
};
export default PaymentConfirmationPage;

