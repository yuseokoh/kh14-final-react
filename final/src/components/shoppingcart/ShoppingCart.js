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
    // try {
    //   let token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  
    //   if (!token) {
    //     const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
  
    //     if (refreshToken) {
    //       const resp = await axios.post('/member/refresh', { refreshToken });
    //       token = resp.data.accessToken;
    //       localStorage.setItem('accessToken', token);
    //     } else {
    //       console.error("No access token found");
    //       return;
    //     }
    //   }
  
      const resp = await axios.get("/cart/")
      console.log(resp.data);
      // , {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      setCartList(resp.data);
    // } catch (error) {
    //   console.error("Failed to load cart data", error);
    // }
  }, []);

  useEffect(() => {
    if (login && memberId) {
      loadCartList();
    }
  }, [login, memberId, loadCartList]);

  return (
    <div className="row mt-4">
      <div className="col">
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>게임이름</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {cartList.map(cart => (
              <tr key={cart.memberId}>
                <td>{cart.gameTitle} </td>
                <td>{cart.gamePrice.toLocaleString()} $</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingCart;
