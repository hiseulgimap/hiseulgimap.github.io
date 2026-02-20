import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchDomesticLocations, fetchGlobalLocations } from '../../api/apiLocation';
import { LOCATION_PAGE_SIZE } from '../../util/constants';

export function useLocationsByCategory() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const currentCategory = !searchParams.get('category') ? 'all' : searchParams.get('category');
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');
  const cities = !searchParams.getAll('cities').length ? ['all'] : searchParams.getAll('cities')?.at(0).split(',');

  const fn = category === 'korea' ? fetchDomesticLocations : fetchGlobalLocations;

  const { data, isLoading } = useQuery({
    queryKey: ['locations', category, page, currentCategory, cities],
    queryFn: () => fn({ page, currentCategory, cities }),
  });

  const pageCount = Math.ceil(data?.count / LOCATION_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['locations', category, page + 1, currentCategory, cities],
      queryFn: () => fn({ page: page + 1, currentCategory, cities }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['locations', category, page - 1, currentCategory, cities],
      queryFn: () => fn({ page: page - 1, currentCategory, cities }),
    });

  return { locations: data?.locations, isLoading, count: data?.count };
}
