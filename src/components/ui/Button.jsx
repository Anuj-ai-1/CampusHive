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
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-[#059669] text-[#FAF8F5] font-semibold hover:bg-[#064E3B] active:bg-[#059669] border border-[#059669] hover:border-[#064E3B]',
    secondary:
      'bg-[#064E3B] text-[#FAF8F5] border border-[#064E3B] hover:bg-[#059669] hover:border-[#059669] active:bg-[#064E3B]',
    subtle:
      'bg-[#FAF8F5] text-[#064E3B] border border-[#064E3B]/25 hover:bg-[#F59E0B] hover:border-[#F59E0B]',
    ghost:
      'bg-transparent text-[#064E3B] hover:text-[#059669] hover:bg-[#FAF8F5]',
    danger:
      'bg-[#EA580C] text-[#FAF8F5] font-semibold border border-[#EA580C] hover:bg-[#064E3B] hover:border-[#064E3B]',
    success:
      'bg-[#059669] text-[#FAF8F5] font-semibold border border-[#059669] hover:bg-[#064E3B]',
    accentSubtle:
      'bg-[#F59E0B] text-[#064E3B] font-semibold border border-[#F59E0B] hover:bg-[#EA580C] hover:text-[#FAF8F5] hover:border-[#EA580C]',
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
