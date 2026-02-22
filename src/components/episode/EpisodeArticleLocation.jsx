import { useLanguage } from '../../hooks/useLanguage';

import EpisodeArticleLocationList from './EpisodeArticleLocationList';

import styles from './EpisodeArticleLocation.module.css';

function EpisodeArticleLocation({ locations, selectedLocation, onSelect }) {
  const { isKorean } = useLanguage();

  const domestics = locations?.filter(location => location.map_type === 'NAVER');
  const globals = locations?.filter(location => location.map_type === 'GOOGLE');

  return (
    <div className={styles.location}>
      <header className={styles.header}>⭐️&nbsp;&nbsp;{isKorean ? '장소 목록' : 'Location list'}</header>
      <div className={styles['list-wrap']}>
        <ul className={styles.list}>
          {domestics?.length > 0 && <EpisodeArticleLocationList locations={domestics} selectedLocation={selectedLocation} onSelect={onSelect} mapType="NAVER" />}
          {globals?.length > 0 && <EpisodeArticleLocationList locations={globals} selectedLocation={selectedLocation} onSelect={onSelect} mapType="GOOGLE" />}
        </ul>
      </div>
    </div>
  );
}

export default EpisodeArticleLocation;
