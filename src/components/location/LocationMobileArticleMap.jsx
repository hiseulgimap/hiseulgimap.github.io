import MapContainer from '../MapContainer';

import { useLanguage } from '../../hooks/useLanguage';

import { getGoogleDestinationLink } from '../../util/helper';

import styles from './LocationMobileArticleMap.module.css';

function LocationMobileArticleMap({ location }) {
  const { language, isKorean } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <MapContainer location={location} />
      </div>
      <div className={styles.action}>
        <a href={location.map_url} target="_blank">
          🗺️ {isKorean ? `${location.map_type === 'NAVER' ? '네이버' : '구글'}에서 열기` : `Browse on ${location.map_type === 'NAVER' ? 'NAVER' : 'Google'}`}
        </a>
        <a href={getGoogleDestinationLink(`${location[`address_${language}`]} ${location.zip_code}`)} target="_blank">
          🧭 {isKorean ? '길 찾기' : 'Destination'}
        </a>
      </div>
    </div>
  );
}

export default LocationMobileArticleMap;
