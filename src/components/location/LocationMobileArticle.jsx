import { useState } from 'react';

import BookmarkSave from '../BookmarkSave';
import BookmarkModal from '../BookmarkModal';
import CreateFolder from '../CreateFolder';
import LocationArticleInformation from './LocationArticleInformation';
import LocationArticleVideoRow from './LocationArticleVideoRow';
import LocationMobileArticleHeader from './LocationMobileArticleHeader';
import LocationMobileArticleMap from './LocationMobileArticleMap';
import LocationVideoModal from './LocationVideoModal';
import Memo from '../Memo';
import Tip from '../Tip';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../../util/constants';

import styles from './LocationMobileArticle.module.css';

function LocationMobileArticle({ location }) {
  const [active, setActive] = useState(false);
  const [folderMode, setFolderMode] = useState('idle');
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <>
      <LocationVideoModal location={location} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <BookmarkModal active={active} onClose={handleClose}>
        {folderMode === 'create' && <CreateFolder isInitialCreation folders={savedMap} onFolderCreated={handleFolderCreated} onClose={handleClose} />}
        {folderMode === 'add' && <CreateFolder folders={savedMap} onFolderCreated={handleFolderCreated} onClose={() => setFolderMode('select')} />}
        {folderMode === 'select' && <BookmarkSave location={location} folders={savedMap} onSaveFolders={setSavedMap} onFolderMode={setFolderMode} onClose={handleClose} />}
      </BookmarkModal>

      <article id={styles.article}>
        <LocationMobileArticleHeader location={location} bookmarkedLocations={bookmarkedLocations} onOpenModal={handleOpenModal} />

        <LocationMobileArticleMap location={location} />

        <LocationArticleInformation location={location} />

        <LocationArticleVideoRow location={location} onModalOpen={setModalOpen} />

        <Tip />

        <Memo location={location} />
      </article>
    </>
  );
}

export default LocationMobileArticle;
