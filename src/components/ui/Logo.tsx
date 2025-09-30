import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: size === "sm" ? "16px" : size === "md" ? "24px" : "32px", height: size === "sm" ? "16px" : size === "md" ? "24px" : "32px" }}>
        <div className={`absolute bg-blue-500 rounded-full ${sizeClasses[size]}`}></div>
        <div className={`absolute top-1.5 left-1.5 bg-white rounded-full ${size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"}`}></div>
      </div>
      {showText && (
        <span className={`font-semibold text-gray-900 ${textSizeClasses[size]}`}>
          Company
        </span>
      )}
    </div>
  );
};

export default Logo;
