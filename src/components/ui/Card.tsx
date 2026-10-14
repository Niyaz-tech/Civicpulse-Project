import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-navy-100 shadow-sm ${hover ? 'card-hover cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
