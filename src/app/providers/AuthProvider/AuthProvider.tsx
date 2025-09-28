import {createContext, useContext} from 'react';
import {decodeToken} from './utils';
import {AuthProviderProps, AuthState} from './types';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {redirect} from '@tanstack/react-router';
import {checkAndRefreshAuth} from './checkAndRefreshAuth';
import {QUERY_KEY_MAP} from '@shared/constants/queryKeyMap';
import {LOCAL_STORAGE_KEY_MAP} from '@shared/constants/localStorageKeyMap';
import {User} from '@entities/User';

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
  const {data} = useQuery<User>({
    queryKey: [QUERY_KEY_MAP.AUTH],
    enabled: false,
  });

  const login = (accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN, accessToken);
    const userData = decodeToken(accessToken);

    queryClient.setQueryData([QUERY_KEY_MAP.AUTH], userData);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);

    queryClient.cancelQueries();
    queryClient.clear();
  };

  const authGuard = async () => {
    const user = await queryClient.fetchQuery({
      queryKey: [QUERY_KEY_MAP.AUTH],
      queryFn: checkAndRefreshAuth,
    });

    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  };

  const value: AuthState = {
    user: data ?? null,
    isAuthenticated: !!data,
    login,
    logout,
    authGuard,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
