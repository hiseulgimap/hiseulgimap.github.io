import { useQuery } from '@tanstack/react-query';

import { fetchCountries } from '../../api/apiCountry';

export function useCountries() {
  const { data: countries, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });

  return { countries, isLoading };
}
