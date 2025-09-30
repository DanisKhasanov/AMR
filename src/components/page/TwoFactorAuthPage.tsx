import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ROUTES, UI_CONSTANTS } from "../../utils/constants";
import Logo from "../ui/Logo";
import TwoFactorCodeInput from "../auth/TwoFactorCodeInput";

const TwoFactorAuthPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="bg-white rounded-md p-8 w-full max-w-[440px] relative">
        <button
          onClick={() => navigate(ROUTES.LOGIN)}
          className="absolute top-8 left-8 flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors"
          aria-label="Назад"
        >
          <ArrowLeft size={UI_CONSTANTS.ICON_SIZE.MD} />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-1">
            <Logo />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 text-center leading-tight mb-1">
            Two-Factor Authentication
          </h2>
          <p className="text-base text-gray-900 text-center leading-normal">
            Enter the 6-digit code from the Google Authenticator app
          </p>
        </div>

        <TwoFactorCodeInput />
      </div>
    </div>
  );
};

export default TwoFactorAuthPage;
