import { useLanguage } from '../hooks/useLanguage';

import styles from './PageTitle.module.css';

function PageTitle({ emoji, title_ko, title_en }) {
  const { isKorean } = useLanguage();
  const title = isKorean ? title_ko : title_en;

  return (
    <h1 className={styles.title}>
      {emoji && <>{emoji}&nbsp;</>}
      {title}
    </h1>
  );
}

export default PageTitle;
