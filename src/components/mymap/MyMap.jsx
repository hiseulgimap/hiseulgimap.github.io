import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import BookmarkModal from '../BookmarkModal';
import CreateFolder from '../CreateFolder';
import DangerModal from '../DangerModal';
import MyMapFilterTab from './MyMapFilter';
import MyMapFolder from './MyMapFolder';
import MyMapFolderMotion from './MyMapFolderMotion';
import MyMapLocation from './MyMapLocation';
import NoResult from '../NoResult';

import { useLanguage } from '../../hooks/useLanguage';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import { MAP_STORAGE_KEY } from '../../util/constants';

import styles from './MyMap.module.css';

function MyMap() {
  const [isMobile] = useMediaQuery('(max-width: 48.75rem)');
  const [maps, setMaps] = useLocalStorage([], MAP_STORAGE_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState(false);

  const [createFolder, setCreateFolder] = useState(false);

  const { isKorean } = useLanguage();
  const { filteredFolders, FilterUI } = MyMapFilterTab({ folders: maps, active: modalOpen, onModal: setModalOpen });

  const [selectedFolderId, setSelectedFolderId] = useState(() => filteredFolders?.at(0)?.id ?? null);
  const selectedFolder = filteredFolders.filter(folder => folder.id === selectedFolderId);

  const title = isKorean ? '저장된 장소가 없습니다' : 'Your map list is empty';
  const content = isKorean ? '가고 싶은 장소를 저장해 보세요!' : "Save places you'd like to visit!";

  const folderRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isMobile) return;

    function handleMouseDown(event) {
      const isInsideFolder = folderRef.current?.contains(event.target);
      const isInsideHeader = headerRef.current?.contains(event.target);

      if (!isInsideFolder && !isInsideHeader) setModalOpen(false);
    }

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isMobile]);

  if (!maps.length) return <NoResult emoji="🧳" title={title} content={content} />;

  function handleFolderCreated(newFolders) {
    setMaps(newFolders);
    setCreateFolder(false);
  }

  function handleDeleteFolder() {
    const filteredFolder = maps.filter(map => map.id !== selectedFolderId);
    setMaps(filteredFolder);
    setDeleteFolder(false);
    toast.success(isKorean ? '삭제되었습니다' : 'Succesfully deleted', { icon: '🗑️' });
  }

  return (
    <>
      <BookmarkModal active={createFolder} onClose={() => setCreateFolder(false)}>
        {createFolder && <CreateFolder folders={filteredFolders} onFolderCreated={handleFolderCreated} onClose={() => setCreateFolder(false)} />}
      </BookmarkModal>
      <DangerModal
        active={deleteFolder}
        onClose={() => setDeleteFolder(false)}
        title={isKorean ? '폴더 삭제하기' : 'Delete folder'}
        content={
          isKorean ? (
            <>
              저장된 장소까지 삭제되며 복구가 불가능합니다
              <br />
              진행하시겠습니까?
            </>
          ) : (
            <>
              Bookmarked locations will also be deleted
              <br />
              This action cannot be undone
            </>
          )
        }
        onProceed={handleDeleteFolder}
      />
      <section id={styles.map} onClick={() => setModalOpen(false)}>
        <header className={styles.header} ref={headerRef} onClick={event => event.stopPropagation()}>
          {FilterUI}
        </header>
        <main className={styles.main}>
          {isMobile ? (
            <div ref={folderRef}>
              <MyMapFolderMotion active={modalOpen}>
                <MyMapFolder folders={filteredFolders} selectedFolderId={selectedFolderId} onSelectFolderId={setSelectedFolderId} onMaps={setMaps} onCreateFolder={setCreateFolder} onModal={setModalOpen} />
              </MyMapFolderMotion>
            </div>
          ) : (
            <MyMapFolder folders={filteredFolders} selectedFolderId={selectedFolderId} onSelectFolderId={setSelectedFolderId} onMaps={setMaps} onCreateFolder={setCreateFolder} onModal={setModalOpen} />
          )}
          <MyMapLocation selectedFolderId={selectedFolderId} selectedFolder={selectedFolder} maps={maps} onMaps={setMaps} onDeleteFolder={setDeleteFolder} />
        </main>
      </section>
    </>
  );
}

export default MyMap;
