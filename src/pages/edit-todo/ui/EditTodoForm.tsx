import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigate} from '@tanstack/react-router';
import {useEditTodoMutation} from '../api/useEditTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '../../../widgets/TodoForm';
import {EditTodoFormProps} from '../model/schema';

export function EditTodoForm(props: EditTodoFormProps) {
  const navigate = useNavigate();
  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
    defaultValues: props,
  });

  const editTodoMutation = useEditTodoMutation();

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    editTodoMutation.mutate({todoId: props.todoId, data});
  };

  const handleNavigateToTodos = () => navigate({to: '/'});

  return (
    <TodoForm
      formApi={formApi}
      onSubmit={onSubmit}
      handleNavigateToTodos={handleNavigateToTodos}
      secondaryButtonText="Discard changes"
      submitButtonText="Save changes"
    />
  );
}
