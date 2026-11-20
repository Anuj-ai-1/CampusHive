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
      className={`bg-white border border-[#064E3B]/20 rounded-xl ${padding} ${
        interactive
          ? 'transition-colors duration-150 hover:border-[#059669] hover:bg-[#FAF8F5]/40'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
