import {
  Activity, ArrowRight, BarChart3, Bell, CheckCircle2,
  FileText, MapPin, MessageSquare, Shield, Users, Zap,
  Search, Route, TrendingUp, Clock,
} from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { DepartmentIcon } from '@/components/ui/DepartmentIcon';
import { RoleSelectionModal } from '@/components/ui/RoleSelectionModal';
import { DEPARTMENTS } from '@/data/departments';
import { STATUS_CONFIG } from '@/data/demoData';
import { useState } from 'react';
import { useStore } from '@/store/ComplaintStore';
import { useRouter } from '@/router/Router';

export function LandingPage() {
  const { complaints } = useStore();
  const { navigate } = useRouter();
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const handleRoleSelect = (role: 'citizen' | 'department') => {
    setRoleModalOpen(false);
    navigate(role === 'citizen' ? '/citizen/dashboard' : '/department/dashboard');
  };

  const stats = [
    { label: 'Complaints Filed', value: '12,847', icon: FileText },
    { label: 'Resolved', value: '9,213', icon: CheckCircle2 },
    { label: 'Avg. Resolution', value: '6.2 days', icon: Clock },
    { label: 'Departments', value: '7', icon: Shield },
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Smart Routing',
      description: 'When a citizen submits a complaint, our system analyzes the content, category, and location to automatically route it to the correct department — no guesswork, no delays.',
    },
    {
      icon: MessageSquare,
      title: 'Two-Way Communication',
      description: 'Citizens and department staff communicate through the same connected complaint record. Updates, delay explanations, and resolutions are visible to both sides in real time.',
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Every complaint has a detailed timeline showing each step — from submission to inspection to resolution. Citizens always know where things stand.',
    },
    {
      icon: MapPin,
      title: 'Location-Aware',
      description: 'Complaints are tagged with ward and zone information, enabling departments to prioritize by area and identify recurring infrastructure issues.',
    },
    {
      icon: Bell,
      title: 'Real-Time Notifications',
      description: 'Citizens receive updates the moment a department responds, changes status, or resolves an issue. No more wondering if anyone is looking into it.',
    },
    {
      icon: TrendingUp,
      title: 'Accountability Metrics',
      description: 'Departments track resolution times, response rates, and citizen satisfaction. Performance data drives continuous improvement.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Report an Issue',
      description: 'Citizens describe the problem, select a category, and drop a pin on the location. Submitting takes under two minutes.',
      icon: FileText,
    },
    {
      num: '02',
      title: 'AI Routes to Department',
      description: 'The system classifies the complaint and assigns it to the right municipal department based on category, urgency, and jurisdiction.',
      icon: Route,
    },
    {
      num: '03',
      title: 'Department Takes Action',
      description: 'Department staff review, inspect, and update the complaint with progress notes, expected completion dates, and delay explanations.',
      icon: Shield,
    },
    {
      num: '04',
      title: 'Citizen Sees Resolution',
      description: 'The citizen follows every step on the timeline and is notified when the issue is resolved. They can upvote and confirm closure.',
      icon: CheckCircle2,
    },
  ];

  const recentComplaints = complaints.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/5 rounded-full blur-3xl translate-y-1/4" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
                <Activity size={14} className="text-teal-400" />
                <span className="text-xs font-semibold text-teal-300">Civic Grievance Management Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                Your voice.
                <br />
                The right authority.
                <br />
                <span className="text-teal-400">Real accountability.</span>
              </h1>

              <p className="text-lg text-navy-300 leading-relaxed mb-8 max-w-xl">
                CivicPulse AI connects citizens with municipal departments. Report civic
                issues, track them through resolution, and hold authorities accountable —
                all through a single, transparent platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button size="lg" onClick={() => setRoleModalOpen(true)}>
                  Enter Citizen Portal
                  <ArrowRight size={18} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setRoleModalOpen(true)}
                  className="border-navy-600 text-white hover:bg-navy-800 hover:border-navy-500"
                >
                  Department Portal
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-navy-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400" />
                  No login required to explore
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-teal-400" />
                  7 departments
                </div>
              </div>
            </div>

            {/* Hero visual — mock complaint card */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="absolute -inset-4 bg-teal-500/5 rounded-3xl blur-2xl" />
              <div className="relative">
                {/* Floating stat cards */}
                <div className="absolute -top-6 -left-6 z-20 bg-white rounded-2xl shadow-2xl p-4 w-48 hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-navy-400">Resolved Today</p>
                      <p className="text-lg font-bold text-navy-900">47</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 z-20 bg-white rounded-2xl shadow-2xl p-4 w-52 hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                      <Zap size={16} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-navy-400">Avg. Routing Time</p>
                      <p className="text-lg font-bold text-navy-900">1.3s</p>
                    </div>
                  </div>
                </div>

                {/* Main card */}
                <Card className="p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold text-navy-400">CP-2024-04821</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">
                      <span className="status-dot bg-teal-500" />
                      In Progress
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">
                    Large pothole on MG Road near Bus Stop 12
                  </h3>
                  <p className="text-sm text-navy-500 mb-4 leading-relaxed">
                    A large pothole has formed on MG Road near Bus Stop 12, causing vehicles to swerve into oncoming traffic...
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <DepartmentIcon departmentId="roads" size={32} className="w-10 h-10" />
                    <div>
                      <p className="text-sm font-semibold text-navy-900">Roads & Potholes</p>
                      <p className="text-xs text-navy-400">Routed by AI · Ward 7</p>
                    </div>
                  </div>

                  {/* Mini timeline */}
                  <div className="space-y-3 pt-4 border-t border-navy-100">
                    {[
                      { label: 'Complaint submitted', time: 'Oct 8', done: true },
                      { label: 'Routed to Roads Dept', time: 'Oct 9', done: true },
                      { label: 'Inspection completed', time: 'Oct 10', done: true },
                      { label: 'Repair work started', time: 'Oct 12', done: true },
                      { label: 'Expected completion', time: 'Oct 18', done: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          step.done ? 'bg-teal-500' : 'bg-navy-100 border-2 border-navy-200'
                        }`}>
                          {step.done && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <span className={`text-xs ${step.done ? 'text-navy-700 font-medium' : 'text-navy-400'}`}>
                          {step.label}
                        </span>
                        <span className="ml-auto text-xs text-navy-400">{step.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-navy-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-50 mb-3">
                    <Icon size={22} className="text-navy-700" />
                  </div>
                  <p className="text-3xl font-display font-extrabold text-navy-900">{stat.value}</p>
                  <p className="text-sm text-navy-400 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-navy-400 mt-6">
            Illustrative demo data — not real operational statistics
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2 mb-4">
              From complaint to resolution in four steps
            </h2>
            <p className="text-navy-500 max-w-2xl mx-auto">
              CivicPulse AI creates a transparent, connected workflow between citizens and
              municipal departments. Every step is tracked, every update is visible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 border-t-2 border-dashed border-navy-200 -translate-x-1/2" />
                  )}
                  <Card className="p-6 h-full relative">
                    <div className="text-3xl font-display font-extrabold text-navy-100 mb-3">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3 className="text-base font-bold text-navy-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-navy-500 leading-relaxed">{step.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Platform Features</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2 mb-4">
              Everything needed for accountable civic governance
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} hover className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-navy-50 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-navy-700" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Departments</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 mt-2 mb-4">
              Seven departments, one platform
            </h2>
            <p className="text-navy-500 max-w-2xl mx-auto">
              CivicPulse AI routes complaints to the right municipal department automatically.
              Here are the departments currently represented in the platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <Card key={dept.id} hover className="p-6">
                <DepartmentIcon departmentId={dept.id} size={28} className="w-14 h-14 mb-4" />
                <h3 className="text-base font-bold text-navy-900 mb-2">{dept.name}</h3>
                <p className="text-sm text-navy-500 leading-relaxed mb-4">{dept.description}</p>
                <div className="flex items-center gap-2 text-xs text-navy-400">
                  <span className="font-medium" style={{ color: dept.color }}>●</span>
                  {dept.categories.length} complaint {dept.categories.length === 1 ? 'category' : 'categories'}
                </div>
              </Card>
            ))}

            {/* Portal CTA card */}
            <Card className="p-6 bg-gradient-to-br from-navy-900 to-navy-950 border-navy-800 text-white">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4">
                <Users size={28} className="text-teal-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Are you a department staff member?</h3>
              <p className="text-sm text-navy-300 leading-relaxed mb-4">
                Access the department operations center to manage assigned complaints and update citizens.
              </p>
              <Button size="sm" onClick={() => setRoleModalOpen(true)}>
                Open Department Portal
                <ArrowRight size={16} />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Live Feed</span>
              <h2 className="text-3xl font-display font-extrabold text-navy-900 mt-2">
                Recent civic complaints
              </h2>
            </div>
            <Link to="/citizen/complaints" className="text-sm font-semibold text-teal-600 hover:text-teal-700 hidden sm:inline-flex items-center gap-1">
              View all complaints <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {recentComplaints.map((complaint) => (
              <Link key={complaint.id} to={`/complaint/${complaint.id}`}>
                <Card hover className="p-5">
                  <div className="flex items-start gap-4">
                    <DepartmentIcon departmentId={complaint.departmentId} size={36} className="w-11 h-11 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold text-navy-400">{complaint.ticketId}</span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_CONFIG[complaint.status].bgColor} ${STATUS_CONFIG[complaint.status].textColor}`}>
                          <span className={`status-dot ${STATUS_CONFIG[complaint.status].dotColor}`} />
                          {STATUS_CONFIG[complaint.status].label}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-navy-900 mb-1 line-clamp-1">{complaint.title}</h3>
                      <p className="text-xs text-navy-400 line-clamp-1">{complaint.ward} · {complaint.zone}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4">
            Ready to make your voice heard?
          </h2>
          <p className="text-lg text-navy-300 mb-8 max-w-2xl mx-auto">
            Explore the platform, file a demo complaint, or see how departments manage
            civic issues. No account needed to look around.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => setRoleModalOpen(true)}>
              Explore Citizen Portal
              <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setRoleModalOpen(true)}
              className="border-navy-600 text-white hover:bg-navy-800 hover:border-navy-500"
            >
              Explore Department Portal
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <RoleSelectionModal
        open={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        onSelect={handleRoleSelect}
      />
    </div>
  );
}
