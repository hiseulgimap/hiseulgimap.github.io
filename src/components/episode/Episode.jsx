import { useEpisodes } from '../../service/episodes/useEpisodes';

import EpisodeGridItem from './EpisodeGridItem';
import EpisodeListItem from './EpisodeListItem';

import styles from './Episode.module.css';

function Episode({ selectedType }) {
  const { episodes, isLoading } = useEpisodes();

  if (isLoading) return null;

  if (selectedType === 'grid')
    return (
      <ul key={'grid'} className={styles.grid}>
        {episodes.map(episode => (
          <EpisodeGridItem key={episode.id} episode={episode} />
        ))}
      </ul>
    );

  if (selectedType === 'list')
    return (
      <ul key={'list'} className={styles.list}>
        {episodes.map(episode => (
          <EpisodeListItem key={episode.id} episode={episode} />
        ))}
      </ul>
    );
}

export default Episode;
