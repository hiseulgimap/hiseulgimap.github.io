import { useState } from 'react';

import LocationArticleCard from './LocationArticleCard';
import LocationArticleInformation from './LocationArticleInformation';
import LocationVideoModal from './LocationVideoModal';
import LocationArticleVideoRow from './LocationArticleVideoRow';
import MapContainer from '../MapContainer';
import Memo from '../Memo';
import Tip from '../Tip';

import ArrowUpRightIcon from '../../assets/icons/linear/ArrowUpRightIcon';

import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../../util/constants';

import styles from './LocationArticle.module.css';

function LocationArticle({ location }) {
  const { isKorean } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [savedMap] = useLocalStorage([], MAP_STORAGE_KEY);

  const bookmarkedLocations = savedMap?.filter(map => map.location_id.includes(location.id));

  return (
    <>
      <LocationVideoModal location={location} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <article id={styles.article}>
        <section className={styles['section--left']}>
          <div className={styles['map-wrap']}>
            <div className={styles.map}>
              <MapContainer location={location} />
            </div>
            <div className={styles['map-action']}>
              <p>
                🔗 <span>{isKorean ? `${location.map_type === 'NAVER' ? '네이버' : '구글'}에서 열기` : `Browse on ${location.map_type === 'NAVER' ? 'NAVER' : 'Google'}`}</span>
              </p>
              <span>
                <a href={location.map_url} target="_blank">
                  {location.map_url}
                  <ArrowUpRightIcon />
                </a>
              </span>
            </div>
          </div>
          <LocationArticleVideoRow isSub location={location} onModalOpen={setModalOpen} />
          <Tip />
        </section>
        <section className={styles['section--right']}>
          <LocationArticleCard location={location} bookmarkedLocations={bookmarkedLocations} />
          <LocationArticleInformation location={location} />
          <Memo location={location} />
        </section>
      </article>
    </>
  );
}

export default LocationArticle;
