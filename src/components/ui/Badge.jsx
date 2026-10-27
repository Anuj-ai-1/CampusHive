import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) {
  const variants = {
    neutral: 'bg-[#EEEEEE] text-[#363636] border-[#363636]/25 font-medium',
    primary: 'bg-[#17AAAA] text-[#EEEEEE] border-[#17AAAA] font-semibold',
    success: 'bg-[#17AAAA] text-[#EEEEEE] border-[#17AAAA] font-semibold',
    warning: 'bg-[#FFA42E] text-[#363636] border-[#FFA42E] font-semibold',
    error: 'bg-[#F63F3A] text-[#EEEEEE] border-[#F63F3A] font-semibold',
    danger: 'bg-[#F63F3A] text-[#EEEEEE] border-[#F63F3A] font-semibold',
    dark: 'bg-[#363636] text-[#EEEEEE] font-semibold border-[#363636]',
  };

  const dotColors = {
    neutral: 'bg-[#363636]',
    primary: 'bg-[#EEEEEE]',
    success: 'bg-[#EEEEEE]',
    warning: 'bg-[#363636]',
    error: 'bg-[#EEEEEE]',
    danger: 'bg-[#EEEEEE]',
    dark: 'bg-[#FFA42E]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs rounded-full border ${
        variants[variant] || variants.neutral
      } ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColors[variant] || dotColors.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
}
