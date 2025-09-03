import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(12, 'Username must be less than 12 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be less than 15 characters'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

export const loginResponseSchema = yup.object({
  accessToken: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(12, 'Username must be less than 50 characters'),
  refreshToken: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be less than 100 characters'),
});

export type LoginResponse = yup.InferType<typeof loginResponseSchema>;
