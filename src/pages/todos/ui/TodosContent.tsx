import {VStack} from '@chakra-ui/react';
import {useGetTodosQuery} from '@entities/Todo/api/useGetTodosQuery';
import {partition} from 'ramda';
import {TodoList} from './TodoList';
import {match} from 'ts-pattern';
import {TasksFinished} from './TasksFinished';
import {Error} from '@ui/Error';
import {Spinner} from '@ui/Spinner';

export function TodosContent() {
  const {data, isLoading, isError, refetch} = useGetTodosQuery();

  const todos = data?.todos || [];
  const [completed, incompleted] = partition((todo) => todo.completed, todos);

  return match({
    isLoading,
    isError,
    todosLength: todos.length,
  })
    .with({isLoading: true}, () => <Spinner />)
    .with({isError: true}, () => (
      <Error message="Unexpected error" action={{label: 'Try again', onClick: refetch}} />
    ))
    .with({todosLength: 0}, () => <TasksFinished />)
    .otherwise(() => (
      <VStack align="stretch" w="full" spacing="2rem">
        {match(incompleted.length)
          .with(0, () => <TasksFinished />)
          .otherwise(() => (
            <TodoList title="To-do" todoItems={incompleted} />
          ))}

        <TodoList title="Completed" todoItems={completed} />
      </VStack>
    ));
}
