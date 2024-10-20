import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './WishList.module.css';

const WishList = () => {
  const dragItem = useRef(); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스
  const [wishlist, setWishlist] = useState([]); // 초기화는 빈 배열로
  const [gameName, setGameName] = useState('');
  const [member, setMember] = useState("");

  const loadMember = useCallback(async () => {
    const resp = await axios.get("http://localhost:8080/member/find");
    setMember(resp.data);
  }, []);

  const loadWishlist = useCallback(async () => {
    const resp = await axios.get("http://localhost:8080/wishlist/");
    setWishlist(resp.data.map(item => item.game_name)); // 데이터 포맷에 맞게 수정
  }, []);

  useEffect(() => {
    loadMember();
    loadWishlist(); // 위시리스트를 로드합니다
  }, [loadMember, loadWishlist]);

  const addGame = () => {
    if (gameName) {
      // 새로운 게임을 서버에 추가하는 로직이 필요할 수 있습니다.
      setWishlist([...wishlist, gameName]);
      setGameName('');
    }
  };

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
    <div className={styles.loginPage}>
      <div className={styles.wishlist_container}>
        <h1 className={styles.wishlist_title}>{`${member.memberId}'s Wishlist`}</h1>
        <div className={styles.game_list_section}>
          <ul className={styles.game_list}>
            {wishlist.map((game, index) => (
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
            ))}
          </ul>
        </div>
        <input 
          type="text" 
          value={gameName} 
          onChange={(e) => setGameName(e.target.value)} 
          placeholder="Add a new game" 
        />
        <button onClick={addGame}>Add Game</button>
      </div>
    </div>
  );
};

export default WishList;

