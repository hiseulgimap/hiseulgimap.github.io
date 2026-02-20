import BookmarkIcon from '../assets/icons/bold/BookmarkIcon';

import { useLanguage } from '../hooks/useLanguage';

import styles from './BookmarkButton.module.css';

function BookmarkButton({ onActive }) {
  const { isKorean } = useLanguage();

  return (
    <button className={styles.btn} onClick={onActive}>
      ⭐️ {isKorean ? '북마크하기' : 'Bookmark'}
    </button>
  );
}

export default BookmarkButton;
