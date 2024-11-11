import React from 'react';

export function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`
        flex h-10 w-full rounded-md border border-input bg-white
        px-3 py-2 text-sm text-gray-900 ring-offset-background
        file:border-0 file:bg-transparent file:text-sm file:font-medium
        placeholder:text-gray-500 focus:outline-none focus:ring-2
        focus:ring-indigo-500 focus:border-indigo-500
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  );
}