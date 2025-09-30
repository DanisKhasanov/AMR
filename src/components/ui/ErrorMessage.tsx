import React from "react";
import type { ErrorMessageProps } from "../../types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = "",
}) => {
  if (!message) return null;
  
  const classes = `text-sm text-red-500 ${className}`.trim();
  
  return <div className={classes}>{message}</div>;
};

export default ErrorMessage;
