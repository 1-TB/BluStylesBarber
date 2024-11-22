import React from 'react';

export function Alert({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'relative w-full rounded-lg border p-4 mb-4';
  
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800',
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <div
      role="alert"
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ 
  children, 
  className = '', 
  ...props 
}) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}