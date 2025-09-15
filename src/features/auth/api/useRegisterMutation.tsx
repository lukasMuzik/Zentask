import {useMutation} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {apiClient} from '../../../shared/api/client';
import {AxiosError} from 'axios';
import {AuthFormInputs, AuthResponse} from '../model';

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: AuthFormInputs): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/api/register', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);

      navigate({to: '/'});
    },
    // todo add error handling
    onError: (
      error: AxiosError<{
        error: string;
      }>
    ) => {
      console.error('Login failed:', error.response?.data?.error || error.message);
    },
  });
};
