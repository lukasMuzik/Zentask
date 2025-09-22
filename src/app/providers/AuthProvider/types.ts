import {ReactNode} from 'react';

export interface User {
  userId: string;
  username: string;
}

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
