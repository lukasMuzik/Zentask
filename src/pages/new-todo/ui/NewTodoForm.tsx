import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateTodoMutation} from '../api/useCreateTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '@widgets/forms/TodoForm';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export function NewTodoForm() {
  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
  });
  const {goHome} = useNavigation();
  const createTodoMutation = useCreateTodoMutation({onSuccess: goHome});
  const {t} = useTranslation('todos');

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <TodoForm
      formApi={formApi}
      onSubmit={onSubmit}
      secondaryButtonText={t('actions.discard')}
      submitButtonText={t('actions.createTask')}
    />
  );
}
