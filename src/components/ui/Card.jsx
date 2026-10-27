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
      className={`bg-white border border-[#363636]/20 rounded-xl ${padding} ${
        interactive
          ? 'transition-colors duration-150 hover:border-[#17AAAA] hover:bg-[#EEEEEE]/40'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
