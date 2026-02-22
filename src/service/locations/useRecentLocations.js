import { useQuery } from '@tanstack/react-query';

import { fetchRecentLocations } from '../../api/apiLocation';

export function useRecentLocations() {
  const { data: recentLocations, isLoading } = useQuery({
    queryKey: ['recent_locations'],
    queryFn: fetchRecentLocations,
  });

  return { recentLocations, isLoading };
}
