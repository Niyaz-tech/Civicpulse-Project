import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-navy-300 max-w-md leading-relaxed">
              CivicPulse AI is a civic grievance management platform connecting citizens
              with municipal departments. Report issues, track progress, and hold
              authorities accountable — all in one place.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-navy-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse-soft" />
              Demo platform — not affiliated with any real government body
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li><a href="#/citizen/dashboard" className="hover:text-teal-400 transition-colors">Citizen Portal</a></li>
              <li><a href="#/department/dashboard" className="hover:text-teal-400 transition-colors">Department Portal</a></li>
              <li><a href="#/login" className="hover:text-teal-400 transition-colors">Sign In</a></li>
              <li><a href="#/signup" className="hover:text-teal-400 transition-colors">Create Account</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Departments</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>Roads & Potholes</li>
              <li>Water Supply</li>
              <li>Electricity</li>
              <li>Sanitation</li>
              <li>Transport</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-400">
            © 2024 CivicPulse AI — Demo Project. All data is illustrative.
          </p>
          <p className="text-xs text-navy-400">
            Built with React, Vite, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
