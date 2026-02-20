import { useState } from 'react';

import Episode from '../components/episode/Episode';
import Pagination from '../components/Pagination';

import EpisodeHeaderLayout from '../UI/layout/EpisodeHeaderLayout';

import { useLocalStorage } from '../hooks/useLocalStorage';

import { useEpisodes } from '../service/episodes/useEpisodes';

import { EPISODE_PAGE_SIZE } from '../util/constants';

function Episodes() {
  const [type] = useLocalStorage('grid', 'list');
  const [selectedType, setSelectedType] = useState(type);

  const { count, isLoading } = useEpisodes();

  return (
    <div>
      <EpisodeHeaderLayout title_ko="에피소드별 지도" title_en="Episode Maps" selectedType={selectedType} onSelectType={setSelectedType} />
      <Episode selectedType={selectedType} />
      {!isLoading && <Pagination count={count} size={EPISODE_PAGE_SIZE} />}
    </div>
  );
}

export default Episodes;
