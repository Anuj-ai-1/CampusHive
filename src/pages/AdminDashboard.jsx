import React from 'react';
import {
  Users,
  CalendarCheck,
  Building2,
  Clock,
  Check,
  X,
  Activity,
  MessageSquareText,
  Crown,
  Award,
  Eye,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { AdminCharts } from '../components/dashboard/AdminCharts';
import { ADMIN_ANALYTICS_DATA } from '../data/mockData';

export function AdminDashboard({
  events,
  clubs,
  feedbackList,
  onApproveEvent,
  onRejectEvent,
  onApproveClub,
  onRejectClub,
  onOpenClubDetails,
  onUpdateFeedbackStatus,
  onNavigate,
}) {
  const publishedEvents = events.filter(
    (e) => e.approvalStatus === 'Published'
  );
  const pendingEvents = events.filter(
    (e) => e.approvalStatus === 'Pending Approval'
  );
  const approvedClubs = clubs.filter((c) => c.approvalStatus !== 'Pending Approval');
  const pendingClubs = clubs.filter((c) => c.approvalStatus === 'Pending Approval');
  const openFeedback = feedbackList.filter((f) => f.status !== 'Resolved');

  const totalPendingCount =
    pendingClubs.length + pendingEvents.length + openFeedback.length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Institutional oversight for student club creation permissions, campus events, and grievance resolution."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('clubs')}
            >
              View All Clubs
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('events')}
            >
              Manage Events
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <section aria-label="University KPIs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Users}
            label="Total Students"
            value="4,820"
            subtext="94% active on UniHive"
          />
          <StatCard
            icon={CalendarCheck}
            label="Published Events"
            value={String(publishedEvents.length).padStart(2, '0')}
            subtext="Fall 2026 calendar"
          />
          <StatCard
            icon={Building2}
            label="Approved Active Clubs"
            value={String(approvedClubs.length).padStart(2, '0')}
            subtext={`${pendingClubs.length} club request(s) awaiting permission`}
          />
          <StatCard
            icon={Clock}
            label="Pending Approvals"
            value={String(totalPendingCount).padStart(2, '0')}
            subtext={`${pendingClubs.length} clubs · ${pendingEvents.length} events · ${openFeedback.length} tickets`}
          />
        </div>
      </section>

      {/* PRIORITY QUEUE: Student Club Creation Requests (Requires Admin Permission) */}
      <section aria-labelledby="club-requests-heading">
        <Card padding="p-5 sm:p-6" className="space-y-4 border-indigo-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#363636]">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#17AAAA]" />
                <h2
                  id="club-requests-heading"
                  className="text-base font-semibold text-[#363636]"
                >
                  Student Club Creation Requests (Permission Queue)
                </h2>
              </div>
              <p className="text-xs text-[#363636] mt-0.5">
                Students have proposed the following clubs with assigned Leaders,
                Vice Leaders, and founding members. Grant permission to make
                them official.
              </p>
            </div>
            <Badge variant={pendingClubs.length > 0 ? 'warning' : 'success'} dot>
              {pendingClubs.length} Awaiting Permission
            </Badge>
          </div>

          {pendingClubs.length === 0 ? (
            <EmptyState
              icon={Building2}
              title="No pending club creation requests"
              description="All student-proposed clubs have been reviewed and granted permission."
              className="py-8"
            />
          ) : (
            <div className="divide-y divide-[#363636]">
              {pendingClubs.map((club) => (
                <div
                  key={club.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary">{club.category}</Badge>
                      <span className="text-xs text-[#363636]">
                        Proposed by{' '}
                        <strong className="text-[#363636]">
                          {club.createdByName || 'Anuj Sharma'}
                        </strong>
                      </span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-[#363636]">
                        {club.members?.length || club.memberCount} Founding
                        Members
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#363636]">
                      {club.name}
                    </h3>
                    <p className="text-xs text-[#363636] leading-relaxed">
                      {club.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-[#363636]">
                        <Crown className="w-3.5 h-3.5 text-[#17AAAA]" />
                        <strong>Leader:</strong> {club.leadName}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[#363636]">
                        <Award className="w-3.5 h-3.5 text-[#363636]" />
                        <strong>Vice Leader:</strong>{' '}
                        {club.viceLeadName || 'Assigned'}
                      </span>
                      {club.secretaryName && (
                        <span className="text-[#363636]">
                          <strong>Secretary:</strong> {club.secretaryName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onOpenClubDetails(club)}
                    >
                      Inspect Roster
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={X}
                      onClick={() => onRejectClub(club.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Check}
                      onClick={() => onApproveClub(club.id)}
                    >
                      Grant Permission & Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Analytics Charts */}
      <section aria-label="Participation analytics">
        <AdminCharts
          registrationsTrend={ADMIN_ANALYTICS_DATA.registrationsTrend}
          categoryParticipation={ADMIN_ANALYTICS_DATA.categoryParticipation}
        />
      </section>

      {/* Action Queues: Pending Event Approvals & Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pending Event Approvals (7 cols) */}
        <Card padding="p-5" className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#363636]">
                Pending Event Proposals
              </h2>
              <p className="text-xs text-[#363636] mt-0.5">
                Approve club event proposals to publish them immediately to the
                student directory
              </p>
            </div>
            <Badge variant={pendingEvents.length > 0 ? 'warning' : 'success'}>
              {pendingEvents.length} Pending
            </Badge>
          </div>

          {pendingEvents.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="All event proposals reviewed"
              description="No club event proposals are currently waiting for administrative clearance."
              className="py-8"
            />
          ) : (
            <div className="divide-y divide-[#363636]">
              {pendingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">{evt.category}</Badge>
                      <span className="text-xs font-medium text-[#17AAAA]">
                        {evt.organizer}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-[#363636]">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[#363636]">
                      {evt.date} · {evt.startTime} · {evt.venue} (Cap:{' '}
                      {evt.capacity})
                    </p>
                    <p className="text-xs text-[#363636] line-clamp-1">
                      {evt.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="danger"
                      size="xs"
                      icon={X}
                      onClick={() => onRejectEvent(evt.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      size="xs"
                      icon={Check}
                      onClick={() => onApproveEvent(evt.id)}
                    >
                      Approve & Publish
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Activities & Feedback Review (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card padding="p-5" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquareText className="w-4 h-4 text-[#17AAAA]" />
                <h2 className="text-sm font-semibold text-[#363636]">
                  Feedback Resolution Queue
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('feedback')}
                className="text-xs font-medium text-[#17AAAA] hover:underline"
              >
                All tickets
              </button>
            </div>

            <div className="divide-y divide-[#363636]">
              {feedbackList.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold text-[#363636]">
                        {item.referenceId}
                      </span>
                      <Badge
                        variant={
                          item.status === 'Resolved'
                            ? 'success'
                            : item.status === 'In Progress'
                            ? 'warning'
                            : 'neutral'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-[#363636] mt-1 truncate">
                      {item.subject}
                    </p>
                  </div>

                  {item.status !== 'Resolved' && (
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() =>
                        onUpdateFeedbackStatus(
                          item.id,
                          item.status === 'Open' ? 'In Progress' : 'Resolved'
                        )
                      }
                    >
                      {item.status === 'Open' ? 'Start Review' : 'Resolve'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card padding="p-5" className="space-y-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#17AAAA]" />
              <h2 className="text-sm font-semibold text-[#363636]">
                Recent Campus Operations Log
              </h2>
            </div>

            <div className="space-y-2.5">
              {ADMIN_ANALYTICS_DATA.recentAdminLogs.map((log) => (
                <div
                  key={log.id}
                  className="text-xs border-l-2 border-[#363636] pl-3 py-0.5"
                >
                  <p className="font-medium text-[#363636]">{log.action}</p>
                  <p className="text-[11px] text-[#363636]">
                    {log.actor} · {log.time}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
