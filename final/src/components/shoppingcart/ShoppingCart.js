import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css';
import { useRecoilValue } from 'recoil';
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";

const ShoppingCart = () => {
  const [cartList, setCartList] = useState([]);
  const [member, setMember] = useState({});

  // Recoil 상태 사용
  const login = useRecoilValue(loginState);
  const memberId = useRecoilValue(memberIdState);
  const memberLoading = useRecoilValue(memberLoadingState);

  // 장바구니 리스트 불러오는 함수
  const loadCartList = useCallback(async () => {
    const resp = await axios.get("/cart/");
    console.log(resp.data);
    setCartList(resp.data);
  }, []);

  useEffect(() => {
    if (login && memberId) {
      loadCartList();
    }
  }, [login, memberId, loadCartList]);

  // 총 금액 계산 함수
  const getTotalPrice = () => {
    return cartList.reduce((total, cart) => total + cart.gamePrice, 0).toLocaleString();
  };

  return (
    <div className={styles.loginPage}>
    <div className={styles.cartContainer} style={{ minHeight: '100vh' }}>
      <h1 className={styles.cartTitle}>{`${memberId}님의 장바구니`}</h1>
      <div className={styles.cartContent}>
        {cartList.length === 0 ? (
          <p className={styles.emptyCartMessage}>장바구니가 비어 있습니다.</p>
        ) : (
          cartList.map(cart => (
            <div key={cart.cartId} className={styles.cartItem}>
              <div className={styles.cartItemLeft}>
                {/* 게임 썸네일 */}
                <img src={cart.gameThumbnail} alt={cart.gameTitle} className={styles.gameThumbnail} />
              </div>
              <div className={styles.cartItemRight}>
                {/* 게임 정보 및 가격 */}
                <div className={styles.gameInfo}>
                  <h4 className={styles.gameTitle}>{cart.gameTitle}</h4>
                  <p className={styles.gamePrice}>{cart.gamePrice.toLocaleString()}₩</p>
                </div>
                {/* 추가 기능 (선물용 버튼 등) */}
                <div className={styles.actionButtons}>
                  <button className={styles.giftButton}>선물하기...</button>
                  <button className={styles.removeButton}>제거</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.cartFooter}>
        <div className={styles.totalPrice}>총 금액: {getTotalPrice()}₩</div>
        <button className={styles.checkoutButton} type='button'>결제하기</button>
      </div>
    </div>
    </div>
  );
};

export default ShoppingCart;

/* ShoppingCart.module.css */


