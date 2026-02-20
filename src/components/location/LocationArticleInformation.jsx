import toast from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';

import { useLanguage } from '../../hooks/useLanguage';

import InstagramIcon from '../../assets/icons/brands/InstagramIcon';
import FacebookIcon from '../../assets/icons/brands/FacebookIcon';
import TwitterIcon from '../../assets/icons/brands/TwitterIcon';
import CopyIcon from '../../assets/icons/linear/CopyIcon';

import { formatTel } from '../../util/helper';

import styles from './LocationArticleInformation.module.css';

function LocationArticleInformation({ location }) {
  const { language, isKorean } = useLanguage();

  return (
    <div className={styles.information}>
      <div className={styles.tab}>💛&nbsp;&nbsp;{isKorean ? '장소 정보' : 'Abouts'}</div>
      {location[`description_${language}`] && (
        <div className={styles.row}>
          <span className={styles.sub}>{isKorean ? '안내' : 'Note'}</span>
          <span className={styles.main}>{location[`description_${language}`]}</span>
        </div>
      )}
      {location.tel && (
        <div className={styles.row}>
          <span className={styles.sub}>{isKorean ? '연락처' : 'Tel'}</span>
          <a className={styles.main} href={`tel:${formatTel(location.tel)}`}>
            {location.tel}
          </a>
        </div>
      )}
      <div className={styles.row}>
        <span className={styles.sub}>{isKorean ? '주소' : 'Address'}</span>
        <span className={styles.main}>
          <span>
            {location.zip_code && <span className={styles.highlight}>{location.zip_code}</span>}
            <span>{location[`address_${language}`]}</span>
          </span>
          <CopyToClipboard text={`${location[`address_${language}`]} ${location.zip_code}`} onCopy={() => toast.success(() => (isKorean ? '주소가 복사되었습니다' : 'Address copied'))}>
            <button>
              <CopyIcon />
            </button>
          </CopyToClipboard>
        </span>
      </div>
      {location.site_url && (
        <div className={styles.row}>
          <span className={styles.sub}>{isKorean ? '사이트' : 'URL'}</span>
          <a className={styles.main} href={location.site_url} target="_blank">
            {location.site_url}
          </a>
        </div>
      )}
      {location.socials && location.socials.length > 0 && (
        <div className={styles.row}>
          <span className={styles.sub}>{isKorean ? '소셜 링크' : 'Socials'}</span>
          <span className={`${styles.main} ${styles.socials}`}>
            {location.socials.map(({ id, brand, url, handle }) => {
              let icon;
              const color = `var(--color-${brand})`;

              if (brand === 'instagram') icon = <InstagramIcon color={color} />;
              if (brand === 'twitter') icon = <TwitterIcon color={color} />;
              if (brand === 'facebook') icon = <FacebookIcon color={color} />;

              return (
                <a key={id} className={`${styles.social} ${styles[brand]}`} href={url} target="_blank" style={{ color: `var(--color-${brand})`, borderColor: `var(--color-${brand}-50)`, backgroundColor: `var(--color-${brand}-055)` }}>
                  {icon} {handle}
                </a>
              );
            })}
          </span>
        </div>
      )}
    </div>
  );
}

export default LocationArticleInformation;
