import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.privacyPolicyWrapper}>
      <div className={styles.privacyPolicyContainer}>
        <h1 className={styles.title}>{t('privacyPolicy.title')}</h1>
        <p>{t('privacyPolicy.intro')}</p>
        <p>{t('privacyPolicy.dpf')}</p>

        <h2>{t('privacyPolicy.section1.title')}</h2>
        <p>{t('privacyPolicy.section1.content')}</p>

        <h2>{t('privacyPolicy.section2.title')}</h2>
        <p>{t('privacyPolicy.section2.content')}</p>
        <ul>
          <li>{t('privacyPolicy.section2.itemA')}</li>
          <li>{t('privacyPolicy.section2.itemB')}</li>
          <li>{t('privacyPolicy.section2.itemC')}</li>
          <li>{t('privacyPolicy.section2.itemD')}</li>
        </ul>
        <p>{t('privacyPolicy.section2.summary')}</p>

        <h2>{t('privacyPolicy.section3.title')}</h2>
        <h3>{t('privacyPolicy.section3.subsection1.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection1.content')}</p>

        <h3>{t('privacyPolicy.section3.subsection2.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection2.content')}</p>

        <h3>{t('privacyPolicy.section3.subsection3.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection3.content')}</p>
        <ul>
          <li>{t('privacyPolicy.section3.subsection3.item1')}</li>
          <li>{t('privacyPolicy.section3.subsection3.item2')}</li>
          <li>{t('privacyPolicy.section3.subsection3.item3')}</li>
          <li>{t('privacyPolicy.section3.subsection3.item4')}</li>
        </ul>

        <h3>{t('privacyPolicy.section3.subsection4.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection4.content')}</p>

        <h3>{t('privacyPolicy.section3.subsection5.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection5.content')}</p>

        <h3>{t('privacyPolicy.section3.subsection6.title')}</h3>
        <p>{t('privacyPolicy.section3.subsection6.content')}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
