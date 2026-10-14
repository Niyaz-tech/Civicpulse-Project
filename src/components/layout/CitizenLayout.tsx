import { useState } from 'react';
import {
  LayoutDashboard, FilePlus, FolderOpen, History,
  LogOut, Menu, X, Bell, Search, ChevronRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { Link } from '@/components/ui/Link';
import { useRouter } from '@/router/Router';
import { useStore } from '@/store/ComplaintStore';
import type { ReactNode } from 'react';

const navItems = [
  { label: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
  { label: 'Report Complaint', path: '/citizen/report', icon: FilePlus },
  { label: 'My Complaints', path: '/citizen/complaints', icon: FolderOpen },
  { label: 'History', path: '/citizen/history', icon: History },
];

interface CitizenLayoutProps {
  children: ReactNode;
}

export function CitizenLayout({ children }: CitizenLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { path } = useRouter();

  const { complaints } = useStore();

  const activeComplaints = complaints.filter(
    (c) => c.status !== 'resolved' && c.status !== 'rejected'
  ).length;

  return (
    <div className="min-h-screen bg-navy-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-navy-100 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-navy-100">
          <Logo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-navy-400">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-navy-100">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-navy-50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-navy-900 truncate">Rajesh Kumar</p>
              <p className="text-xs text-navy-400">Citizen · Ward 7</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-xs font-semibold text-navy-400 uppercase tracking-wider">Menu</p>
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
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-teal-600' : ''} />
                {item.label}
                {item.path === '/citizen/complaints' && activeComplaints > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                    {activeComplaints}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-navy-100">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-navy-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
            Exit to Home
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-navy-950/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-navy-100 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-navy-600">
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-50 border border-navy-100">
              <Search size={16} className="text-navy-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                className="bg-transparent text-sm text-navy-700 placeholder-navy-400 outline-none w-48"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-navy-50 transition-colors">
              <Bell size={20} className="text-navy-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
            </button>
            <div className="flex items-center gap-1 text-xs text-navy-400">
              <span>Citizen Portal</span>
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
