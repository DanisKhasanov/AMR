// API слой для аутентификации с моками

import { STORAGE_KEYS, TIMEOUTS, MOCK_CREDENTIALS } from '../utils/constants';

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
  twoFactorEnabled: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TwoFactorCode {
  code: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  requiresTwoFactor?: boolean;
}

// Моковые данные пользователей
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Администратор',
    isAuthenticated: false,
    twoFactorEnabled: true,
  },
  {
    id: '2',
    email: 'user@company.com',
    name: 'Пользователь',
    isAuthenticated: false,
    twoFactorEnabled: true,
  },
];

// Симуляция задержки API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API функции
export const authAPI = {
  // Вход в систему
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(TIMEOUTS.API_DELAY); // Симуляция задержки сети
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      return {
        success: false,
        message: 'Пользователь не найден'
      };
    }
    
    // Простая проверка пароля (в реальном приложении это будет на сервере)
    if (credentials.password !== MOCK_CREDENTIALS.PASSWORD) {
      return {
        success: false,
        message: 'Неверный пароль'
      };
    }
    
    return {
      success: true,
      user: { ...user, isAuthenticated: true },
      requiresTwoFactor: user.twoFactorEnabled
    };
  },

  // Проверка двухфакторного кода
  async verifyTwoFactor(data: TwoFactorCode): Promise<AuthResponse> {
    await delay(TIMEOUTS.TWO_FACTOR_DELAY);
    
    const user = mockUsers.find(u => u.email === data.email);
    
    if (!user) {
      return {
        success: false,
        message: 'Пользователь не найден'
      };
    }
    
    // Простая проверка кода (в реальном приложении это будет на сервере)
    if (data.code !== MOCK_CREDENTIALS.TWO_FACTOR_CODE) {
      return {
        success: false,
        message: 'Неверный код двухфакторной аутентификации'
      };
    }
    
    return {
      success: true,
      user: { ...user, isAuthenticated: true }
    };
  },

  // Получение информации о пользователе
  async getCurrentUser(): Promise<User | null> {
    await delay(TIMEOUTS.API_DELAY / 2);
    
    const isAuthenticated = localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
    const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    
    if (!isAuthenticated || !userEmail) {
      return null;
    }
    
    const user = mockUsers.find(u => u.email === userEmail);
    return user ? { ...user, isAuthenticated: true } : null;
  },

  // Выход из системы
  async logout(): Promise<{ success: boolean }> {
    await delay(TIMEOUTS.LOGOUT_DELAY);
    
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    
    return { success: true };
  }
};
