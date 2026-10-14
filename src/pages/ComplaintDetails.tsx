import {
  ArrowLeft, MapPin, Clock, ThumbsUp, Share2, Flag,
  CheckCircle2, Circle, User, Building2, Cpu, Calendar,
  MessageSquare, AlertTriangle, FileCheck, Image as ImageIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { DepartmentIcon } from '@/components/ui/DepartmentIcon';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { CATEGORY_LABELS, STATUS_CONFIG } from '@/data/demoData';
import { getDepartment } from '@/data/departments';
import { useRouter } from '@/router/Router';
import { useStore } from '@/store/ComplaintStore';
import type { TimelineEvent } from '@/types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

function getActorIcon(actor: TimelineEvent['actor']) {
  switch (actor) {
    case 'citizen': return User;
    case 'department': return Building2;
    case 'system': return Cpu;
  }
}

export function ComplaintDetails({ id }: { id: string }) {
  const { navigate } = useRouter();
  const { getComplaint, loading } = useStore();
  const complaint = getComplaint(id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-navy-50">
        <DemoBanner />
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-navy-400">Loading complaint...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col">
        <DemoBanner />
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="p-12 text-center max-w-md">
            <AlertTriangle size={36} className="text-navy-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-navy-900 mb-2">Complaint Not Found</h2>
            <p className="text-sm text-navy-500 mb-6">
              This complaint may have been removed or the ticket ID is incorrect.
            </p>
            <Button onClick={() => navigate('/citizen/complaints')}>
              Back to Complaints
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const dept = getDepartment(complaint.departmentId);
  const isResolved = complaint.status === 'resolved';
  const isRejected = complaint.status === 'rejected';
  const isSubmitted = complaint.status === 'submitted';

  return (
    <div className="min-h-screen flex flex-col bg-navy-50">
      <DemoBanner />
      <PublicHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/citizen/complaints" className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-700">
            <ArrowLeft size={16} />
            Back to complaints
          </Link>
        </div>

        {/* Header card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <DepartmentIcon departmentId={complaint.departmentId} size={36} className="w-14 h-14 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-xs font-mono font-semibold text-navy-400">
                  {complaint.ticketId}
                  <span className="ml-1.5 text-[10px] text-teal-600">(CivicPulse Demo Case ID)</span>
                </span>
                <PriorityBadge priority={complaint.priority} />
                <StatusBadge status={complaint.status} />
              </div>
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-navy-900 leading-tight">
                {complaint.title}
              </h1>
            </div>
          </div>

          <p className="text-sm text-navy-600 leading-relaxed mb-4">{complaint.description}</p>

          {/* Meta info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-navy-100">
            <div>
              <p className="text-xs text-navy-400 mb-1">Department</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dept?.color }} />
                <span className="text-sm font-semibold text-navy-700">{dept?.name}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Category</p>
              <p className="text-sm font-semibold text-navy-700">{CATEGORY_LABELS[complaint.category]}</p>
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Location</p>
              <p className="text-sm font-semibold text-navy-700 flex items-center gap-1">
                <MapPin size={13} />
                {complaint.ward}
              </p>
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Filed On</p>
              <p className="text-sm font-semibold text-navy-700 flex items-center gap-1">
                <Clock size={13} />
                {formatDate(complaint.createdAt)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-navy-100 mt-4">
            <Button size="sm" variant="outline">
              <ThumbsUp size={15} />
              Upvote ({complaint.upvotes})
            </Button>
            <Button size="sm" variant="outline">
              <Share2 size={15} />
              Share
            </Button>
            <Button size="sm" variant="ghost" className="text-navy-400 ml-auto">
              <Flag size={15} />
              Report
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left — timeline & responses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-sm font-bold text-navy-900 mb-5 flex items-center gap-2">
                <Calendar size={16} className="text-teal-600" />
                Complaint Timeline
              </h2>
              <div className="space-y-0">
                {complaint.timeline.map((event, i) => {
                  const isLast = i === complaint.timeline.length - 1;
                  const actorIcon = getActorIcon(event.actor);
                  const ActorIcon = actorIcon;
                  const config = STATUS_CONFIG[event.status];

                  return (
                    <div key={event.id} className="flex gap-4">
                      {/* Timeline line & dot */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isLast && !isResolved && !isRejected
                            ? 'bg-teal-500 ring-4 ring-teal-100'
                            : event.status === 'resolved'
                              ? 'bg-green-500'
                              : 'bg-navy-200'
                        }`}>
                          {event.status === 'resolved' ? (
                            <CheckCircle2 size={16} className="text-white" />
                          ) : isLast && !isResolved ? (
                            <Circle size={14} className="text-white" />
                          ) : (
                            <CheckCircle2 size={14} className="text-white" />
                          )}
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-navy-100 my-1 min-h-[24px]" />}
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold ${config.textColor}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-navy-400">·</span>
                          <span className="text-xs text-navy-400">{event.date} · {event.time}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-navy-900 mb-1">{event.title}</h3>
                        <p className="text-xs text-navy-500 leading-relaxed mb-2">{event.description}</p>
                        <div className="flex items-center gap-1.5 text-xs text-navy-400">
                          <ActorIcon size={12} />
                          <span>{event.actorName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Department responses */}
            <Card className="p-6">
              <h2 className="text-sm font-bold text-navy-900 mb-5 flex items-center gap-2">
                <MessageSquare size={16} className="text-teal-600" />
                Department Responses
              </h2>
              {complaint.responses.length > 0 ? (
                <div className="space-y-4">
                  {complaint.responses.map((response) => (
                    <div key={response.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-xl bg-navy-100 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-navy-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold text-navy-900">{response.author}</span>
                          <span className="text-xs text-navy-400">·</span>
                          <span className="text-xs text-navy-400">{response.authorRole}</span>
                          {response.isDemo && (
                            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                              Demo Update
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-navy-600 leading-relaxed bg-navy-50 rounded-xl p-3 border border-navy-100">
                          {response.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-navy-400">{formatDateTime(response.date)}</span>
                          {response.type === 'resolution' && (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Resolution
                            </span>
                          )}
                          {response.type === 'delay-explanation' && (
                            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                              Delay Explanation
                            </span>
                          )}
                          {response.type === 'update' && (
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              Update
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare size={28} className="text-navy-300 mx-auto mb-2" />
                  <p className="text-sm text-navy-400">
                    {isSubmitted
                      ? 'The department has not responded yet. You will be notified when they do.'
                      : 'No department responses yet.'}
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Right — status info & details */}
          <div className="space-y-6">
            {/* Expected completion */}
            <Card className={`p-5 ${isResolved ? 'bg-green-50 border-green-200' : isRejected ? 'bg-red-50 border-red-200' : ''}`}>
              {isResolved ? (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-green-900">Issue Resolved</h3>
                  <p className="text-xs text-green-700 mt-1">
                    Resolved on {formatDate(complaint.updatedAt)}
                  </p>
                </div>
              ) : isRejected ? (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle size={28} className="text-red-600" />
                  </div>
                  <h3 className="text-sm font-bold text-red-900">Complaint Rejected</h3>
                  <p className="text-xs text-red-700 mt-1">
                    Please contact the department for more information.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-teal-600" />
                    <h3 className="text-sm font-bold text-navy-900">Expected Completion</h3>
                  </div>
                  <p className="text-2xl font-display font-extrabold text-navy-900">
                    {formatDate(complaint.expectedCompletion)}
                  </p>
                  <div className="mt-4 pt-4 border-t border-navy-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-navy-400">Current Status</span>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-navy-400">Last Updated</span>
                      <span className="text-xs font-semibold text-navy-700">{formatDate(complaint.updatedAt)}</span>
                    </div>
                  </div>
                </>
              )}
            </Card>

            {/* Complaint details */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-navy-900 mb-4">Complaint Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Ticket ID', value: complaint.ticketId },
                  { label: 'Filed By', value: complaint.citizenName },
                  { label: 'Department', value: dept?.name || '—' },
                  { label: 'Category', value: CATEGORY_LABELS[complaint.category] },
                  { label: 'Location', value: complaint.location },
                  { label: 'Ward', value: complaint.ward },
                  { label: 'Zone', value: complaint.zone },
                  { label: 'Priority', value: complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1) },
                  { label: 'Upvotes', value: String(complaint.upvotes) },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3">
                    <span className="text-xs text-navy-400 shrink-0">{item.label}</span>
                    <span className="text-xs font-semibold text-navy-700 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Photos placeholder */}
            <Card className="p-5">
              <h3 className="text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                <ImageIcon size={16} className="text-teal-600" />
                Attached Photos
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square rounded-xl bg-navy-100 flex items-center justify-center">
                  <ImageIcon size={24} className="text-navy-300" />
                </div>
                <div className="aspect-square rounded-xl bg-navy-100 flex items-center justify-center">
                  <ImageIcon size={24} className="text-navy-300" />
                </div>
              </div>
              <p className="text-xs text-navy-400 mt-2 text-center">No photos attached in demo</p>
            </Card>

            {/* Citizen action */}
            {!isResolved && !isRejected && (
              <Card className="p-5 bg-navy-900 border-navy-800 text-white">
                <h3 className="text-sm font-bold text-white mb-2">Citizen Actions</h3>
                <p className="text-xs text-navy-300 mb-4">
                  You can add a comment or withdraw this complaint.
                </p>
                <div className="space-y-2">
                  <Button size="sm" fullWidth onClick={() => {}}>
                    <MessageSquare size={15} />
                    Add Comment
                  </Button>
                  <Button size="sm" variant="outline" fullWidth className="border-navy-600 text-white hover:bg-navy-800">
                    Withdraw Complaint
                  </Button>
                </div>
              </Card>
            )}

            {isResolved && (
              <Card className="p-5 bg-navy-900 border-navy-800 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck size={18} className="text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Confirm Resolution</h3>
                </div>
                <p className="text-xs text-navy-300 mb-4">
                  Was this issue actually resolved? Your feedback helps improve accountability.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" onClick={() => {}}>
                    <CheckCircle2 size={15} />
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline" className="border-navy-600 text-white hover:bg-navy-800">
                    Reopen
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Department workspace link */}
        <Card className="p-4 bg-navy-50 border-navy-200 mt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-navy-600" />
              <p className="text-xs text-navy-600">
                Are you department staff? Open the complaint management workspace to update status and respond.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => navigate(`/department/workspace/${complaint.id}`)}>
              Manage Complaint
            </Button>
          </div>
        </Card>

        <p className="text-xs text-navy-400 text-center mt-8">
          Demo data — this is an illustrative complaint record, not a real civic submission. Department responses marked as "Demo Update" are simulated by CivicPulse AI, not real government communications.
        </p>
      </main>
    </div>
  );
}
