import {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {AuthFormInputs} from '../model';
import {useLoginMutation} from '../api/useLoginMutation';
import {useRegisterMutation} from '../api/useRegisterMutation';
import useToast from '../../../shared/hooks/useToast';
import axios from 'axios';
import {Error} from '../../../shared/api/types';
import {ERROR_CODES} from '../../../shared/api/errorCodes';

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleAuthSuccess = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    navigate({to: '/'});
  };

  const handleAuthError = (error: Error) => {
    switch (error.response?.data?.error) {
      case ERROR_CODES.USER_NOT_FOUND:
        toast.error('User not found. Please check your credentials.');
        break;
      case ERROR_CODES.INVALID_CREDENTIALS:
        toast.error('Invalid credentials. Please check your credentials.');
        break;
      case ERROR_CODES.USERNAME_TAKEN:
        toast.error('Username is already taken. Please choose a different username.');
        break;
      default:
        toast.error('Authentication failed. Please try again.');
    }
  };

  const authenticate = async (data: AuthFormInputs, variant: 'login' | 'register') => {
    setIsLoading(true);

    try {
      const mutation = variant === 'login' ? loginMutation : registerMutation;
      const {accessToken} = await mutation.mutateAsync(data);

      handleAuthSuccess(accessToken);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error: Error = e;

        handleAuthError(error);
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authenticate,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
  };
};
