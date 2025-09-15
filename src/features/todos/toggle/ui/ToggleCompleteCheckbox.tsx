import {useToggleTodoMutation} from '../api/useToggleTodoMutation';
import {ToggleCompleteCheckboxProps, ToggleCompleteParams} from '../model';
import {Checkbox} from '@ui/Checkbox';

export function ToggleCompleteCheckbox(props: ToggleCompleteCheckboxProps) {
  const toggleTodoMutation = useToggleTodoMutation();

  const handleToggleComplete = ({todoId, completed}: ToggleCompleteParams) => {
    toggleTodoMutation.mutate({todoId, completed});
  };

  return (
    <Checkbox
      isChecked={props.completed}
      onChange={() => handleToggleComplete({todoId: props.todoId, completed: props.completed})}
    />
  );
}
