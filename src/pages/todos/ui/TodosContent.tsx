import {Center, Spinner, Text, VStack} from '@chakra-ui/react';
import {useGetTodosQuery} from '@entities/Todo/api/useGetTodosQuery';
import {partition} from 'ramda';
import {TodoList} from './TodoList';
import {match} from 'ts-pattern';
import {TasksFinished} from './TasksFinished';

export function TodosContent() {
  const {data, isLoading, isError} = useGetTodosQuery();

  const todos = data?.todos || [];
  const [completed, incompleted] = partition((todo) => todo.completed, todos);

  return match({isLoading, isError, todosLength: todos.length})
    .with({isLoading: true}, () => (
      <Center>
        <Spinner size="xl" />
      </Center>
    ))
    .with({isError: true}, () => (
      <Center h="100vh">
        <Text color="red.500">Error occurred while loading tasks.</Text>
      </Center>
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
