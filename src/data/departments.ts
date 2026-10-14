import type { DepartmentId } from '@/types';

interface Department {
  id: DepartmentId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  categories: string[];
}

export const DEPARTMENTS: Record<DepartmentId, Department> = {
  roads: {
    id: 'roads',
    name: 'Roads & Potholes Department',
    shortName: 'Roads',
    icon: 'Construction',
    color: '#f59e0b',
    description: 'Road surface, potholes, and pavement issues',
    categories: ['pothole', 'road-damage'],
  },
  water: {
    id: 'water',
    name: 'Water Supply Department',
    shortName: 'Water',
    icon: 'Droplets',
    color: '#0ea5e9',
    description: 'Water supply, leaks, and pipeline issues',
    categories: ['water-leak', 'no-water-supply'],
  },
  electricity: {
    id: 'electricity',
    name: 'Electricity Department',
    shortName: 'Electricity',
    icon: 'Zap',
    color: '#eab308',
    description: 'Power supply, outages, and streetlight issues',
    categories: ['power-outage', 'streetlight-fault'],
  },
  garbage: {
    id: 'garbage',
    name: 'Garbage & Sanitation Department',
    shortName: 'Sanitation',
    icon: 'Trash2',
    color: '#22c55e',
    description: 'Garbage collection and sanitation',
    categories: ['garbage-collection', 'overflowing-dump'],
  },
  drainage: {
    id: 'drainage',
    name: 'Drainage & Sewage Department',
    shortName: 'Drainage',
    icon: 'Waves',
    color: '#06b6d4',
    description: 'Drainage, sewage, and storm water',
    categories: ['drainage-block', 'sewage-leak'],
  },
  transport: {
    id: 'transport',
    name: 'Transport Department',
    shortName: 'Transport',
    icon: 'Bus',
    color: '#8b5cf6',
    description: 'Bus service and public transport',
    categories: ['bus-service'],
  },
  streetlights: {
    id: 'streetlights',
    name: 'Street Lighting Division',
    shortName: 'Streetlights',
    icon: 'Lightbulb',
    color: '#facc15',
    description: 'Streetlight faults and maintenance',
    categories: ['streetlight-fault'],
  },
};

export function getDepartment(id: string): Department | undefined {
  return DEPARTMENTS[id as DepartmentId];
}

export function getDepartmentByCategory(category: string): Department | undefined {
  return Object.values(DEPARTMENTS).find((dept) =>
    dept.categories.includes(category)
  );
}
