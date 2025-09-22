import {createContext, useContext} from 'react';
import {decodeToken} from './utils';
import {AuthProviderProps, AuthState} from './types';
import {useAuthQuery} from './api/useAuthQuery';
import {useQueryClient} from '@tanstack/react-query';
import {redirect} from '@tanstack/react-router';
import {checkAndRefreshAuth} from './checkAndRefreshAuth';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
}

export function AuthProvider({children}: AuthProviderProps) {
  const queryClient = useQueryClient();
  const {data: user} = useAuthQuery();

  const login = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    const userData = decodeToken(accessToken);

    queryClient.setQueryData(['auth'], userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');

    queryClient.cancelQueries({queryKey: ['auth']});
    queryClient.setQueryData(['auth'], null);
    queryClient.removeQueries({queryKey: ['auth'], exact: true});
  };

  const authGuard = async () => {
    const user = await queryClient.fetchQuery({
      queryKey: ['auth'],
      queryFn: checkAndRefreshAuth,
    });

    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  };

  const value: AuthState = {
    user: user || null,
    isAuthenticated: !!user,
    login,
    logout,
    authGuard,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
