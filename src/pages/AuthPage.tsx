import { useState } from 'react';
import { ArrowLeft, Users, Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Info } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/layout/Logo';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { useRouter } from '@/router/Router';
import type { Portal } from '@/types';

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [portal, setPortal] = useState<Portal>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useRouter();

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen flex flex-col bg-navy-50">
      <DemoBanner />

      <div className="flex-1 flex">
        {/* Left panel — branding */}
        <div className="hidden lg:flex w-1/2 bg-navy-950 relative overflow-hidden flex-col justify-between p-12">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-600/5 rounded-full blur-3xl" />

          <Logo variant="light" size="md" />

          <div className="relative">
            <h2 className="text-3xl font-display font-extrabold text-white leading-tight mb-4">
              {isLogin ? 'Welcome back to accountable civic governance.' : 'Join the platform making civic accountability real.'}
            </h2>
            <p className="text-navy-300 leading-relaxed mb-8 max-w-md">
              {isLogin
                ? 'Sign in to track your complaints, receive department updates, and stay informed about issues in your community.'
                : 'Create an account to report civic issues, follow them through resolution, and connect with the right municipal departments.'}
            </p>

            <div className="space-y-4">
              {[
                'AI-powered complaint routing to the correct department',
                'Real-time timeline tracking from submission to resolution',
                'Two-way communication between citizens and departments',
                'Transparent accountability with measurable outcomes',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                  </div>
                  <span className="text-sm text-navy-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-navy-500">
            Demo platform — no real government departments are connected.
          </p>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 lg:hidden">
            <Logo size="md" />
          </div>

          <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-700 mb-8">
                <ArrowLeft size={16} />
                Back to home
              </Link>

              <h1 className="text-2xl font-display font-extrabold text-navy-900 mb-2">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </h1>
              <p className="text-sm text-navy-500 mb-8">
                {isLogin ? 'Choose your portal and enter your credentials.' : 'Select your portal type and fill in your details.'}
              </p>

              {/* Portal selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setPortal('citizen')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    portal === 'citizen'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-navy-200 bg-white hover:border-navy-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                    portal === 'citizen' ? 'bg-teal-500' : 'bg-navy-100'
                  }`}>
                    <Users size={20} className={portal === 'citizen' ? 'text-white' : 'text-navy-500'} />
                  </div>
                  <p className={`text-sm font-bold ${portal === 'citizen' ? 'text-teal-700' : 'text-navy-700'}`}>Citizen</p>
                  <p className="text-xs text-navy-400">Report & track issues</p>
                </button>

                <button
                  onClick={() => setPortal('department')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    portal === 'department'
                      ? 'border-navy-900 bg-navy-50'
                      : 'border-navy-200 bg-white hover:border-navy-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                    portal === 'department' ? 'bg-navy-900' : 'bg-navy-100'
                  }`}>
                    <Building2 size={20} className={portal === 'department' ? 'text-white' : 'text-navy-500'} />
                  </div>
                  <p className={`text-sm font-bold ${portal === 'department' ? 'text-navy-900' : 'text-navy-700'}`}>Department</p>
                  <p className="text-xs text-navy-400">Manage complaints</p>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={(e) => { e.preventDefault(); navigate(portal === 'citizen' ? '/citizen/dashboard' : '/department/dashboard'); }} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder={portal === 'citizen' ? 'Enter your full name' : 'Enter staff name'}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-sm text-navy-900 placeholder-navy-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-navy-200 text-sm text-navy-900 placeholder-navy-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-navy-200 text-sm text-navy-900 placeholder-navy-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {!isLogin && portal === 'department' && (
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                      Department
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-navy-200 text-sm text-navy-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all bg-white">
                      <option value="">Select your department</option>
                      <option>Roads & Potholes</option>
                      <option>Transport</option>
                      <option>Electricity</option>
                      <option>Water Supply</option>
                      <option>Garbage & Sanitation</option>
                      <option>Drainage & Sewage</option>
                      <option>Streetlights</option>
                    </select>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-navy-600">
                      <input type="checkbox" className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/20" />
                      Remember me
                    </label>
                    <a href="#/" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Demo notice */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50 border border-teal-200">
                  <Info size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-teal-700 leading-relaxed">
                    This is a demo interface. No real authentication is performed — clicking sign in will take you directly to the {portal === 'citizen' ? 'citizen' : 'department'} portal with demo data.
                  </p>
                </div>

                <Button type="submit" size="lg" fullWidth>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </Button>
              </form>

              <p className="text-center text-sm text-navy-500 mt-6">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Link to={isLogin ? '/signup' : '/login'} className="font-semibold text-teal-600 hover:text-teal-700">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
