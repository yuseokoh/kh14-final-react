// 필요한 React 훅과 외부 라이브러리를 임포트합니다.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Tag, Users, Gamepad } from 'lucide-react'; 
import styles from './Home.module.css';

// 추천 게임을 큰 카드로 표시하는 컴포넌트
const FeaturedGame = ({ game }) => (
  <div className={`${styles.featuredGame} ${styles[`gameBackground${game.gameNo}`]}`}>
    <div className={styles.featuredGameInfo}>
      <h3 className={styles.featuredGameTitle}>{game.gameTitle}</h3>
      <div>
        {/* 게임 카테고리를 쉼표로 구분하여 태그로 표시 */}
        {game.gameCategory.split(',').map((category, index) => (
          <span key={index} className={styles.tag}>{category.trim()}</span>
        ))}
      </div>
      <div>
        {/* 할인 여부에 따른 가격 표시 로직 */}
        {game.gameDiscount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.gameDiscount}%</span>
            <span className={styles.originalPrice}>${game.gamePrice.toFixed(2)}</span>
            <span className={styles.discountedPrice}>
              ${(game.gamePrice * (1 - game.gameDiscount / 100)).toFixed(2)}
            </span>
          </>
        ) : game.gamePrice === 0 ? (
          <span className={styles.discountedPrice}>무료 플레이</span>
        ) : (
          <span className={styles.discountedPrice}>${game.gamePrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 개별 게임을 작은 카드로 표시하는 컴포넌트
const GameCard = ({ game }) => (
  <div className={styles.gameCard}>
    <div className={`${styles.gameImage} ${styles[`gameBackground${game.gameNo}`]}`}></div>
    <div className={styles.gameInfo}>
      <h3 className={styles.gameTitle}>{game.gameTitle}</h3>
      <div>
        {/* 할인 여부에 따른 가격 표시 로직 */}
        {game.gameDiscount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.gameDiscount}%</span>
            <div>
              <span className={styles.originalPrice}>${game.gamePrice.toFixed(2)}</span>
              <span className={styles.discountedPrice}>
                ${(game.gamePrice * (1 - game.gameDiscount / 100)).toFixed(2)}
              </span>
            </div>
          </>
        ) : game.gamePrice === 0 ? (
          <span className={styles.discountedPrice}>무료 플레이</span>
        ) : (
          <span className={styles.discountedPrice}>${game.gamePrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 게임 카테고리를 카드 형태로 표시하는 컴포넌트
const CategoryCard = ({ icon, title }) => (
  <div className={styles.categoryCard}>
    <span className={styles.categoryIcon}>{icon}</span>
    <span className={styles.categoryTitle}>{title}</span>
  </div>
);

// 게임 목록을 가로 스크롤로 표시하는 컴포넌트
const HorizontalGameList = ({ games }) => (
  <div className={styles.horizontalScroll}>
    {games.map(game => (
      <GameCard key={game.gameNo} game={game} />
    ))}
  </div>
);

// 게임 목록을 작은 슬라이더로 표시하는 컴포넌트
const SmallSlider = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4 >= games.length ? 0 : prevIndex + 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 < 0 ? games.length - 4 : prevIndex - 4));
  };

  return (
    <div className={styles.smallSlider}>
      <div 
        className={styles.smallSliderContainer} 
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {games.map(game => (
          <GameCard key={game.gameNo} game={game} />
        ))}
      </div>
      <button onClick={prevSlide} className={`${styles.sliderButton} ${styles.sliderButtonLeft}`}>
        <ChevronLeft color="white" size={24} />
      </button>
      <button onClick={nextSlide} className={`${styles.sliderButton} ${styles.sliderButtonRight}`}>
        <ChevronRight color="white" size={24} />
      </button>
    </div>
  );
};

