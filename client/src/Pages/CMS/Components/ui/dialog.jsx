import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ className = '', children, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-lg p-6 w-full max-h-[90vh] overflow-y-auto
        animate-in fade-in duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ className = '', ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props} />
  );
}

export function DialogTitle({ className = '', ...props }) {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props} />
  );
}