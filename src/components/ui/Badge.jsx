import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) {
  const variants = {
    neutral: 'bg-[#FAF8F5] text-[#064E3B] border-[#064E3B]/25 font-medium',
    primary: 'bg-[#059669] text-[#FAF8F5] border-[#059669] font-semibold',
    success: 'bg-[#059669] text-[#FAF8F5] border-[#059669] font-semibold',
    warning: 'bg-[#F59E0B] text-[#064E3B] border-[#F59E0B] font-semibold',
    error: 'bg-[#EA580C] text-[#FAF8F5] border-[#EA580C] font-semibold',
    danger: 'bg-[#EA580C] text-[#FAF8F5] border-[#EA580C] font-semibold',
    dark: 'bg-[#064E3B] text-[#FAF8F5] font-semibold border-[#064E3B]',
  };

  const dotColors = {
    neutral: 'bg-[#064E3B]',
    primary: 'bg-[#FAF8F5]',
    success: 'bg-[#FAF8F5]',
    warning: 'bg-[#064E3B]',
    error: 'bg-[#FAF8F5]',
    danger: 'bg-[#FAF8F5]',
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
