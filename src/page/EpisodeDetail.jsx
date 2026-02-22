import Breadcrumb from '../components/BreadCrumb';
import EpisodeArticle from '../components/episode/EpisodeArticle';
import EpisodeMobileArticle from '../components/episode/EpisodeMobileArticle';

import { useMediaQuery } from '../hooks/useMediaQuery';

import { useEpisode } from '../service/episodes/useEpisode';

function EpisodeDetail() {
  const { episode, isLoading } = useEpisode();
  const [isMobile] = useMediaQuery('(max-width: 48rem)');

  if (isLoading) return null;

  return (
    <>
      <Breadcrumb label_ko={episode.title_ko} label_en={episode.title_en} />
      {!isMobile ? <EpisodeArticle /> : <EpisodeMobileArticle />}
    </>
  );
}

export default EpisodeDetail;
