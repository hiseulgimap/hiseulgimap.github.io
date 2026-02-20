import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.css';

function MenuItem({ to, icon, content, isSub, onActive }) {
  const className = ({ isActive }) => (isActive ? `${styles.menu} ${styles.active}${isSub ? ` ${styles.sub}` : ''}` : `${styles.menu}${isSub ? ` ${styles.sub}` : ''}`);

  return (
    <NavLink className={className} to={to} onClick={() => onActive(false)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{content}</span>
    </NavLink>
  );
}

export default MenuItem;
