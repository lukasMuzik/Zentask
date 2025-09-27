import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateTodoMutation} from '../api/useCreateTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '@widgets/forms/TodoForm';
import {useNavigation} from '@shared/hooks/useNavigation';

export function NewTodoForm() {
  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
  });
  const {goHome} = useNavigation();
  const createTodoMutation = useCreateTodoMutation({onSuccess: goHome});

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <TodoForm
      formApi={formApi}
      onSubmit={onSubmit}
      secondaryButtonText="Discard"
      submitButtonText="Create task"
    />
  );
}
