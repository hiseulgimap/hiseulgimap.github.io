import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchLocation } from '../../api/apiLocation';

export function useLocation() {
  const { locationId } = useParams();

  const { data: location, isLoading } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => fetchLocation(locationId),
  });

  return { location, isLoading };
}
