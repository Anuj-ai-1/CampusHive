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
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17AAAA] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-[#17AAAA] text-[#EEEEEE] font-semibold hover:bg-[#363636] active:bg-[#17AAAA] border border-[#17AAAA] hover:border-[#363636]',
    secondary:
      'bg-[#363636] text-[#EEEEEE] border border-[#363636] hover:bg-[#17AAAA] hover:border-[#17AAAA] active:bg-[#363636]',
    subtle:
      'bg-[#EEEEEE] text-[#363636] border border-[#363636]/25 hover:bg-[#FFA42E] hover:border-[#FFA42E]',
    ghost:
      'bg-transparent text-[#363636] hover:text-[#17AAAA] hover:bg-[#EEEEEE]',
    danger:
      'bg-[#F63F3A] text-[#EEEEEE] font-semibold border border-[#F63F3A] hover:bg-[#363636] hover:border-[#363636]',
    success:
      'bg-[#17AAAA] text-[#EEEEEE] font-semibold border border-[#17AAAA] hover:bg-[#363636]',
    accentSubtle:
      'bg-[#FFA42E] text-[#363636] font-semibold border border-[#FFA42E] hover:bg-[#F63F3A] hover:text-[#EEEEEE] hover:border-[#F63F3A]',
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
