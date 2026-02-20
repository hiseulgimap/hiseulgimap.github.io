import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BookmarkSave from '../BookmarkSave';
import BookmarkModal from '../BookmarkModal';
import CreateFolder from '../CreateFolder';
import LocationResponsiveArticleMap from './LocationResponsiveArticleMap';
import LocationArticleVideoRow from './LocationArticleVideoRow';
import LocationResponsiveArticleHeader from './LocationResponsiveArticleHeader';
import LocationResponsiveArticleInformation from './LocationResponsiveArticleInformation';
import LocationVideoModal from './LocationVideoModal';
import Tip from '../Tip';

import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../../util/constants';

import styles from './LocationResponsiveArticle.module.css';

function LocationResponsiveArticle({ location }) {
  const navigate = useNavigate();

  const { category } = useParams();

  const [active, setActive] = useState(false);
  const [folderMode, setFolderMode] = useState('idle');
  const [modalOpen, setModalOpen] = useState(false);

  const { language, isKorean } = useLanguage();
  const [savedMap, setSavedMap] = useLocalStorage([], MAP_STORAGE_KEY);

  const bookmarkedLocations = savedMap?.filter(map => map.location_id.includes(location.id));

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

  const handleBackToList = () => navigate(`/${category}`);

  return (
    <>
      <LocationVideoModal location={location} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <BookmarkModal active={active} onClose={handleClose}>
        {folderMode === 'create' && <CreateFolder isInitialCreation folders={savedMap} onFolderCreated={handleFolderCreated} onClose={handleClose} />}
        {folderMode === 'add' && <CreateFolder folders={savedMap} onFolderCreated={handleFolderCreated} onClose={() => setFolderMode('select')} />}
        {folderMode === 'select' && <BookmarkSave location={location} folders={savedMap} onSaveFolders={setSavedMap} onFolderMode={setFolderMode} onClose={handleClose} />}
      </BookmarkModal>

      <article id={styles.article}>
        <LocationResponsiveArticleHeader location={location} bookmarkedLocations={bookmarkedLocations} onOpenModal={handleOpenModal} />

        <LocationResponsiveArticleMap location={location} />

        <LocationResponsiveArticleInformation location={location} />

        <LocationArticleVideoRow location={location} onModalOpen={setModalOpen} />

        <Tip />

        {/* <div className={styles.action}>
          <a className={styles['action-primary']} href={location.map_url} target="_blank">
            <span>🗺️</span>
            {isKorean ? `${mapType}에서 보기` : `Browse in ${mapType}`}
          </a>
          <button className={styles['action-secondary']} onClick={handleBackToList}>
            <ArrowLeftIcon />
            {isKorean ? '장소 목록으로' : 'Location list'}
          </button>
        </div> */}
      </article>
    </>
  );
}

export default LocationResponsiveArticle;
