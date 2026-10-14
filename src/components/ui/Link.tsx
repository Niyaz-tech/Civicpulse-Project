import { useRouter } from '@/router/Router';
import type { ReactNode } from 'react';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ to, children, className = '', onClick }: LinkProps) {
  const { navigate } = useRouter();

  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
        navigate(to);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
