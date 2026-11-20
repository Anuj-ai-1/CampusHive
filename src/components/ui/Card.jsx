import React from 'react';

export function Card({
  children,
  className = '',
  padding = 'p-5',
  interactive = false,
  ...props
}) {
  return (
    <div
      className={`bg-white border border-[#0F172A]/20 rounded-xl ${padding} ${
        interactive
          ? 'transition-colors duration-150 hover:border-[#4F46E5] hover:bg-[#F8FAFC]/40'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
