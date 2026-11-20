import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-[#0D9488] text-[#FAFAF9] font-semibold hover:bg-[#1C1917] active:bg-[#0D9488] border border-[#0D9488] hover:border-[#1C1917]',
    secondary:
      'bg-[#1C1917] text-[#FAFAF9] border border-[#1C1917] hover:bg-[#0D9488] hover:border-[#0D9488] active:bg-[#1C1917]',
    subtle:
      'bg-[#FAFAF9] text-[#1C1917] border border-[#1C1917]/25 hover:bg-[#CA8A04] hover:border-[#CA8A04]',
    ghost:
      'bg-transparent text-[#1C1917] hover:text-[#0D9488] hover:bg-[#FAFAF9]',
    danger:
      'bg-[#EA580C] text-[#FAFAF9] font-semibold border border-[#EA580C] hover:bg-[#1C1917] hover:border-[#1C1917]',
    success:
      'bg-[#0D9488] text-[#FAFAF9] font-semibold border border-[#0D9488] hover:bg-[#1C1917]',
    accentSubtle:
      'bg-[#CA8A04] text-[#1C1917] font-semibold border border-[#CA8A04] hover:bg-[#EA580C] hover:text-[#FAFAF9] hover:border-[#EA580C]',
  };

  const sizes = {
    xs: 'h-7 px-2.5 text-xs gap-1.5',
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-9 px-3.5 text-sm gap-2',
    lg: 'h-10 px-4 text-sm gap-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      {children}
      {IconRight && <IconRight className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}
