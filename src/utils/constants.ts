export const STORAGE_KEYS = {
  IS_AUTHENTICATED: "isAuthenticated",
  USER_EMAIL: "userEmail",
  USER_DATA: "userData",
} as const;

export const ROUTES = {
  LOGIN: "/login",
  TWO_FACTOR: "/two-factor",
  DASHBOARD: "/dashboard",
  CONTACTS: "/contacts",
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  TWO_FACTOR_CODE_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const UI_CONSTANTS = {
  ICON_SIZE: {
    SM: 16,
    MD: 18,
    LG: 24,
  },
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
} as const;

export const MOCK_CREDENTIALS = {
  ADMIN_EMAIL: "admin@company.com",
  USER_EMAIL: "user@company.com",
  PASSWORD: "password123",
  TWO_FACTOR_CODE: "123456",
} as const;

export const TIMEOUTS = {
  API_DELAY: 1000,
  TWO_FACTOR_DELAY: 800,
  LOGOUT_DELAY: 300,
  CODE_RESEND_TIMEOUT: 30,
} as const;
