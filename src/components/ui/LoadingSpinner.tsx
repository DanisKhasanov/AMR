import React from "react";
import type { LoadingSpinnerProps } from "../../types";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  
  const classes = `animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]} ${className}`.trim();
  
  return <div className={classes} />;
};

export default LoadingSpinner;
