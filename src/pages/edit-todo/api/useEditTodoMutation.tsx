import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '@entities/Todo/model';
import {TodoFormInputs} from '@widgets/forms/TodoForm';
import useToast from '@shared/hooks/useToast';

export const useEditTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async ({todoId, data}: {todoId: string; data: TodoFormInputs}): Promise<Todo> => {
      const response = await apiClient.put<Todo>(`/api/todo/${todoId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: () => {
      toast.error('editTodo error');
    },
  });
};
