import { Link, useParams } from 'react-router-dom';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './LocationItem.module.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { MAP_STORAGE_KEY } from '../../util/constants';

function LocationItem({ order, location }) {
  const { category } = useParams();
  const { language, isKorean } = useLanguage();
  const [maps] = useLocalStorage([], MAP_STORAGE_KEY);

  const locationIds = maps.map(map => map.location_id)?.flat();

  return (
    <li>
      <Link className={styles.location} to={`/${category}/${location.id}`}>
        <span className={styles.num}>{order}</span>
        <div className={styles.column}>
          <div className={styles['title-wrap']}>
            <h4 className={styles.title}>{location[`name_${language}`]}</h4>
            <p className={styles.city}>
              <span>{location.cities[`city_${language}`]}, </span>
              <span>{location.countries[`country_${language}`]}</span>
            </p>
          </div>
          <p className={styles.address}>
            <span className="line-clamp line--1">{location[`address_${language}`]}</span>
          </p>
          <div className={styles.tag}>
            <span className={styles.category}>
              {location.categories.emoji} {location.categories[`category_${language}`]}
            </span>
            {locationIds.includes(location.id) && <span className={styles.bookmark}>⭐️ {isKorean ? '북마크' : 'Bookmarked'}</span>}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default LocationItem;
