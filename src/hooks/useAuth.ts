// Хуки для работы с аутентификацией через React Query

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../api/auth';
import { STORAGE_KEYS } from '../utils/constants';

// Ключи для кэширования
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

// Хук для получения текущего пользователя
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authAPI.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 минут
    retry: false,
  });
};

// Хук для входа в систему
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      if (data.success && data.user) {
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
        localStorage.setItem(STORAGE_KEYS.USER_EMAIL, data.user.email);
        
        // Обновляем кэш
        queryClient.setQueryData(authKeys.currentUser(), data.user);
      }
    },
  });
};

// Хук для проверки двухфакторного кода
export const useVerifyTwoFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.verifyTwoFactor,
    onSuccess: (data) => {
      if (data.success && data.user) {
        // Обновляем данные аутентификации
        localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
        localStorage.setItem(STORAGE_KEYS.USER_EMAIL, data.user.email);
        
        // Обновляем кэш
        queryClient.setQueryData(authKeys.currentUser(), data.user);
      }
    },
  });
};

// Хук для выхода из системы
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Очищаем кэш
      queryClient.clear();
    },
  });
};
