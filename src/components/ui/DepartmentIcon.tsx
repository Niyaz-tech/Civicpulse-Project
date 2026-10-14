import type { DepartmentId } from '@/types';
import { getDepartment } from '@/data/departments';
import {
  Construction, Bus, Zap, Droplets, Trash2, Waves, Lightbulb,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Construction,
  Bus,
  Zap,
  Droplets,
  Trash2,
  Waves,
  Lightbulb,
};

interface DepartmentIconProps {
  departmentId: DepartmentId;
  size?: number;
  className?: string;
}

export function DepartmentIcon({ departmentId, size = 20, className = '' }: DepartmentIconProps) {
  const dept = getDepartment(departmentId);
  const Icon = dept ? iconMap[dept.icon] : Construction;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl ${className}`}
      style={{ backgroundColor: dept ? `${dept.color}15` : '#f0f0f0' }}
    >
      <Icon size={size} style={{ color: dept?.color || '#666' }} />
    </div>
  );
}
