import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './WishList.module.css';
import { useRecoilValue } from 'recoil';
import { memberLoadingState } from '../../utils/recoil';

const WishList = () => {
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [wishlist, setWishlist] = useState([
    'The Legend of Zelda: Breath of the Wild',
    'Super Mario Odyssey',
    'The Witcher 3: Wild Hunt',
    'Red Dead Redemption 2',
    'God of War',
    'Hollow Knight',
    'Final Fantasy VII Remake',
    ''
  ]);
  const [gameName, setGameName] = useState('');
  const [member, setMember] = useState("");
  const memberLoading = useRecoilValue(memberLoadingState);

  useEffect(() => {
    if(!memberLoadingState) return;
    loadMember();
    loadWishlist(); // 위시리스트를 로드합니다
  }, [memberLoadingState]);

  const loadMember = useCallback(async () => {
    const resp = await axios.get("/member/find");
    setMember(resp.data);
  }, []);

  const loadWishlist = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const resp = await axios.get("http://localhost:8080/wishlist/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Wishlist data:", resp.data); // 추가
      setWishlist(resp.data);
    } catch (error) {
      console.error("Failed to load wishlist:", error); // 추가
    }
  }, []);


  // const addGame = () => {
  //   if (gameName) {
  //     setWishlist([...wishlist, gameName]);
  //     setGameName('');
  //   }
  // };

  const removeGame = async (index) => {
    const gameToRemove = wishlist[index];

    // 서버에서 게임 삭제 요청 (추가 구현 필요)
    await axios.delete(`http://localhost:8080/wishlist/${gameToRemove}`); // 엔드포인트와 요청 형식에 따라 조정
    const newWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(newWishlist);
  };

  const dragStart = (e, position) => {
    dragItem.current = position;
    e.target.style.opacity = 0.5; // 드래그 시작 시 불투명하게 만들기
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    e.preventDefault(); // 드래그 오버 시 기본 동작 방지
  };

  const drop = (e) => {
    e.preventDefault(); // 드랍 시 기본 동작 방지
    const newWishList = [...wishlist];
    const dragItemValue = newWishList[dragItem.current];
    newWishList.splice(dragItem.current, 1);
    newWishList.splice(dragOverItem.current, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    setWishlist(newWishList);
    e.target.style.opacity = 1; // 드래그 종료 시 불투명도 원래대로
  };

  return (
    <>
    <div className={styles.loginPage}>
      <div className={styles.wishlist_container}>
        <h1 className={styles.wishlist_title}>{`${member.memberId}'s Wishlist`}</h1>
        <div className={styles.game_list_section}>
          <ul className={styles.game_list}>
            {wishlist.map((game, index) => {
              // 게임 이름이 빈 문자열일 경우 렌더링하지 않음
              if (!game.trim()) return null;

              return (
                <li
                  key={index}
                  className={styles.game_item}
                  draggable
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.target.style.opacity = 1} // 드래그를 벗어날 때 원래대로
                >
                  {game}
                  <div className={styles.button_group}>
                    <button onClick={() => alert(`Playing ${game}`)} className={styles.play_button}>Play now</button>
                    <button onClick={() => removeGame(index)} className={styles.remove_button}>Remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
    </>
  );

};

export default WishList;