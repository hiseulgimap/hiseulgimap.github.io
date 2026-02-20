import { useLanguage } from '../hooks/useLanguage';

import StatisticsItem from './StatisticsItem';

import { useEpisodes } from '../service/episodes/useEpisodes';
import { useLocations } from '../service/locations/useLocations';
import { useDomesticLocations } from '../service/locations/useDomesticLocations';
import { useGlobalLocations } from '../service/locations/useGlobalLocations';

import styles from './Statistics.module.css';
import MiniLoader from './MiniLoader';

function Statistics() {
  const { isKorean } = useLanguage();

  // const { domestics, isLoading: isLoadingDomestics } = useDomesticLocations();
  // const { globals, isLoading: isLoadingGlobals } = useGlobalLocations();
  const { locations, isLoading: isLoadingLocations } = useLocations();
  const { episodes, isLoading: isLoadingEpisodes } = useEpisodes();

  if (isLoadingLocations || isLoadingEpisodes)
    return (
      <div className={styles.loading}>
        <MiniLoader />
      </div>
    );

  const domestics = locations.filter(location => location.countries.country_code === 'KR');
  const globals = locations.filter(location => location.countries.country_code !== 'KR');

  return (
    <>
      <section id={styles.text}>
        <p>
          EXPLORE <span>SEULGI'S</span> JOURNEY
        </p>
      </section>
      <section id={styles.statistics}>
        <h1 className={styles.title}>📍 {isKorean ? '하이슬기 지도' : 'HiSeulgi Tour Map'}</h1>
        <div className={styles.grid}>
          <StatisticsItem to="/korea" emoji="🇰🇷" title={isKorean ? '국내 장소' : 'Locations in Korea'} count={domestics.length} />
          <StatisticsItem to="/global" emoji="🌏" title={isKorean ? '해외 장소' : 'Global map'} count={globals.length} />
          <StatisticsItem to="/episode" emoji="🐻" title={isKorean ? '하이슬기 에피소드' : 'HiSeulgi Episodes'} count={episodes.length} />
        </div>
      </section>
    </>
  );
}

export default Statistics;
