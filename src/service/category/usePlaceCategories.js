import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchPlaceCategories } from '../../api/apiCategory';

export function usePlaceCategories() {
  const { category } = useParams();
  const mapType = category === 'korea' ? 'KR' : 'GLOBAL';

  const { data: placeCategories, isLoading } = useQuery({
    queryKey: ['categories', mapType],
    queryFn: () => fetchPlaceCategories(mapType),
  });

  return { placeCategories, isLoading };
}
