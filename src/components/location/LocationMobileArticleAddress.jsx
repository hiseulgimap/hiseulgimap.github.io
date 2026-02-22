import { useState } from 'react';

import toast from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';

import CopyIcon from '../../assets/icons/linear/CopyIcon';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './LocationMobileArticleAddress.module.css';

function LocationMobileArticleAddress({ location }) {
  const [activeTab, setActiveTab] = useState('address');
  const { language, isKorean } = useLanguage();

  const className = location.tel ? `${styles.information} ${styles['information--tab']}` : styles.information;

  return (
    <section className={className}>
      <div className={styles.tab}>
        <div className={activeTab === 'address' ? `${styles['tab-header']} ${styles.active}` : styles['tab-header']} onClick={() => setActiveTab('address')}>
          <span>🏠</span> {isKorean ? '주소' : 'Address'}
        </div>
      </div>
      {location.tel && (
        <div className={styles.tab} data-type="tel">
          <div className={activeTab === 'tel' ? `${styles['tab-header']} ${styles.active}` : styles['tab-header']} onClick={() => setActiveTab('tel')}>
            <span>☎️</span>
            {isKorean ? '전화번호' : 'Tel'}
          </div>
        </div>
      )}
      <div className={styles['tab-content']}>
        {activeTab === 'address' && (
          <>
            <CopyToClipboard text={`${location[`address_${language}`]} ${location.zip_code}`} onCopy={() => toast.success(() => (isKorean ? '주소가 복사되었습니다' : 'Address copied'))}>
              <button className={styles.copy}>
                <CopyIcon />
              </button>
            </CopyToClipboard>
            <span className={styles.content}>
              {location.zip_code && <span className={styles.highlight}>{location.zip_code}</span>}
              <span>{location[`address_${language}`]}</span>
            </span>
          </>
        )}
        {activeTab === 'tel' && (
          <>
            <CopyToClipboard text={location.tel} onCopy={() => toast.success(() => (isKorean ? '연락처가 복사되었습니다' : 'Contact number copied'))}>
              <button className={styles.copy}>
                <CopyIcon />
              </button>
            </CopyToClipboard>
            <span className={styles.content}>
              <span className={styles.highlight}>TEL</span>
              <span>{location.tel}</span>
            </span>
          </>
        )}
      </div>
    </section>
  );
}

export default LocationMobileArticleAddress;
