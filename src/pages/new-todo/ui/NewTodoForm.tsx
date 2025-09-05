import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from '@tanstack/react-router';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateTodoMutation} from '../api/createTaskMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '../../../widgets/TodoForm';

export function NewTodoForm() {
  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
  });
  const navigate = useNavigate();
  const createTodoMutation = useCreateTodoMutation();

  const handleNavigateToTodos = () => navigate({to: '/'});

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
