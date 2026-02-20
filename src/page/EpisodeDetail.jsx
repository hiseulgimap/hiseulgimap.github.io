import Breadcrumb from '../components/BreadCrumb';
import EpisodeArticle from '../components/episode/EpisodeArticle';

import { useEpisode } from '../service/episodes/useEpisode';

function EpisodeDetail() {
  const { episode, isLoading } = useEpisode();

  if (isLoading) return null;

  return (
    <>
      <Breadcrumb label_ko={episode.title_ko} label_en={episode.title_en} />
      <EpisodeArticle />
    </>
  );
}

export default EpisodeDetail;
