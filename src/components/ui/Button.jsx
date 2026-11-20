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
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-[#4F46E5] text-[#F8FAFC] font-semibold hover:bg-[#0F172A] active:bg-[#4F46E5] border border-[#4F46E5] hover:border-[#0F172A]',
    secondary:
      'bg-[#0F172A] text-[#F8FAFC] border border-[#0F172A] hover:bg-[#4F46E5] hover:border-[#4F46E5] active:bg-[#0F172A]',
    subtle:
      'bg-[#F8FAFC] text-[#0F172A] border border-[#0F172A]/25 hover:bg-[#F59E0B] hover:border-[#F59E0B]',
    ghost:
      'bg-transparent text-[#0F172A] hover:text-[#4F46E5] hover:bg-[#F8FAFC]',
    danger:
      'bg-[#E11D48] text-[#F8FAFC] font-semibold border border-[#E11D48] hover:bg-[#0F172A] hover:border-[#0F172A]',
    success:
      'bg-[#4F46E5] text-[#F8FAFC] font-semibold border border-[#4F46E5] hover:bg-[#0F172A]',
    accentSubtle:
      'bg-[#F59E0B] text-[#0F172A] font-semibold border border-[#F59E0B] hover:bg-[#E11D48] hover:text-[#F8FAFC] hover:border-[#E11D48]',
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
