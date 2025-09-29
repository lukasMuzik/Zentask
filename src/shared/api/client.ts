import axios from 'axios';
import {ERROR_CODES} from './errorCodes';
import {LOCAL_STORAGE_KEY_MAP} from '@shared/constants/localStorageKeyMap';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const data = error.response?.data;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (
        data?.error === ERROR_CODES.USER_NOT_FOUND ||
        data?.error === ERROR_CODES.INVALID_CREDENTIALS
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const success = await tryRefreshToken();

      if (success) {
        const newToken = localStorage.getItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export async function tryRefreshToken() {
  try {
    const refreshResponse = await axios.post(`${API_BASE_URL}/api/refresh-token`, null, {
      withCredentials: true,
    });

    const newAccessToken = refreshResponse.data.accessToken;
    localStorage.setItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN, newAccessToken);

    return true;
  } catch (error) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_MAP.ACCESS_TOKEN);
    return false;
  }
}
