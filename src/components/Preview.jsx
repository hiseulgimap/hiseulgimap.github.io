import PreviewContainer from './PreviewContainer';

import { useLanguage } from '../hooks/useLanguage';

import styles from './Preview.module.css';

function Preview() {
  const { isKorean } = useLanguage();

  return (
    <div id={styles.preview}>
      <PreviewContainer />
    </div>
  );
}

export default Preview;
