import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className = '', ...props }) {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogHeader({ children, className = '', ...props }) {
  return (
    <div className={`space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
}