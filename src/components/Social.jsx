import { useLanguage } from '../hooks/useLanguage';

import SocialItem from './SocialItem';

import styles from './Social.module.css';

function Social() {
  const { isKorean } = useLanguage();

  return (
    <section id={styles.social}>
      <h1 className={styles.title}>{isKorean ? '소셜 링크' : 'Follow Seulgi'}</h1>
      <div className={styles.grid}>
        <SocialItem href="https://youtube.com/@hi_sseulgi_" emoji="💛" title="HiSeulgi" />
        <SocialItem href="https://instagram.com/hi_sseulgi" emoji="🐻" title="Seulgi" />
        <SocialItem href="https://instagram.com/hiseulgi_youtube" emoji="🎨" title="HiSeulgi OOTD" />
      </div>
    </section>
  );
}

export default Social;
