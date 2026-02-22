import { useEffect, useState } from 'react';

import EpisodeArticleLocation from './EpisodeArticleLocation';
import EpisodeArticleMap from './EpisodeArticleMap';
import EpisodeArticleStatistics from './EpisodeArticleStatistics';
import EpisodeArticleVideoCard from './EpisodeArticleVideoCard';
import LoaderFullLayout from '../../UI/layout/LoaderFullLayout';
import Memo from '../Memo';
import MiniLoader from '../MiniLoader';

import { useEpisode } from '../../service/episodes/useEpisode';
import { useLocationsByEpisode } from '../../service/locations/useLocationsByEpisode';

import { useLanguage } from '../../hooks/useLanguage';

import styles from './EpisodeArticle.module.css';
import Tip from '../Tip';

function EpisodeArticle() {
  const { language } = useLanguage();
  const { episode, isLoading } = useEpisode();
  const { locations, isLoading: isLoadingLocations } = useLocationsByEpisode();

  const [select, setSelect] = useState(() => locations);

  useEffect(() => {
    if (!isLoadingLocations) setSelect(locations);
  }, [locations, isLoadingLocations]);

  if (isLoading || isLoadingLocations)
    <LoaderFullLayout>
      <MiniLoader />
    </LoaderFullLayout>;

  const countries = locations
    ?.map(location => ({ country_ko: location.countries.country_ko, country_en: location.countries.country_en, country_flag: location.countries.country_flag }))
    .filter((country, index, self) => self.findIndex(t => t.country_ko === country.country_ko && t.country_en === country.country_en && t.country_flag === country.country_flag) === index);

  const cities = [...new Set(locations?.map(location => location.cities[`city_${language}`]))];

  return (
    <article id={styles.episode}>
      <section className={styles.row}>
        <section className={styles['col--left']}>
          <EpisodeArticleVideoCard episode={episode} countries={countries} />
          <EpisodeArticleStatistics locations={locations} countries={countries} cities={cities} />
        </section>
        <section className={styles['col--right']}>
          <EpisodeArticleMap locations={select} />
        </section>
      </section>
      <section className={styles.row}>
        <section className={styles['col--left']}>
          <EpisodeArticleLocation locations={locations} selectedLocation={select} onSelect={setSelect} />
        </section>
        <section className={styles['col--right']}>
          {select?.length === 1 && <Tip id={select?.at(0).id} />}
          <Memo key={select} episode={episode} />
          <div className={styles.col}></div>
        </section>
      </section>
    </article>
  );
}

export default EpisodeArticle;
