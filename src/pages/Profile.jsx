import React, { useState } from 'react';
import {
  Edit3,
  Award,
  CalendarDays,
  Users,
  HeartHandshake,
  CheckCircle2,
  Mail,
  MapPin,
  GraduationCap,
  Camera,
  Trash2,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

export function Profile({
  userProfile,
  onUpdateProfile,
  events,
  clubs,
  volunteerRoles,
  tasks,
  onOpenEventDetails,
  onOpenClubDetails,
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addAchievementOpen, setAddAchievementOpen] = useState(false);
  const [achForm, setAchForm] = useState({
    title: '',
    issuer: '',
    date: 'Nov 2026',
    type: 'Certificate',
  });
  const [formState, setFormState] = useState({
    name: userProfile?.name || '',
    branchCode: userProfile?.branchCode || 'CSE',
    division: userProfile?.division || 'Div A',
    labBatch: userProfile?.labBatch || 'Batch A1',
    rollNo: userProfile?.rollNo || 'CS-3A-08',
    department: userProfile?.department || '',
    year: userProfile?.year || '',
    phone: userProfile?.phone || '',
    gpa: userProfile?.gpa || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    avatarUrl: userProfile?.avatarUrl || '',
    interestsText: (userProfile?.interests || []).join(', '),
  });

  const registeredEvents = events.filter((e) => e.isRegistered);
  const joinedClubs = clubs.filter((c) => c.membershipState === 'Joined');
  const volunteerHistory = volunteerRoles.filter((r) => r.status !== 'Open');
  const completedTasks = tasks.filter((t) => t.completed);

  const handleOpenEdit = () => {
    setFormState({
      name: userProfile?.name || '',
      branchCode: userProfile?.branchCode || 'CSE',
      division: userProfile?.division || 'Div A',
      labBatch: userProfile?.labBatch || 'Batch A1',
      rollNo: userProfile?.rollNo || 'CS-3A-08',
      department: userProfile?.department || '',
      year: userProfile?.year || '',
      phone: userProfile?.phone || '',
      gpa: userProfile?.gpa || '',
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      avatarUrl: userProfile?.avatarUrl || '',
      interestsText: (userProfile?.interests || []).join(', '),
    });
    setEditModalOpen(true);
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSide = 256;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        setFormState((prev) => ({ ...prev, avatarUrl: compressed }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const parsedInterests = formState.interestsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const shortName = formState.name.trim().split(' ')[0] || 'Student';

    onUpdateProfile({
      ...userProfile,
      name: formState.name.trim() || userProfile.name,
      shortName,
      branchCode: formState.branchCode,
      division: formState.division,
      labBatch: formState.labBatch,
      rollNo: formState.rollNo,
      department: formState.department.trim() || userProfile.department,
      year: formState.year.trim() || userProfile.year,
      phone: formState.phone.trim(),
      gpa: formState.gpa.trim() || userProfile.gpa,
      bio: formState.bio.trim(),
      location: formState.location.trim(),
      avatarUrl: formState.avatarUrl,
      interests:
        parsedInterests.length > 0 ? parsedInterests : userProfile.interests,
    });
    setEditModalOpen(false);
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!achForm.title.trim() || !achForm.issuer.trim()) return;
    const nextAch = {
      id: `ach-${Date.now()}`,
      title: achForm.title.trim(),
      issuer: achForm.issuer.trim(),
      date: achForm.date.trim() || 'Nov 2026',
      type: achForm.type,
      credentialId: `USTU-${Math.floor(1000 + Math.random() * 8999)}`,
    };
    onUpdateProfile({
      ...userProfile,
      achievements: [nextAch, ...(userProfile?.achievements || [])],
    });
    setAchForm({ title: '', issuer: '', date: 'Nov 2026', type: 'Certificate' });
    setAddAchievementOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Student Profile"
        subtitle="Your academic identity, community memberships, verified volunteering, and achievements."
        actions={
          <Button
            variant="secondary"
            size="md"
            icon={Edit3}
            onClick={handleOpenEdit}
          >
            Edit Profile
          </Button>
        }
      />

      {/* Profile Header Card */}
      <Card padding="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {userProfile?.avatarUrl ? (
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#4F46E5] shadow-sm shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-indigo-50/80 backdrop-blur-md border border-indigo-200/80 shadow-sm flex items-center justify-center text-xl font-bold text-[#4F46E5] shrink-0">
              {(userProfile?.shortName || userProfile?.name || 'UH')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-semibold text-slate-900">
                {userProfile.name}
              </h2>
              <Badge variant="primary">
                {userProfile.branchCode || 'CSE'} ·{' '}
                {userProfile.division || 'Div A'} ({userProfile.labBatch || 'Batch A1'})
              </Badge>
              <Badge variant="dark">
                Roll: {userProfile.rollNo || 'CS-3A-08'}
              </Badge>
              <Badge variant="neutral">GPA {userProfile.gpa}</Badge>
            </div>

            <p className="text-xs font-medium text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
                {userProfile.department} · {userProfile.year}
              </span>
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {userProfile.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {userProfile.location}
              </span>
            </p>

            <p className="text-sm text-slate-800 mt-3 leading-relaxed max-w-3xl">
              {userProfile.bio}
            </p>

            {/* Interests */}
            <div className="mt-4 pt-4 border-t border-slate-200/60">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Declared Interests
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(userProfile?.interests || []).map((interest) => (
                  <Badge key={interest} variant="neutral">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid of Campus Involvement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Club Memberships */}
        <Card padding="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-sm font-semibold text-slate-900">
                Club Memberships ({joinedClubs.length})
              </h3>
            </div>
          </div>

          <div className="divide-y divide-slate-200/60">
            {joinedClubs.map((club) => (
              <div
                key={club.id}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenClubDetails(club)}
                    className="text-xs font-semibold text-slate-900 hover:text-[#4F46E5] text-left"
                  >
                    {club.name}
                  </button>
                  <p className="text-[11px] text-slate-500">
                    {club.category} · {club.meetingSchedule}
                  </p>
                </div>
                <Badge
                  variant={
                    club.approvalStatus === 'Pending Approval'
                      ? 'warning'
                      : 'success'
                  }
                  dot
                >
                  {club.approvalStatus === 'Pending Approval'
                    ? 'Pending Admin'
                    : 'Active Member'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Registered Events */}
        <Card padding="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-sm font-semibold text-slate-900">
                Registered Events ({registeredEvents.length})
              </h3>
            </div>
          </div>

          <div className="divide-y divide-slate-200/60 max-h-64 overflow-y-auto pr-1">
            {registeredEvents.map((evt) => (
              <div
                key={evt.id}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onOpenEventDetails(evt)}
                    className="text-xs font-semibold text-slate-900 hover:text-[#4F46E5] truncate block text-left"
                  >
                    {evt.title}
                  </button>
                  <p className="text-[11px] text-slate-500 truncate">
                    {evt.date} · {evt.venue}
                  </p>
                </div>
                <Badge variant="neutral">{evt.category}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Volunteering History & Completed Tasks */}
        <Card padding="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-sm font-semibold text-slate-900">
                Volunteering & Completed Tasks
              </h3>
            </div>
            <Badge variant="primary">
              {completedTasks.length} Tasks Completed
            </Badge>
          </div>

          <div className="space-y-3">
            {volunteerHistory.map((role) => (
              <div
                key={role.id}
                className="p-3 rounded-xl glass-panel-subtle flex items-center justify-between gap-2"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {role.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {role.eventTitle} · {role.date} ({role.serviceHours}h)
                  </p>
                </div>
                <Badge
                  variant={
                    role.status === 'Approved'
                      ? 'success'
                      : role.status === 'Waitlisted'
                      ? 'warning'
                      : 'primary'
                  }
                >
                  {role.status}
                </Badge>
              </div>
            ))}

            <div className="pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Recently Completed Operational Tasks
              </p>
              <ul className="space-y-1.5">
                {completedTasks.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-2 text-xs text-slate-600"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{t.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Achievements & Verified Certificates */}
        <Card padding="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-sm font-semibold text-slate-900">
                Achievements &amp; Certificates
              </h3>
            </div>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => setAddAchievementOpen(true)}
            >
              + Add
            </Button>
          </div>

          <div className="space-y-3">
            {(userProfile?.achievements || []).length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No certificates added yet. Click + Add to showcase your achievements.
              </p>
            ) : (
              (userProfile?.achievements || []).map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-xl glass-panel-subtle"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="primary">{ach.type}</Badge>
                  <span className="text-[11px] font-mono text-slate-500">
                    {ach.credentialId}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 mt-1.5">
                  {ach.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Issued by {ach.issuer} · {ach.date}
                </p>
              </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Add Achievement Modal */}
      <Modal
        isOpen={addAchievementOpen}
        onClose={() => setAddAchievementOpen(false)}
        title="Add Achievement or Certificate"
        subtitle="Showcase hackathons, certifications, or campus awards on your profile"
        maxWidth="max-w-md"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAddAchievementOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddAchievement}>
              Save Achievement
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddAchievement} className="space-y-3.5">
          <Input
            id="ach-title"
            label="Title"
            required
            placeholder="e.g., AWS Cloud Practitioner"
            value={achForm.title}
            onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
          />
          <Input
            id="ach-issuer"
            label="Issued By"
            required
            placeholder="e.g., Amazon Web Services"
            value={achForm.issuer}
            onChange={(e) => setAchForm({ ...achForm, issuer: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="ach-date"
              label="Date"
              placeholder="Nov 2026"
              value={achForm.date}
              onChange={(e) => setAchForm({ ...achForm, date: e.target.value })}
            />
            <Input
              id="ach-type"
              label="Category"
              placeholder="Certificate / Award"
              value={achForm.type}
              onChange={(e) => setAchForm({ ...achForm, type: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Student Profile"
        subtitle="Changes are saved immediately to your UniHive profile state"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveProfile} className="space-y-3.5">
          {/* Profile Picture Uploader */}
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/15 flex items-center gap-4">
            {formState.avatarUrl ? (
              <img
                src={formState.avatarUrl}
                alt="Profile preview"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#4F46E5] shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-[#F59E0B] flex items-center justify-center text-base font-bold shrink-0">
                {(formState.name || 'UH').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-1.5">
              <p className="text-xs font-bold text-[#0F172A]">
                Profile Picture
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#0F172A] text-[#F8FAFC] text-xs font-semibold cursor-pointer transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{formState.avatarUrl ? 'Change Photo' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    className="hidden"
                  />
                </label>
                {formState.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => setFormState((prev) => ({ ...prev, avatarUrl: '' }))}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E11D48]/10 hover:bg-[#E11D48] text-[#E11D48] hover:text-[#F8FAFC] text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <Input
            id="prof-name"
            label="Display Name"
            required
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              id="prof-branch"
              label="Branch Code"
              value={formState.branchCode}
              onChange={(e) =>
                setFormState({ ...formState, branchCode: e.target.value })
              }
            />
            <Input
              id="prof-div"
              label="Division"
              value={formState.division}
              onChange={(e) =>
                setFormState({ ...formState, division: e.target.value })
              }
            />
            <Input
              id="prof-batch"
              label="Lab Batch"
              value={formState.labBatch}
              onChange={(e) =>
                setFormState({ ...formState, labBatch: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              id="prof-dept"
              label="Department"
              value={formState.department}
              onChange={(e) =>
                setFormState({ ...formState, department: e.target.value })
              }
            />
            <Input
              id="prof-year"
              label="Academic Year"
              value={formState.year}
              onChange={(e) =>
                setFormState({ ...formState, year: e.target.value })
              }
            />
          </div>
          <Input
            id="prof-location"
            label="Campus Residence / Room"
            value={formState.location}
            onChange={(e) =>
              setFormState({ ...formState, location: e.target.value })
            }
          />
          <Textarea
            id="prof-bio"
            label="Short Bio"
            rows={3}
            value={formState.bio}
            onChange={(e) =>
              setFormState({ ...formState, bio: e.target.value })
            }
          />
          <Input
            id="prof-interests"
            label="Interests (comma-separated)"
            helperText="Used to personalize campus event and club recommendations"
            value={formState.interestsText}
            onChange={(e) =>
              setFormState({ ...formState, interestsText: e.target.value })
            }
          />
        </form>
      </Modal>
    </div>
  );
}
