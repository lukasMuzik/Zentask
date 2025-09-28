import {DefaultError, useMutation, UseMutationOptions, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import {Todo} from '@entities/Todo/model';
import {TodoFormInputs} from '@widgets/forms/TodoForm';
import useToast from '@shared/hooks/useToast';
import {QUERY_KEY_MAP} from '@shared/constants/queryKeyMap';
import {useTranslation} from 'react-i18next';

export const useCreateTodoMutation = (
  options: Pick<
    UseMutationOptions<Todo, DefaultError, TodoFormInputs>,
    'onSuccess' | 'onError'
  > = {}
) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {t} = useTranslation('todos');
  const {onSuccess, onError} = options;

  return useMutation({
    mutationFn: async (todoData: TodoFormInputs): Promise<Todo> => {
      const response = await apiClient.post<Todo>('/api/todo', todoData);
      return response.data;
    },
    onSuccess: async (data, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: [QUERY_KEY_MAP.TODOS]}),
        onSuccess?.(data, variables, context),
      ]);
    },
    onError: (error, variables, context) => {
      toast.error(t('errors.createError'));
      onError?.(error, variables, context);
    },
  });
};
