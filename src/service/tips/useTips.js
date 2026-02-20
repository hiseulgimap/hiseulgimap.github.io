import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchTips } from '../../api/apiTip';

export function useTips() {
  const { locationId } = useParams();

  const { data: tips, isLoading } = useQuery({
    queryKey: ['tips', locationId],
    queryFn: () => fetchTips(locationId),
  });

  return { tips, isLoading };
}
