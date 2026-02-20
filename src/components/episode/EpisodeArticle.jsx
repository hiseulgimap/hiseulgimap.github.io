import LoaderFullLayout from '../LoaderFullLayout';
import MiniLoader from '../MiniLoader';

import { useEpisode } from '../../service/episodes/useEpisode';

import EpisodeArticleVideoCard from './EpisodeArticleVideoCard';

import styles from './EpisodeArticle.module.css';

function EpisodeArticle() {
  const { episode, isLoading } = useEpisode();

  if (isLoading)
    <LoaderFullLayout>
      <MiniLoader />
    </LoaderFullLayout>;

  return (
    <article id={styles.episode}>
      <section className={styles['col--left']}>
        <EpisodeArticleVideoCard episode={episode} />
      </section>
      <section className={styles['col--right']}></section>
    </article>
  );
}

export default EpisodeArticle;
