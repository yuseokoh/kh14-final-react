import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ShoppingCart.module.css';
import { useRecoilValue } from 'recoil';
import { loginState, memberIdState, memberLoadingState } from "../../utils/recoil";

const ShoppingCart = () => {
  const [cartList, setCartList] = useState([]);

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

      <button type='button'>결제하기</button>
    </div>
  );
};

export default ShoppingCart;