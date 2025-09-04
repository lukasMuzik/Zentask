import {useMutation} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {apiClient} from '../../../shared/api/client';
import {AxiosError} from 'axios';
import {NewTodoFormData, CreateTodoResponse} from '../model/schema';
import {useToast} from '@chakra-ui/react';

export const useCreateTodoMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoData: NewTodoFormData): Promise<CreateTodoResponse> => {
      const response = await apiClient.post<CreateTodoResponse>('/api/todo', todoData);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        duration: 3000,
        isClosable: true,
      });
      navigate({to: '/'});
    },
    onError: (
      error: AxiosError<{
        error: string;
      }>
    ) => {
      console.error('Vytvoření úkolu selhalo:', error.response?.data?.error || error.message);
    },
  });
};
