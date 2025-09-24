import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '@entities/Todo/model';
import {ToggleCompleteParams} from '../model';
import useToast from '@shared/hooks/useToast';

const toggleTodo = async ({todoId, completed}: ToggleCompleteParams): Promise<Todo> => {
  const endpoint = completed ? `/api/todo/${todoId}/incomplete` : `/api/todo/${todoId}/complete`;
  const response = await apiClient.post(endpoint);
  return response.data;
};

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ['todos']});

      queryClient.invalidateQueries({queryKey: ['todo', variables.todoId]});
    },
    onError: () => {
      toast.error('error while toggle');
    },
  });
};
