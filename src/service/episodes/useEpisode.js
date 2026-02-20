import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchEpisode } from '../../api/apiEpisode';

export function useEpisode() {
  const { episodeId } = useParams();

  const { data: episode, isLoading } = useQuery({
    queryKey: ['episode', episodeId],
    queryFn: () => fetchEpisode(episodeId),
  });

  return { episode, isLoading };
}
