import { useSearchParams } from 'react-router-dom';

import LocationItem from './LocationItem';
import MiniLoader from '../MiniLoader';
import NoResult from '../NoResult';

import { useLanguage } from '../../hooks/useLanguage';

import { LOCATION_PAGE_SIZE } from '../../util/constants';

import styles from './Location.module.css';

function Location({ locations, isLoading }) {
  const { isKorean } = useLanguage();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const title = isKorean ? '결과가 없습니다' : 'No results found';
  const content = isKorean ? '자료가 순차적으로 추가될 예정입니다' : 'More content will be added over time';

  if (isLoading) return <MiniLoader />;

  if (!locations?.length) return <NoResult emoji="🔍" title={title} content={content} />;

  return (
    <ul key={`${searchParams.get('category')} ${page}`} className={styles.list}>
      {locations.map((location, i) => (
        <LocationItem key={location.id} order={LOCATION_PAGE_SIZE * (page - 1) + (i + 1)} location={location} />
      ))}
    </ul>
  );
}

export default Location;
