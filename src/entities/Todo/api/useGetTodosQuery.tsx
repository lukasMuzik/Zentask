import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {TodosResponse} from '../model';

export const useGetTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<TodosResponse> => {
      const response = await apiClient.get<TodosResponse>('/api/todo/list');
      return response.data;
    },
  });
