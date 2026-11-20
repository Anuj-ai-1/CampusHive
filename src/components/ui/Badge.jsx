import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) {
  const variants = {
    neutral: 'bg-[#F8FAFC] text-[#0F172A] border-[#0F172A]/25 font-medium',
    primary: 'bg-[#4F46E5] text-[#F8FAFC] border-[#4F46E5] font-semibold',
    success: 'bg-[#4F46E5] text-[#F8FAFC] border-[#4F46E5] font-semibold',
    warning: 'bg-[#F59E0B] text-[#0F172A] border-[#F59E0B] font-semibold',
    error: 'bg-[#E11D48] text-[#F8FAFC] border-[#E11D48] font-semibold',
    danger: 'bg-[#E11D48] text-[#F8FAFC] border-[#E11D48] font-semibold',
    dark: 'bg-[#0F172A] text-[#F8FAFC] font-semibold border-[#0F172A]',
  };

  const dotColors = {
    neutral: 'bg-[#0F172A]',
    primary: 'bg-[#F8FAFC]',
    success: 'bg-[#F8FAFC]',
    warning: 'bg-[#0F172A]',
    error: 'bg-[#F8FAFC]',
    danger: 'bg-[#F8FAFC]',
    dark: 'bg-[#F59E0B]',
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
