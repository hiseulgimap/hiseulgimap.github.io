import PlusIcon from '../../assets/icons/linear/PlusIcon';
import StarIcon from '../../assets/icons/linear/StarIcon';
import FolderIcon from '../../assets/icons/bold/FolderIcon';
import FolderStarIcon from '../../assets/icons/bold/FolderStarIcon';
import StarFullIcon from '../../assets/icons/bold/StarFullIcon';

import { useLanguage } from '../../hooks/useLanguage';

import { formatDate } from '../../util/helper';

import styles from './MyMapFolder.module.css';

function MyMapFolder({ folders, selectedFolderId, onMaps, onSelectFolderId, onCreateFolder, onModal }) {
  const { isKorean } = useLanguage();

  function handleFavorite(event, folderId) {
    event.stopPropagation();

    onMaps(prevState => prevState.map(folder => (folder.id === folderId ? { ...folder, isFavorite: !folder.isFavorite } : folder)));
  }

  function handleClick(folderId) {
    onModal(false);
    onSelectFolderId(folderId);
  }

  return (
    <div className={styles.sb}>
      <ul className={styles.folders}>
        {folders.map(folder => (
          <li key={folder.id}>
            <div
              className={selectedFolderId === folder.id ? `${styles.folder} ${styles.active}` : styles.folder}
              onClick={() => handleClick(folder.id)}
              role="button"
              tabIndex={0}
              onKeyDown={event => event.key === 'Enter' && onSelectFolderId(folder.id)}
            >
              <span className={styles.icon}>{folder.isFavorite ? <FolderStarIcon color={`var(--color-folder-${folder.color}-base)`} /> : <FolderIcon color={`var(--color-folder-${folder.color}-base)`} />}</span>
              <div>
                <h5 className={styles.title}>
                  <span className="line-clamp line--1">{folder.folderName}</span>
                </h5>
                <div className={styles['sub-wrap']}>
                  <time className={styles.date}>{formatDate(folder.created_at)}</time>
                  <span className={styles.bull}>&bull;</span>
                  <span className={styles.count}>
                    {folder.location_id?.length}
                    {isKorean ? '곳' : ' places'}
                  </span>
                </div>
              </div>
              <button className={folder.isFavorite ? `${styles.fav} ${styles.active}` : styles.fav} onClick={event => handleFavorite(event, folder.id)}>
                {folder.isFavorite ? <StarFullIcon /> : <StarIcon />}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.bottom}>
        <button className={styles.create} onClick={() => onCreateFolder(true)}>
          <PlusIcon />
          {isKorean ? '새 폴더 만들기' : 'Create new folder'}
        </button>
      </div>
    </div>
  );
}

export default MyMapFolder;
