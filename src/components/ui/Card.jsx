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
      className={`bg-white border border-[#1C1917]/20 rounded-xl ${padding} ${
        interactive
          ? 'transition-colors duration-150 hover:border-[#0D9488] hover:bg-[#FAFAF9]/40'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
