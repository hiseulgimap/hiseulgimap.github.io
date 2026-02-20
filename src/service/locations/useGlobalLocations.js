// import { useQuery } from '@tanstack/react-query';

// import { fetchGlobalLocations } from '../../api/apiLocation';

// export function useGlobalLocations() {
//   const { data: globals, isLoading } = useQuery({
//     queryKey: ['globals'],
//     queryFn: fetchGlobalLocations,
//   });

//   return { globals, isLoading };
// }

import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchGlobalLocations } from '../../api/apiLocation';

import { LOCATION_PAGE_SIZE } from '../../util/constants';

export function useGlobalLocations() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const currentCategory = !searchParams.get('category') ? 'all' : searchParams.get('category');
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const country = !searchParams.get('countries') ? 'all' : searchParams.get('countries');
  const cities = !searchParams.getAll('cities').length ? ['all'] : searchParams.getAll('cities')?.at(0).split(',');

  const { data, isLoading } = useQuery({
    queryKey: ['globals', page, currentCategory, country, cities],
    queryFn: () => fetchGlobalLocations({ page, currentCategory, country, cities }),
  });

  const pageCount = Math.ceil(data?.count / LOCATION_PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['globals', page + 1, currentCategory, country, cities],
      queryFn: () => fetchGlobalLocations({ page: page + 1, currentCategory, country, cities }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['globals', page - 1, currentCategory, country, cities],
      queryFn: () => fetchGlobalLocations({ page: page - 1, currentCategory, country, cities }),
    });

  return { globals: data?.locations, isLoading, count: data?.count };
}
