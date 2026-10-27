import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Users,
  HeartHandshake,
  ListChecks,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  Megaphone,
  GraduationCap,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/ui/StatCard';
import { Tabs } from '../components/ui/Tabs';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { AnnouncementItem } from '../components/dashboard/AnnouncementItem';

export function Home({
  userProfile,
  events,
  clubs,
  volunteerRoles,
  tasks,
  announcements,
  onNavigate,
  onRegisterEvent,
  onJoinClub,
  onOpenEventDetails,
  onOpenClubDetails,
}) {
  const [allAnnouncementsOpen, setAllAnnouncementsOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcementScope, setAnnouncementScope] = useState('all'); // 'all' | 'branch' | 'division'

  const userBranch = userProfile.branchCode || 'CSE';
  const userDiv = userProfile.division || 'Div A';

  const publishedEvents = events.filter((e) => e.approvalStatus === 'Published');
  const registeredEvents = publishedEvents.filter((e) => e.isRegistered);
  const joinedClubs = clubs.filter((c) => c.membershipState === 'Joined');
  const activeShifts = volunteerRoles.filter((r) => r.status === 'Approved');
  const pendingTasks = tasks.filter((t) => !t.completed);

  const formatPad = (num) => String(num).padStart(2, '0');

  // Filter announcements by Campus-Wide, My Branch, or My Division
  const scopedAnnouncements = useMemo(() => {
    return announcements.filter((ann) => {
      const b = ann.targetBranch || 'ALL';
      const d = ann.targetDivision || 'ALL';

      if (announcementScope === 'division') {
        return b === userBranch && d === userDiv;
      }
      if (announcementScope === 'branch') {
        return b === userBranch;
      }
      return (
        b === 'ALL' ||
        (b === userBranch && (d === 'ALL' || d === userDiv))
      );
    });
  }, [announcements, announcementScope, userBranch, userDiv]);

  const recommendedEvents = publishedEvents
    .filter((e) => !e.isRegistered)
    .slice(0, 2);
  const displayRecommendedEvents =
    recommendedEvents.length > 0
      ? recommendedEvents
      : publishedEvents.slice(0, 2);

  const recommendedClubs = clubs
    .filter(
      (c) =>
        c.membershipState !== 'Joined' &&
        c.approvalStatus !== 'Pending Approval'
    )
    .slice(0, 2);

  const upcomingSchedule = [
    ...registeredEvents.map((e) => ({
      id: `sched-evt-${e.id}`,
      type: 'Event',
      title: e.title,
      date: e.date,
      monthShort: e.monthShort,
      dayNumber: e.dayNumber,
      time: e.startTime,
      location: e.venue,
      status: 'Registered',
      rawItem: e,
    })),
    ...activeShifts.map((s) => ({
      id: `sched-vol-${s.id}`,
      type: 'Volunteer Shift',
      title: `${s.title} (${s.eventTitle})`,
      date: s.date,
      monthShort: s.date.startsWith('2026-10') ? 'OCT' : 'NOV',
      dayNumber: s.date.slice(-2),
      time: s.time.split('–')[0].trim(),
      location: s.venue,
      status: 'Confirmed Shift',
      rawItem: s,
    })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8">
      {/* A. Solid Minimalist Welcome Hero Banner with Branch + Division Pill */}
      <Card
        padding="p-6 sm:p-7"
        className="relative overflow-hidden border-t-4 border-t-[#F63F3A]"
      >
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#363636]/75 mb-2">
              <Badge variant="primary" dot>
                USTU · {userProfile.yearShort || '3rd Year'} · {userBranch} ·{' '}
                {userDiv} ({userProfile.labBatch || 'Batch A1'})
              </Badge>
              {userProfile.isCR && <Badge variant="dark">Class Rep (CR)</Badge>}
              <Badge variant="warning">60% Practical NEP Track</Badge>
              <span>·</span>
              <span className="font-semibold text-[#363636]">
                Roll {userProfile.rollNo || 'USTU-CS-3A-08'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#363636]">
              Good morning, {userProfile.shortName}
            </h1>
            <p className="text-sm text-[#363636]/80 mt-1">
              Universal SkillTech University ·{' '}
              <strong className="text-[#F63F3A]">
                Learn + Work + Network = Placement
              </strong>{' '}
              · {userBranch} {userDiv} Workspace
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
            <Button
              variant="secondary"
              size="md"
              icon={GraduationCap}
              onClick={() => onNavigate('classroom')}
            >
              My {userBranch} {userDiv} Hub
            </Button>
            <Button
              variant="primary"
              size="md"
              iconRight={ArrowRight}
              onClick={() => onNavigate('events')}
            >
              Explore events
            </Button>
          </div>
        </div>
      </Card>

      {/* B. Quick Statistics */}
      <section aria-label="Quick campus statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={CalendarDays}
            label="Upcoming Events"
            value={formatPad(registeredEvents.length)}
            subtext="OD attendance linked"
            onClick={() => onNavigate('events')}
          />
          <StatCard
            icon={Users}
            label="My Club Memberships"
            value={formatPad(joinedClubs.length)}
            subtext="Active communities"
            onClick={() => onNavigate('clubs')}
          />
          <StatCard
            icon={HeartHandshake}
            label="Active Volunteer Shifts"
            value={formatPad(activeShifts.length)}
            subtext="7.5 service hrs scheduled"
            onClick={() => onNavigate('volunteering')}
          />
          <StatCard
            icon={ListChecks}
            label="Pending Actions"
            value={formatPad(pendingTasks.length)}
            subtext="Volunteer tasks to complete"
            onClick={() => onNavigate('volunteering')}
          />
        </div>
      </section>

      {/* Main Two-Column Grid: Targeted Announcements & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* C. Campus, Branch & Division Announcements (7 cols) */}
        <section
          aria-labelledby="announcements-heading"
          className="lg:col-span-7 space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#F63F3A]" />
              <h2
                id="announcements-heading"
                className="text-base font-bold text-[#363636]"
              >
                Targeted Announcements
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Tabs
                tabs={[
                  { id: 'all', label: 'All Feed' },
                  { id: 'branch', label: `${userBranch} Branch` },
                  { id: 'division', label: `${userBranch} ${userDiv}` },
                ]}
                activeTab={announcementScope}
                onChange={setAnnouncementScope}
              />
              <button
                type="button"
                onClick={() => setAllAnnouncementsOpen(true)}
                className="text-xs font-semibold text-[#17AAAA] hover:text-[#F63F3A] inline-flex items-center gap-1 shrink-0 ml-1"
              >
                All
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <Card
            padding="p-0"
            className="divide-y divide-[#363636]/15 overflow-hidden"
          >
            {scopedAnnouncements.slice(0, 4).map((ann) => (
              <AnnouncementItem
                key={ann.id}
                announcement={ann}
                onSelect={(item) => setSelectedAnnouncement(item)}
              />
            ))}
          </Card>
        </section>

        {/* E. Upcoming Schedule (5 cols) */}
        <section
          aria-labelledby="schedule-heading"
          className="lg:col-span-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#17AAAA]" />
              <h2
                id="schedule-heading"
                className="text-base font-bold text-[#363636]"
              >
                Upcoming Schedule
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="text-xs font-semibold text-[#17AAAA] hover:text-[#F63F3A]"
            >
              Full agenda & classes
            </button>
          </div>

          {upcomingSchedule.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No upcoming activities"
              description="Register for campus workshops or apply for volunteer shifts to build your schedule."
              actionLabel="Explore events"
              onAction={() => onNavigate('events')}
            />
          ) : (
            <Card
              padding="p-0"
              className="divide-y divide-[#363636]/15 overflow-hidden"
            >
              {upcomingSchedule.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'Event') {
                      onOpenEventDetails(item.rawItem);
                    } else {
                      onNavigate('volunteering');
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (item.type === 'Event') {
                        onOpenEventDetails(item.rawItem);
                      } else {
                        onNavigate('volunteering');
                      }
                    }
                  }}
                  className="p-3.5 hover:bg-[#EEEEEE] transition-colors flex items-start gap-3 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#363636] flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-[#FFA42E] leading-none">
                      {item.monthShort}
                    </span>
                    <span className="text-sm font-bold text-[#EEEEEE] leading-tight mt-0.5">
                      {item.dayNumber}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant={
                          item.type === 'Volunteer Shift'
                            ? 'warning'
                            : 'primary'
                        }
                      >
                        {item.status}
                      </Badge>
                      <span className="text-[11px] font-semibold text-[#363636]/75">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#363636] mt-1 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#363636]/75 mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#F63F3A] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </section>
      </div>

      {/* D. Recommended For You */}
      <section aria-labelledby="recommended-heading" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFA42E]" />
              <h2
                id="recommended-heading"
                className="text-base font-bold text-[#363636]"
              >
                Recommended for {userBranch} ({userDiv})
              </h2>
            </div>
            <p className="text-xs text-[#363636]/75 mt-0.5">
              Curated based on your branch ({userBranch}) and interests in{' '}
              <span className="text-[#17AAAA] font-semibold">
                {userProfile.interests.slice(0, 3).join(', ')}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayRecommendedEvents.map((evt) => (
            <Card
              key={evt.id}
              padding="p-4"
              interactive
              className="flex flex-col justify-between border-t-4 border-t-[#F63F3A]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <Badge variant="danger">Event · {evt.category}</Badge>
                  <span className="text-xs font-bold text-[#363636]">
                    {evt.monthShort} {evt.dayNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenEventDetails(evt)}
                  className="text-left block w-full group"
                >
                  <h3 className="text-sm font-bold text-[#363636] group-hover:text-[#17AAAA] line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[#363636]/75 mt-1 line-clamp-2 leading-relaxed">
                    {evt.shortDescription}
                  </p>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#363636]/15 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#363636]/75 truncate">
                  {evt.venue}
                </span>
                {evt.isRegistered ? (
                  <Badge variant="success" dot>
                    Registered
                  </Badge>
                ) : (
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => onRegisterEvent(evt.id)}
                  >
                    Register
                  </Button>
                )}
              </div>
            </Card>
          ))}

          {recommendedClubs.map((club) => (
            <Card
              key={club.id}
              padding="p-4"
              interactive
              className="flex flex-col justify-between border-t-4 border-t-[#FFA42E]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <Badge variant="warning">Club · {club.category}</Badge>
                  <span className="text-xs font-medium text-[#363636]/75">
                    {club.memberCount} members
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenClubDetails(club)}
                  className="text-left block w-full group"
                >
                  <h3 className="text-sm font-bold text-[#363636] group-hover:text-[#17AAAA] line-clamp-1">
                    {club.name}
                  </h3>
                  <p className="text-xs text-[#363636]/75 mt-1 line-clamp-2 leading-relaxed">
                    {club.shortDescription}
                  </p>
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-[#363636]/15 flex items-center justify-between gap-2">
                <span className="text-[11px] text-[#363636]/75">
                  {club.requiresApproval ? 'Approval required' : 'Open to join'}
                </span>
                {club.membershipState === 'Joined' ? (
                  <Badge variant="success" dot>
                    Joined
                  </Badge>
                ) : club.membershipState === 'Pending Approval' ? (
                  <Badge variant="warning">Applied</Badge>
                ) : (
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => onJoinClub(club.id)}
                  >
                    {club.requiresApproval ? 'Apply' : 'Join'}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Single Announcement Detail Modal */}
      <Modal
        isOpen={Boolean(selectedAnnouncement)}
        onClose={() => setSelectedAnnouncement(null)}
        title={selectedAnnouncement?.title || 'Announcement'}
        subtitle={
          selectedAnnouncement
            ? `${selectedAnnouncement.source} · ${selectedAnnouncement.authorRole} · ${selectedAnnouncement.date}`
            : ''
        }
        footer={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedAnnouncement(null)}
          >
            Close
          </Button>
        }
      >
        {selectedAnnouncement && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="primary">{selectedAnnouncement.category}</Badge>
              {selectedAnnouncement.targetBranch &&
                selectedAnnouncement.targetBranch !== 'ALL' && (
                  <Badge variant="dark">
                    Target: {selectedAnnouncement.targetBranch}{' '}
                    {selectedAnnouncement.targetDivision !== 'ALL'
                      ? selectedAnnouncement.targetDivision
                      : 'All Divisions'}
                  </Badge>
                )}
            </div>
            <p className="text-sm text-[#363636] leading-relaxed">
              {selectedAnnouncement.content}
            </p>
          </div>
        )}
      </Modal>

      {/* All Announcements Modal */}
      <Modal
        isOpen={allAnnouncementsOpen}
        onClose={() => setAllAnnouncementsOpen(false)}
        title="All Campus, Branch & Division Announcements"
        subtitle="Official notices from student councils, departments, CRs, and campus facilities"
        maxWidth="max-w-2xl"
        footer={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setAllAnnouncementsOpen(false)}
          >
            Done
          </Button>
        }
      >
        <div className="divide-y divide-[#363636]/15 -mx-5 -my-4">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-5 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {ann.targetBranch && ann.targetBranch !== 'ALL' && (
                    <Badge variant="dark">
                      {ann.targetBranch}{' '}
                      {ann.targetDivision !== 'ALL'
                        ? ann.targetDivision
                        : 'Branch'}
                    </Badge>
                  )}
                  <Badge variant="primary">{ann.category}</Badge>
                  <span className="text-xs font-bold text-[#363636]">
                    {ann.source}
                  </span>
                </div>
                <span className="text-xs text-[#363636]/75">
                  {ann.date} ({ann.relativeTime})
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#363636] pt-1">
                {ann.title}
              </h3>
              <p className="text-xs text-[#363636]/80 leading-relaxed">
                {ann.content}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
