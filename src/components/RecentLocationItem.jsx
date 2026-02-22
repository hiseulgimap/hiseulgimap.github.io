import { Link } from 'react-router-dom';

import { useLanguage } from '../hooks/useLanguage';

import styles from './RecentLocationItem.module.css';

function RecentLocationItem({ location }) {
  const { language } = useLanguage();

  return (
    <li>
      <Link className={styles.item} to={`/${location.map_type === 'NAVER' ? 'korea' : 'global'}/${location.id}`}>
        <span className={styles.emoji}>{location.emoji}</span>
        <h3 className={styles.title}>
          <span className="line-clamp line--2">{location[`name_${language}`]}</span>
        </h3>
        <span className={styles.location}>
          <span className="line-clamp line--2">
            {location.cities[`city_${language}`]}, {location.countries[`country_${language}`]}
          </span>
        </span>
        <span className={styles.category}>
          {location.categories.emoji} {location.categories[`category_${language}`]}
        </span>
      </Link>
    </li>
  );
}

export default RecentLocationItem;
