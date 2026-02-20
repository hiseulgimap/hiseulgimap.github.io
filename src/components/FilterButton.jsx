import { forwardRef } from 'react';
import FilterIcon from '../assets/icons/linear/FilterIcon';

import styles from './FilterButton.module.css';

const FilterButton = forwardRef(({ active, onActive }, ref) => {
  const className = active ? `${styles.btn} ${styles.active}` : styles.btn;

  const handleClick = () => onActive(prevState => !prevState);

  return (
    <button ref={ref} className={className} onClick={handleClick}>
      <FilterIcon />
    </button>
  );
});

export default FilterButton;
