import PageTitle from '../../components/PageTitle';
import ListTypeSetting from '../../components/settings/ListTypeSetting';

import styles from './EpisodeHeaderLayout.module.css';

function EpisodeHeaderLayout({ emoji, title_ko, title_en, selectedType, onSelectType }) {
  return (
    <header className={styles.header}>
      <PageTitle emoji={emoji} title_ko={title_ko} title_en={title_en} />
      <ListTypeSetting selectedType={selectedType} onSelectType={onSelectType} />
    </header>
  );
}

export default EpisodeHeaderLayout;
