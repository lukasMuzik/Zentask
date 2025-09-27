import * as yup from 'yup';
import {UseFormReturn} from 'react-hook-form';

export const todoFormInputsSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(20, 'Title must be less than 20 characters'),
  description: yup.string().default('').max(100, 'Description must be less than 100 characters'),
});

export type TodoFormInputs = yup.InferType<typeof todoFormInputsSchema>;

export interface TodoFormProps {
  formApi: UseFormReturn<TodoFormInputs>;
  onSubmit: (data: TodoFormInputs) => void;
  submitButtonText: string;
  secondaryButtonText: string;
}
