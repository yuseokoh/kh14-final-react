import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.privacyPolicyContainer}>
      <h1 className={styles.title}>{t('privacyPolicy.title')}</h1>
      <p>{t('privacyPolicy.intro')}</p>
      <p>{t('privacyPolicy.dpf')}</p>

      <h2>{t('privacyPolicy.section1.title')}</h2>
      <p>{t('privacyPolicy.section1.content')}</p>

      <h2>{t('privacyPolicy.section2.title')}</h2>
      <p>{t('privacyPolicy.section2.content')}</p>
      <ul>
        <li>{t('privacyPolicy.section2.itemA', 'where it is necessary for the performance of an agreement with you')}</li>
        <li>{t('privacyPolicy.section2.itemB', 'where it is necessary for compliance with legal obligations')}</li>
        <li>{t('privacyPolicy.section2.itemC', 'where it is necessary for the purposes of the legitimate and legal interests of Valve or third parties')}</li>
        <li>{t('privacyPolicy.section2.itemD', 'where you have given consent to the processing of your Personal Data for one or more specific purposes')}</li>
      </ul>
      <p>{t('privacyPolicy.section2.summary', 'These reasons for collecting and processing data determine and limit what Personal Data we collect and how we use it')}</p>

      <h2>{t('privacyPolicy.section3.title')}</h2>
      <h3>{t('privacyPolicy.section3.subsection1.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection1.content', 'When setting up an Account, Valve will collect your email address and country of residence, among other information')}</p>

      <h3>{t('privacyPolicy.section3.subsection2.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection2.content', 'In order to make a transaction on Steam, you may need to provide payment data to Valve to enable the transaction')}</p>

      <h3>{t('privacyPolicy.section3.subsection3.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection3.content', 'We will collect and process Personal Data whenever you explicitly provide it to us or send it')}</p>
      <ul>
        <li>{t('privacyPolicy.section3.subsection3.item1', 'Information that you post, comment or follow in any of our Content and Services')}</li>
        <li>{t('privacyPolicy.section3.subsection3.item2', 'Information sent through chat')}</li>
        <li>{t('privacyPolicy.section3.subsection3.item3', 'Information you provide when you request information or support from us')}</li>
        <li>{t('privacyPolicy.section3.subsection3.item4', 'Information you provide to us when participating in competitions, contests or tournaments')}</li>
      </ul>

      <h3>{t('privacyPolicy.section3.subsection4.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection4.content', 'We collect a variety of information through your general interaction with the websites, Content and Services offered by Steam')}</p>

      <h3>{t('privacyPolicy.section3.subsection5.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection5.content', 'In order to provide you with services, we record and store information about your activity in our Content and Services')}</p>

      <h3>{t('privacyPolicy.section3.subsection6.title')}</h3>
      <p>{t('privacyPolicy.section3.subsection6.content', 'We use "Cookies", which are text files placed on your computer, and similar technologies to help us analyze how users use our services')}</p>
    </div>
  );
};

export default PrivacyPolicy;
