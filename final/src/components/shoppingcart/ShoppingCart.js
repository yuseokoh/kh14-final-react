import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ShoppingCart.module.css';
import { useRecoilValue } from 'recoil';
import { memberLoadingState } from '../../utils/recoil';

const ShoppingCart = () => {
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [cart, setCart] = useState([]);
  const [member, setMember] = useState("");
  const memberLoading = useRecoilValue(memberLoadingState);

  const loadMember = useCallback(async () => {
      const resp = await axios.get("/member/find");
      setMember(resp.data); 
  }, []);

  const loadCart = useCallback(async () => {
    if (!member) return;
    
      const resp = await axios.get(`/cart/${member.memberId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
      setCart(resp.data);
  }, [member]);

  useEffect(() => {
    if (memberLoading) {
      loadMember();
    }
  }, [memberLoading, loadMember]);

  useEffect(() => {
    if (member) {
      loadCart();
    }
  }, [member, loadCart]);

  // 게임 삭제
  const removeItem = async (index) => {
    try {
      const cartId = cart[index].cartId;
      await axios.delete(`/cart/${cartId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // 드래그 시작 시 호출되는 함수
  const dragStart = (e, position) => {
    dragItem.current = position;
    e.target.style.opacity = 0.5; // 드래그 시작 시 불투명하게
  };

  // 드래그 도중 호출되는 함수
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault();
  };

  // 드래그 완료 시 호출되는 함수
  const drop = (e) => {
    e.preventDefault();
    const newCart = [...cart];
    const draggedItem = newCart[dragItem.current];
    newCart.splice(dragItem.current, 1);
    newCart.splice(dragOverItem.current, 0, draggedItem);
    dragItem.current = null;
    dragOverItem.current = null;
    setCart(newCart);
    e.target.style.opacity = 1;
  };


  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cart_container}>
        <h1 className={styles.cart_title}>{`${member.memberId}'s Shopping Cart`}</h1>
        <div className={styles.main_content}>
          {/* 장바구니 아이템 리스트 */}
          <div className={styles.item_list_section}>
            <ul className={styles.item_list}>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className={styles.item}
                  draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={(e) => (e.target.style.opacity = 1)}
                >
                  <div className={styles.item_details}>
                    <img src={item.imageUrl || 'https://via.placeholder.com/200x100'} alt={item.name} className={styles.item_image} />
                    <span>{item.name}</span>
                  </div>
                  <div className={styles.price_section}>
                    <span>{`₩ ${item.price.toLocaleString()}`}</span>
                    <button onClick={() => removeItem(index)} className={styles.remove_button}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* 결제 요약 섹션 */}
          <div className={styles.summary}>
            <h3>총 금액:</h3>
            <p>{`₩ ${totalPrice.toLocaleString()}`}</p>
            <button className={styles.checkout_btn}>결제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
