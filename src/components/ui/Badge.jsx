import React from 'react';

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  dot = false,
}) {
  const variants = {
    neutral: 'bg-[#FAFAF9] text-[#1C1917] border-[#1C1917]/25 font-medium',
    primary: 'bg-[#0D9488] text-[#FAFAF9] border-[#0D9488] font-semibold',
    success: 'bg-[#0D9488] text-[#FAFAF9] border-[#0D9488] font-semibold',
    warning: 'bg-[#CA8A04] text-[#1C1917] border-[#CA8A04] font-semibold',
    error: 'bg-[#EA580C] text-[#FAFAF9] border-[#EA580C] font-semibold',
    danger: 'bg-[#EA580C] text-[#FAFAF9] border-[#EA580C] font-semibold',
    dark: 'bg-[#1C1917] text-[#FAFAF9] font-semibold border-[#1C1917]',
  };

  const dotColors = {
    neutral: 'bg-[#1C1917]',
    primary: 'bg-[#FAFAF9]',
    success: 'bg-[#FAFAF9]',
    warning: 'bg-[#1C1917]',
    error: 'bg-[#FAFAF9]',
    danger: 'bg-[#FAFAF9]',
    dark: 'bg-[#CA8A04]',
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
