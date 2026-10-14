import { Activity } from 'lucide-react';
import { Link } from '@/components/ui/Link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-navy-900';
  const subColor = variant === 'light' ? 'text-teal-300' : 'text-teal-600';

  const sizes = {
    sm: { icon: 28, title: 'text-base', sub: 'text-[10px]' },
    md: { icon: 36, title: 'text-lg', sub: 'text-xs' },
    lg: { icon: 44, title: 'text-2xl', sub: 'text-sm' },
  };

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 transition-transform group-hover:scale-105" style={{ width: sizes[size].icon, height: sizes[size].icon }}>
          <Activity className="text-white" size={sizes[size].icon * 0.55} strokeWidth={2.5} />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-navy-900 border-2 border-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${sizes[size].title} font-display font-extrabold ${textColor} tracking-tight`}>
          CivicPulse <span className={subColor}>AI</span>
        </span>
        <span className={`${sizes[size].sub} font-medium ${variant === 'light' ? 'text-navy-300' : 'text-navy-400'}`}>
          Your voice. The right authority.
        </span>
      </div>
    </Link>
  );
}
