import {Text, Grid, Box} from '@chakra-ui/react';
import {OverflowMenu} from '@ui/OverflowMenu';
import {DeleteIcon, MoreIcon, EditIcon} from '@shared/assets/icons';
import {Button} from '@ui/Button';
import {useDeleteTodoMutation} from '@features/todos/delete/api/useDeleteTodoMutation';
import {TodoItemProps} from '../model';
import {ToggleCompleteCheckbox} from '@features/todos/toggle/ui/ToggleCompleteCheckbox';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export function TodoItem({todo}: TodoItemProps) {
  const deleteTodoMutation = useDeleteTodoMutation();
  const {goToEditTodo, goToTodoDetail} = useNavigation();
  const {t} = useTranslation('todos');

  const handleEdit = (todoId: string) => goToEditTodo(todoId);
  const handleViewDetail = (todoId: string) => goToTodoDetail(todoId);

  const handleDelete = (todoId: string) => {
    deleteTodoMutation.mutate(todoId);
  };

  return (
    <Grid
      templateColumns="auto 1fr auto"
      templateRows="auto auto"
      columnGap="1rem"
      alignItems="center"
      _hover={{cursor: 'pointer'}}
      onClick={() => handleViewDetail(todo.id)}
    >
      <Box onClick={(e) => e.stopPropagation()}>
        <ToggleCompleteCheckbox todoId={todo.id} completed={todo.completed} />
      </Box>

      <Text color="text-primary" fontSize="18px" fontWeight="heading.3" lineHeight="text.base">
        {todo.title}
      </Text>

      <OverflowMenu
        trigger={<Button iconOnly={<MoreIcon />} variant="textOnly" />}
        menuItems={[
          {
            label: t('actions.edit'),
            icon: <EditIcon />,
            onClick: () => handleEdit(todo.id),
          },
          {
            label: t('actions.delete'),
            icon: <DeleteIcon />,
            onClick: () => handleDelete(todo.id),
            variant: 'danger',
          },
        ]}
      />

      <Text gridColumn="2" fontSize="text.small" color="text-tertiary" lineHeight="1.4">
        {todo.description}
      </Text>
    </Grid>
  );
}
