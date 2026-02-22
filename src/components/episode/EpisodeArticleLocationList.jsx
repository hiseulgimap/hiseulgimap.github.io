import EpisodeArticleLocationItem from './EpisodeArticleLocationItem';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './EpisodeArticleLocationList.module.css';

function EpisodeArticleLocationList({ locations, selectedLocation, onSelect, mapType }) {
  const { isKorean } = useLanguage();

  return (
    <>
      <h5 className={styles['list-title']}>
        <span className={styles.title}>{isKorean ? (mapType === 'NAVER' ? '🇰🇷 국내' : '🌏 해외') : mapType === 'NAVER' ? '🇰🇷 Korea' : '🌏 Global'}</span>
        <span className={styles.bull}>&bull;</span>
        <span>
          {locations.length}
          {isKorean ? '곳' : locations.length > 1 ? ' places' : ' place'}
        </span>
        <span className={styles.divider} />
      </h5>
      {locations?.map((location, i) => (
        <EpisodeArticleLocationItem key={location.id} order={i + 1} selectedLocation={selectedLocation} locations={locations} location={location} onSelect={onSelect} />
      ))}
    </>
  );
}

export default EpisodeArticleLocationList;
