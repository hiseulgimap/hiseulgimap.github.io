import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import toast from 'react-hot-toast';

import FolderStarIcon from '../assets/icons/bold/FolderStarIcon';
import FolderIcon from '../assets/icons/bold/FolderIcon';
import ChevronDownIcon from '../assets/icons/linear/ChevronDownIcon';
import PlusIcon from '../assets/icons/linear/PlusIcon';

import { useLanguage } from '../hooks/useLanguage';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { formatDate } from '../util/helper';
import { MAP_STORAGE_KEY } from '../util/constants';

import styles from './BookmarkSave.module.css';

function BookmarkSave({ location, folders, onFolderMode, onClose }) {
  const { language, isKorean } = useLanguage();
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [, setMyMap] = useLocalStorage([], MAP_STORAGE_KEY);
  const [sortType, setSortType] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);

  const SORT_OPTIONS = [
    { value: 'default', label: isKorean ? '기본순' : 'Default' },
    { value: 'latest', label: isKorean ? '최신순' : 'Latest' },
    { value: 'name', label: isKorean ? '이름순' : 'By Name' },
  ];

  const sortedFolders = [...(folders ?? [])].sort((a, b) => {
    if (sortType === 'latest') {
      const dateA = a.updated_at ? new Date(a.updated_at) : new Date(a.created_at);
      const dateB = b.updated_at ? new Date(b.updated_at) : new Date(b.created_at);
      return dateB - dateA;
    }
    if (sortType === 'name') return a.folderName.localeCompare(b.folderName);
    return 0;
  });

  const duplicateFolderIds = folders?.filter(folder => folder.location_id.includes(location.id)).map(folder => folder.id);

  function handleSelectFolder(folderId) {
    if (duplicateFolderIds.includes(folderId)) {
      toast.error(isKorean ? '이미 저장된 폴더입니다' : 'Already saved in this folder');
      return;
    }

    setSelectedFolder(prev => (prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]));
  }

  function handleSave() {
    if (!selectedFolder.length) {
      toast.error(isKorean ? '폴더를 선택해 주세요' : 'Please select a folder');
      return;
    }

    const updated_at = new Date();

    const updatedMap = folders.map(folder => {
      if (!selectedFolder.includes(folder.id)) return folder;

      return {
        ...folder,
        location_id: [...folder.location_id, location.id],
        updated_at,
      };
    });

    setMyMap(updatedMap);
    toast.success(isKorean ? '저장되었습니다' : 'Saved successfully');
    onClose();
  }

  function handleClose() {
    setSelectedFolder([]);
    setSortType('default');
    setSortOpen(false);
    onClose();
  }

  return (
    <>
      <h1 className={styles.title}>
        <span className="line-clamp line--1">📍 {location[`name_${language}`]}</span>
      </h1>
      <p className={styles.text}>{isKorean ? '해당 장소를 저장할 폴더를 선택해 주세요' : 'Select a folder to save the location'}</p>
      <ul className={styles.list}>
        <div className={styles['list-header']}>
          {folders.length > 1 && (
            <div className={styles['sort-wrap']}>
              <button className={sortOpen ? `${styles['sort-btn']} ${styles.active}` : styles['sort-btn']} onClick={() => setSortOpen(prev => !prev)}>
                {SORT_OPTIONS.find(opt => opt.value === sortType)?.label}
                <ChevronDownIcon />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.ul
                    className={styles['sort-list']}
                    variants={{
                      visible: { transform: 'translateY(0)', opacity: 1 },
                      hidden: { transform: 'translateY(-2rem)', opacity: 0 },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.35 }}
                  >
                    {SORT_OPTIONS.map(opt => (
                      <li key={opt.value}>
                        <button
                          className={opt.value === sortType ? `${styles['sort-option']} ${styles.active}` : styles['sort-option']}
                          onClick={() => {
                            setSortType(opt.value);
                            setSortOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
          <button className={styles.create} onClick={() => onFolderMode('add')}>
            <span>
              <PlusIcon />
            </span>
            {isKorean ? '새 폴더 만들기' : 'Create a new folder'}
          </button>
        </div>
        <div className={styles['list-content']}>
          {sortedFolders?.map(folder => {
            const isDuplicate = duplicateFolderIds.includes(folder.id);
            const isSelected = selectedFolder.includes(folder.id);

            return (
              <li key={folder.id}>
                <button className={isDuplicate ? `${styles.folder} ${styles.notallowed}` : isSelected ? `${styles.folder} ${styles.active}` : styles.folder} onClick={() => handleSelectFolder(folder.id)}>
                  <span className={styles.icon}>{folder.isFavorite ? <FolderStarIcon color={`var(--color-folder-${folder.color}-base)`} /> : <FolderIcon color={`var(--color-folder-${folder.color}-base)`} />}</span>
                  <div className={styles['folder-title--wrap']}>
                    <h4 className={styles['folder-title']}>
                      <span className="line-clamp line--1">{folder.folderName}</span>
                    </h4>
                    <time className={styles['folder-date']}>{formatDate(folder.created_at)}</time>
                  </div>
                </button>
              </li>
            );
          })}
        </div>
      </ul>
      <footer className={styles.action}>
        <button className={!selectedFolder.length ? `${styles['primary-btn']} ${styles.disabled}` : styles['primary-btn']} onClick={handleSave}>
          {isKorean ? '저장하기' : 'Save'}
        </button>
        <button className={styles['secondary-btn']} onClick={handleClose}>
          {isKorean ? '취소하기' : 'Close'}
        </button>
      </footer>
    </>
  );
}

export default BookmarkSave;
