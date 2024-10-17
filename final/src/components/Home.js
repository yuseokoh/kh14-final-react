// 필요한 모듈과 컴포넌트를 가져옵니다.
// React와 useState 훅을 React 라이브러리에서 가져옵니다.
// ChevronLeft, ChevronRight, Tag, Users, Gamepad는 'lucide-react' 라이브러리에서 가져온 아이콘 컴포넌트입니다.
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Tag, Users, Gamepad } from 'lucide-react'; 
import styles from './Home.module.css';

// 가상의 게임 데이터
// 실제 애플리케이션에서는 이 데이터를 API로부터 받아올 수 있습니다
// 각 게임 객체는 id, title, price, discount, tags, image 속성을 가집니다.
const games = [
  { id: 1, title: "Elden Ring", price: 59.99, discount: 20, tags: ["Action", "RPG", "Open World"], image: 1 },
  { id: 2, title: "Counter-Strike 2", price: 0, tags: ["FPS", "Multiplayer", "Competitive"], image: 2 },
  { id: 3, title: "Cyberpunk 2077", price: 59.99, discount: 50, tags: ["RPG", "Open World", "Sci-fi"], image: 3 },
  { id: 4, title: "Red Dead Redemption 2", price: 59.99, discount: 33, tags: ["Action", "Adventure", "Open World"], image: 4 },
  { id: 5, title: "Stardew Valley", price: 14.99, discount: 20, tags: ["Indie", "RPG", "Simulation"], image: 5 },
  { id: 6, title: "The Witcher 3", price: 39.99, discount: 70, tags: ["RPG", "Open World", "Fantasy"], image: 6 },
  { id: 7, title: "Hades", price: 24.99, discount: 25, tags: ["Action", "Roguelike", "Indie"], image: 7 },
  { id: 8, title: "Hollow Knight", price: 14.99, discount: 40, tags: ["Metroidvania", "Indie", "Platformer"], image: 8 },
];

