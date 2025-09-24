import {useParams, useNavigate} from '@tanstack/react-router';
import {useGetTodoQuery} from '../../entities/Todo/api/useGetTodoQuery';
import {useToggleTodoMutation} from '../../features/todos/toggle/api/useToggleTodoMutation';
import {useDeleteTodoMutation} from '../../features/todos/delete/api/useDeleteTodoMutation';
import {Box, Text, VStack, HStack, Spinner, Flex, Center} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {Checkbox} from '@ui/Checkbox';
import {BackwardsIcon} from '../../shared/assets/icons';
import {DetailActions} from './ui/DetailActions';
import {DetailSection} from './ui/DetailSection';
import {match, P} from 'ts-pattern';

export const TodoDetailPage = () => {
  const {todoId} = useParams({from: '/_authenticated/detail/$todoId'});
  const {data: todo, isLoading} = useGetTodoQuery(todoId);
  const toggleTodoMutation = useToggleTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();
  const navigate = useNavigate();

  const handleToggleComplete = () => {
    if (todo) {
      toggleTodoMutation.mutate({todoId: todo.id, completed: todo.completed});
    }
  };

  const handleEdit = () => {
    navigate({to: `/edit/$todoId`, params: {todoId}});
  };

  const handleDelete = () => {
    if (todo) {
      deleteTodoMutation.mutate(todo.id);
      navigate({to: '/'});
    }
  };

  const handleBack = () => {
    navigate({to: '/'});
  };

  return match({isLoading, todo})
    .with({isLoading: true}, () => (
      <Center minH="400px">
        <Spinner size="lg" />
      </Center>
    ))
    .with({todo: P.nullish}, () => (
      <Center minH="400px">
        <Text color="red.500">Task is not found.</Text>
      </Center>
    ))
    .with({todo: P.not(P.nullish)}, ({todo}) => (
      <Box>
        <Flex as="header" align="center" gap="1.5rem" mb="2rem">
          <Button onClick={handleBack} iconOnly={<BackwardsIcon />} variant="secondary" />
          <Text fontSize="heading.2" fontWeight="heading.1">
            {todo.title}
          </Text>
        </Flex>

        <VStack spacing="6" align="stretch">
          <DetailSection title="Popis">
            <Text fontSize="md" color="text-secondary" lineHeight="1.6" whiteSpace="pre-wrap">
              {todo.description}
            </Text>
          </DetailSection>

          <DetailSection title="Stav">
            <HStack spacing="3">
              <Checkbox isChecked={todo.completed} onChange={handleToggleComplete} />
              <Text color="text-secondary">{todo.completed ? 'Dokončeno' : 'Nedokončeno'}</Text>
            </HStack>
          </DetailSection>

          <DetailActions onEdit={handleEdit} onDelete={handleDelete} />
        </VStack>
      </Box>
    ))
    .exhaustive();
};
