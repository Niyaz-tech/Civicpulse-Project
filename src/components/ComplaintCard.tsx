import { MapPin, ThumbsUp, Clock, ChevronRight } from 'lucide-react';
import { Link } from '@/components/ui/Link';
import { Card } from '@/components/ui/Card';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { DepartmentIcon } from '@/components/ui/DepartmentIcon';
import { CATEGORY_LABELS } from '@/data/demoData';
import { getDepartment } from '@/data/departments';
import type { Complaint } from '@/types';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const dept = getDepartment(complaint.departmentId);

  return (
    <Link to={`/complaint/${complaint.id}`}>
      <Card hover className="p-5">
        <div className="flex items-start gap-4">
          <DepartmentIcon
            departmentId={complaint.departmentId}
            size={40}
            className="w-12 h-12 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-navy-400">
                  {complaint.ticketId}
                </span>
                <PriorityBadge priority={complaint.priority} />
              </div>
              <ChevronRight size={18} className="text-navy-300 shrink-0 mt-0.5" />
            </div>

            <h3 className="text-sm font-semibold text-navy-900 leading-snug mb-1.5 line-clamp-2">
              {complaint.title}
            </h3>

            <p className="text-xs text-navy-500 mb-3 line-clamp-2 leading-relaxed">
              {complaint.description}
            </p>

            <div className="flex items-center gap-3 flex-wrap text-xs text-navy-400">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} />
                {complaint.ward}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} />
                {formatDate(complaint.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <ThumbsUp size={13} />
                {complaint.upvotes}
              </span>
              <span className="text-navy-300">·</span>
              <span className="font-medium" style={{ color: dept?.color }}>
                {dept?.shortName}
              </span>
            </div>

            <div className="mt-3">
              <StatusBadge status={complaint.status} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
