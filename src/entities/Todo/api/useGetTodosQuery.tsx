import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {TodosResponse} from '../model';
import {QUERY_KEY_MAP} from '@shared/constants/queryKeyMap';

export const useGetTodosQuery = () =>
  useQuery({
    queryKey: [QUERY_KEY_MAP.TODOS],
    queryFn: async (): Promise<TodosResponse> => {
      const response = await apiClient.get<TodosResponse>('/api/todo/list');
      return response.data;
    },
  });
