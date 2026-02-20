import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import Logo from './Logo';

import FolderIcon from '../assets/icons/bold/FolderIcon';
import FolderStarIcon from '../assets/icons/bold/FolderStarIcon';

import { useLanguage } from '../hooks/useLanguage';

import { useLocationsByIds } from '../service/locations/useLocationsByIds';

import { formatDate } from '../util/helper';
import { MAP_STORAGE_KEY } from '../util/constants';

import styles from './PreviewContainer.module.css';

function PreviewContainer() {
  const { folderId } = useParams();
  const { language, isKorean } = useLanguage();
  const [maps] = useLocalStorage([], MAP_STORAGE_KEY);

  const selectedFolder = maps.filter(map => map.id === folderId) ?? [];

  const { locations, isLoading } = useLocationsByIds(selectedFolder.at(0)?.location_id);

  if (!selectedFolder || !selectedFolder?.length) return null;
  if (!selectedFolder.at(0)?.location_id?.length) return null;

  if (isLoading) return null;

  const [folder] = selectedFolder;

  const color = `var(--color-folder-${folder.color}-base)`;
  const count = folder.location_id.length;

  return (
    <div id={styles.image}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Logo />
        </header>
        <main className={styles.main}>
          <div className={styles['title-section']}>
            <span className={styles.icon}>{folder.isFavorite ? <FolderStarIcon color={color} /> : <FolderIcon color={color} />}</span>
            <div className={styles['title-wrap']}>
              <h2 className={styles.title}>
                <span className="line-clamp line--1">{folder.folderName}</span>
              </h2>
              <div className={styles['title-bottom']}>
                <time className={styles.date}>{formatDate(folder.created_at)}</time>
                <span className={styles.bull}>&bull;</span>
                <p className={styles.count}>
                  {count}
                  {isKorean ? '곳' : count === 1 ? ' place' : 'places'}
                </p>
              </div>
            </div>
          </div>
          <div className={styles['location-section']}>
            <ul className={styles.locations}>
              {locations.map(location => (
                <li key={location.id}>
                  <span></span>
                  <h4>{location[`name_${language}`]}</h4>
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className={styles.footer}>
          <a className={styles.copyright} href="https://x.com/ovxbjh" target="_blank">
            ⓒ {new Date().getFullYear()} <strong>ov.</strong> All rights reserved
          </a>
          <a className={styles.hiseulgimap} href="https://hiseulgi-map.com">
            https://hiseulgi-map.com
          </a>
        </footer>
      </div>
    </div>
  );
}

export default PreviewContainer;
