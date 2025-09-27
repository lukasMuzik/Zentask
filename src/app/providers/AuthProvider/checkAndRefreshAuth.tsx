import {User} from './types';
import {decodeToken, isTokenValid} from './utils';
import {tryRefreshToken} from '@shared/api/client';
import {LOCAL_STORAGE_KEY_MAP} from '@shared/constants/localStorageKeyMap';

export async function checkAndRefreshAuth(): Promise<User | null> {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);

  if (!token || !isTokenValid(token)) {
    const isAuthenticated = await tryRefreshToken();

    if (!isAuthenticated) {
      localStorage.removeItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);
      return null;
    }

    const newToken = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);

    if (newToken) {
      return decodeToken(newToken);
    }

    return null;
  }

  const userData = decodeToken(token);

  if (!userData) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);
    return null;
  }

  return userData;
}
