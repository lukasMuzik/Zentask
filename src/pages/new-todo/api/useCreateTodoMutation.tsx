import {useMutation} from '@tanstack/react-query';
import {useNavigate} from '@tanstack/react-router';
import {apiClient} from '../../../shared/api/client';
import {AxiosError} from 'axios';
import {useToast} from '@chakra-ui/react';
import {Todo} from '../../../entities/Todo/model';
import {TodoFormInputs} from '../../../widgets/forms/TodoForm';

export const useCreateTodoMutation = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoData: TodoFormInputs): Promise<Todo> => {
      const response = await apiClient.post<Todo>('/api/todo', todoData);
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
