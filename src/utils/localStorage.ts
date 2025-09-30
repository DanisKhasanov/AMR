import { STORAGE_KEYS } from './constants';

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  },
};

export const authStorage = {
  isAuthenticated: (): boolean => {
    return storage.get<boolean>(STORAGE_KEYS.IS_AUTHENTICATED) || false;
  },

  setAuthenticated: (value: boolean): void => {
    storage.set(STORAGE_KEYS.IS_AUTHENTICATED, value);
  },

  getUserEmail: (): string | null => {
    return storage.get<string>(STORAGE_KEYS.USER_EMAIL);
  },

  setUserEmail: (email: string): void => {
    storage.set(STORAGE_KEYS.USER_EMAIL, email);
  },

  clear: (): void => {
    storage.remove(STORAGE_KEYS.IS_AUTHENTICATED);
    storage.remove(STORAGE_KEYS.USER_EMAIL);
    storage.remove(STORAGE_KEYS.USER_DATA);
  },
};
