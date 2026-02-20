import { useState } from 'react';
import { Link } from 'react-router-dom';

import NoResult from './NoResult';

import ChevronRightIcon from '../assets/icons/linear/ChevronRightIcon';
import FolderIcon from '../assets/icons/bold/FolderIcon';
import FolderStarIcon from '../assets/icons/bold/FolderStarIcon';

import { useLanguage } from '../hooks/useLanguage';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { MAP_STORAGE_KEY } from '../util/constants';
import { formatDate } from '../util/helper';

import styles from './MyMapSummary.module.css';

function MyMapSummaryContent({ children }) {
  const { isKorean } = useLanguage();

  return (
    <section id={styles.myMap}>
      <div className={styles['title-wrap']}>
        <h2 className={styles.title}>{isKorean ? '저장한 투어 리스트' : 'Saved locations'}</h2>
        <Link className={styles.more} to="/my-map">
          <span>{isKorean ? '더보기' : 'more'}</span>
          <ChevronRightIcon />
        </Link>
      </div>
      {children}
    </section>
  );
}

function MyMapSummary() {
  const [savedMap] = useLocalStorage([], MAP_STORAGE_KEY);
  const { isKorean } = useLanguage();

  const [activeFolder, setActiveFolder] = useState(() => savedMap?.at(0)?.id || null);

  const title = isKorean ? '저장된 장소가 없습니다' : 'Your map list is empty';
  const content = isKorean ? '가고 싶은 장소를 저장해 보세요!' : "Save places you'd like to visit!";

  if (!savedMap?.length)
    return (
      <MyMapSummaryContent>
        <NoResult emoji="🗺️" title={title} content={content} />
      </MyMapSummaryContent>
    );

  const [activeFolderData] = savedMap.filter(map => map.id === activeFolder);

  return (
    <MyMapSummaryContent>
      <div className={styles.container}>
        <div className={styles['row--folder']}>
          <div className={styles['folder-header']}>
            <h5>🗂️ {isKorean ? '폴더 목록' : 'Folder list'}</h5>
          </div>
          <ul className={styles['folder-list']}>
            {savedMap.map((map, i) => (
              <li key={map.id}>
                <button className={i === activeFolder || map.id === activeFolder ? `${styles.folder} ${styles.active}` : styles.folder} onClick={() => setActiveFolder(map.id)}>
                  <span className={styles.icon}>{map.isFavorite ? <FolderStarIcon color={`var(--color-folder-${map.color}-base)`} /> : <FolderIcon color={`var(--color-folder-${map.color}-base)`} />}</span>
                  <div>
                    <h5 className={styles['folder-title']}>
                      <span className="line-clamp line--1">{map.folderName}</span>
                    </h5>
                    <time className={styles['folder-date']}>{formatDate(map.created_at)}</time>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['row--location']}>
          <div className={styles['folder-header']}>
            <h5>📍 {isKorean ? '저장된 장소 목록' : 'Saved location list'}</h5>
          </div>
          <ul key={activeFolder} className={styles['folder-mobile']}>
            {savedMap.map((map, i) => (
              <li key={map.id}>
                <button className={i === activeFolder || map.id === activeFolder ? `${styles.folder} ${styles.active}` : styles.folder} onClick={() => setActiveFolder(map.id)}>
                  <span className={styles.icon}>{map.isFavorite ? <FolderStarIcon color={`var(--color-folder-${map.color}-base)`} /> : <FolderIcon color={`var(--color-folder-${map.color}-base)`} />}</span>
                  <div>
                    <h5 className={styles['folder-title']}>
                      <span className="line-clamp line--1">{map.folderName}</span>
                    </h5>
                    <time className={styles['folder-date']}>{formatDate(map.created_at)}</time>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {activeFolderData.location_id?.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles['empty-emoji']}>💭</span>
              <p className={styles['empty-text']}>{isKorean ? '저장된 장소가 없습니다' : 'Location list is empty'}</p>
            </div>
          ) : (
            <ul className={styles['location-list']}></ul>
          )}
        </div>
      </div>
    </MyMapSummaryContent>
  );
}

export default MyMapSummary;
