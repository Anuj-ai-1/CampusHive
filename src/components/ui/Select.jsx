import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  id,
  options = [],
  error,
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
      <div className="relative">
        <select
          id={id}
          required={required}
          className={`w-full h-9 pl-3 pr-8 text-sm glass-input text-slate-900 rounded-lg appearance-none transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#17AAAA]/20 ${
            error ? 'border-red-400' : ''
          }`}
          {...props}
        >
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <ChevronDown
          className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
