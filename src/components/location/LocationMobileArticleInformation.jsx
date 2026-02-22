import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

import CopyIcon from '../../assets/icons/linear/CopyIcon';

import { useLanguage } from '../../hooks/useLanguage';

import { formatTel } from '../../util/helper';

import styles from './LocationMobileArticleInformation.module.css';

function LocationMobileArticleInformation({ location }) {
  const { language, isKorean } = useLanguage();

  return (
    <section className={styles.information}>
      <h5 className={styles.title}>{isKorean ? '장소 정보' : 'Location info'}</h5>
      <div className={styles.grid}>
        <div className={`${styles.item} ${styles['item--full']}`}>
          <h6 className={styles['item-title']}>
            <span>{isKorean ? '주소' : 'Address'}</span>
            <CopyToClipboard text={`${location.zip_code} ${location[`address_${language}`]}`} onCopy={() => toast(isKorean ? '주소가 복사되었습니다' : 'Address copied', { icon: '📋' })}>
              <button>
                <CopyIcon />
              </button>
            </CopyToClipboard>
          </h6>
          <span className={styles['item-content']}>
            <span className={styles.zipcode}>{location.zip_code}</span>
            <span>{location[`address_${language}`]}</span>
          </span>
        </div>
        {location.tel && (
          <div className={styles.item}>
            <h6 className={styles['item-title']}>
              <span>{isKorean ? '연락처' : 'Tel'}</span>
            </h6>
            <a className={styles['item-content']} href={`tel:${formatTel(location.tel)}`}>
              {location.tel}
            </a>
          </div>
        )}
        <div className={styles.item}>
          <h6 className={styles['item-title']}>{isKorean ? '카테고리' : 'Category'}</h6>
          <span className={styles['item-content']}>
            {location.categories.emoji} {location.categories[`category_${language}`]}
          </span>
        </div>
      </div>
    </section>
  );
}

export default LocationMobileArticleInformation;
