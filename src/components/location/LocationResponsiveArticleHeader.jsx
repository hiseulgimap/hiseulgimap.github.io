import BookmarkButton from '../BookmarkButton';

import BookmarkIcon from '../../assets/icons/bold/BookmarkIcon';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './LocationResponsiveArticleHeader.module.css';

function LocationResponsiveArticleHeader({ location, bookmarkedLocations, onOpenModal }) {
  const { language, isKorean } = useLanguage();

  return (
    <header className={styles.header}>
      <span className={styles.emoji}>{location.categories.emoji}</span>
      <h1 className={styles.title}>{location[`name_${language}`]}</h1>
      <p className={styles.city}>{location.cities[`city_${language}`]}</p>
      <div className={styles['badge-wrap']}>
        <span className={styles.badge}>
          {location.countries.country_flag} {location.countries[`country_${language}`]}
        </span>
        {bookmarkedLocations?.length > 0 ? (
          <>
            <span className={styles.bookmark}>⭐️ {isKorean ? '북마크한 장소' : 'Bookmarked'}</span>
            <button className={styles.add} onClick={onOpenModal}>
              <BookmarkIcon />
            </button>
          </>
        ) : (
          <BookmarkButton onActive={onOpenModal} />
        )}
      </div>
    </header>
  );
}

export default LocationResponsiveArticleHeader;
