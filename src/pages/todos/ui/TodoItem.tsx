import {Text, Grid, Box} from '@chakra-ui/react';
import {OverflowMenu} from '@ui/OverflowMenu';
import {DeleteIcon, MoreIcon} from '../../../shared/assets/icons';
import {Button} from '@ui/Button';
import {useDeleteTodoMutation} from '../../../features/todos/delete/api/useDeleteTodoMutation';
import {useNavigate} from '@tanstack/react-router';
import {TodoItemProps} from '../model';
import {ToggleCompleteCheckbox} from '../../../features/todos/toggle/ui/ToggleCompleteCheckbox';

export function TodoItem({todo}: TodoItemProps) {
  const deleteTodoMutation = useDeleteTodoMutation();
  const navigate = useNavigate();

  const handleEdit = (todoId: string) => {
    navigate({to: `/edit/$todoId`, params: {todoId}});
  };

  const handleViewDetail = (todoId: string) => {
    navigate({to: `/detail/$todoId`, params: {todoId}});
  };

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
            label: 'Edit',
            icon: <MoreIcon />,
            onClick: () => handleEdit(todo.id),
          },
          {
            label: 'Delete',
            icon: <DeleteIcon />,
            onClick: () => handleDelete(todo.id),
          },
        ]}
      />

      <Text gridColumn="2" fontSize="text.small" color="text-tertiary" lineHeight="1.4">
        {todo.description}
      </Text>
    </Grid>
  );
}
