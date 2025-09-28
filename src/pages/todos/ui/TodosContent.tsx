import {VStack} from '@chakra-ui/react';
import {useGetTodosQuery} from '@entities/Todo/api/useGetTodosQuery';
import {partition} from 'ramda';
import {TodoList} from './TodoList';
import {match} from 'ts-pattern';
import {TasksFinished} from './TasksFinished';
import {Error} from '@ui/Error';
import {Spinner} from '@ui/Spinner';
import {useTranslation} from 'react-i18next';

export function TodosContent() {
  const {data, isLoading, isError, refetch} = useGetTodosQuery();
  const {t} = useTranslation(['common', 'todos']);

  const todos = data?.todos || [];
  const [completed, incompleted] = partition((todo) => todo.completed, todos);

  return match({
    isLoading,
    isError,
    todosLength: todos.length,
  })
    .with({isLoading: true}, () => <Spinner />)
    .with({isError: true}, () => (
      <Error
        message={t('common:errors.unexpected')}
        action={{label: t('common:buttons.tryAgain'), onClick: refetch}}
      />
    ))
    .with({todosLength: 0}, () => <TasksFinished />)
    .otherwise(() => (
      <VStack align="stretch" w="full" spacing="2rem">
        {match(incompleted.length)
          .with(0, () => <TasksFinished />)
          .otherwise(() => (
            <TodoList title={t('todos:sections.todo')} todoItems={incompleted} />
          ))}

        <TodoList title={t('todos:sections.completed')} todoItems={completed} />
      </VStack>
    ));
}
