import { useState } from 'react';

import BookmarkModal from '../BookmarkModal';
import BookmarkSave from '../BookmarkSave';
import CreateFolder from '../CreateFolder';

import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../../util/constants';

import { getGoogleDestinationLink } from '../../util/helper';

import styles from './LocationArticleCard.module.css';

function LocationArticleCard({ location, bookmarkedLocations }) {
  const { language, isKorean } = useLanguage();

  const [active, setActive] = useState(false);
  const [folderMode, setFolderMode] = useState('idle');

  const [savedMap, setSavedMap] = useLocalStorage([], MAP_STORAGE_KEY);

  function handleOpenModal() {
    setActive(true);

    if (!savedMap.length) setFolderMode('create');
    else setFolderMode('select');
  }

  function handleFolderCreated(newFolders) {
    setSavedMap(newFolders);
    setFolderMode('select');
  }

  function handleClose() {
    setActive(false);
    setFolderMode('idle');
  }
  return (
    <>
      <BookmarkModal active={active} onClose={handleClose}>
        {folderMode === 'create' && <CreateFolder isInitialCreation folders={savedMap} onFolderCreated={handleFolderCreated} onClose={handleClose} />}
        {folderMode === 'add' && <CreateFolder folders={savedMap} onFolderCreated={handleFolderCreated} onClose={() => setFolderMode('select')} />}
        {folderMode === 'select' && <BookmarkSave location={location} folders={savedMap} onSaveFolders={setSavedMap} onFolderMode={setFolderMode} onClose={handleClose} />}
      </BookmarkModal>
      <div className={styles.card}>
        <div className={styles['row--1']}>
          <span className={styles.category}>{location.categories.emoji}</span>
          <div className={styles['badge-wrap']}>
            <span className={styles.city}>
              {location.countries.country_flag} {location.cities[`city_${language}`]}
            </span>
            {bookmarkedLocations?.length > 0 && (
              <>
                <span className={styles.bookmark}>⭐️ {isKorean ? '북마크한 장소' : 'Bookmarked'}</span>
              </>
            )}
          </div>
        </div>
        <div className={styles['row--2']}>
          <h2 className={styles.title}>
            <span className="line-clamp line--2">{location[`name_${language}`]}</span>
          </h2>
          <p className={styles.country}>{location.countries[`country_${language}`]}</p>
        </div>
        <div className={styles['row--3']}>
          <button className={styles.btn} onClick={handleOpenModal}>
            {isKorean ? '북마크' : 'Bookmark'}
          </button>
          <a className={styles.destination} href={getGoogleDestinationLink(`${location[`address_${language}`]} ${location.zip_code}`)} target="_blank">
            {isKorean ? '길 찾기' : 'Destination'}
          </a>
        </div>
      </div>
    </>
  );
}

export default LocationArticleCard;
