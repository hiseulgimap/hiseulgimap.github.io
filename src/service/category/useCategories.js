import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '../../api/apiCategory';

export function useCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return { categories, isLoading };
}
