import {VStack, Text, Divider} from '@chakra-ui/react';
import {Todo} from '../api/useTodosQuery';
import {TodoItem} from './TodoItem';

interface TodoListProps {
  title: string;
  todoItems: Todo[];
}

export function TodoList({title, todoItems}: TodoListProps) {
  if (todoItems.length === 0) {
    return null;
  }

  return (
    <VStack align="stretch" spacing="1rem">
      <Text fontSize="heading.4" fontWeight="heading.3" color="text-primary">
        {title}
      </Text>

      <Divider borderColor="fill-gray-lightest" />

      <VStack align="stretch" spacing="0.75rem">
        {todoItems.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </VStack>
    </VStack>
  );
}
