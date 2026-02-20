import NavigationItem from './NavigationItem';

import NAVIGATION from '../data/navigation';
import SUB_NAVIGATION from '../data/subNavigation';

import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav id={styles.nav}>
      <ul className={styles.list}>
        {NAVIGATION.map(nav => (
          <NavigationItem key={nav.id} nav={nav} />
        ))}
      </ul>
      <ul className={styles.list}>
        {SUB_NAVIGATION.map(nav => (
          <NavigationItem key={nav.id} nav={nav} isSub />
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
