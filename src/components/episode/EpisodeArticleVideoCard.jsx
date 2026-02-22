import { useLanguage } from '../../hooks/useLanguage';

import { formatDate } from '../../util/helper';

import styles from './EpisodeArticleVideoCard.module.css';

function EpisodeArticleVideoCard({ episode, countries }) {
  const { language } = useLanguage();

  return (
    <div className={styles.card}>
      <div className={styles.video}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${episode.youtube_id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.content}>
        <div className={styles['pill-row']}>
          <ul>
            <li>
              <span className={styles.emoji}>{episode.emoji}</span>
            </li>
            {countries?.map(country => (
              <li key={country.country_flag} className={styles.pill}>
                {country.country_flag} {country[`country_${language}`]}
              </li>
            ))}
          </ul>
        </div>
        <h1 className={styles.title}>
          <span className="line-clamp line--2">{episode[`title_${language}`]}</span>
        </h1>
        <time className={styles.date}>{formatDate(episode.published_at)}</time>
      </div>
    </div>
  );
}

export default EpisodeArticleVideoCard;
