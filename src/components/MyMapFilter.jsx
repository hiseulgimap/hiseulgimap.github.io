import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';

import MyMapFilterSelect from './MyMapFilterSelect';
import MyMapFilterTab from './MyMapFilterTab';

import CircleIcon from '../assets/icons/linear/CircleIcon';
import CheckCircleIcon from '../assets/icons/bold/CheckCircleIcon';
import FolderFullIcon from '../assets/icons/bold/FolderFullIcon';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './MyMapFilter.module.css';

const SORT_OPTIONS = [
  { value: 'name', label_ko: '이름순', label_en: 'By Name' },
  { value: 'latest', label_ko: '최신순', label_en: 'Latest' },
  { value: 'updated', label_ko: '업데이트순', label_en: 'Updated' },
];

export default function MyMapFilter({ folders = [], active, onModal, onFilterChange }) {
  const { isKorean } = useLanguage();
  const [sortType, setSortType] = useState('name');
  const [showFavOnly, setShowFavOnly] = useState(false);

  const [isMobile] = useMediaQuery('(max-width: 30rem)');

  const filteredFolders = useMemo(() => {
    const base = showFavOnly ? folders.filter(f => f.isFavorite) : folders;

    return [...base].sort((a, b) => {
      switch (sortType) {
        case 'name':
          return (a.folderName ?? '').localeCompare(b.folderName ?? '', 'ko');
        case 'latest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'updated':
          return new Date(b.updated_at ?? b.created_at) - new Date(a.updated_at ?? a.created_at);
        default:
          return 0;
      }
    });
  }, [folders, sortType, showFavOnly]);

  return {
    filteredFolders,

    FilterUI: (
      <div className={styles.filter}>
        <button className={active ? `${styles['folder-btn']} ${styles.active}` : styles['folder-btn']} onClick={() => onModal(prevState => !prevState)}>
          <FolderFullIcon />
        </button>
        {isMobile ? (
          <MyMapFilterSelect sortOptions={SORT_OPTIONS} sortType={sortType} onSortType={setSortType} filteredFolders={filteredFolders} onFilterChange={onFilterChange} />
        ) : (
          <MyMapFilterTab sortOptions={SORT_OPTIONS} sortType={sortType} onSortType={setSortType} filteredFolders={filteredFolders} onFilterChange={onFilterChange} />
        )}

        <button className={showFavOnly ? `${styles.favorite} ${styles.active}` : styles.favorite} onClick={() => setShowFavOnly(prevState => !prevState)}>
          {showFavOnly ? <CheckCircleIcon /> : <CircleIcon />}
          <span>{isKorean ? '즐겨찾기만 보기' : 'Favorites only'}</span>
        </button>
      </div>
    ),
  };
}
