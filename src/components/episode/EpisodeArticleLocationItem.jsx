import { useLanguage } from '../../hooks/useLanguage';

import { formatTimestamp } from '../../util/helper';

import styles from './EpisodeArticleLocationItem.module.css';

function EpisodeArticleLocationItem({ order, locations, location, selectedLocation, onSelect }) {
  const { language } = useLanguage();

  const className = selectedLocation?.length === 1 && selectedLocation?.at(0).id === location.id ? `${styles.item} ${styles.active}` : styles.item;

  function handleSelect() {
    onSelect(prevLocation => (prevLocation.length === 1 && prevLocation.at(0).id === location.id ? locations : [location]));
  }

  return (
    <li className={styles.list}>
      <button className={className} onClick={handleSelect}>
        <span className={styles.order}>{order}</span>
        <span className={styles.emoji}>{location.emoji}</span>
        <span className={styles.wrap}>
          <h5 className={styles.name}>
            <span className="line-clamp line--1">{location[`name_${language}`]}</span>
          </h5>
          <p className={styles.address}>
            <span className="line-clamp line--1">{location[`address_${language}`]}</span>
          </p>
        </span>
        <div className={styles.timestamp} role="button">
          {formatTimestamp(location.start_at)}
        </div>
      </button>
    </li>
  );
}

export default EpisodeArticleLocationItem;
