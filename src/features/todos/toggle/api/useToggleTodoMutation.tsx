import {useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '@entities/Todo/model';
import {ToggleCompleteParams} from '../model';
import useToast from '@shared/hooks/useToast';
import {QUERY_KEY_MAP} from '@shared/constants/queryKeyMap';
import {useTranslation} from 'react-i18next';

const toggleTodo = async ({todoId, completed}: ToggleCompleteParams): Promise<Todo> => {
  const url = completed ? `/api/todo/${todoId}/incomplete` : `/api/todo/${todoId}/complete`;
  const response = await apiClient.post(url);
  return response.data;
};

export const useToggleTodoMutation = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {t} = useTranslation('todos');

  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: [QUERY_KEY_MAP.TODOS]}),
        queryClient.invalidateQueries({queryKey: [QUERY_KEY_MAP.TODO, variables.todoId]}),
      ]);
    },
    onError: () => {
      toast.error(t('errors.toggleError'));
    },
  });
};
