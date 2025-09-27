import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from '@tanstack/react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateTodoMutation} from '../api/useCreateTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '@widgets/forms/TodoForm';

export function NewTodoForm() {
  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
  });
  const navigate = useNavigate();
  const handleNavigateToTodos = () => navigate({to: '/'});
  const createTodoMutation = useCreateTodoMutation({onSuccess: handleNavigateToTodos});

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <TodoForm
      formApi={formApi}
      onSubmit={onSubmit}
      handleNavigateToTodos={handleNavigateToTodos}
      secondaryButtonText="Discard"
      submitButtonText="Create task"
    />
  );
}
