import NavigationItem from './NavigationItem';

import styles from './Navigation.module.css';

const NAVIGATION = [
  {
    id: 1,
    name_ko: '국내 지도',
    name_en: 'Map in Korea',
    slug: 'korea',
  },
  {
    id: 2,
    name_ko: '해외 지도',
    name_en: 'Global Map',
    slug: 'global',
  },
  {
    id: 3,
    name_ko: '에피소드별 지도',
    name_en: 'Episode Maps',
    slug: 'episode',
  },
];

const SUB_NAVIGATION = [
  {
    id: 1,
    name_ko: '마이 지도',
    name_en: 'My Map',
    slug: 'my-map',
  },
  {
    id: 2,
    name_ko: '이용 안내',
    name_en: 'Usage Guide',
    slug: 'guide',
  },
];

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
