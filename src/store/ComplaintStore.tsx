import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Complaint, DepartmentResponse, TimelineEvent, ComplaintStatus, DepartmentUpdateFields } from '@/types';
import { DEMO_COMPLAINTS } from '@/data/demoData';
import { getDepartment } from '@/data/departments';

const STORAGE_KEY = 'civicpulse_complaints_v1';

interface StoreContextValue {
  complaints: Complaint[];
  getComplaint: (id: string) => Complaint | undefined;
  addComplaint: (complaint: Complaint) => void;
  updateComplaint: (id: string, updates: Partial<Complaint>) => void;
  publishDepartmentUpdate: (
    complaintId: string,
    fields: DepartmentUpdateFields,
    message: string,
    author: string,
    authorRole: string,
    newStatus: ComplaintStatus,
    isResolution: boolean,
  ) => void;
  loading: boolean;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function loadFromStorage(): Complaint[] {
  if (typeof window === 'undefined') return DEMO_COMPLAINTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Complaint[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through
  }
  return DEMO_COMPLAINTS;
}

function saveToStorage(complaints: Complaint[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  } catch {
    // ignore quota errors
  }
}

function formatDateForTimeline(date: Date): { date: string; time: string } {
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = loadFromStorage();
    setComplaints(loaded);
    setLoading(false);
  }, []);

  const persist = useCallback((updated: Complaint[]) => {
    setComplaints(updated);
    saveToStorage(updated);
  }, []);

  const getComplaint = useCallback(
    (id: string) => complaints.find((c) => c.id === id),
    [complaints],
  );

  const addComplaint = useCallback(
    (complaint: Complaint) => {
      persist([...complaints, complaint]);
    },
    [complaints, persist],
  );

  const updateComplaint = useCallback(
    (id: string, updates: Partial<Complaint>) => {
      persist(
        complaints.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c,
        ),
      );
    },
    [complaints, persist],
  );

  const publishDepartmentUpdate = useCallback(
    (
      complaintId: string,
      fields: DepartmentUpdateFields,
      message: string,
      author: string,
      authorRole: string,
      newStatus: ComplaintStatus,
      isResolution: boolean,
    ) => {
      const now = new Date();
      const { date, time } = formatDateForTimeline(now);

      const response: DepartmentResponse = {
        id: `r-${Date.now()}`,
        date: now.toISOString(),
        author,
        authorRole,
        message,
        type: isResolution ? 'resolution' : fields.delayReason.trim() ? 'delay-explanation' : 'update',
        isDemo: true,
      };

      const timelineEvent: TimelineEvent = {
        id: `t-${Date.now()}`,
        date,
        time,
        status: newStatus,
        title: isResolution
          ? 'Complaint resolved by department'
          : newStatus === 'in-progress'
            ? 'Work progress update published'
            : 'Department update published',
        description: message.substring(0, 200) + (message.length > 200 ? '...' : ''),
        actor: 'department',
        actorName: `${author} (Demo Department Staff)`,
      };

      persist(
        complaints.map((c) =>
          c.id === complaintId
            ? {
                ...c,
                status: newStatus,
                departmentFields: fields,
                expectedCompletion: fields.expectedCompletionDate || c.expectedCompletion,
                updatedAt: now.toISOString(),
                responses: [...c.responses, response],
                timeline: [...c.timeline, timelineEvent],
              }
            : c,
        ),
      );
    },
    [complaints, persist],
  );

  return (
    <StoreContext.Provider
      value={{ complaints, getComplaint, addComplaint, updateComplaint, publishDepartmentUpdate, loading }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export function generateCaseId(existingIds: string[]): string {
  const year = new Date().getFullYear();
  const existing = existingIds
    .map((id) => {
      const match = id.match(/CP-\d{4}-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => n > 0);
  const maxNum = existing.length > 0 ? Math.max(...existing) : 48000;
  return `CP-${year}-${String(maxNum + 1).padStart(5, '0')}`;
}

export { getDepartment };
