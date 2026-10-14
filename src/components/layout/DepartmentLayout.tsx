import { useState } from 'react';
import {
  LayoutDashboard, Inbox, AlertTriangle, LogOut,
  Menu, X, Bell, ChevronRight, Building2,
} from 'lucide-react';
import { Logo } from './Logo';
import { Link } from '@/components/ui/Link';
import { useRouter } from '@/router/Router';
import { useStore } from '@/store/ComplaintStore';
import type { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', path: '/department/dashboard', icon: LayoutDashboard },
  { label: 'Assigned Complaints', path: '/department/assigned', icon: Inbox },
  { label: 'Priority Overview', path: '/department/priority', icon: AlertTriangle },
];

interface DepartmentLayoutProps {
  children: ReactNode;
}

export function DepartmentLayout({ children }: DepartmentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { path } = useRouter();

  const { complaints } = useStore();

  const pendingCount = complaints.filter(
    (c) => c.status === 'submitted' || c.status === 'under-review'
  ).length;
  const criticalCount = complaints.filter((c) => c.priority === 'critical').length;

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar — dark navy for department portal */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 glass-navy border-r border-navy-700/40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-navy-700/40">
          <Logo variant="light" size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-navy-300">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-navy-700/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-navy-800/50">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <Building2 size={20} className="text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Roads Department</p>
              <p className="text-xs text-navy-400">Department Staff · Engineer</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-xs font-semibold text-navy-500 uppercase tracking-wider">Workspace</p>
          {navItems.map((item) => {
            const isActive = path === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                    : 'text-navy-300 hover:bg-navy-800/50 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
                {item.path === '/department/assigned' && pendingCount > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
                {item.path === '/department/priority' && criticalCount > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    {criticalCount}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <p className="px-3 pb-2 text-xs font-semibold text-navy-500 uppercase tracking-wider">Quick Stats</p>
            <div className="px-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-400">Total Assigned</span>
                <span className="text-white font-semibold">{complaints.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-400">Resolved</span>
                <span className="text-green-400 font-semibold">
                  {complaints.filter((c) => c.status === 'resolved').length}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-navy-400">Critical</span>
                <span className="text-red-400 font-semibold">{criticalCount}</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-navy-700/40">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            Exit to Home
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-navy-50">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-navy-600">
              <Menu size={22} />
            </button>
            <h1 className="text-sm font-semibold text-navy-900 hidden sm:block">
              Department Operations Center
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-navy-50 transition-colors">
              <Bell size={20} className="text-navy-600" />
              {criticalCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {criticalCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-1 text-xs text-navy-400">
              <span>Department Portal</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
