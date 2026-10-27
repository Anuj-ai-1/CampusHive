import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Plus,
  MapPin,
  Clock,
  Users,
  Check,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Tabs } from '../components/ui/Tabs';
import { Select } from '../components/ui/Select';
import { EventCard } from '../components/events/EventCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';

const CATEGORIES = [
  'All Categories',
  'Technical',
  'Flagship',
  'Competition',
  'Exhibition',
  'Career & Leadership',
  'Creative & Arts',
  'Design',
  'Cultural & Literary',
];

const BRANCH_FILTERS = [
  { value: 'ALL', label: 'All Branches (Campus-Wide)' },
  { value: 'CSE', label: 'CSE Eligible' },
  { value: 'IT', label: 'IT Eligible' },
  { value: 'ECE', label: 'ECE Eligible' },
  { value: 'AIML', label: 'AIML Eligible' },
  { value: 'MECH', label: 'MECH Eligible' },
];

export function Events({
  events,
  userProfile,
  role,
  globalSearch,
  onRegisterEvent,
  onCancelRegistration,
  onCreateEvent,
  selectedEventForModal,
  onCloseEventModal,
  onOpenEventDetails,
}) {
  const [viewFilter, setViewFilter] = useState('all'); // 'all' | 'registered' | 'my-branch'
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [localSearch, setLocalSearch] = useState('');
  const [eventToCancel, setEventToCancel] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [odDivisionFilter, setOdDivisionFilter] = useState('ALL');

  const userBranch = userProfile?.branchCode || 'CSE';
  const userDiv = userProfile?.division || 'Div A';

  const [newEventForm, setNewEventForm] = useState({
    title: '',
    category: 'Technical',
    date: '2026-11-20',
    startTime: '03:00 PM',
    duration: '2 hours',
    venue: '',
    organizer: 'Student Technical Council',
    capacity: '100',
    targetBranch: 'ALL',
    odEligible: 'true',
    shortDescription: '',
    eligibility: 'Open to all enrolled students.',
  });
  const [formErrors, setFormErrors] = useState({});

  const effectiveSearch = (localSearch || globalSearch || '')
    .trim()
    .toLowerCase();

  const visibleEvents = useMemo(() => {
    return events.filter((e) =>
      role === 'admin' ? true : e.approvalStatus === 'Published'
    );
  }, [events, role]);

  const registeredCount = visibleEvents.filter((e) => e.isRegistered).length;

  const filteredEvents = useMemo(() => {
    return visibleEvents.filter((evt) => {
      if (viewFilter === 'registered' && !evt.isRegistered) return false;
      if (viewFilter === 'my-branch') {
        const targets = evt.targetBranches || ['ALL'];
        if (!targets.includes('ALL') && !targets.includes(userBranch)) {
          return false;
        }
      }
      if (
        categoryFilter !== 'All Categories' &&
        evt.category !== categoryFilter
      ) {
        return false;
      }
      if (branchFilter !== 'ALL') {
        const targets = evt.targetBranches || ['ALL'];
        if (!targets.includes('ALL') && !targets.includes(branchFilter)) {
          return false;
        }
      }
      if (effectiveSearch) {
        const hay = `${evt.title} ${evt.venue} ${evt.organizer} ${evt.category} ${evt.shortDescription}`.toLowerCase();
        if (!hay.includes(effectiveSearch)) return false;
      }
      return true;
    });
  }, [
    visibleEvents,
    viewFilter,
    categoryFilter,
    branchFilter,
    effectiveSearch,
    userBranch,
  ]);

  const handleResetFilters = () => {
    setViewFilter('all');
    setCategoryFilter('All Categories');
    setBranchFilter('ALL');
    setLocalSearch('');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newEventForm.title.trim()) errors.title = 'Event title is required';
    if (!newEventForm.venue.trim()) errors.venue = 'Venue is required';
    if (!newEventForm.shortDescription.trim())
      errors.shortDescription = 'Description is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onCreateEvent(newEventForm);
    setCreateModalOpen(false);
    setFormErrors({});
  };

  const activeModalEvent = selectedEventForModal
    ? events.find((e) => e.id === selectedEventForModal.id) ||
      selectedEventForModal
    : null;

  const myDivisionClashMessage =
    activeModalEvent?.clashInfo?.[`${userBranch}-${userDiv}`] || null;

  // Build OD Attendee list for modal
  const rawOdAttendees = useMemo(() => {
    if (!activeModalEvent) return [];
    const base = activeModalEvent.odAttendees || [
      {
        id: 'od-def-1',
        name: 'Rohan Verma',
        rollNo: 'CS-4A-02',
        branch: 'CSE',
        division: 'Div A',
        status: 'OD Approved',
      },
      {
        id: 'od-def-2',
        name: 'Neha Kulkarni',
        rollNo: 'CS-3B-04',
        branch: 'CSE',
        division: 'Div B',
        status: 'OD Approved',
      },
      {
        id: 'od-def-3',
        name: 'Karthik Siddharth',
        rollNo: 'EC-3A-17',
        branch: 'ECE',
        division: 'Div A',
        status: 'OD Approved',
      },
    ];
    const hasCurrentUser = base.some((a) => a.name === userProfile?.name);
    if (activeModalEvent.isRegistered && !hasCurrentUser && userProfile) {
      return [
        {
          id: 'od-me',
          name: userProfile.name,
          rollNo: userProfile.rollNo || 'CS-3A-08',
          branch: userBranch,
          division: userDiv,
          status: 'OD Approved (You)',
        },
        ...base,
      ];
    }
    return base;
  }, [activeModalEvent, userProfile, userBranch, userDiv]);

  const filteredOdAttendees = useMemo(() => {
    if (odDivisionFilter === 'ALL') return rawOdAttendees;
    return rawOdAttendees.filter(
      (a) => `${a.branch} ${a.division}` === odDivisionFilter
    );
  }, [rawOdAttendees, odDivisionFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        subtitle="Discover campus events, check branch eligibility, and track Division On-Duty (OD) attendance."
        actions={
          role === 'admin' && (
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => setCreateModalOpen(true)}
            >
              Create Event
            </Button>
          )
        }
      >
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
          <Tabs
            tabs={[
              { id: 'all', label: 'All Events', count: visibleEvents.length },
              {
                id: 'my-branch',
                label: `For My Branch (${userBranch})`,
              },
              {
                id: 'registered',
                label: 'My Registered Events',
                count: registeredCount,
              },
            ]}
            activeTab={viewFilter}
            onChange={setViewFilter}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 lg:max-w-2xl">
            <SearchInput
              value={localSearch}
              onChange={setLocalSearch}
              placeholder="Search event or venue..."
              ariaLabel="Search events by name or venue"
            />
            <Select
              id="event-category-filter"
              aria-label="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={CATEGORIES}
            />
            <Select
              id="event-branch-filter"
              aria-label="Filter by branch eligibility"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              options={BRANCH_FILTERS}
            />
          </div>
        </div>
      </PageHeader>

      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No matching events found"
          description="Try clearing your search query or switching category and branch filters."
          actionLabel="Reset filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={onRegisterEvent}
              onCancelRegistration={(evt) => setEventToCancel(evt)}
              onOpenDetails={onOpenEventDetails}
            />
          ))}
        </div>
      )}

      {/* Event Details + Division Clash & OD Attendance Sheet Modal */}
      <Modal
        isOpen={Boolean(activeModalEvent)}
        onClose={onCloseEventModal}
        title={activeModalEvent?.title || 'Event Details'}
        subtitle={
          activeModalEvent ? `Hosted by ${activeModalEvent.organizer}` : ''
        }
        maxWidth="max-w-2xl"
        footer={
          activeModalEvent && (
            <div className="flex items-center justify-between w-full">
              <Button variant="secondary" size="sm" onClick={onCloseEventModal}>
                Close
              </Button>
              {activeModalEvent.isRegistered ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      onCloseEventModal();
                      setEventToCancel(activeModalEvent);
                    }}
                  >
                    Cancel Registration
                  </Button>
                  <Button variant="success" size="sm" icon={Check} disabled>
                    Registered (OD Active)
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onRegisterEvent(activeModalEvent.id)}
                >
                  Register & Claim OD Pass
                </Button>
              )}
            </div>
          )
        }
      >
        {activeModalEvent && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{activeModalEvent.category}</Badge>
              {activeModalEvent.odEligible && (
                <Badge variant="dark">OD Attendance Eligible</Badge>
              )}
              {activeModalEvent.isRegistered && (
                <Badge variant="success" dot>
                  Registered ({userBranch} {userDiv})
                </Badge>
              )}
              {activeModalEvent.tags?.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Smart Timetable Clash / OD Notice for User's Division */}
            {myDivisionClashMessage && (
              <div className="p-3.5 rounded-xl bg-indigo-50/85 border border-indigo-200/80 flex items-start gap-2.5 text-xs text-slate-900">
                <AlertTriangle className="w-4 h-4 text-[#17AAAA] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#17AAAA]">
                    {userBranch} {userDiv} Timetable Overlap Detected
                  </p>
                  <p className="mt-0.5 text-slate-700">
                    {myDivisionClashMessage}
                  </p>
                </div>
              </div>
            )}

            <p className="text-sm text-slate-800 leading-relaxed">
              {activeModalEvent.fullDescription ||
                activeModalEvent.shortDescription}
            </p>

            <div className="p-4 rounded-xl glass-panel-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-slate-500 font-medium">Date & Time</p>
                <p className="text-slate-900 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#17AAAA]" />
                  {activeModalEvent.date} · {activeModalEvent.startTime} (
                  {activeModalEvent.duration})
                </p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Venue</p>
                <p className="text-slate-900 font-semibold mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#17AAAA]" />
                  {activeModalEvent.venue}
                </p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Availability</p>
                <p className="text-slate-900 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#17AAAA]" />
                  {activeModalEvent.registeredCount} /{' '}
                  {activeModalEvent.capacity} seats filled
                </p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Branch Eligibility</p>
                <p className="text-slate-900 font-semibold mt-0.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#17AAAA]" />
                  {activeModalEvent.targetBranches
                    ? activeModalEvent.targetBranches.join(', ')
                    : activeModalEvent.eligibility}
                </p>
              </div>
            </div>

            {/* Branch & Division-Wise OD (On-Duty) Attendance Sheet */}
            <div className="pt-3 border-t border-slate-200/60 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#17AAAA]" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                    Branch & Division OD Attendance Sheet
                  </h4>
                </div>
                <select
                  aria-label="Filter OD sheet by division"
                  value={odDivisionFilter}
                  onChange={(e) => setOdDivisionFilter(e.target.value)}
                  className="h-7 px-2.5 text-xs glass-input rounded-lg text-slate-800"
                >
                  <option value="ALL">All Branches & Divisions</option>
                  <option value="CSE Div A">CSE · Div A</option>
                  <option value="CSE Div B">CSE · Div B</option>
                  <option value="AIML Div A">AIML · Div A</option>
                  <option value="ECE Div A">ECE · Div A</option>
                  <option value="IT Div A">IT · Div A</option>
                </select>
              </div>

              <div className="rounded-xl border border-slate-200/70 bg-white/60 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200/60 bg-white/50 text-[11px] font-semibold uppercase text-slate-500">
                      <th className="py-2 px-3">Roll No</th>
                      <th className="py-2 px-3">Student Name</th>
                      <th className="py-2 px-3">Branch & Division</th>
                      <th className="py-2 px-3 text-right">OD Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50">
                    {filteredOdAttendees.map((att) => (
                      <tr key={att.id}>
                        <td className="py-2 px-3 font-mono font-semibold text-[#17AAAA]">
                          {att.rollNo}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-900">
                          {att.name}
                        </td>
                        <td className="py-2 px-3 text-slate-600">
                          {att.branch} · {att.division}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <Badge variant="success">{att.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirm Registration Cancellation */}
      <ConfirmDialog
        isOpen={Boolean(eventToCancel)}
        onClose={() => setEventToCancel(null)}
        onConfirm={() => {
          if (eventToCancel) onCancelRegistration(eventToCancel.id);
        }}
        title="Cancel Event Registration?"
        description={
          eventToCancel
            ? `Are you sure you want to release your seat and OD pass for "${eventToCancel.title}"?`
            : ''
        }
        confirmLabel="Cancel Registration"
        cancelLabel="Keep Seat"
      />

      {/* Create Event Modal (Organizer/Admin) */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Publish Campus Event"
        subtitle="Create a new event with branch eligibility and Division OD support"
        maxWidth="max-w-lg"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreateSubmit}>
              Publish Event
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3.5">
          <Input
            id="new-evt-title"
            label="Event Title"
            required
            placeholder="e.g., Distributed Systems Workshop"
            value={newEventForm.title}
            onChange={(e) =>
              setNewEventForm({ ...newEventForm, title: e.target.value })
            }
            error={formErrors.title}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              id="new-evt-category"
              label="Category"
              options={CATEGORIES.filter((c) => c !== 'All Categories')}
              value={newEventForm.category}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, category: e.target.value })
              }
            />
            <Select
              id="new-evt-branch"
              label="Target Branch Eligibility"
              options={BRANCH_FILTERS}
              value={newEventForm.targetBranch}
              onChange={(e) =>
                setNewEventForm({
                  ...newEventForm,
                  targetBranch: e.target.value,
                })
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              id="new-evt-date"
              label="Date"
              type="date"
              value={newEventForm.date}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, date: e.target.value })
              }
            />
            <Input
              id="new-evt-time"
              label="Start Time"
              placeholder="03:00 PM"
              value={newEventForm.startTime}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, startTime: e.target.value })
              }
            />
            <Input
              id="new-evt-capacity"
              label="Capacity"
              type="number"
              value={newEventForm.capacity}
              onChange={(e) =>
                setNewEventForm({ ...newEventForm, capacity: e.target.value })
              }
            />
          </div>
          <Input
            id="new-evt-venue"
            label="Venue"
            required
            placeholder="e.g., Seminar Hall 1, Admin Block"
            value={newEventForm.venue}
            onChange={(e) =>
              setNewEventForm({ ...newEventForm, venue: e.target.value })
            }
            error={formErrors.venue}
          />
          <Textarea
            id="new-evt-desc"
            label="Description"
            required
            rows={3}
            placeholder="Summarize what students will learn or experience..."
            value={newEventForm.shortDescription}
            onChange={(e) =>
              setNewEventForm({
                ...newEventForm,
                shortDescription: e.target.value,
              })
            }
            error={formErrors.shortDescription}
          />
        </form>
      </Modal>
    </div>
  );
}
