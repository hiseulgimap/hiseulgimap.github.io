import { useLanguage } from '../../hooks/useLanguage';

import styles from './EpisodeArticleMapFilter.module.css';

function EpisodeArticleMapFilter({ curTab, onClick }) {
  const { isKorean } = useLanguage();

  return (
    <div>
      <button className={curTab === 'NAVER' ? `${styles.filter} ${styles.active}` : styles.filter} onClick={() => onClick('NAVER')}>
        🇰🇷 {isKorean ? '국내 지도' : 'Korea'}
      </button>
      <button className={curTab === 'GOOGLE' ? `${styles.filter} ${styles.active}` : styles.filter} onClick={() => onClick('GOOGLE')}>
        🌐 {isKorean ? '해외 지도' : 'Global'}
      </button>
    </div>
  );
}

export default EpisodeArticleMapFilter;
