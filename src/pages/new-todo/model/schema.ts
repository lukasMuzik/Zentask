import * as yup from 'yup';

export const newTodoSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(20, 'Title must be less than 20 characters'),
  description: yup.string().default('').max(100, 'Description must be less than 100 characters'),
});

export type NewTodoFormData = yup.InferType<typeof newTodoSchema>;

export const createTodoResponseSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  createdAt: yup.string().required(),
  completed: yup.boolean().required(),
  userId: yup.string().required(),
});

export type CreateTodoResponse = yup.InferType<typeof createTodoResponseSchema>;
