import {DefaultError, useMutation, UseMutationOptions, useQueryClient} from '@tanstack/react-query';
import {apiClient} from '@shared/api/client';
import useToast from '@shared/hooks/useToast';
import {QUERY_KEY_MAP} from '@shared/constants/queryKeyMap';
import {useTranslation} from 'react-i18next';

export const useDeleteTodoMutation = (
  options: Pick<UseMutationOptions<unknown, DefaultError, string>, 'onSuccess' | 'onError'> = {}
) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {t} = useTranslation('todos');
  const {onSuccess, onError} = options;

  return useMutation({
    mutationFn: async (todoId: string) => await apiClient.delete(`/api/todo/${todoId}`),
    onSuccess: async (data, variables, context) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: [QUERY_KEY_MAP.TODOS]}),
        onSuccess?.(data, variables, context),
      ]);
    },
    onError: (error, variables, context) => {
      toast.error(t('errors.deleteError'));
      onError?.(error, variables, context);
    },
  });
};
