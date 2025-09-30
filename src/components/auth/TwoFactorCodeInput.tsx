import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVerifyTwoFactor } from "../../hooks/useAuth";
import { ROUTES, STORAGE_KEYS, VALIDATION_RULES } from "../../utils/constants";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingSpinner from "../ui/LoadingSpinner";

const TwoFactorCodeInput: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(new Array(VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH).fill(""));
  const [isError, setIsError] = useState(false);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [canGetNewCode, setCanGetNewCode] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const verifyTwoFactorMutation = useVerifyTwoFactor();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanGetNewCode(true);
    }
  }, [timeLeft]);

  const handleInputChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericValue;
      setCode(newCode);
      setIsError(false);

      if (numericValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      const fullCode = newCode.join("");
      if (fullCode.length === VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH) {
        setIsCodeComplete(true);
      } else {
        setIsCodeComplete(false);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (pastedData.length <= VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH) {
      const newCode = [...code];
      for (let i = 0; i < VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH; i++) {
        newCode[i] = pastedData[i] || "";
      }
      setCode(newCode);
      setIsError(false);

      const lastFilledIndex = Math.min(pastedData.length - 1, VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH - 1);
      inputRefs.current[lastFilledIndex]?.focus();

      const fullCode = newCode.join("");
      if (fullCode.length === VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH) {
        setIsCodeComplete(true);
      } else {
        setIsCodeComplete(false);
      }
    }
  };

  const handleGetNewCode = () => {
    console.log("Getting new code...");
    setCode(new Array(VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH).fill(""));
    setIsError(false);
    setIsCodeComplete(false);
    setTimeLeft(30);
    setCanGetNewCode(false);
    inputRefs.current[0]?.focus();
  };

  const handleContinue = async () => {
    const fullCode = code.join("");
    if (fullCode.length === VALIDATION_RULES.TWO_FACTOR_CODE_LENGTH) {
      try {
        const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
        if (!userEmail) {
          navigate(ROUTES.LOGIN);
          return;
        }

        const result = await verifyTwoFactorMutation.mutateAsync({
          code: fullCode,
          email: userEmail,
        });

        if (result.success) {
          navigate(ROUTES.DASHBOARD);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("Ошибка проверки кода:", error);
        setIsError(true);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 justify-center">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-14 h-15 text-center text-2xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white ${
              isError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            autoComplete="off"
          />
        ))}
      </div>

      {(isError || verifyTwoFactorMutation.error) && (
        <ErrorMessage
          message={verifyTwoFactorMutation.error?.message || "Invalid code"}
          className="text-center"
        />
      )}

      <div className="mt-6 space-y-4">
        {canGetNewCode && (
          <Button
            onClick={handleGetNewCode}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-base font-normal transition-colors shadow-sm"
          >
            Get new
          </Button>
        )}

        {isCodeComplete && (
          <Button
            onClick={handleContinue}
            disabled={isError || verifyTwoFactorMutation.isPending}
            className={`w-full py-3 px-4 rounded-lg text-base font-normal transition-colors ${
              !isError && !verifyTwoFactorMutation.isPending
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-sm"
                : "bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            {verifyTwoFactorMutation.isPending ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Verifying...
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TwoFactorCodeInput;
