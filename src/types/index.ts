import React from 'react';

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

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  autoComplete?: string;
  inputMode?: "search" | "none" | "text" | "email" | "tel" | "url" | "numeric" | "decimal";
  maxLength?: number;
  error?: boolean;
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

export interface RoutingConfig {
  public: RouteConfig[];
  protected: RouteConfig[];
  fallback: RouteConfig;
}

