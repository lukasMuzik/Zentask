import {Center, Spinner, Text, VStack} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';
import {useGetTodosQuery} from '../../../entities/Todo/api/useGetTodosQuery';
import {partition} from 'ramda';
import {TodoList} from './TodoList';

export function TodosContent() {
  const {data, isLoading, error} = useGetTodosQuery();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Chyba při načítání úkolů</Text>
      </Center>
    );
  }

  const todos = data?.todos || [];
  const [completed, incompleted] = partition((todo) => todo.completed, todos);

  if (todos.length === 0) {
    return (
      <Center>
        <VStack spacing="1rem">
          <Logo variant="double" />
          <VStack spacing="0.75rem">
            <Text fontSize="heading.3" fontWeight="heading.2" lineHeight="1.5rem">
              You are amazing!
            </Text>
            <Text color="text-tertiary">There is no more task to do.</Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack align="stretch" w="full" spacing="2rem">
      {/*todo ts-pattern*/}
      {incompleted.length === 0 ? (
        <Center>
          <VStack spacing="1rem">
            <Logo variant="double" />
            <VStack spacing="0.75rem">
              <Text fontSize="heading.3" fontWeight="heading.2" lineHeight="1.5rem">
                You are amazing!
              </Text>
              <Text color="text-tertiary">There is no more task to do.</Text>
            </VStack>
          </VStack>
        </Center>
      ) : (
        <TodoList title="To-do" todoItems={incompleted} />
      )}
      <TodoList title="Completed" todoItems={completed} />
    </VStack>
  );
}
