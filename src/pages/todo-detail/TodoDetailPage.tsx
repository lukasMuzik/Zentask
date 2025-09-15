import {useParams, useNavigate} from '@tanstack/react-router';
import {useGetTodoQuery} from '../edit-todo/api/useGetTodoQuery';
import {useToggleTodoMutation} from '../todos/api/useToggleTodoMutation';
import {useDeleteTodoMutation} from '../todos/api/useDeleteTodoMutation';
import {Box, Text, VStack, HStack, Spinner, Flex} from '@chakra-ui/react';
import {Button} from '@ui/Button';
import {Checkbox} from '@ui/Checkbox';
import {EditIcon, DeleteIcon, BackwardsIcon} from '../../shared/assets/icons';

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

  if (isLoading || !todo) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box>
      <Flex as="header" align="center" gap="1.5rem" mb="2rem">
        <Button onClick={handleBack} iconOnly={<BackwardsIcon />} variant="secondary" />

        <Text fontSize="heading.2" fontWeight="heading.1">
          {todo.title}
        </Text>
      </Flex>

      <VStack spacing="6" align="stretch">
        <VStack align="stretch" spacing="3">
          <Text fontSize="lg" fontWeight="medium" color="text-primary">
            Popis
          </Text>

          <Text fontSize="md" color="text-secondary" lineHeight="1.6" whiteSpace="pre-wrap">
            {todo.description}
          </Text>
        </VStack>

        <VStack align="stretch" spacing="3">
          <Text fontSize="lg" fontWeight="medium" color="text-primary">
            Stav
          </Text>

          <HStack spacing="3">
            <Checkbox isChecked={todo.completed} onChange={handleToggleComplete} />

            <Text color="text-secondary">{todo.completed ? 'Dokončeno' : 'Nedokončeno'}</Text>
          </HStack>
        </VStack>

        <HStack spacing="4" pt="4">
          <Button leftIcon={<EditIcon />} variant="primary" onClick={handleEdit}>
            Upravit úkol
          </Button>

          <Button leftIcon={<DeleteIcon />} variant="secondary" onClick={handleDelete}>
            Smazat úkol
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
