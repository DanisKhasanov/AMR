import React from "react";
import type { InputProps } from "../../types";

const Input: React.FC<InputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  autoComplete,
  inputMode,
  maxLength,
  error = false,
}) => {
  const baseClasses = "w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  
  const borderClasses = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-300";
  
  const sizeClasses = "px-3 py-2 text-base";
  
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed text-gray-400"
    : "bg-white";
  
  const classes = `${baseClasses} ${borderClasses} ${sizeClasses} ${disabledClasses} ${className}`.trim();
  
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={classes}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
    />
  );
};

export default Input;
