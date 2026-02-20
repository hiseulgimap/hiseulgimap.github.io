import { useState } from 'react';

import Comment from '../Comment';
import LocationArticleCard from './LocationArticleCard';
import LocationArticleInformation from './LocationArticleInformation';
import LocationVideoModal from './LocationVideoModal';
import LocationArticleVideoRow from './LocationArticleVideoRow';
import MapContainer from '../MapContainer';
import Tip from '../Tip';

import ArrowUpRightIcon from '../../assets/icons/linear/ArrowUpRightIcon';

import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../../util/constants';

import styles from './LocationArticle.module.css';

function LocationArticle({ location }) {
  const { language, isKorean } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [savedMap, setSavedMap] = useLocalStorage([], MAP_STORAGE_KEY);

  const bookmarkedLocations = savedMap?.filter(map => map.location_id.includes(location.id));

  return (
    <>
      <LocationVideoModal location={location} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <article id={styles.article}>
        <section className={styles['section--left']}>
          <div className={styles['map-wrap']}>
            <div className={styles.map}>
              <MapContainer selectedLocation={location} />
            </div>
            <div className={styles['map-action']}>
              <div className={styles['map-action--wrap']}>
                <button className={styles.upvote}>👍 {isKorean ? '추천' : 'Recommend'}</button>
                <button className={styles.visited}>✅ {isKorean ? '방문' : 'Visited'}</button>
              </div>
              <a href={location.map_url} target="_blank">
                {isKorean ? `${location.map_type == 'GOOGLE' ? '구글 지도 열기' : '네이버 지도 열기'}` : `${location.map_type == 'GOOGLE' ? 'Google Maps' : 'NAVER Map'}`}
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
          <LocationArticleVideoRow isSub location={location} onModalOpen={setModalOpen} />
          <Tip />
        </section>
        <section className={styles['section--right']}>
          <LocationArticleCard location={location} bookmarkedLocations={bookmarkedLocations} />
          <LocationArticleInformation location={location} />
          <Comment />
        </section>
      </article>
    </>
  );
}

export default LocationArticle;
