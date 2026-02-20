import { forwardRef } from 'react';

import MenuIcon from '../assets/icons/linear/MenuIcon';

import styles from './MenuButton.module.css';

const MenuButton = forwardRef(({ active, onActive }, ref) => {
  const className = active ? `${styles.btn} ${styles.active}` : styles.btn;

  const handleClick = () => onActive(prevState => !prevState);

  return (
    <button className={className} ref={ref} onClick={handleClick}>
      <MenuIcon />
    </button>
  );
});

export default MenuButton;
