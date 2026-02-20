import { useSearchParams } from 'react-router-dom';

import LocationCategoryItem from './LocationCategoryItem';

import { useLanguage } from '../../hooks/useLanguage';

import { useCategories } from '../../service/category/useCategories';
import { usePlaceCategories } from '../../service/category/usePlaceCategories';

import styles from './LocationCategory.module.css';

function LocationCategory() {
  const { language, isKorean } = useLanguage();
  const { categories, isLoading } = useCategories();
  const { placeCategories } = usePlaceCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = !searchParams.get('category') ? 'all' : searchParams.get('category');

  const className = currentCategory === 'all' ? `${styles.category} ${styles.active}` : styles.category;

  function handleCategory(slug) {
    searchParams.set('category', slug);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  }

  const categoriesWithCount = categories?.map(category => ({ ...category, count: placeCategories?.filter(cate => cate[`category_${language}`] === category[`category_${language}`]).length }));

  if (isLoading) return null;

  return (
    <ul className={styles.list}>
      <li>
        <button className={className} onClick={() => handleCategory('all')}>
          {isKorean ? '전체' : 'All'}
        </button>
      </li>
      {categoriesWithCount.map(category => (
        <LocationCategoryItem key={category.id} category={category} currentCategory={currentCategory} onCategory={handleCategory} />
      ))}
    </ul>
  );
}

export default LocationCategory;
