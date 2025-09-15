import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '../../../../shared/api/client';

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => {
      const response = await apiClient.delete(`/api/todo/${todoId}`);
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error) => {
      console.error('Failed to toggle todo completion:', error);
    },
  });
};
