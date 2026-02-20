import { Link } from 'react-router-dom';

import { useLanguage } from '../../hooks/useLanguage';

import { formatDate } from '../../util/helper';

import styles from './EpisodeListItem.module.css';
import MiniLoader from '../MiniLoader';
import { useLocations } from '../../service/locations/useLocations';

function EpisodeListItem({ episode }) {
  const { language, isKorean } = useLanguage();
  const { locations, isLoading } = useLocations();

  const date = formatDate(episode.published_at);

  if (isLoading)
    return (
      <div className={styles.loading}>
        <MiniLoader />
      </div>
    );

  const totalLocations = locations.filter(location => location.video_id === episode.id)?.length;

  return (
    <li>
      <Link className={styles.episode} to={`/episode/${episode.id}`}>
        <img className={styles.thumb} src={episode.thumbnail_url} />
        <div className={styles.column}>
          <h2 className={styles.title}>
            <span className="line-clamp line--2">{episode[`title_${language}`]}</span>
          </h2>
          <div className={styles.row}>
            <time className={styles.date}>
              <span>📅&nbsp;</span>
              <span>{date}</span>
            </time>
            <span className={styles.total}>
              📍 {totalLocations}
              {isKorean ? '곳' : ' places'}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default EpisodeListItem;
