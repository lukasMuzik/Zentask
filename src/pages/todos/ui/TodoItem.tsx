import {Text, Grid} from '@chakra-ui/react';
import {Checkbox} from '@ui/Checkbox';
import {OverflowMenu} from '@ui/OverflowMenu';
import {DeleteIcon, MoreIcon} from '../../../assets/icons';
import {Button} from '@ui/Button';
import {useToggleTodoMutation} from '../api/useToggleTodoMutation';
import {useDeleteTodoMutation} from '../api/useDeleteTodoMutation';
import {useNavigate} from '@tanstack/react-router';
import {TodoItemProps, ToggleCompleteParams} from '../model';

export function TodoItem({todo}: TodoItemProps) {
  const toggleTodoMutation = useToggleTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();
  const navigate = useNavigate();

  const handleToggleComplete = ({todoId, completed}: ToggleCompleteParams) => {
    toggleTodoMutation.mutate({todoId, completed});
  };

  const handleEdit = (todoId: string) => {
    navigate({to: `/edit/$todoId`, params: {todoId}});
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
    >
      <Checkbox
        isChecked={todo.completed}
        onChange={() => handleToggleComplete({todoId: todo.id, completed: todo.completed})}
      />

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
