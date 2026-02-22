import { useState } from 'react';
import { Link } from 'react-router-dom';

import CreateFolder from '../CreateFolder';
import BookmarkModal from '../BookmarkModal';
import MyMapNoResult from './MyMapNoResult';

import ModifyIcon from '../../assets/icons/linear/ModifyIcon';
import TrashIcon from '../../assets/icons/linear/TrashIcon';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './MyMapLocation.module.css';

function MyMapLocationLayout({ folder, children, onEditModalOpen, onDeleteFolder, isLocationList = false }) {
  const { isKorean } = useLanguage();
  const locationCounts = folder?.location_id.length ?? 0;

  return (
    <div className={styles.locations}>
      {isLocationList && (
        <header className={styles.header}>
          <span className={styles['header-location']}>
            <span className={styles.label}>📍 {isKorean ? '저장된 장소' : 'Saved location'}</span>
            <span className={styles.counts}>
              {locationCounts}
              {isKorean ? '곳' : locationCounts > 1 ? ' places' : ' place'}
            </span>
          </span>
          <span className={styles['header-action']}>
            <button className={styles.edit} onClick={() => onEditModalOpen(true)}>
              <ModifyIcon />
              <span>{isKorean ? '폴더 수정' : 'Edit folder'}</span>
            </button>
            <button className={styles.danger} onClick={() => onDeleteFolder(true)}>
              <TrashIcon />
            </button>
          </span>
        </header>
      )}
      {children}
    </div>
  );
}

function MyMapLocation({ maps, selectedFolder = [], selectedFolderId, onDeleteFolder, onMaps }) {
  const [folder] = selectedFolder;

  const { isKorean } = useLanguage();
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleFolderUpdated(newFolders) {
    onMaps(newFolders);
    setEditModalOpen(false);
  }

  if (!selectedFolderId)
    return (
      <MyMapLocationLayout>
        <MyMapNoResult emoji="📂" mainText={isKorean ? '폴더를 선택해 주세요' : 'Select a folder'} subText={isKorean ? '폴더를 선택하면 저장된 장소가 표시됩니다' : 'Please select a folder to browse saved locations'} />
      </MyMapLocationLayout>
    );

  if (!folder?.location_id.length)
    return (
      <>
        <BookmarkModal active={editModalOpen} onClose={() => setEditModalOpen(false)}>
          {editModalOpen && <CreateFolder folders={maps} editFolder={folder} onFolderCreated={handleFolderUpdated} onClose={() => setEditModalOpen(false)} />}
        </BookmarkModal>
        <MyMapLocationLayout folder={folder} onEditModalOpen={setEditModalOpen} onDeleteFolder={onDeleteFolder} isLocationList>
          <MyMapNoResult emoji="📍" mainText={isKorean ? '저장된 장소가 없어요' : 'No locations saved'} subText={isKorean ? '지도에서 장소를 추가해 보세요' : 'Try adding locations from the map'} />
        </MyMapLocationLayout>
      </>
    );

  return (
    <>
      <BookmarkModal active={editModalOpen} onClose={() => setEditModalOpen(false)}>
        {editModalOpen && <CreateFolder folders={maps} editFolder={folder} onFolderCreated={handleFolderUpdated} onClose={() => setEditModalOpen(false)} />}
      </BookmarkModal>
      <MyMapLocationLayout folder={folder} onEditModalOpen={setEditModalOpen} onDeleteFolder={onDeleteFolder} isLocationList>
        <div className={styles.container}></div>
        <footer className={styles.footer}>
          <Link className={styles.link} to={`/preview/${folder.id}`}>
            {isKorean ? '이미지로 저장하기' : 'Save as image'}
          </Link>
        </footer>
      </MyMapLocationLayout>
    </>
  );
}

export default MyMapLocation;
