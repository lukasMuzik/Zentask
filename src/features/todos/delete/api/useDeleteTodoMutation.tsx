import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import useToast from '@shared/hooks/useToast';

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: async (todoId: string) => {
      const response = await apiClient.delete(`/api/todo/${todoId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: () => {
      toast.error('error while deleting');
    },
  });
};
