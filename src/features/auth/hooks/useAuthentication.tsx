import {AuthFormInputs} from '../model';
import {useLoginMutation} from '../api/useLoginMutation';
import {useRegisterMutation} from '../api/useRegisterMutation';
import useToast from '@shared/hooks/useToast';
import axios from 'axios';
import {Error} from '@shared/api/types';
import {ERROR_CODES} from '@shared/api/errorCodes';
import {useAuth} from '@app/providers/AuthProvider/AuthProvider';
import {match} from 'ts-pattern';
import {useNavigation} from '@shared/hooks/useNavigation';

export const useAuthentication = () => {
  const {goHome} = useNavigation();
  const toast = useToast();
  const {login} = useAuth();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleAuthSuccess = async (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    login(accessToken);
    goHome();
  };

  const handleAuthError = (error: Error) => {
    match(error.response?.data?.error)
      .with(ERROR_CODES.USER_NOT_FOUND, () =>
        toast.error('User not found. Please check your credentials.')
      )
      .with(ERROR_CODES.INVALID_CREDENTIALS, () =>
        toast.error('Invalid credentials. Please check your credentials.')
      )
      .with(ERROR_CODES.USERNAME_TAKEN, () =>
        toast.error('Username is already taken. Please choose a different username.')
      )
      .otherwise(() => toast.error('Authentication failed. Please try again.'));
  };

  const authenticate = async (data: AuthFormInputs, variant: 'login' | 'register') => {
    try {
      const mutation = variant === 'login' ? loginMutation : registerMutation;
      const {accessToken} = await mutation.mutateAsync(data);

      await handleAuthSuccess(accessToken);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error: Error = e;

        handleAuthError(error);
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    }
  };

  return {
    authenticate,
  };
};