// 컴포넌트: 추천 게임을 큰 카드로 표시
// 로직: 게임 정보를 받아 레이아웃에 맞게 표시합니다. 할인 여부에 따라 가격 표시 방식이 달라집니다.
// game prop을 받아 해당 게임의 정보를 표시합니다.
// 게임의 image 속성을 배경색으로 사용합니다.
const FeaturedGame = ({ game }) => (
  <div className={`${styles.featuredGame} ${styles[`gameBackground${game.image}`]}`}>
    <div className={styles.featuredGameInfo}>
      <h3 className={styles.featuredGameTitle}>{game.title}</h3>
      <div>
        {/* 게임 태그를 map 함수를 사용하여 렌더링 */}
        {game.tags.map((tag, index) => (
          <span key={index} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <div>
        {/* 할인 여부에 따라 다른 가격 표시 로직 */}
        {game.discount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.discount}%</span>
            <span className={styles.originalPrice}>${game.price.toFixed(2)}</span>
            <span className={styles.discountedPrice}>
              ${(game.price * (1 - game.discount / 100)).toFixed(2)}
            </span>
          </>
        ) : game.price === 0 ? (
          <span className={styles.discountedPrice}>Free to Play</span>
        ) : (
          <span className={styles.discountedPrice}>${game.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 컴포넌트: 개별 게임을 작은 카드로 표시 
// FeaturedGame과 유사하지만 더 작은 크기로 게임 정보를 표시합니다.
const GameCard = ({ game }) => (
  <div className={styles.gameCard}>
    <div className={`${styles.gameImage} ${styles[`gameBackground${game.image}`]}`}></div>
    <div className={styles.gameInfo}>
      <h3 className={styles.gameTitle}>{game.title}</h3>
      <div>
        {/* 할인 여부에 따른 가격 표시 로직 */}
        {game.discount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.discount}%</span>
            <div>
              <span className={styles.originalPrice}>${game.price.toFixed(2)}</span>
              <span className={styles.discountedPrice}>
                ${(game.price * (1 - game.discount / 100)).toFixed(2)}
              </span>
            </div>
          </>
        ) : game.price === 0 ? (
          <span className={styles.discountedPrice}>Free to Play</span>
        ) : (
          <span className={styles.discountedPrice}>${game.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 컴포넌트: 게임 카테고리를 카드 형태로 표시
// icon과 title prop을 받아 카드를 구성합니다.
const CategoryCard = ({ icon, title }) => (
  <div className={styles.categoryCard}>
    <span className={styles.categoryIcon}>{icon}</span>
    <span className={styles.categoryTitle}>{title}</span>
  </div>
);

// 컴포넌트: 게임 목록을 가로 스크롤로 표시
// 로직: 게임 배열을 받아 각 게임에 대해 GameCard를 생성하고 가로로 나열합니다.
// games prop으로 게임 배열을 받습니다.
// map 함수를 사용해 각 게임에 대해 GameCard 컴포넌트를 생성합니다.
// key prop은 React가 리스트 아이템을 효율적으로 관리할 수 있게 해줍니다.
const HorizontalGameList = ({ games }) => (
  <div className={styles.horizontalScroll}>
    {games.map(game => (
      <GameCard key={game.id} game={game} />
    ))}
  </div>
);

// 컴포넌트: 게임 목록을 작은 슬라이더로 표시합니다.
// 로직: 게임 배열을 받아 슬라이더 형태로 표시하며, 좌우 버튼으로 슬라이드를 조작할 수 있습니다.
// useState 훅을 사용해 현재 슬라이드 인덱스(currentIndex)를 관리합니다.
// nextSlide와 prevSlide 함수는 슬라이드를 앞뒤로 이동시킵니다.
// 슬라이드가 끝에 도달하면 처음/끝으로 순환합니다.
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
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      {/* 이전 슬라이드 버튼 */}
      <button onClick={prevSlide} className={`${styles.sliderButton} ${styles.sliderButtonLeft}`}>
        <ChevronLeft color="white" size={24} />
      </button>
      {/* 다음 슬라이드 버튼 */}
      <button onClick={nextSlide} className={`${styles.sliderButton} ${styles.sliderButtonRight}`}>
        <ChevronRight color="white" size={24} />
      </button>
    </div>
  );
};

// 컴포넌트: 게임을 세로로 긴 카드 형태로 표시
// 로직: 게임 정보를 받아 세로로 긴 카드 형태로 표시합니다. 할인 정보와 태그도 함께 표시됩니다.
// game prop으로 게임 정보를 받아 표시합니다.
const VerticalGameCard = ({ game }) => (
  <div className={styles.verticalCard}>
    <div className={`${styles.verticalCardImage} ${styles[`gameBackground${game.image}`]}`}></div>
    <div className={styles.verticalCardInfo}>
      <h3 className={styles.verticalCardTitle}>{game.title}</h3>
      <div className={styles.verticalCardTags}>{game.tags.join(', ')}</div>
      <div>
        {/* 할인 여부에 따른 가격 표시 로직 */}
        {game.discount > 0 ? (
          <>
            <span className={styles.discountBadge}>-{game.discount}%</span>
            <span className={styles.originalPrice}>${game.price.toFixed(2)}</span>
            <span className={styles.discountedPrice}>
              ${(game.price * (1 - game.discount / 100)).toFixed(2)}
            </span>
          </>
        ) : game.price === 0 ? (
          <span className={styles.discountedPrice}>Free to Play</span>
        ) : (
          <span className={styles.discountedPrice}>${game.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

// 컴포넌트: 사이드바 구현
// 로직: 여러 섹션으로 구성된 사이드바를 렌더링합니다. 각 섹션은 제목과 관련 링크들을 포함합니다.
const Sidebar = () => (
  <div className={styles.sidebar}>
    {/* 각 섹션은 sidebar-section 클래스를 가진 div로 구성됩니다 */}
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Steam Deck</h3>
      <p className={styles.sidebarSectionContent}>Your Games, Everywhere</p>
    </div>
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Steam Gift Cards</h3>
      <p className={styles.sidebarSectionContent}>Give the Gift of Game</p>
    </div>
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Recently Viewed</h3>
      <p className={styles.sidebarSectionContent}>TEKKEN 8</p>
    </div>
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Recommended</h3>
      <ul className={styles.sidebarSectionList}>
        <li className={styles.sidebarSectionContent}>By Friends</li>
        <li className={styles.sidebarSectionContent}>By Curators</li>
        <li className={styles.sidebarSectionContent}>Tags</li>
      </ul>
    </div>
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Browse Categories</h3>
      <ul className={styles.sidebarSectionList}>
        <li className={styles.sidebarSectionContent}>Top Sellers</li>
        <li className={styles.sidebarSectionContent}>New Releases</li>
        <li className={styles.sidebarSectionContent}>Upcoming</li>
        <li className={styles.sidebarSectionContent}>Specials</li>
        <li className={styles.sidebarSectionContent}>VR Titles</li>
        <li className={styles.sidebarSectionContent}>Controller-Friendly</li>
        <li className={styles.sidebarSectionContent}>Great on Deck</li>
      </ul>
    </div>
    <div className={styles.sidebarSection}>
      <h3 className={styles.sidebarSectionTitle}>Browse by genre</h3>
      <ul className={styles.sidebarSectionList}>
        <li className={styles.sidebarSectionContent}>Free To Play</li>
        <li className={styles.sidebarSectionContent}>Early Access</li>
        <li className={styles.sidebarSectionContent}>Action</li>
        <li className={styles.sidebarSectionContent}>Adventure</li>
        <li className={styles.sidebarSectionContent}>Casual</li>
        <li className={styles.sidebarSectionContent}>Indie</li>
        <li className={styles.sidebarSectionContent}>Massively Multiplayer</li>
        <li className={styles.sidebarSectionContent}>Racing</li>
        <li className={styles.sidebarSectionContent}>Racing</li>
        <li className={styles.sidebarSectionContent}>RPG</li>
        <li className={styles.sidebarSectionContent}>Simulation</li>
        <li className={styles.sidebarSectionContent}>Sports</li>
        <li className={styles.sidebarSectionContent}>Strategy</li>
      </ul>
    </div>
  </div>
);

// 메인 컴포넌트: 전체 Steam 스토어 페이지 구현
// 로직: 여러 하위 컴포넌트를 조합하여 전체 스토어 페이지를 구성합니다.
// useState를 사용하여 현재 표시 중인 추천 게임의 인덱스를 관리합니다.
const SteamLikeStore = () => {
  // featuredIndex 상태를 관리하여 현재 표시되는 추천 게임을 추적합니다.
  const [featuredIndex, setFeaturedIndex] = useState(0);

  return (
    <div className={styles.layout}>
      {/* 사이드바 컴포넌트를 렌더링합니다. */}
      <Sidebar />
      <div className={styles.mainContent}>
        {/* 추천 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Featured & Recommended</h2>
          <div style={{position: 'relative'}}>
            {/* 현재 선택된 추천 게임을 표시합니다. */}
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
          <h2 className={styles.sectionTitle}>Special Offers</h2>
          {/* 할인 중인 게임만 필터링하여 표시합니다. */}
          <HorizontalGameList games={games.filter(game => game.discount > 0)} />
        </section>

        {/* 신규 및 인기 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>New and Trending</h2>
          {/* 모든 게임을 슬라이더로 표시합니다. */}
          <SmallSlider games={games} />
        </section>

        {/* 최고 판매 게임 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Sellers</h2>
          {/* 게임 목록 중 처음 4개만 그리드 형태로 표시합니다. */}
          <div className={styles.topSellersGrid}>
            {games.slice(0, 4).map(game => (
              <VerticalGameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.grid}>
            {/* 각 카테고리를 아이콘과 함께 표시합니다. */}
            <CategoryCard icon={<Tag color="white" size={24} />} title="Free to Play" />
            <CategoryCard icon={<Users color="white" size={24} />} title="Multiplayer" />
            <CategoryCard icon={<Gamepad color="white" size={24} />} title="Controller Friendly" />
          </div>
        </section>
      </div>
    </div>
  );
};

// 컴포넌트를 외부에서 사용할 수 있도록 내보냅니다.
export default SteamLikeStore;