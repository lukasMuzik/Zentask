import {jwtDecode} from 'jwt-decode';
import {User} from './types';

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<User>(token);
    return decoded;
  } catch (error) {
    console.error('Chyba při dekódování tokenu:', error);
    return null;
  }
};

export const isTokenValid = (token: string | null, leewaySeconds = 30) => {
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime + leewaySeconds : false;
  } catch {
    return false;
  }
};
