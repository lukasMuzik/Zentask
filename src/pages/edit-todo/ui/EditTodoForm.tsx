import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEditTodoMutation} from '../api/useEditTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '@widgets/forms/TodoForm';
import {EditTodoFormProps} from '../model';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';

export function EditTodoForm(props: EditTodoFormProps) {
  const {goHome} = useNavigation();
  const {t} = useTranslation('todos');

  const formApi = useForm<TodoFormInputs>({
    resolver: yupResolver(todoFormInputsSchema),
    defaultValues: props,
  });

  const editTodoMutation = useEditTodoMutation({
    onSuccess: goHome,
  });

  const onSubmit: SubmitHandler<TodoFormInputs> = (data) => {
    editTodoMutation.mutate({todoId: props.todoId, data});
  };

  return (
    <TodoForm
      formApi={formApi}
      onSubmit={onSubmit}
      secondaryButtonText={t('actions.discardChanges')}
      submitButtonText={t('actions.saveChanges')}
    />
  );
}
