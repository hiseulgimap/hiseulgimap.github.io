import MiniLoader from './MiniLoader';
import RecentLocationItem from './RecentLocationItem';

import HomeMainLayout from '../UI/layout/HomeMainLayout';

import { useRecentLocations } from '../service/locations/useRecentLocations';

import { useLanguage } from '../hooks/useLanguage';

import styles from './RecentLocation.module.css';

function RecentLocation() {
  const { isKorean } = useLanguage();
  const { recentLocations, isLoading } = useRecentLocations();

  if (isLoading)
    return (
      <div className={styles.loader}>
        <MiniLoader />
      </div>
    );

  return (
    <section className={styles.recents}>
      <HomeMainLayout>
        <header className={styles.header}>
          <h2 className={styles.title}>📍 {isKorean ? '최근 추가된 장소' : 'Recently Added'}</h2>
        </header>
        <ul className={styles.list}>
          {recentLocations.map(location => (
            <RecentLocationItem key={location.id} location={location} />
          ))}
        </ul>
      </HomeMainLayout>
    </section>
  );
}

export default RecentLocation;
