import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { useLogin } from "../../hooks/useAuth";
import { ROUTES, STORAGE_KEYS, UI_CONSTANTS } from "../../utils/constants";
import Button from "../ui/Button";
import Input from "../ui/Input";
import LoadingSpinner from "../ui/LoadingSpinner";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const result = await loginMutation.mutateAsync({ email, password });
        
        if (result.success) {
          if (result.requiresTwoFactor) {
            localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
            navigate(ROUTES.TWO_FACTOR);
          } else {
            navigate(ROUTES.DASHBOARD);
          }
        }
      } catch (error) {
        console.error("Ошибка входа:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <User size={UI_CONSTANTS.ICON_SIZE.SM} className="text-gray-400" />
          </div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="pl-10 pr-3 py-3"
            error={!!loginMutation.error}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Lock size={UI_CONSTANTS.ICON_SIZE.SM} className="text-gray-400" />
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="pl-10 pr-3 py-3"
            error={!!loginMutation.error}
          />
        </div>
      </div>

      {loginMutation.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {loginMutation.error.message || 'Произошла ошибка при входе'}
        </div>
      )}

      <Button
        type="submit"
        disabled={!email || !password || loginMutation.isPending}
        className={`w-full py-3 px-4 ${
          email && password && !loginMutation.isPending
            ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
            : 'bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        {loginMutation.isPending ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner size="sm" className="mr-2" />
            Logging in...
          </div>
        ) : (
          'Log in'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
