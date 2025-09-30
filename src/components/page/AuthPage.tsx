import React from 'react';
import Logo from '../ui/Logo';
import LoginForm from '../auth/LoginForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="bg-white rounded-md p-8 w-full max-w-[440px]">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-1">
            <Logo />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 text-center leading-tight">
            Sign in to your account to continue
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
