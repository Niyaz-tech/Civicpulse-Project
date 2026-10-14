import { Users, Building2, X, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RoleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (role: 'citizen' | 'department') => void;
}

export function RoleSelectionModal({ open, onClose, onSelect }: RoleSelectionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-navy-100 overflow-hidden animate-slide-up">
        <div className="px-6 pt-6 pb-2 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-display font-extrabold text-navy-900">
              Choose Your Role
            </h2>
            <p className="text-sm text-navy-500 mt-1">
              Select how you'd like to explore the platform.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-3">
          <button
            onClick={() => onSelect('citizen')}
            className="w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-navy-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors">
              <Users size={24} className="text-teal-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-navy-900">Continue as Citizen</span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  Demo
                </span>
              </div>
              <p className="text-xs text-navy-500 leading-relaxed">
                File complaints, track their progress, and view department responses on your timeline.
              </p>
            </div>
            <ArrowRight size={18} className="text-navy-300 group-hover:text-teal-600 transition-colors shrink-0" />
          </button>

          <button
            onClick={() => onSelect('department')}
            className="w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-navy-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center shrink-0 group-hover:bg-navy-900 transition-colors">
              <Building2 size={24} className="text-navy-700 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-navy-900">Continue as Department Staff</span>
                <span className="text-[10px] font-semibold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  Demo
                </span>
              </div>
              <p className="text-xs text-navy-500 leading-relaxed">
                Review assigned complaints, update status and timelines, and publish citizen-facing updates.
              </p>
            </div>
            <ArrowRight size={18} className="text-navy-300 group-hover:text-teal-600 transition-colors shrink-0" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-navy-50 border border-navy-100">
            <Info size={14} className="text-navy-400 shrink-0 mt-0.5" />
            <p className="text-xs text-navy-500 leading-relaxed">
              Demo access only — no sign-in or password is required. This is not a secure login.
              No real government system is connected. All data is simulated and stored locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
