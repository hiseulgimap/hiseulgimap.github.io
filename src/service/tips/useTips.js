import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchTips } from '../../api/apiTip';

export function useTips(id) {
  const { locationId } = useParams();

  const selectedId = id ?? locationId;

  const { data: tips, isLoading } = useQuery({
    queryKey: ['tips', selectedId],
    queryFn: () => fetchTips(selectedId),
  });

  return { tips, isLoading };
}
