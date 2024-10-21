import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 현재 선택된 언어 가져오기
  const currentLanguage = i18n.language;

  // 지원하는 언어 목록
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' }
  ];

  // 현재 선택된 언어를 제외한 목록 필터링
  const availableLanguages = languages.filter(lang => lang.code !== currentLanguage);

  // 언어 변경 핸들러
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false); // 언어를 선택한 후 드롭다운 닫기
  };

  return (
    <div className={styles.languageSelector}>
      <button onClick={toggleDropdown} className={styles.languageButton}>
        {t('languageButton')}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={styles.dropdownItem}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
