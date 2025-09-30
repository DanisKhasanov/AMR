import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogout } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="bg-white rounded-md p-8 w-full max-w-[600px]">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-semibold text-gray-900">
                Company
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Добро пожаловать!
          </h1>
          <p className="text-gray-600">Вы успешно вошли в систему</p>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Информация о пользователе
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Имя:</span> {user.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Статус:</span>{" "}
                {user.isAuthenticated
                  ? "Аутентифицирован"
                  : "Не аутентифицирован"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">
                  Двухфакторная аутентификация:
                </span>{" "}
                {user.twoFactorEnabled ? "Включена" : "Отключена"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`w-full py-3 px-4 rounded-lg text-base font-normal transition-colors ${
              logoutMutation.isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {logoutMutation.isPending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Выход...
              </div>
            ) : (
              "Выйти из системы"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
