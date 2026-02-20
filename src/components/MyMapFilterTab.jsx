import { useLanguage } from '../hooks/useLanguage';

import styles from './MyMapFilterTab.module.css';

function MyMapFilterTab({ sortOptions, sortType, onSortType, filteredFolders, onFilterChange }) {
  const { isKorean } = useLanguage();

  return (
    <div className={styles.tabs}>
      {sortOptions.map(({ value, label_ko, label_en }) => (
        <button
          key={value}
          className={sortType === value ? `${styles.tab} ${styles.active}` : styles.tab}
          onClick={() => {
            onSortType(value);
            onFilterChange?.([...filteredFolders]);
          }}
        >
          {isKorean ? label_ko : label_en}
        </button>
      ))}
    </div>
  );
}

export default MyMapFilterTab;
