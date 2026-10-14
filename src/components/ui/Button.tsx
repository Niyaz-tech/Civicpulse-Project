import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 shadow-sm shadow-teal-500/20',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 shadow-sm shadow-navy-900/20',
  outline:
    'border border-navy-300 text-navy-700 hover:border-navy-400 hover:bg-navy-50 active:bg-navy-100',
  ghost:
    'text-navy-600 hover:bg-navy-100 active:bg-navy-200',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-500/20',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
  lg: 'text-base px-6 py-3 rounded-xl gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
