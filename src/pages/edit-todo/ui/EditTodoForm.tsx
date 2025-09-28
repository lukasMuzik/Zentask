import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEditTodoMutation} from '../api/useEditTodoMutation';
import {TodoForm, TodoFormInputs, todoFormInputsSchema} from '@widgets/forms/TodoForm';
import {EditTodoFormProps} from '../model';
import {useNavigation} from '@shared/hooks/useNavigation';
import {useTranslation} from 'react-i18next';
import {useIsMobile} from '@shared/hooks/useIsMobile';

export function EditTodoForm(props: EditTodoFormProps) {
  const {goHome} = useNavigation();
  const {t} = useTranslation('todos');
  const isMobile = useIsMobile();

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
      secondaryButtonText={isMobile ? t('actions.discard') : t('actions.discardChanges')}
      submitButtonText={isMobile ? t('actions.save') : t('actions.saveChanges')}
      variant="edit"
    />
  );
}
