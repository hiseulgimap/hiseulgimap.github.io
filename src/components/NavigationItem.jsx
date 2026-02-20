import { NavLink } from 'react-router-dom';

import { useLanguage } from '../hooks/useLanguage';

import styles from './NavigationItem.module.css';

function NavigationItem({ nav, isSub = false }) {
  const { language } = useLanguage();

  const className = ({ isActive }) => (isActive ? `${styles.nav} ${styles.active}${isSub ? ` ${styles.sub}` : ''}` : `${styles.nav}${isSub ? ` ${styles.sub}` : ''}`);

  return (
    <li>
      <NavLink className={className} to={`/${nav.slug}`}>
        {nav[`name_${language}`]}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
