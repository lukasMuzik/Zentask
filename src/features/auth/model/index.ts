import * as yup from 'yup';
import i18n from '../../../i18n/i18n';

export const authSchema = yup.object({
  username: yup
    .string()
    .required(i18n.t('auth:authForm.validation.username.required'))
    .min(3, i18n.t('auth:authForm.validation.username.min', {count: 3}))
    .max(12, i18n.t('auth:authForm.validation.username.max', {count: 12})),
  password: yup
    .string()
    .required(i18n.t('auth:authForm.validation.password.required'))
    .min(6, i18n.t('auth:authForm.validation.password.min', {count: 6}))
    .max(15, i18n.t('auth:authForm.validation.password.max', {count: 15})),
});

export type AuthFormInputs = yup.InferType<typeof authSchema>;

export const authResponseSchema = yup.object({
  accessToken: yup
    .string()
    .required(i18n.t('auth:authResponse.validation.accessToken.required'))
    .min(3, i18n.t('auth:authResponse.validation.accessToken.min', {count: 3}))
    .max(50, i18n.t('auth:authResponse.validation.accessToken.max', {count: 50})),
});

export type AuthResponse = yup.InferType<typeof authResponseSchema>;
