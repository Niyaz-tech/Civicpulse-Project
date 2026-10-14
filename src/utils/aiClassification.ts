import type { ComplaintCategory, DepartmentId, Priority } from '@/types';
import { DEPARTMENTS, getDepartment } from '@/data/departments';

interface ClassificationResult {
  category: ComplaintCategory;
  departmentId: DepartmentId;
  priority: Priority;
  priorityReason: string;
  formalDescription: string;
  suggestedTitle: string;
}

interface KeywordRule {
  keywords: string[];
  category: ComplaintCategory;
  departmentId: DepartmentId;
  priorityBoost?: Priority;
}

const RULES: KeywordRule[] = [
  { keywords: ['pothole', 'potholes', 'crater', 'road hole', 'broken road'], category: 'pothole', departmentId: 'roads' },
  { keywords: ['road damage', 'crack', 'crumbling', 'broken surface', 'deteriorat', 'road surface', 'pothole', 'potholes'], category: 'road-damage', departmentId: 'roads' },
  { keywords: ['bus', 'route', 'transit', 'transport', 'commute', 'bus stop', 'bus late', 'bus delay'], category: 'bus-service', departmentId: 'transport' },
  { keywords: ['power', 'electric', 'outage', 'electricity', 'voltage', 'no power', 'power cut', 'transformer', 'load shedding'], category: 'power-outage', departmentId: 'electricity', priorityBoost: 'critical' },
  { keywords: ['streetlight', 'street light', 'lamp', 'light not work', 'dark road', 'no light', 'light pole', 'street lamp'], category: 'streetlight-fault', departmentId: 'streetlights' },
  { keywords: ['water leak', 'pipe leak', 'water pipe', 'leaking water', 'water flowing', 'water wastage'], category: 'water-leak', departmentId: 'water' },
  { keywords: ['no water', 'water supply', 'water shortage', 'no supply', 'tanker', 'dry tap', 'no water supply'], category: 'no-water-supply', departmentId: 'water', priorityBoost: 'high' },
  { keywords: ['garbage', 'trash', 'waste', 'bin', 'dump', 'rubbish', 'litter', 'garbage collection', 'overflow', 'bin overflow'], category: 'overflowing-dump', departmentId: 'garbage' },
  { keywords: ['garbage collection', 'not collected', 'missed collection', 'no pickup', 'waste pickup'], category: 'garbage-collection', departmentId: 'garbage' },
  { keywords: ['drain', 'drainage', 'overflow', 'clog', 'blocked drain', 'water log', 'waterlogg', 'stagnant'], category: 'drainage-block', departmentId: 'drainage' },
  { keywords: ['sewage', 'sewer', 'manhole', 'sewage leak', 'sewage overflow', 'open manhole'], category: 'sewage-leak', departmentId: 'drainage', priorityBoost: 'critical' },
];

const SEVERITY_CRITICAL = ['hospital', 'clinic', 'medical', 'health', 'emergency', 'accident', 'danger', 'life', 'death', 'fire', 'electric', 'exposed wire', 'school', 'child'];
const SEVERITY_HIGH = ['safety', 'traffic', 'accident', 'injury', 'dark', 'night', 'crime', 'chain snatch', 'large', 'deep', 'many people', 'families', 'households', 'entire'];
const SEVERITY_MEDIUM = ['inconvenience', 'smell', 'foul', 'dirty', 'unclean', 'late', 'delay'];

function determinePriority(text: string, rule?: KeywordRule): { priority: Priority; reason: string } {
  const lower = text.toLowerCase();

  if (rule?.priorityBoost === 'critical') {
    if (SEVERITY_CRITICAL.some((k) => lower.includes(k)) || rule.priorityBoost === 'critical') {
      return {
        priority: 'critical',
        reason: 'This issue poses an immediate risk to health, safety, or essential services. Critical priority is assigned to ensure fastest possible response.',
      };
    }
  }

  if (SEVERITY_CRITICAL.some((k) => lower.includes(k))) {
    return {
      priority: 'critical',
      reason: 'The description mentions health hazards, safety risks, or proximity to sensitive facilities like hospitals or schools. This warrants critical priority.',
    };
  }

  if (rule?.priorityBoost === 'high' || SEVERITY_HIGH.some((k) => lower.includes(k))) {
    return {
      priority: 'high',
      reason: 'The issue affects safety, traffic flow, or a large number of people. High priority is assigned to ensure prompt departmental action.',
    };
  }

  if (SEVERITY_MEDIUM.some((k) => lower.includes(k))) {
    return {
      priority: 'medium',
      reason: 'The issue causes inconvenience to residents but does not pose an immediate safety risk. Medium priority ensures it is addressed within standard timelines.',
    };
  }

  return {
    priority: 'low',
    reason: 'The issue appears to be a minor inconvenience with limited impact. Low priority is assigned, but it will still be tracked and addressed.',
  };
}