// 게임을 세로로 긴 카드 형태로 표시하는 컴포넌트
const VerticalGameCard = ({ game }) => (
  <div className={styles.verticalCard}>
    <div className={`${styles.verticalCardImage} ${styles[`gameBackground${game.gameNo}`]}`}></div>
    <div className={styles.verticalCardInfo}>
      <h3 className={styles.verticalCardTitle}>{game.gameTitle}</h3>
      <div className={styles.verticalCardTags}>{game.gameCategory}</div>
      <div>
        {/* 할인 여부에 따른 가격 표시 로직 */}
        {game.gameDiscount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.gameDiscount}%</span>
            <span className={styles.originalPrice}>${game.gamePrice.toFixed(2)}</span>
            <span className={styles.discountedPrice}>
              ${(game.gamePrice * (1 - game.gameDiscount / 100)).toFixed(2)}
            </span>
          </>
        ) : game.gamePrice === 0 ? (
          <span className={styles.discountedPrice}>무료 플레이</span>
        ) : (
          <span className={styles.discountedPrice}>${game.gamePrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 사이드바 컴포넌트
  const Sidebar = () => (
    <div className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>게임 기기</h3>
        <p className={styles.sidebarSectionContent}>어디서나 즐기는 게임</p>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>기프트 카드</h3>
        <p className={styles.sidebarSectionContent}>게임 선물하기</p>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>최근 본 게임</h3>
        <p className={styles.sidebarSectionContent}>사이버펑크 2077</p>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>추천</h3>
        <ul className={styles.sidebarSectionList}>
          <li className={styles.sidebarSectionContent}>친구 추천</li>
          <li className={styles.sidebarSectionContent}>큐레이터 추천</li>
          <li className={styles.sidebarSectionContent}>태그</li>
        </ul>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>카테고리</h3>
        <ul className={styles.sidebarSectionList}>
          <li className={styles.sidebarSectionContent}>Action</li>
          <li className={styles.sidebarSectionContent}>Adventure</li>
          <li className={styles.sidebarSectionContent}>Indie</li>
          <li className={styles.sidebarSectionContent}>RPG</li>
          <li className={styles.sidebarSectionContent}>Simulation</li>
          <li className={styles.sidebarSectionContent}>Strategy</li>
          <li className={styles.sidebarSectionContent}>Open World</li>
          <li className={styles.sidebarSectionContent}>Multiplayer</li>
        </ul>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>테마</h3>
        <ul className={styles.sidebarSectionList}>
          <li className={styles.sidebarSectionContent}>Survival</li>
          <li className={styles.sidebarSectionContent}>Sandbox</li>
          <li className={styles.sidebarSectionContent}>Fantasy</li>
          <li className={styles.sidebarSectionContent}>Sci-fi</li>
          <li className={styles.sidebarSectionContent}>Roguelike</li>
          <li className={styles.sidebarSectionContent}>Pixel Graphics</li>
          <li className={styles.sidebarSectionContent}>Base Building</li>
        </ul>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>기타</h3>
        <ul className={styles.sidebarSectionList}>
          <li className={styles.sidebarSectionContent}>Free to Play</li>
          <li className={styles.sidebarSectionContent}>Early Access</li>
          <li className={styles.sidebarSectionContent}>Co-op</li>
          <li className={styles.sidebarSectionContent}>VR 지원</li>
          <li className={styles.sidebarSectionContent}>컨트롤러 지원</li>
        </ul>
      </div>
      
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarSectionTitle}>연령 등급</h3>
        <ul className={styles.sidebarSectionList}>
          <li className={styles.sidebarSectionContent}>전체이용가</li>
          <li className={styles.sidebarSectionContent}>12세이용가</li>
          <li className={styles.sidebarSectionContent}>15세이용가</li>
          <li className={styles.sidebarSectionContent}>19세이용가</li>
        </ul>
      </div>
    </div>
  );

// 메인 홈 컴포넌트
const Home = () => {
  // 상태 관리를 위한 useState 훅 사용
  const [games, setGames] = useState([]); // 게임 데이터를 저장할 상태
  const [featuredIndex, setFeaturedIndex] = useState(0); // 현재 표시 중인 추천 게임의 인덱스
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 컴포넌트 마운트 시 게임 데이터를 가져오기 위한 useEffect 훅
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        // 백엔드 API로부터 게임 데이터 가져오기
        const response = await axios.get('http://localhost:8080/game/');
        setGames(response.data);
        setLoading(false);
      } catch (err) {
        setError('게임 데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // 로딩 중일 때 표시할 내용
  if (loading) return <div>로딩 중...</div>;
  // 에러 발생 시 표시할 내용
  if (error) return <div>{error}</div>;
  // 게임 데이터가 없을 때 표시할 내용
  if (games.length === 0) return <div>게임이 없습니다.</div>;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* 추천 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>추천 게임</h2>
          <div style={{position: 'relative'}}>
            <FeaturedGame game={games[featuredIndex]} />
            {/* 이전 게임으로 이동하는 버튼 */}
            <button 
              className={`${styles.sliderButton} ${styles.sliderButtonLeft}`}
              onClick={() => setFeaturedIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1))}
            >
              <ChevronLeft color="white" size={24} />
            </button>
            {/* 다음 게임으로 이동하는 버튼 */}
            <button 
              className={`${styles.sliderButton} ${styles.sliderButtonRight}`}
              onClick={() => setFeaturedIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1))}
            >
              <ChevronRight color="white" size={24} />
            </button>
          </div>
        </section>

        {/* 특별 할인 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>특별 할인</h2>
          <HorizontalGameList games={games.filter(game => game.gameDiscount > 0)} />
        </section>

        {/* 신규 및 인기 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>신작 및 인기 게임</h2>
          <SmallSlider games={games} />
        </section>

        {/* 최고 판매 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>최고 인기 게임</h2>
          <div className={styles.topSellersGrid}>
            {games.slice(0, 4).map(game => (
              <VerticalGameCard key={game.gameNo} game={game} />
            ))}
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>카테고리</h2>
          <div className={styles.grid}>
            <CategoryCard icon={<Tag color="white" size={24} />} title="무료 게임" />
            <CategoryCard icon={<Users color="white" size={24} />} title="멀티플레이어" />
            <CategoryCard icon={<Gamepad color="white" size={24} />} title="컨트롤러 지원" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;