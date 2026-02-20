import { Link, useLocation } from 'react-router-dom';

import { useLanguage } from '../hooks/useLanguage';
import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './Breadcrumb.module.css';

function Breadcrumb({ label_ko, label_en }) {
  let crumbs;

  const { pathname } = useLocation();
  const { language, isKorean, isEnglish } = useLanguage();

  const [is770] = useMediaQuery('(max-width: 48.125rem)');
  const [is600] = useMediaQuery('(max-width: 40rem)');
  const [is580] = useMediaQuery('(max-width: 36.25rem)');
  const [is520] = useMediaQuery('(max-width: 32.5rem)');
  const [is490] = useMediaQuery('(max-width: 30.625rem)');
  const [is460] = useMediaQuery('(max-width: 28.75rem)');
  const [is400] = useMediaQuery('(max-width: 25rem)');

  function formatTextLength(condition, string, maxLength) {
    if (condition && string.length > maxLength) return string.slice(0, maxLength - 5).trim() + '...';
    else return string;
  }

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const label = { korea: { ko: '국내 지도', en: 'Map in Korea' }, global: { ko: '해외 지도', en: 'Global Maps' }, episode: { ko: '에피소드별 지도', en: 'Episode Maps' } };

  const ONE_DEPTH = ['korea', 'global', 'episode', 'youtube', 'feedback', 'guide'];

  if (segments.at(0) !== 'youtube')
    crumbs = segments.map(segment => {
      let obj;

      if (ONE_DEPTH.includes(segment)) obj = { slug: segment, level: 1, label_ko: label[segment].ko, label_en: label[segment].en };

      if (!ONE_DEPTH.includes(segment)) obj = { slug: segment, level: 2, label_ko, label_en };

      return obj;
    });

  if (segments.at(0) === 'youtube') crumbs = [{ slug: segments.at(-1), level: 2, label_ko, label_en }];

  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      <Link to="/" className={styles.link}>
        {isKorean ? '홈 화면' : 'Home'}
      </Link>
      {crumbs.map((crumb, index) => {
        let label = crumb[`label_${language}`];
        const isLast = index === crumbs.length - 1;

        if (pathname.includes('episode')) {
          if (is770 && isEnglish) label = formatTextLength(is770, label, 85);
          if (is600 && isEnglish) label = formatTextLength(is600, label, 65);
          if (is580 && isKorean) label = formatTextLength(is580, label, 40);
          if (is520 && isEnglish) label = formatTextLength(is520, label, 55);
          if (is490 && isKorean) label = formatTextLength(is490, label, 26);
          if (is460 && isEnglish) label = formatTextLength(is460, label, 45);
          if (is400 && isEnglish) label = formatTextLength(is400, label, 29);
          if (is400 && isKorean) label = formatTextLength(is400, label, 15);
        }
        return (
          <span key={crumb.slug} className={styles.item}>
            <span className={styles.separator}>/</span>
            {isLast ? (
              <span className={styles.current}>{label}</span>
            ) : (
              <Link to={`/${crumb.slug}`} className={styles.link}>
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
