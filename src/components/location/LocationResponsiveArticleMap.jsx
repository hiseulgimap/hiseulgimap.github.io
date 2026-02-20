import MapContainer from '../MapContainer';

import { useLanguage } from '../../hooks/useLanguage';

import { getGoogleDestinationLink } from '../../util/helper';

import styles from './LocationResponsiveArticleMap.module.css';

function LocationResponsiveArticleMap({ location }) {
  const { language, isKorean } = useLanguage();

  const mapType = location.map_type === 'GOOGLE' ? (isKorean ? '구글 지도' : 'Google Maps') : isKorean ? '네이버 지도' : 'NAVER Map';

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <MapContainer selectedLocation={location} />
      </div>
      <div className={styles.action}>
        <a href={location.map_url} target="_blank">
          🗺️ {mapType}
        </a>
        <a href={getGoogleDestinationLink(`${location[`address_${language}`]} ${location.zip_code}`)} target="_blank">
          🧭 {isKorean ? '길 찾기' : 'Destination'}
        </a>
      </div>
    </div>
  );
}

export default LocationResponsiveArticleMap;
