import { useQuery } from '@tanstack/react-query';

import { fetchCities } from '../../api/apiCity';

import { useLanguage } from '../../hooks/useLanguage';

export function useCities() {
  const { language } = useLanguage();

  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: () => fetchCities(language),
  });

  return { cities, isLoading };
}