function generateTitle(text: string, category: ComplaintCategory): string {
  const categoryLabel = getCategoryLabel(category);
  const firstSentence = text.split(/[.!]/)[0].trim();
  if (firstSentence.length > 0 && firstSentence.length <= 80) {
    return firstSentence;
  }
  if (firstSentence.length > 80) {
    return firstSentence.substring(0, 77) + '...';
  }
  return `${categoryLabel} issue reported by citizen`;
}

function getCategoryLabel(category: ComplaintCategory): string {
  const labels: Record<ComplaintCategory, string> = {
    pothole: 'Pothole',
    'road-damage': 'Road Damage',
    'bus-service': 'Bus Service',
    'power-outage': 'Power Outage',
    'streetlight-fault': 'Streetlight',
    'water-leak': 'Water Leak',
    'no-water-supply': 'Water Supply',
    'garbage-collection': 'Garbage Collection',
    'overflowing-dump': 'Garbage Overflow',
    'drainage-block': 'Drainage',
    'sewage-leak': 'Sewage',
    other: 'Civic',
  };
  return labels[category];
}

function generateFormalDescription(
  text: string,
  category: ComplaintCategory,
  departmentId: DepartmentId,
  location: string,
  landmark: string,
): string {
  const dept = getDepartment(departmentId);
  const categoryLabel = getCategoryLabel(category);
  const parts: string[] = [];

  parts.push(`Category: ${categoryLabel}`);
  parts.push(`Assigned Department: ${dept?.name || 'Municipal Services'}`);
  if (location) parts.push(`Location: ${location}`);
  if (landmark) parts.push(`Nearby Landmark: ${landmark}`);
  parts.push('');
  parts.push(`Citizen Report:`);
  parts.push(text.trim());

  return parts.join('\n');
}

export function classifyComplaint(
  title: string,
  description: string,
  location: string,
  landmark: string,
): ClassificationResult {
  const combinedText = `${title} ${description} ${location} ${landmark}`.toLowerCase();

  let matchedRule: KeywordRule | undefined;

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => combinedText.includes(kw))) {
      matchedRule = rule;
      break;
    }
  }

  if (!matchedRule) {
    matchedRule = {
      keywords: [],
      category: 'other',
      departmentId: 'roads',
    };
  }

  const { priority, reason } = determinePriority(combinedText, matchedRule);
  const formalDescription = generateFormalDescription(
    description || title,
    matchedRule.category,
    matchedRule.departmentId,
    location,
    landmark,
  );

  const suggestedTitle = title.trim().length > 0
    ? generateTitle(title, matchedRule.category)
    : generateTitle(description, matchedRule.category);

  return {
    category: matchedRule.category,
    departmentId: matchedRule.departmentId,
    priority,
    priorityReason: reason,
    formalDescription,
    suggestedTitle,
  };
}

export function generateCitizenUpdate(
  departmentName: string,
  inspectionStatus: string,
  workSanctioned: string,
  workStartDate: string,
  expectedCompletionDate: string,
  delayReason: string,
  resolutionNotes: string,
  isResolution: boolean,
): string {
  const parts: string[] = [];

  if (isResolution && resolutionNotes.trim()) {
    parts.push(`We are pleased to inform you that this complaint has been resolved.`);
    parts.push('');
    parts.push(`Resolution Details: ${resolutionNotes.trim()}`);
    parts.push('');
    parts.push(`We thank you for reporting this issue and for your patience during the resolution process. Your civic participation helps improve our community.`);
    return parts.join('\n');
  }

  const inspectionLabel: Record<string, string> = {
    'pending': 'inspection is yet to be scheduled',
    'scheduled': 'a site inspection has been scheduled',
    'completed': 'a site inspection has been completed',
    'not-required': 'no site inspection is required for this case',
  };

  const sanctionLabel: Record<string, string> = {
    'yes': 'repair work has been sanctioned and approved',
    'no': 'repair work has not been sanctioned at this time',
    'pending': 'work sanction approval is currently pending',
  };

  parts.push(`This is an update from the ${departmentName} regarding your complaint.`);
  parts.push('');
  parts.push(`Inspection Status: ${inspectionLabel[inspectionStatus] || 'inspection status is being reviewed'}.`);
  parts.push(`Work Sanctioned: ${sanctionLabel[workSanctioned] || 'work sanction status is pending'}.`);

  if (workStartDate) {
    parts.push(`Work Start Date: ${new Date(workStartDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`);
  }

  if (expectedCompletionDate) {
    parts.push(`Expected Completion: ${new Date(expectedCompletionDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`);
  }

  if (delayReason.trim()) {
    parts.push('');
    parts.push(`Delay Explanation: ${delayReason.trim()}`);
  }

  if (resolutionNotes.trim()) {
    parts.push('');
    parts.push(`Additional Notes: ${resolutionNotes.trim()}`);
  }

  parts.push('');
  parts.push(`We will continue to provide updates as the situation progresses. Thank you for your patience.`);

  return parts.join('\n');
}
