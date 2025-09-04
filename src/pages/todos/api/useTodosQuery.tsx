import {useQuery} from '@tanstack/react-query';
import {apiClient} from '../../../shared/api/client';

export type Todo = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  userId: string;
};

export type TodosResponse = {
  todos: Todo[];
};

export const useTodosQuery = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: async (): Promise<TodosResponse> => {
      const response = await apiClient.get<TodosResponse>('/api/todo/list');
      return response.data;
    },
  });
