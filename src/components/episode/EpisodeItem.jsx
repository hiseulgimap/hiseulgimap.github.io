import { useLanguage } from '../../hooks/useLanguage';
import { useLocations } from '../../service/locations/useLocations';
import { formatDate } from '../../util/helper';

function EpisodeItem({ episode }) {
  const { language, isKorean } = useLanguage();
  const { locations, isLoading } = useLocations();

  const date = formatDate(episode.published_at);

  if (isLoading)
    return (
      <LoaderFullLayout>
        <MiniLoader />
      </LoaderFullLayout>
    );

  const totalLocations = locations.filter(location => location.video_id === episode.id)?.length;

  return <div></div>;
}

export default EpisodeItem;
