import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '../../api/apiLocation';

export function useLocations() {
  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  return { locations, isLoading };
}
