import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '../../../shared/api/client';
import {Todo} from '../../../entities/Todo';
import {ToggleCompleteParams} from '../model';

const toggleTodo = async ({todoId, completed}: ToggleCompleteParams): Promise<Todo> => {
  const endpoint = completed ? `/api/todo/${todoId}/incomplete` : `/api/todo/${todoId}/complete`;

  const response = await apiClient.post(endpoint);
  return response.data;
};

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Failed to toggle todo completion:', error);
    },
  });
};
