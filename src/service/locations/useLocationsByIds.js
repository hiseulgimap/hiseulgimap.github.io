import { useQuery } from '@tanstack/react-query';

import { fetchLocationByIds } from '../../api/apiLocation';

export function useLocationsByIds(ids) {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations', ids],
    queryFn: () => fetchLocationByIds(ids),
  });

  return { locations, isLoading };
}
