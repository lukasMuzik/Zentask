import {useParams} from '@tanstack/react-router';
import {useGetTodoQuery} from '@entities/Todo/api/useGetTodoQuery';
import {VStack} from '@chakra-ui/react';
import {EditTodoForm} from './EditTodoForm';
import {TodoFormHeader} from '@widgets/headers/TodoFormHeader';
import {Error} from '@ui/Error';
import {Spinner} from '@ui/Spinner';
import {match, P} from 'ts-pattern';
import {useTranslation} from 'react-i18next';

export function EditTodoContent() {
  const {todoId} = useParams({from: '/_authenticated/edit/$todoId'});
  const {data, isLoading, isError} = useGetTodoQuery(todoId);
  const {t} = useTranslation('todos');

  return match({isLoading, isError, data})
    .with({isLoading: true}, () => <Spinner />)
    .with({isError: true}, () => <Error message={t('messages.loadingError')} />)
    .with({data: P.nullish}, () => <Error message={t('messages.taskNotFound')} />)
    .with({data: P.not(P.nullish)}, (matched) => (
      <VStack w="full" align="stretch" spacing="2.5rem">
        <TodoFormHeader title={matched.data.title} handleBack={() => window.history.back()} />

        <EditTodoForm
          todoId={todoId}
          title={matched.data.title}
          description={matched.data.description}
        />
      </VStack>
    ))
    .exhaustive();
}
