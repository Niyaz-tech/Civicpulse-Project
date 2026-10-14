import type { ComplaintStatus, Priority } from '@/types';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '@/data/demoData';

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
      <span className={`status-dot ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      {config.label}
    </span>
  );
}
