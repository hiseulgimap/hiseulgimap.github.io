import { Link } from 'react-router-dom';

import MiniLoader from './MiniLoader';
import StatisticsItem from './StatisticsItem';

import HomeMainLayout from '../UI/layout/HomeMainLayout';

import ArrowRightIcon from '../assets/icons/linear/ArrowRightIcon';

import { useLanguage } from '../hooks/useLanguage';

import { useEpisodes } from '../service/episodes/useEpisodes';
import { useLocations } from '../service/locations/useLocations';

import styles from './Hero.module.css';

function Hero() {
  const { isKorean } = useLanguage();

  const { locations, isLoading: isLoadingLocations } = useLocations();
  const { episodes, isLoading: isLoadingEpisodes } = useEpisodes();

  if (isLoadingLocations || isLoadingEpisodes)
    return (
      <div className={styles.loader}>
        <MiniLoader />
      </div>
    );

  const domestics = locations?.filter(location => location.countries.country_code === 'KR');
  const globals = locations?.filter(location => location.countries.country_code !== 'KR');

  return (
    <section id={styles.hero}>
      <HomeMainLayout>
        <p className={styles.sub}>{isKorean ? '슬기의 발자취를 따라서' : "Follow in SEULGI's footsteps"}</p>
        <h1 className={styles.title}>
          <span>EXPLORE</span>
          <span className={styles.highlight}>SEULGI'S</span>
          <span>JOURNEY</span>
        </h1>
        <div className={styles.actions}>
          <Link className={styles.primary} to={'/episode'}>
            🗺️ {isKorean ? '지도 보기' : 'Browse Map'}
          </Link>
          <Link className={styles.secondary} to={'/guide'}>
            {isKorean ? '이용 가이드' : 'Guide'} <ArrowRightIcon />
          </Link>
        </div>
        <div className={styles.grid}>
          <StatisticsItem to="/korea" emoji="🇰🇷" title={isKorean ? '국내 장소' : 'Locations in Korea'} count={domestics.length} />
          <StatisticsItem to="/global" emoji="🌏" title={isKorean ? '해외 장소' : 'Global map'} count={globals.length} />
          <StatisticsItem to="/episode" emoji="🐻" title={isKorean ? '하이슬기 에피소드' : 'HiSeulgi Episodes'} count={episodes?.length} />
        </div>
      </HomeMainLayout>
    </section>
  );
}

export default Hero;
