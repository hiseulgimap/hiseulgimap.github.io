import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchEpisodes } from '../../api/apiEpisode';

import { EPISODE_PAGE_SIZE } from '../../util/constants';

export function useEpisodes() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { data, isLoading } = useQuery({
    queryKey: ['episodes', page],
    queryFn: () => fetchEpisodes({ page }),
  });
  const pageCount = Math.ceil(data?.count / EPISODE_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['episodes', page + 1],
      queryFn: () => fetchEpisodes({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['episodes', page - 1],
      queryFn: () => fetchEpisodes({ page: page - 1 }),
    });

  return { episodes: data?.episodes, isLoading, count: data?.count };
}
