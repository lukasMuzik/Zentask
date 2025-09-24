import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: async () => await apiClient.post('/api/logout'),
  });
