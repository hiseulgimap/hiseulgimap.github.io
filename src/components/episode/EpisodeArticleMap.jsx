import { useState } from 'react';
import { Link } from 'react-router-dom';

import EpisodeArticleMapFilter from './EpisodeArticleMapFilter';
import GoogleMapView from '../GoogleMapView';
import MapContainer from '../MapContainer';
import NaverMapView from '../NaverMapView';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './EpisodeArticleMap.module.css';

function EpisodeArticleMap({ locations, height = '100%' }) {
  const { language, isKorean } = useLanguage();

  const isGlobal = locations?.map(location => location.map_type).includes('GOOGLE');
  const isDomestic = locations?.map(location => location.map_type).includes('NAVER');

  const [selectedLocation, setSelectedLocation] = useState(() => locations ?? []);
  const [curTab, setCurTab] = useState(() => (isDomestic && isGlobal ? 'NAVER' : isDomestic && !isGlobal ? 'NAVER' : 'GOOGLE'));

  function getCoordinates(mapType) {
    return locations
      ?.filter(loca => loca.map_type === mapType)
      .map(loca => ({ name_ko: loca.name_ko, name_en: loca.name_en, lat: loca.latitude, lng: loca.longitude }))
      ?.map(data => `${data[`name_${language}`]}/@${data.lat},${data.lng}/`)
      .join('');
  }

  return (
    <div className={styles.map} style={{ height }}>
      <header className={styles.header}>
        <h4 className={styles.title}>🗺️&nbsp;&nbsp;{isKorean ? '지도 보기' : 'Explore'}</h4>
        {isDomestic && isGlobal && <EpisodeArticleMapFilter curTab={curTab} onClick={setCurTab} />}
      </header>
      <main className={styles.main}>
        <MapContainer location={locations}>
          {!isDomestic && isGlobal && <GoogleMapView location={locations} />}
          {isDomestic && !isGlobal && <NaverMapView location={locations} />}
        </MapContainer>
      </main>
      <footer className={styles.footer}>
        {locations?.length === 1 && (
          <Link className={styles.location} to={`/location/${locations?.at(0).id}`}>
            📍 {isKorean ? '상세 페이지' : 'Browse detail'}
          </Link>
        )}
        {curTab === 'GOOGLE' && (
          <a className={styles.link} href={`https://www.google.com/maps/dir/${getCoordinates('GOOGLE')}`} target="_blank">
            🔗&nbsp;&nbsp;{curTab === 'GOOGLE' ? (isKorean ? '구글 지도 열기' : 'Open Google Maps') : isKorean ? '네이버 지도 열기' : 'Open NAVER Map'}
          </a>
        )}
      </footer>
    </div>
  );
}

export default EpisodeArticleMap;
