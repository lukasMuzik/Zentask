import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '../../../../shared/api/client';
import {Todo} from '../../../../entities/Todo/model';
import {ToggleCompleteParams} from '../model';

const toggleTodo = async ({todoId, completed}: ToggleCompleteParams): Promise<Todo> => {
  const endpoint = completed ? `/api/todo/${todoId}/incomplete` : `/api/todo/${todoId}/complete`;

  const response = await apiClient.post(endpoint);
  console.log(response);
  return response.data;
};

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['todos']});

      queryClient.invalidateQueries({queryKey: ['todo', variables.todoId]});
    },
    onError: (error) => {
      console.error('Failed to toggle todo completion:', error);
    },
  });
};
