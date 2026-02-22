import GoogleMapView from './GoogleMapView';
import NaverMapView from './NaverMapView';

import styles from './MapContainer.module.css';
import { useLanguage } from '../hooks/useLanguage';

function MapContainer({ location, children }) {
  const { isKorean } = useLanguage();

  if (!location) return <div className={styles.container}>{isKorean ? '장소를 선택하면 지도가 나타납니다' : 'Please select a location to browse the map'}</div>;

  if (!children) return <div style={{ width: '100%', height: '100%' }}>{location.map_type === 'GOOGLE' ? <GoogleMapView location={location} /> : <NaverMapView location={location} />}</div>;

  return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
}

export default MapContainer;
