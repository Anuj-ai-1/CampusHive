import React from 'react';

export function Input({
  label,
  id,
  error,
  helperText,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-slate-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        required={required}
        className={`w-full h-9 px-3 text-sm glass-input text-slate-900 placeholder-slate-400 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#17AAAA]/20 ${
          error ? 'border-red-400 focus:border-red-500' : ''
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
