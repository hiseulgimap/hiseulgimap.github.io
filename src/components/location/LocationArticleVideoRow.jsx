import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../../hooks/useLanguage';

import { formatDate, formatTimestamp } from '../../util/helper';

import styles from './LocationArticleVideoRow.module.css';

function LocationArticleVideoRow({ location, onModalOpen, isSub = false }) {
  const navigate = useNavigate();
  const { language, isKorean } = useLanguage();

  const handleVideoRowClick = () => navigate(`/episode/${location.episodes.id}`);

  const handleTimestampClick = event => {
    event.stopPropagation();
    onModalOpen(true);
  };

  const className = isSub ? `${styles['video-row']} ${styles.sub}` : styles['video-row'];

  return (
    <section className={className}>
      <div className={styles['badge-wrap']}>
        <span className={styles['badge-primary']}>
          <span>▶</span>
          {isKorean ? '영상 등장 정보' : 'YouTube'}
        </span>
        <span className={styles['badge-tag']}>
          {location.categories.emoji} {location.categories[`category_${language}`]}
        </span>
      </div>
      <div className={styles.row} onClick={handleVideoRowClick}>
        <div className={styles['info-wrap']}>
          <img className={styles.thumb} src={location.episodes.thumbnail_url} />
          <div className={styles.info}>
            <h4 className={styles['info-title']}>
              <span className="line-clamp line--1">{location.episodes[`title_${language}`]}</span>
            </h4>
            <time className={styles['info-date']}>{formatDate(location.episodes.published_at)}</time>
          </div>
        </div>
        <button className={styles.timestamp} onClick={handleTimestampClick}>
          <span>▶</span> {formatTimestamp(location.start_at)}
        </button>
      </div>
      <p className={styles.text}>{isKorean ? '타임스탬프 버튼을 클릭하면 해당 장면부터 시청이 가능합니다' : 'Clicking the timestamp will take you to that moment in the footage'}</p>
    </section>
  );
}

export default LocationArticleVideoRow;
