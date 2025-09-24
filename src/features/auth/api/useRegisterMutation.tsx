import {useMutation} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {AuthFormInputs, AuthResponse} from '../model';

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (credentials: AuthFormInputs): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/api/register', credentials);
      return response.data;
    },
  });
