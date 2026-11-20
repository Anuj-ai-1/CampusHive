import React, { useState } from 'react';
import { Sparkles, CheckCircle2, GraduationCap, UserCheck } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

const INTEREST_PRESETS = [
  'AI & Machine Learning',
  'Full-Stack Web',
  'Cloud & DevOps',
  'Cybersecurity',
  'Robotics & IoT',
  'UI/UX Design',
  'Competitive Coding',
  'Startup & FinTech',
  'Photography & Media',
  'Sports & Athletics',
];

export function OnboardingWizard({ isOpen, userProfile, onCompleteProfile }) {
  const [form, setForm] = useState({
    name: userProfile?.name || '',
    branchCode: userProfile?.branchCode || 'CSE',
    year: userProfile?.year || '3rd Year (Semester 5)',
    division: userProfile?.division || 'Div A',
    labBatch: userProfile?.labBatch || 'Batch A1',
    rollNo: userProfile?.rollNo || '',
    phone: userProfile?.phone || '',
    location: userProfile?.location || '',
    bio: userProfile?.bio || '',
    interests: userProfile?.interests || ['AI & Machine Learning', 'Full-Stack Web'],
  });
  const [saving, setSaving] = useState(false);

  const toggleInterest = (tag) => {
    setForm((prev) => {
      const exists = prev.interests.includes(tag);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== tag)
          : [...prev.interests, tag],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onCompleteProfile({
        ...userProfile,
        ...form,
        shortName: form.name.trim().split(' ')[0] || userProfile?.shortName,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Complete Your Student Profile"
      subtitle="Personalize your UniHive workspace so classmates, clubs, and timetables match your exact class."
      maxWidth="max-w-xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-[#1C1917]/75 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            Saved permanently to your account
          </span>
          <Button
            variant="primary"
            size="md"
            icon={CheckCircle2}
            disabled={saving}
            onClick={handleSubmit}
          >
            {saving ? 'Saving Profile...' : 'Save & Launch UniHive'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3.5 rounded-xl bg-[#1C1917] text-[#FAFAF9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#CA8A04] text-[#1C1917] flex items-center justify-center font-bold text-sm shrink-0">
            {(form.name || 'ST').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#CA8A04] uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              Welcome to UniHive
            </p>
            <p className="text-xs text-[#FAFAF9]/85 truncate">
              {userProfile?.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            id="onb-name"
            label="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            id="onb-roll"
            label="University Roll Number"
            required
            placeholder="e.g., USTU-CS-3A-42"
            value={form.rollNo}
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Select
            id="onb-branch"
            label="Branch"
            value={form.branchCode}
            onChange={(e) => setForm({ ...form, branchCode: e.target.value })}
            options={['CSE', 'IT', 'ECE', 'AIML', 'MECH']}
          />
          <Select
            id="onb-year"
            label="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            options={[
              '1st Year (Semester 1)',
              '2nd Year (Semester 3)',
              '3rd Year (Semester 5)',
              '4th Year (Semester 7)',
            ]}
          />
          <Select
            id="onb-div"
            label="Division"
            value={form.division}
            onChange={(e) => setForm({ ...form, division: e.target.value })}
            options={['Div A', 'Div B', 'Div C']}
          />
          <Select
            id="onb-batch"
            label="Lab Batch"
            value={form.labBatch}
            onChange={(e) => setForm({ ...form, labBatch: e.target.value })}
            options={['Batch A1', 'Batch A2', 'Batch B1', 'Batch C1']}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            id="onb-phone"
            label="Phone Number"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            id="onb-location"
            label="Hostel / Residence"
            placeholder="e.g., Campus Hostel B-204"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <Textarea
          id="onb-bio"
          label="Short Bio (Visible to Club Members & Classmates)"
          rows={2}
          placeholder="Tell peers what you're building or learning..."
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
            Pick Your Interests (Used for Club & Event Recommendations)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {INTEREST_PRESETS.map((tag) => {
              const selected = form.interests.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleInterest(tag)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    selected
                      ? 'bg-[#0D9488] border-[#0D9488] text-[#FAFAF9]'
                      : 'bg-[#FAFAF9] border-[#1C1917]/20 text-[#1C1917] hover:border-[#0D9488]'
                  }`}
                >
                  {selected ? '✓ ' : '+ '}
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
}
