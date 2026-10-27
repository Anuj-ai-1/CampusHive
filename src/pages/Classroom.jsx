import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Users,
  Calendar,
  Clock,
  MapPin,
  Megaphone,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { SearchInput } from '../components/ui/SearchInput';
import { Modal } from '../components/ui/Modal';
import {
  CAMPUS_STUDENTS_DIRECTORY,
  DIVISION_TIMETABLE_DATA,
} from '../data/mockData';

const BRANCH_OPTIONS = [
  { value: 'CSE', label: 'CSE — Computer Science & Engg.' },
  { value: 'IT', label: 'IT — Information Technology' },
  { value: 'ECE', label: 'ECE — Electronics & Comm.' },
  { value: 'AIML', label: 'AIML — AI & Machine Learning' },
  { value: 'MECH', label: 'MECH — Mechanical Engineering' },
];

const DIVISION_OPTIONS = [
  { value: 'Div A', label: 'Division A' },
  { value: 'Div B', label: 'Division B' },
  { value: 'Div C', label: 'Division C' },
];

export function Classroom({
  userProfile,
  onUpdateProfile,
  announcements,
  onPostDivisionAnnouncement,
  events,
  onOpenEventDetails,
}) {
  const [selectedBranch, setSelectedBranch] = useState(
    userProfile.branchCode || 'CSE'
  );
  const [selectedDivision, setSelectedDivision] = useState(
    userProfile.division || 'Div A'
  );
  const [classmateSearch, setClassmateSearch] = useState('');
  const [postNoticeModalOpen, setPostNoticeModalOpen] = useState(false);

  const [noticeForm, setNoticeForm] = useState({
    title: '',
    scope: 'division', // 'division' | 'branch'
    summary: '',
  });
  const [noticeError, setNoticeError] = useState('');

  // Classmates in the selected Branch + Division (or all divisions of branch if toggled)
  const divisionStudents = useMemo(() => {
    return CAMPUS_STUDENTS_DIRECTORY.filter((stu) => {
      const matchBranch = stu.branch === selectedBranch;
      const matchDiv =
        selectedDivision === 'ALL' ? true : stu.division === selectedDivision;
      const matchSearch = classmateSearch.trim()
        ? `${stu.studentName} ${stu.rollNo} ${stu.batch}`
            .toLowerCase()
            .includes(classmateSearch.trim().toLowerCase())
        : true;
      return matchBranch && matchDiv && matchSearch;
    });
  }, [selectedBranch, selectedDivision, classmateSearch]);

  const classCRs = useMemo(() => {
    return CAMPUS_STUDENTS_DIRECTORY.filter(
      (stu) =>
        stu.branch === selectedBranch &&
        stu.division === selectedDivision &&
        stu.isCR
    );
  }, [selectedBranch, selectedDivision]);

  const timetableKey = `${selectedBranch}-${selectedDivision}`;
  const timetableSlots =
    DIVISION_TIMETABLE_DATA[timetableKey] ||
    DIVISION_TIMETABLE_DATA['CSE-Div A'];

  // Filter announcements relevant to this Branch & Division
  const divisionAnnouncements = useMemo(() => {
    return announcements.filter(
      (a) =>
        a.targetBranch === selectedBranch &&
        (a.targetDivision === selectedDivision || a.targetDivision === 'ALL')
    );
  }, [announcements, selectedBranch, selectedDivision]);

  const handleSyncToMyProfile = () => {
    const branchLabels = {
      CSE: 'Computer Science & Engineering',
      IT: 'Information Technology',
      ECE: 'Electronics & Communication Engineering',
      AIML: 'Artificial Intelligence & Machine Learning',
      MECH: 'Mechanical Engineering',
    };
    onUpdateProfile({
      ...userProfile,
      branchCode: selectedBranch,
      department: branchLabels[selectedBranch] || userProfile.department,
      division: selectedDivision,
      labBatch:
        selectedDivision === 'Div A'
          ? 'Batch A1'
          : selectedDivision === 'Div B'
          ? 'Batch B1'
          : 'Batch C1',
    });
  };

  const handlePostNoticeSubmit = (e) => {
    e.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.summary.trim()) {
      setNoticeError('Please provide both a notice title and message.');
      return;
    }

    onPostDivisionAnnouncement({
      title: noticeForm.title.trim(),
      summary: noticeForm.summary.trim(),
      content: noticeForm.summary.trim(),
      targetBranch: selectedBranch,
      targetDivision:
        noticeForm.scope === 'division' ? selectedDivision : 'ALL',
      category:
        noticeForm.scope === 'division' ? 'Division Notice' : 'Branch Notice',
      source:
        noticeForm.scope === 'division'
          ? `Class Representative (${selectedBranch} ${selectedDivision})`
          : `Department Representative (${selectedBranch})`,
      authorRole: `${userProfile.name} (CR)`,
    });

    setNoticeForm({ title: '', scope: 'division', summary: '' });
    setNoticeError('');
    setPostNoticeModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Branch & Division Classroom"
        subtitle="Academic division timetable, CR notices, lab batches, and smart event-lecture clash detection."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setPostNoticeModalOpen(true)}
          >
            Post CR / Division Notice
          </Button>
        }
      >
        {/* Branch & Division Switcher Bar */}
        <Card padding="p-4" className="mt-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50/80 border border-indigo-200/80 flex items-center justify-center text-[#17AAAA]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {userProfile.yearShort || '3rd Year'} · {selectedBranch} ·{' '}
                    {selectedDivision}
                  </span>
                  {userProfile.isCR &&
                    selectedBranch === (userProfile.branchCode || 'CSE') &&
                    selectedDivision === (userProfile.division || 'Div A') && (
                      <Badge variant="primary" dot>
                        You are Class Representative (CR)
                      </Badge>
                    )}
                </div>
                <p className="text-xs text-slate-500">
                  Class Advisor: {userProfile.classAdvisor || 'Prof. R. Kulkarni'}{' '}
                  · Home Room: {userProfile.classRoom || 'LH-301, CS Block'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-48">
                <Select
                  id="classroom-branch-select"
                  aria-label="Select Branch"
                  options={BRANCH_OPTIONS}
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                />
              </div>
              <div className="w-36">
                <Select
                  id="classroom-div-select"
                  aria-label="Select Division"
                  options={DIVISION_OPTIONS}
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                />
              </div>
              {(selectedBranch !== (userProfile.branchCode || 'CSE') ||
                selectedDivision !== (userProfile.division || 'Div A')) && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSyncToMyProfile}
                >
                  Set as My Default Class
                </Button>
              )}
            </div>
          </div>
        </Card>
      </PageHeader>

      {/* Main Grid: Division Timetable & Smart Clash Detection + Division Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Division Timetable with Event Overlap / OD Status */}
        <Card padding="p-5" className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#17AAAA]" />
                <h2 className="text-base font-semibold text-slate-900">
                  {selectedBranch} {selectedDivision} — Lecture & Lab Schedule
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically detects overlaps with your registered campus events
                and shows On-Duty (OD) eligibility
              </p>
            </div>
            <Badge variant="neutral">{timetableSlots.length} Slots</Badge>
          </div>

          <div className="space-y-3">
            {timetableSlots.map((slot) => {
              const overlappingEvent = slot.overlapsEventId
                ? events.find((e) => e.id === slot.overlapsEventId)
                : null;

              return (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl glass-panel-subtle space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={slot.type === 'Lab' ? 'primary' : 'neutral'}
                      >
                        {slot.type}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-900">
                        {slot.subject}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#17AAAA]" />
                      {slot.date} · {slot.time}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {slot.room}
                    </span>
                    <span>Faculty: {slot.faculty}</span>
                  </div>

                  {/* Smart Clash & OD Indicator */}
                  {overlappingEvent && (
                    <div
                      className={`mt-2 p-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        overlappingEvent.isRegistered
                          ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
                          : 'bg-amber-50/80 border-amber-200/80 text-amber-900'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {overlappingEvent.isRegistered ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-semibold">
                            {overlappingEvent.isRegistered
                              ? `OD Attendance Active for "${overlappingEvent.title}"`
                              : `Time Slot Overlaps with "${overlappingEvent.title}"`}
                          </span>
                          <p className="text-[11px] opacity-85 mt-0.5">
                            {overlappingEvent.isRegistered
                              ? `Your roll number (${userProfile.rollNo || 'CS-3A-08'}) is included in the ${selectedBranch} ${selectedDivision} On-Duty (OD) attendance sheet.`
                              : 'Registering for this event grants official OD lab/lecture exemption.'}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => onOpenEventDetails(overlappingEvent)}
                      >
                        View Event
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right 5 Cols: Branch & Division Announcements + CR Contacts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Division & Branch Notice Board */}
          <Card padding="p-5" className="space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#17AAAA]" />
                <h2 className="text-sm font-semibold text-slate-900">
                  {selectedBranch} & {selectedDivision} Notices
                </h2>
              </div>
              <Badge variant="primary">{divisionAnnouncements.length}</Badge>
            </div>

            {divisionAnnouncements.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No branch or division-specific notices for {selectedBranch}{' '}
                {selectedDivision} yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-200/60">
                {divisionAnnouncements.map((ann) => (
                  <div key={ann.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <Badge
                        variant={
                          ann.targetDivision !== 'ALL' ? 'primary' : 'warning'
                        }
                      >
                        {ann.targetDivision !== 'ALL'
                          ? `${ann.targetBranch} ${ann.targetDivision}`
                          : `${ann.targetBranch} All Divisions`}
                      </Badge>
                      <span className="text-[11px] text-slate-400">
                        {ann.relativeTime}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-slate-900">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {ann.summary}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Posted by {ann.authorRole}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Class Representatives (CR) Card */}
          <Card padding="p-5" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">
                Class Representatives ({selectedBranch} {selectedDivision})
              </h2>
              <Badge variant="success">CR Desk</Badge>
            </div>

            <div className="space-y-2.5">
              {classCRs.length === 0 ? (
                <p className="text-xs text-slate-500">
                  CRs assigned via Departmental Council.
                </p>
              ) : (
                classCRs.map((cr) => (
                  <div
                    key={cr.id}
                    className="p-3 rounded-xl glass-panel-subtle flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        {cr.studentName}{' '}
                        <span className="text-[#17AAAA] font-mono">
                          ({cr.rollNo})
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {cr.branch} · {cr.division} · {cr.batch}
                      </p>
                    </div>
                    <Badge variant="primary">CR</Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Classmates & Division Directory */}
      <Card padding="p-5" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#17AAAA]" />
              <h2 className="text-base font-semibold text-slate-900">
                Classmates Roster — {selectedBranch} ({selectedDivision})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Find classmates from your division and lab batch for project teams,
              hackathons, or club roles
            </p>
          </div>

          <div className="w-full sm:w-64">
            <SearchInput
              value={classmateSearch}
              onChange={setClassmateSearch}
              placeholder="Search roll no, name, or batch..."
              ariaLabel="Search classmates"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {divisionStudents.map((stu) => (
            <div
              key={stu.id}
              className="p-3.5 rounded-xl glass-panel-subtle flex items-start justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-slate-900">
                    {stu.studentName}
                  </p>
                  {stu.isCR && <Badge variant="primary">CR</Badge>}
                </div>
                <p className="text-[11px] font-mono text-[#17AAAA] mt-0.5">
                  Roll: {stu.rollNo} · {stu.batch}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {stu.branch} · {stu.division} · {stu.year}
                </p>
              </div>
              <Badge variant="neutral">{stu.division}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Post Division / Branch Announcement Modal */}
      <Modal
        isOpen={postNoticeModalOpen}
        onClose={() => setPostNoticeModalOpen(false)}
        title={`Post Notice for ${selectedBranch} ${selectedDivision}`}
        subtitle="Publish a targeted class update for your division or entire branch"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPostNoticeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handlePostNoticeSubmit}>
              Publish Notice
            </Button>
          </>
        }
      >
        <form onSubmit={handlePostNoticeSubmit} className="space-y-4">
          <Select
            id="notice-scope"
            label="Target Audience"
            options={[
              {
                value: 'division',
                label: `Only My Division (${selectedBranch} ${selectedDivision})`,
              },
              {
                value: 'branch',
                label: `Entire Branch (${selectedBranch} — Div A, Div B & Div C)`,
              },
            ]}
            value={noticeForm.scope}
            onChange={(e) =>
              setNoticeForm({ ...noticeForm, scope: e.target.value })
            }
          />

          <Input
            id="notice-title"
            label="Notice Title"
            required
            placeholder="e.g., OS Lab Viva Schedule for Batch A1"
            value={noticeForm.title}
            onChange={(e) =>
              setNoticeForm({ ...noticeForm, title: e.target.value })
            }
          />

          <Textarea
            id="notice-summary"
            label="Details / Instructions"
            required
            rows={3}
            placeholder="Enter lab room change, assignment deadline, or CR update..."
            value={noticeForm.summary}
            onChange={(e) =>
              setNoticeForm({ ...noticeForm, summary: e.target.value })
            }
            error={noticeError}
          />
        </form>
      </Modal>
    </div>
  );
}
