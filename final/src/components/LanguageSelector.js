import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // 선택한 언어로 변경
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ko')}>한국어</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};

export default LanguageSelector;
