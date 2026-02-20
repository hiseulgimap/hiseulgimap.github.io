import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchLocationsByEpisode } from '../../api/apiLocation';

export function useLocationsByEpisode() {
  const { episodeId } = useParams();

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations', episodeId],
    queryFn: () => fetchLocationsByEpisode(episodeId),
  });

  return { locations, isLoading };
}
