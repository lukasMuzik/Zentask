import {ReactNode} from 'react';
import {User} from '@entities/User';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  authGuard: () => Promise<unknown>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
