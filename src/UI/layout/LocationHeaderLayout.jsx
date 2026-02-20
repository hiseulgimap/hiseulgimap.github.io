import Filter from '../../components/Filter';

import PageTitle from '../../components/PageTitle';

import styles from './LocationHeaderLayout.module.css';

function LocationHeaderLayout({ locations, emoji, title_ko, title_en }) {
  return (
    <header className={styles.header}>
      <PageTitle emoji={emoji} title_ko={title_ko} title_en={title_en} />
      {locations?.length > 0 && <Filter />}
    </header>
  );
}

export default LocationHeaderLayout;
