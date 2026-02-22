import CountUp from 'react-countup';
import { useLanguage } from '../../hooks/useLanguage';

import styles from './EpisodeArticleStatistics.module.css';

function EpisodeArticleStatistics({ locations, countries, cities }) {
  const { isKorean } = useLanguage();

  const countriesLabel = countries?.length > 1 ? 'Countries' : 'Country';
  const citiesLabel = cities?.length > 1 ? 'Cities' : 'City';

  return (
    <div className={styles.statistics}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <span className={styles.count}>
            <CountUp end={countries?.length} duration={3} delay={0.65} />
          </span>
          <span className={styles.label}>{isKorean ? '국가' : countriesLabel}</span>
        </div>
        <div className={styles.col}>
          <span className={styles.count}>
            <CountUp end={cities?.length} duration={3} delay={0.65} />
          </span>
          <span className={styles.label}>{isKorean ? '도시' : citiesLabel}</span>
        </div>
        <div className={styles.col}>
          <span className={styles.count}>
            <CountUp end={locations?.length} duration={3} delay={0.65} />
          </span>
          <span className={styles.label}>{isKorean ? '장소' : 'Locations'}</span>
        </div>
      </div>
    </div>
  );
}

export default EpisodeArticleStatistics;
