import {useQuery} from '@tanstack/react-query';
import {checkAndRefreshAuth} from '../checkAndRefreshAuth';

export const useAuthQuery = () =>
  useQuery({
    queryKey: ['auth'],
    queryFn: checkAndRefreshAuth,
    staleTime: Infinity,
    retry: false,
  });
