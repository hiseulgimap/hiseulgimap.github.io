import { useSortable } from '@dnd-kit/sortable';
import MenuIcon from '../assets/icons/bold/MenuIcon';

import { useLanguage } from '../hooks/useLanguage';

import styles from './PreviewLocationItem.module.css';
import { forwardRef } from 'react';

const PreviewLocationItem = forwardRef(({ location }, ref) => {
  const { language } = useLanguage();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: location.id });

  const style = {
    transform: CSS.Transform?.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li draggable className={styles.list} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <button className={styles.drag} ref={ref}>
        <MenuIcon />
        <MenuIcon />
      </button>
      <span className={styles.emoji}>{location.emoji}</span>
      <div>
        <h3 className={styles.name}>{location[`name_${language}`]}</h3>
        <span className={styles.location}>
          📍 {location.cities[`city_${language}`]}, {location.countries[`country_${language}`]}
        </span>
      </div>
      <span className={styles.category}>
        {location.categories.emoji} {location.categories[`category_${language}`]}
      </span>
    </li>
  );
});
export default PreviewLocationItem;
