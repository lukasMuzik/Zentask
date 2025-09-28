import * as yup from 'yup';
import {UseFormReturn} from 'react-hook-form';
import i18n from '../../../../i18n/i18n';

export const todoFormInputsSchema = yup.object({
  title: yup
    .string()
    .required(i18n.t('todos:forms.validation.title.required'))
    .min(3, i18n.t('todos:forms.validation.title.min', {count: 3}))
    .max(20, i18n.t('todos:forms.validation.title.max', {count: 20})),
  description: yup
    .string()
    .default('')
    .max(100, i18n.t('todos:forms.validation.description.max', {count: 100})),
});

export type TodoFormInputs = yup.InferType<typeof todoFormInputsSchema>;

export interface TodoFormProps {
  formApi: UseFormReturn<TodoFormInputs>;
  onSubmit: (data: TodoFormInputs) => void;
  submitButtonText: string;
  secondaryButtonText: string;
}
