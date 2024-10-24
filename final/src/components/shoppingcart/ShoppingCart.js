import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css';
import { useRecoilValue } from 'recoil';
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";
import { useTranslation } from 'react-i18next';

const ShoppingCart = () => {
  const [cartList, setCartList] = useState([]);
  const { t } = useTranslation();


  //테스트 커밋
  const [ar, rr] = useState([]);
  //지워야함 

  // Recoil 상태 사용
  const login = useRecoilValue(loginState);
  const memberId = useRecoilValue(memberIdState);
  const memberLoading = useRecoilValue(memberLoadingState);

  // 장바구니 리스트 불러오는 함수
  const loadCartList = useCallback(async () => {
    try {
      const resp = await axios.get("/cart/");
      setCartList(resp.data);
    } catch (error) {
      console.error("Failed to load cart list", error);
    }
  }, []);

  useEffect(() => {
    if (login && memberId) {
      loadCartList();
    }
  }, [login, memberId, loadCartList]);

  const getCurrentUrl = useCallback(() => {
    return window.location.origin + window.location.pathname + (window.location.hash || '');
  }, []);

  const sendPurchaseRequest = useCallback(async () => {
    if (cartList.length === 0) {
      alert(t('payment.noItemsInCart'));
      return;
    }

    try {
      const token = sessionStorage.getItem('refreshToken');
      if (!token) {
        throw new Error(t('payment.errorNoToken'));
      }

      const response = await axios.post(
        "http://localhost:8080/game/purchase",
        {
          gameList: cartList.map(game => ({
            gameNo: game.gameNo,
            qty: 1, // 장바구니에서 각 게임의 수량을 1로 고정
          })),
          approvalUrl: getCurrentUrl() + "/success",
          cancelUrl: getCurrentUrl() + "/cancel",
          failUrl: getCurrentUrl() + "/fail",
        },
       
      );

      window.sessionStorage.setItem("tid", response.data.tid);
      window.sessionStorage.setItem("checkedGameList", JSON.stringify(cartList));

      const savedTid = sessionStorage.getItem("tid");
      if (!savedTid) {
        throw new Error("tid 저장에 실패했습니다.");
      }

      // 카카오페이 결제 페이지로 리다이렉트
      window.location.href = response.data.next_redirect_pc_url;
    } catch (error) {
      console.error(t('payment.errorDuringPurchase'), error);
      alert(t('payment.errorPurchaseFailed'));
    }
  }, [cartList, getCurrentUrl, t]);

  return (
    <div className={styles.cartContainer}>
      {cartList.map(cart => (
        <div key={cart.cartId} className={styles.cartItem}>
          {/* 게임 썸네일 */}
          <img src={cart.gameThumbnail} alt={cart.gameTitle} className={styles.gameThumbnail} />

          {/* 게임 정보 및 가격 */}
          <div className={styles.gameInfo}>
            <h4 className={styles.gameTitle}>{cart.gameTitle}</h4>
            <p className={styles.gamePrice}>{cart.gamePrice.toLocaleString()}$</p>
          </div>

          {/* 추가 기능 (선물용 버튼 등) */}
          <div className={styles.actionButtons}>
            <button className={styles.giftButton}>선물용</button>
            <button className={styles.removeButton}>제거</button>
          </div>
        </div>
      ))}

      <button type='button' onClick={sendPurchaseRequest} className={styles.checkoutButton}>
        결제하기
      </button>
    </div>
  );
};

export default ShoppingCart;