import {useQuery} from '@tanstack/react-query';
import {checkAndRefreshAuth} from '../checkAndRefreshAuth';
import {QUERY_KEY_MAP} from '@shared/api/queryKeyMap';

export const useAuthQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY_MAP.AUTH],
    queryFn: checkAndRefreshAuth,
    staleTime: Infinity,
    retry: false,
  });
