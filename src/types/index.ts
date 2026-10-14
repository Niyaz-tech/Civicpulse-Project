export type ComplaintStatus =
  | 'submitted'
  | 'under-review'
  | 'in-progress'
  | 'resolved'
  | 'rejected';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type DepartmentId =
  | 'roads'
  | 'transport'
  | 'electricity'
  | 'water'
  | 'garbage'
  | 'drainage'
  | 'streetlights';

export type Portal = 'citizen' | 'department';

export type ComplaintCategory =
  | 'pothole'
  | 'road-damage'
  | 'bus-service'
  | 'power-outage'
  | 'streetlight-fault'
  | 'water-leak'
  | 'no-water-supply'
  | 'garbage-collection'
  | 'overflowing-dump'
  | 'drainage-block'
  | 'sewage-leak'
  | 'other';

export interface Department {
  id: DepartmentId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  categories: ComplaintCategory[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  actor: 'system' | 'citizen' | 'department';
  actorName: string;
}

export interface DepartmentResponse {
  id: string;
  date: string;
  author: string;
  authorRole: string;
  message: string;
  type: 'update' | 'delay-explanation' | 'resolution';
  isDemo: boolean;
}

export type InspectionStatus = 'pending' | 'scheduled' | 'completed' | 'not-required';
export type WorkSanctioned = 'yes' | 'no' | 'pending';

export interface DepartmentUpdateFields {
  inspectionStatus: InspectionStatus;
  workSanctioned: WorkSanctioned;
  workStartDate: string;
  expectedCompletionDate: string;
  delayReason: string;
  resolutionNotes: string;
}

export interface Complaint {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  departmentId: DepartmentId;
  status: ComplaintStatus;
  priority: Priority;
  priorityReason: string;
  location: string;
  landmark: string;
  ward: string;
  zone: string;
  citizenName: string;
  citizenId: string;
  createdAt: string;
  updatedAt: string;
  expectedCompletion: string;
  upvotes: number;
  images: string[];
  timeline: TimelineEvent[];
  responses: DepartmentResponse[];
  departmentFields: DepartmentUpdateFields;
  isUserSubmitted: boolean;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  portal: Portal;
  departmentId?: DepartmentId;
  departmentName?: string;
  role?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}
