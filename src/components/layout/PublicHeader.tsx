import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { useRouter } from '@/router/Router';

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { path, navigate } = useRouter();

  const sectionLinks = [
    { label: 'How It Works', sectionId: 'how-it-works' },
    { label: 'Departments', sectionId: 'departments' },
  ];

  const routeLinks = [
    { label: 'Citizen Portal', path: '/citizen/dashboard' },
    { label: 'Department Portal', path: '/department/dashboard' },
  ];

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (path === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-navy border-b border-navy-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo variant="light" />

          <nav className="hidden lg:flex items-center gap-1">
            {sectionLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="px-3.5 py-2 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
            {routeLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-3.5 py-2 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-navy-200 hover:text-white hover:bg-white/5"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-700/40 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {sectionLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            ))}
            {routeLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Button variant="outline" size="sm" fullWidth onClick={() => { setMobileOpen(false); navigate('/login'); }}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" fullWidth onClick={() => { setMobileOpen(false); navigate('/signup'); }}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
