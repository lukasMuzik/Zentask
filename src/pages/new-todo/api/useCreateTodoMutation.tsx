import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '@entities/Todo/model';
import {TodoFormInputs} from '@widgets/forms/TodoForm';
import useToast from '@shared/hooks/useToast';

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoData: TodoFormInputs): Promise<Todo> => {
      const response = await apiClient.post<Todo>('/api/todo', todoData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: () => {
      toast.error('createTodo error');
    },
  });
};
