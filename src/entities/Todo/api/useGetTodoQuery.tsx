import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '../model';

export const useGetTodoQuery = (todoId: string) =>
  useQuery({
    queryKey: ['todo', todoId],
    queryFn: async (): Promise<Todo> => {
      const response = await apiClient.get<Todo>(`/api/todo/${todoId}`);
      return response.data;
    },
    enabled: !!todoId,
  });
