import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchDomesticLocations } from '../../api/apiLocation';

import { LOCATION_PAGE_SIZE } from '../../util/constants';

export function useDomesticLocations() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const currentCategory = !searchParams.get('category') ? 'all' : searchParams.get('category');
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const cities = !searchParams.getAll('cities').length ? ['all'] : searchParams.getAll('cities')?.at(0).split(',');

  const { data, isLoading } = useQuery({
    queryKey: ['domestics', page, currentCategory, cities],
    queryFn: () => fetchDomesticLocations({ page, currentCategory, cities }),
  });

  const pageCount = Math.ceil(data?.count / LOCATION_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['domestics', page + 1, currentCategory, cities],
      queryFn: () => fetchDomesticLocations({ page: page + 1, currentCategory, cities }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['domestics', page - 1, currentCategory, cities],
      queryFn: () => fetchDomesticLocations({ page: page - 1, currentCategory, cities }),
    });

  return { domestics: data?.locations, isLoading, count: data?.count };
}
