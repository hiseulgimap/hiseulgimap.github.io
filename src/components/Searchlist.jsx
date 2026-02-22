import { useLanguage } from '../hooks/useLanguage';

import styles from './Searchlist.module.css';

function Searchlist({ count }) {
  const { isKorean } = useLanguage();

  return (
    <div className={styles.searchlist}>
      {isKorean ? (
        <>
          총 <span>{count}개</span>의 검색 결과
        </>
      ) : (
        <>
          Total <span>{count}</span> {count > 1 ? 'results' : 'result'}
        </>
      )}
    </div>
  );
}

export default Searchlist;
