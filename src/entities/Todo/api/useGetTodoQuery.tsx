import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '../model';
import {QUERY_KEY_MAP} from '@shared/api/queryKeyMap';

export const useGetTodoQuery = (todoId: string) =>
  useQuery({
    queryKey: [QUERY_KEY_MAP.TODO, todoId],
    queryFn: async (): Promise<Todo> => {
      const response = await apiClient.get<Todo>(`/api/todo/${todoId}`);
      return response.data;
    },
    enabled: !!todoId,
  });
