import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {useNavigate} from '@tanstack/react-router';
import {Todo} from '../../../entities/Todo/model';
import {TodoFormInputs} from '@widgets/forms/TodoForm';

export const useEditTodoMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({todoId, data}: {todoId: string; data: TodoFormInputs}): Promise<Todo> => {
      const response = await apiClient.put<Todo>(`/api/todo/${todoId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
      navigate({to: '/'});
    },
    onError: (error) => {
      console.error('Chyba při aktualizaci todo:', error);
    },
  });
};
