import { useLanguage } from '../../hooks/useLanguage';

import styles from './LocationCategoryItem.module.css';

function LocationCategoryItem({ category, currentCategory, onCategory }) {
  const { language } = useLanguage();

  const className = currentCategory === category.slug ? `${styles.category} ${styles.active}` : styles.category;

  if (!category.count) return null;

  return (
    <li>
      <button className={className} onClick={() => onCategory(category.slug)}>
        <span>{category.emoji}</span>
        <span>{category[`category_${language}`]}</span>
      </button>
    </li>
  );
}

export default LocationCategoryItem;
