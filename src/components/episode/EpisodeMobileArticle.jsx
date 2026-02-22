import { useLanguage } from '../../hooks/useLanguage';

import EpisodeArticleLocation from './EpisodeArticleLocation';
import EpisodeArticleMap from './EpisodeArticleMap';
import EpisodeArticleStatistics from './EpisodeArticleStatistics';
import EpisodeArticleVideoCard from './EpisodeArticleVideoCard';
import Memo from '../Memo';
import MiniLoader from '../MiniLoader';

import LoaderFullLayout from '../../UI/layout/LoaderFullLayout';

import { useEpisode } from '../../service/episodes/useEpisode';
import { useLocationsByEpisode } from '../../service/locations/useLocationsByEpisode';

import styles from './EpisodeMobileArticle.module.css';

function EpisodeMobileArticle() {
  const { language } = useLanguage();
  const { episode, isLoading } = useEpisode();
  const { locations, isLoading: isLoadingLocations } = useLocationsByEpisode();

  if (isLoading || isLoadingLocations)
    <LoaderFullLayout>
      <MiniLoader />
    </LoaderFullLayout>;

  const countries = locations
    ?.map(location => ({ country_ko: location.countries.country_ko, country_en: location.countries.country_en, country_flag: location.countries.country_flag }))
    .filter((country, index, self) => self.findIndex(t => t.country_ko === country.country_ko && t.country_en === country.country_en && t.country_flag === country.country_flag) === index);

  const cities = [...new Set(locations?.map(location => location.cities[`city_${language}`]))];

  return (
    <article id={styles.article}>
      <EpisodeArticleVideoCard episode={episode} countries={countries} />

      <EpisodeArticleStatistics locations={locations} countries={countries} cities={cities} />

      <EpisodeArticleMap locations={locations} height={'24rem'} />

      <EpisodeArticleLocation locations={locations} />

      <Memo episode={episode} />
    </article>
  );
}

export default EpisodeMobileArticle;
