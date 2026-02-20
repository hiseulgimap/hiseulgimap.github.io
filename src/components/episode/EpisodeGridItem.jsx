import { Link } from 'react-router-dom';

import LoaderFullLayout from '../LoaderFullLayout';
import MiniLoader from '../MiniLoader';

import { useLanguage } from '../../hooks/useLanguage';

import { useLocations } from '../../service/locations/useLocations';

import { formatDate } from '../../util/helper';

import styles from './EpisodeGridItem.module.css';

function EpisodeGridItem({ episode }) {
  const { language, isKorean } = useLanguage();
  const { locations, isLoading } = useLocations();

  const date = formatDate(episode.published_at);

  if (isLoading)
    return (
      <LoaderFullLayout>
        <MiniLoader />
      </LoaderFullLayout>
    );

  const totalLocations = locations.filter(location => location.video_id === episode.id)?.length;

  return (
    <Link className={styles.episode} to={`/episode/${episode.id}`}>
      <img src={episode.thumbnail_url} />
      <div className={styles.content}>
        <h2 className={styles.title}>
          <span className="line-clamp line--2">{episode[`title_${language}`]}</span>
        </h2>
        <div className={styles.bottom}>
          <time className={styles.date}>📅 {date}</time>
          <span className={styles.total}>
            📍 {totalLocations}
            {isKorean ? '곳' : ' places'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default EpisodeGridItem;
