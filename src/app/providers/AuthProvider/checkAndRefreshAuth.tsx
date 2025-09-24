import {User} from './types';
import {decodeToken, isTokenValid} from './utils';
import {tryRefreshToken} from '@shared/api/client';

export async function checkAndRefreshAuth(): Promise<User | null> {
  const token = localStorage.getItem('accessToken');

  if (!token || !isTokenValid(token)) {
    const isAuthenticated = await tryRefreshToken();

    if (!isAuthenticated) {
      localStorage.removeItem('accessToken');
      return null;
    }

    const newToken = localStorage.getItem('accessToken');

    if (newToken) {
      return decodeToken(newToken);
    }

    return null;
  }

  const userData = decodeToken(token);

  if (!userData) {
    localStorage.removeItem('accessToken');
    return null;
  }

  return userData;
}
