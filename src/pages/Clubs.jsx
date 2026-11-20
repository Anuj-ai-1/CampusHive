import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Calendar,
  UserCheck,
  Plus,
  Crown,
  Award,
  UserPlus,
  Trash2,
  ShieldAlert,
  MessageSquare,
  Send,
  Hash,
  Eye,
  GraduationCap,
  Mail,
  Sparkles,
  ThumbsUp,
  FolderGit2,
  Pin,
  Reply,
  Link2,
  X,
  Flame,
  Rocket,
  ArrowLeft,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchInput } from '../components/ui/SearchInput';
import { Tabs } from '../components/ui/Tabs';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { ClubCard } from '../components/clubs/ClubCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CAMPUS_STUDENTS_DIRECTORY } from '../data/mockData';

const CLUB_CATEGORIES = [
  'All Categories',
  'Technology',
  'Hardware & Engineering',
  'Arts & Media',
  'Leadership & Business',
  'Cultural',
];

const ROLE_OPTIONS = [
  'Leader / President',
  'Vice Leader',
  'Secretary',
  'Treasurer',
  'Core Member',
  'Member',
];

const CHAT_CHANNELS = [
  {
    id: 'general',
    label: 'general-chat',
    desc: 'Daily club discussions, squad formation & peer networking',
  },
  {
    id: 'announcements',
    label: 'announcements',
    desc: 'Official updates from Club Leader, Vice Leader & Core Team',
  },
  {
    id: 'projects',
    label: 'project-builds',
    desc: 'GitHub repos, hackathon sprints & 60% practical builds',
  },
  {
    id: 'doubts',
    label: 'doubts-and-help',
    desc: 'Peer code reviews, lab troubleshooting & mentorship',
  },
];

// Default starter chat messages per club
function getDefaultClubMessages(club) {
  if (!club) return [];
  return [
    {
      id: 'msg-1',
      channel: 'announcements',
      senderName: club.leadName || 'Rohan Verma (4th Year CSE)',
      senderRole: 'Leader / President',
      time: 'Yesterday, 6:15 PM',
      text: `Welcome to the official ${club.name} workspace on UniHive! Check out our upcoming meetup schedule (${club.meetingSchedule}) and drop your project ideas in #project-builds.`,
      pinned: true,
      likes: 12,
      fires: 5,
      rockets: 7,
    },
    {
      id: 'msg-2',
      channel: 'general',
      senderName: club.viceLeadName || 'Anuj Sharma (3rd Year CSE)',
      senderRole: 'Vice Leader',
      time: 'Today, 10:20 AM',
      text: `Hey everyone! We are forming 3-4 member squads for the USTU SkillTech Summit 2026 sprint. Anyone from CSE, AIML, or Design looking for a team?`,
      pinned: true,
      likes: 8,
      fires: 4,
      rockets: 6,
    },
    {
      id: 'msg-3',
      channel: 'general',
      senderName:
        club.secretaryName || 'Sneha Reddy (2nd Year Microsoft AI & ML)',
      senderRole: 'Secretary',
      time: 'Today, 11:05 AM',
      text: `I have uploaded the starter kit and lab access instructions in the Archivia digital repository. Click on any member's name here to view their profile or start a 1-on-1 DM!`,
      linkUrl: 'https://github.com/ustu-skilltech/starter-kit-2026',
      pinned: false,
      likes: 6,
      fires: 3,
      rockets: 4,
    },
    {
      id: 'msg-4',
      channel: 'projects',
      senderName: 'Priya Patel (3rd Year CSE)',
      senderRole: 'Core Member',
      time: 'Today, 12:30 PM',
      text: `Pushed the latest FastAPI + React microservice prototype to our club GitHub org. Ready for review before Friday's session!`,
      linkUrl: 'https://github.com/ustu-skilltech/rag-agent-service',
      pinned: false,
      likes: 9,
      fires: 6,
      rockets: 5,
    },
    {
      id: 'msg-5',
      channel: 'doubts',
      senderName: 'Devansh Joshi (3rd Year CSE)',
      senderRole: 'Core Member',
      time: 'Today, 01:15 PM',
      text: `Can someone share the Docker compose config for the Microsoft AI Lab GPU runner? Facing a port binding issue on port 8080.`,
      pinned: false,
      likes: 3,
      fires: 1,
      rockets: 2,
    },
  ];
}

// Helper to enrich any student name into a complete viewable Peer Profile
function buildPeerProfile(
  rawName,
  roleInClub = 'Member',
  clubName = 'Campus Club',
  campusDirectory = []
) {
  if (!rawName) return null;
  const cleanName = rawName.split('(')[0].trim();

  const liveMatch = (campusDirectory || []).find(
    (u) => u.name.toLowerCase() === cleanName.toLowerCase()
  );

  if (liveMatch) {
    return {
      studentName: liveMatch.name,
      displayName: rawName,
      roleInClub,
      clubName,
      branch: liveMatch.branchCode || 'CSE',
      division: liveMatch.division || 'Div A',
      year: liveMatch.yearShort || '3rd Year',
      batch: liveMatch.labBatch || 'Batch A1',
      rollNo: liveMatch.rollNo || 'USTU-STU',
      email: liveMatch.email,
      isCR: Boolean(liveMatch.isCR),
      gpa: liveMatch.gpa || '8.90 / 10.0',
      track: liveMatch.ojtStatus || '60% Practical NEP Track',
      bio:
        liveMatch.bio ||
        `${liveMatch.yearShort || '3rd Year'} ${liveMatch.branchCode || 'CSE'} student at USTU.`,
      skills:
        liveMatch.interests && liveMatch.interests.length > 0
          ? liveMatch.interests
          : ['AI & ML', 'Full-Stack Dev', 'Campus Clubs'],
      achievements:
        liveMatch.achievements && liveMatch.achievements.length > 0
          ? liveMatch.achievements.map((a) => a.title)
          : [`Active ${roleInClub} — ${clubName}`],
    };
  }

  const match = CAMPUS_STUDENTS_DIRECTORY.find(
    (s) =>
      s.studentName.toLowerCase() === cleanName.toLowerCase() ||
      s.name.toLowerCase() === rawName.toLowerCase()
  );

  const branch =
    match?.branch ||
    (rawName.includes('ECE')
      ? 'ECE'
      : rawName.includes('IT')
      ? 'IT'
      : rawName.includes('AI')
      ? 'AIML'
      : 'CSE');
  const division = match?.division || 'Div A';
  const year = match?.year || '3rd Year';
  const batch = match?.batch || 'Batch A1';
  const rollNo = match?.rollNo || `USTU-${branch}-3A-19`;
  const email =
    match?.email ||
    `${cleanName.toLowerCase().replace(/\s+/g, '.')}@ustu.edu.in`;
  const isCR = Boolean(match?.isCR);

  const skillMap = {
    CSE: [
      'Full-Stack React & Node',
      'Microsoft Azure AI',
      'System Design',
      'PostgreSQL & Docker',
    ],
    AIML: [
      'PyTorch & LLMs',
      'RAG Pipelines',
      'Computer Vision',
      'Microsoft AI Track',
    ],
    IT: [
      'Cloud DevOps',
      'KPMG Tech Consulting',
      'Microservices',
      'Cybersecurity',
    ],
    ECE: [
      'Embedded RTOS',
      'VLSI & Verilog',
      'IoT Sensor Networks',
      'ROS2 Robotics',
    ],
    MECH: [
      'SolidWorks CAD/CAM',
      'ANSYS Thermal',
      'Mechatronics PLC',
      'EV Drivetrains',
    ],
  };

  return {
    studentName: match?.studentName || cleanName,
    displayName: rawName,
    roleInClub,
    clubName,
    branch,
    division,
    year,
    batch,
    rollNo,
    email,
    isCR,
    gpa: branch === 'CSE' ? '9.14 / 10.0' : '8.92 / 10.0',
    track: '60% Practical NEP Track · Microsoft & KPMG Partner Cohort',
    bio: `${year} ${branch} (${division}) student at Universal SkillTech University (USTU). Active ${roleInClub} in ${clubName}, passionate about hands-on project building, hackathons, and peer collaboration.`,
    skills: skillMap[branch] || skillMap.CSE,
    achievements: [
      `Active ${roleInClub} — ${clubName}`,
      `USTU SkillTech 60% Practical Project Distinction (2026)`,
      isCR
        ? `Elected Class Representative (${branch} ${division})`
        : `HackUSTU 2026 Finalist Squad`,
    ],
  };
}

export function Clubs({
  clubs,
  userProfile,
  campusDirectory = [],
  role,
  globalSearch,
  onJoinClub,
  onLeaveClub,
  onCreateClubProposal,
  onUpdateClubHierarchy,
  onSendClubMessage,
  onUpdateClubMessage,
  onDeleteClubMessage,
  onApproveClub,
  onRejectClub,
  selectedClubForModal,
  onCloseClubModal,
  onOpenClubDetails,
}) {
  const [tabFilter, setTabFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [localSearch, setLocalSearch] = useState('');

  // Inside Full-Screen Club Workspace: Sub-Tab ('chat' | 'overview' | 'projects')
  const [clubWorkspaceTab, setClubWorkspaceTab] = useState('chat');
  const [activeChannel, setActiveChannel] = useState('general');
  const [mobileChannelsOpen, setMobileChannelsOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [replyToMsg, setReplyToMsg] = useState(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');

  // Peer Student Profile Inspector Modal State
  const [inspectedPeer, setInspectedPeer] = useState(null);
  const [directMsgText, setDirectMsgText] = useState('');

  // Create Club Proposal Modal State
  const [createClubOpen, setCreateClubOpen] = useState(false);
  const myDefaultLabel = `${userProfile?.name || 'Anuj Sharma'} (${
    (userProfile?.year || '3rd Year').split(' ')[0]
  } Year ${userProfile?.branchCode || 'CSE'})`;

  const [clubForm, setClubForm] = useState({
    name: '',
    category: 'Technology',
    shortDescription: '',
    meetingSchedule: 'Fridays, 5:00 PM @ Literati Café / Student Activity Hub',
    leaderMode: 'self',
    leaderName: myDefaultLabel,
    viceLeaderName: 'Priya Patel (3rd Year CSE)',
    secretaryName: 'Devansh Joshi (3rd Year CSE)',
    requiresApproval: false,
    initialMembers: [
      {
        id: 'init-1',
        name: 'Sneha Reddy (2nd Year Microsoft AI & ML)',
        role: 'Core Member',
        email: 'sneha.reddy@ustu.edu.in',
      },
    ],
  });
  const [newMemberStudent, setNewMemberStudent] = useState(
    CAMPUS_STUDENTS_DIRECTORY[4].name
  );
  const [newMemberRole, setNewMemberRole] = useState('Core Member');
  const [formErrors, setFormErrors] = useState({});

  const [detailMemberName, setDetailMemberName] = useState(
    `${CAMPUS_STUDENTS_DIRECTORY[3].studentName} (${CAMPUS_STUDENTS_DIRECTORY[3].branch} · ${CAMPUS_STUDENTS_DIRECTORY[3].division})`
  );
  const [detailMemberRole, setDetailMemberRole] = useState('Member');
  const [rosterBranchFilter, setRosterBranchFilter] = useState('ALL');

  const effectiveSearch = (localSearch || globalSearch || '')
    .trim()
    .toLowerCase();

  const visibleClubs = useMemo(() => {
    return clubs.filter((c) => {
      if (role === 'admin') return true;
      if (c.approvalStatus === 'Approved' || !c.approvalStatus) return true;
      return c.createdBy === userProfile.id;
    });
  }, [clubs, role, userProfile.id]);

  const myClubsCount = visibleClubs.filter(
    (c) =>
      c.membershipState === 'Joined' ||
      c.membershipState === 'Pending Approval'
  ).length;

  const myProposalsCount = visibleClubs.filter(
    (c) => c.approvalStatus === 'Pending Approval'
  ).length;

  const filteredClubs = useMemo(() => {
    return visibleClubs.filter((club) => {
      if (
        tabFilter === 'my-clubs' &&
        club.membershipState !== 'Joined' &&
        club.membershipState !== 'Pending Approval'
      ) {
        return false;
      }
      if (
        tabFilter === 'my-proposals' &&
        club.approvalStatus !== 'Pending Approval'
      ) {
        return false;
      }
      if (
        categoryFilter !== 'All Categories' &&
        club.category !== categoryFilter
      ) {
        return false;
      }
      if (effectiveSearch) {
        const hay = `${club.name} ${club.shortDescription} ${club.category} ${club.leadName} ${club.viceLeadName || ''}`.toLowerCase();
        if (!hay.includes(effectiveSearch)) return false;
      }
      return true;
    });
  }, [visibleClubs, tabFilter, categoryFilter, effectiveSearch]);

  const activeModalClub = selectedClubForModal
    ? clubs.find((c) => c.id === selectedClubForModal.id) ||
      selectedClubForModal
    : null;

  const clubMessages = useMemo(() => {
    if (!activeModalClub) return [];
    return (
      activeModalClub.chatMessages || getDefaultClubMessages(activeModalClub)
    );
  }, [activeModalClub]);

  const isDmChannel = activeChannel.startsWith('dm:');
  const activeDmPeerName = isDmChannel ? activeChannel.slice(3) : null;

  const channelMessages = useMemo(() => {
    return clubMessages.filter(
      (m) => (m.channel || 'general') === activeChannel
    );
  }, [clubMessages, activeChannel]);

  const pinnedInChannel = useMemo(() => {
    return channelMessages.filter((m) => m.pinned);
  }, [channelMessages]);

  const clubPeersList = useMemo(() => {
    if (!activeModalClub) return [];
    const base = activeModalClub.members || [];
    const map = new Map();
    base.forEach((m) => {
      const clean = m.name.split('(')[0].trim();
      if (!map.has(clean)) {
        map.set(clean, m);
      }
    });
    return Array.from(map.values());
  }, [activeModalClub]);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!activeModalClub || !chatInput.trim()) return;

    const replyTo = replyToMsg
      ? {
          senderName: replyToMsg.senderName,
          text: replyToMsg.text.slice(0, 90),
        }
      : null;

    if (onSendClubMessage) {
      await onSendClubMessage(activeModalClub.id, {
        channel: activeChannel,
        text: chatInput.trim(),
        replyTo,
        linkUrl: attachmentUrl.trim() || null,
      });
    }

    setChatInput('');
    setReplyToMsg(null);
    setAttachmentUrl('');
    setShowLinkInput(false);
  };

  const handleReactMessage = (msgId, field) => {
    if (!activeModalClub || !onUpdateClubMessage) return;
    onUpdateClubMessage(activeModalClub.id, msgId, { reactField: field });
  };

  const handleTogglePinMessage = (msgId) => {
    if (!activeModalClub || !onUpdateClubMessage) return;
    onUpdateClubMessage(activeModalClub.id, msgId, { togglePin: true });
  };

  const handleDeleteMessage = (msgId) => {
    if (!activeModalClub || !onDeleteClubMessage) return;
    onDeleteClubMessage(activeModalClub.id, msgId);
  };

  const handleInspectStudentProfile = (nameStr, roleInClub = 'Member') => {
    const profileObj = buildPeerProfile(
      nameStr,
      roleInClub,
      activeModalClub?.name || 'USTU Community',
      campusDirectory
    );
    setDirectMsgText('');
    setInspectedPeer(profileObj);
  };

  const handleStartDirectChatWithPeer = async (peerProfile, initialText = '') => {
    if (!peerProfile || !activeModalClub) return;
    const dmKey = `dm:${peerProfile.displayName}`;
    setActiveChannel(dmKey);
    setClubWorkspaceTab('chat');

    if (initialText.trim() && onSendClubMessage) {
      await onSendClubMessage(activeModalClub.id, {
        channel: dmKey,
        text: initialText.trim(),
        senderRoleOverride: 'Direct Message',
      });
    }
    setInspectedPeer(null);
  };

  const handleAddInitialMember = () => {
    if (!newMemberStudent.trim()) return;
    if (
      clubForm.initialMembers.some((m) => m.name === newMemberStudent.trim())
    ) {
      return;
    }
    const foundDir = CAMPUS_STUDENTS_DIRECTORY.find(
      (s) => s.name === newMemberStudent
    );
    setClubForm((prev) => ({
      ...prev,
      initialMembers: [
        ...prev.initialMembers,
        {
          id: `init-${Date.now()}`,
          name: newMemberStudent.trim(),
          role: newMemberRole,
          email: foundDir ? foundDir.email : 'student@ustu.edu.in',
        },
      ],
    }));
  };

  const handleRemoveInitialMember = (id) => {
    setClubForm((prev) => ({
      ...prev,
      initialMembers: prev.initialMembers.filter((m) => m.id !== id),
    }));
  };

  const handleCreateClubSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!clubForm.name.trim()) errs.name = 'Club name is required';
    if (!clubForm.shortDescription.trim())
      errs.shortDescription = 'Club mission/description is required';
    if (!clubForm.viceLeaderName.trim())
      errs.viceLeaderName = 'Please assign a Vice Leader';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    const assignedLeader =
      clubForm.leaderMode === 'self' ? myDefaultLabel : clubForm.leaderName;

    onCreateClubProposal({
      name: clubForm.name.trim(),
      category: clubForm.category,
      shortDescription: clubForm.shortDescription.trim(),
      meetingSchedule: clubForm.meetingSchedule.trim(),
      leadName: assignedLeader,
      viceLeadName: clubForm.viceLeaderName,
      secretaryName: clubForm.secretaryName,
      requiresApproval: clubForm.requiresApproval,
      initialMembers: clubForm.initialMembers,
    });

    setCreateClubOpen(false);
    setClubForm({
      name: '',
      category: 'Technology',
      shortDescription: '',
      meetingSchedule:
        'Fridays, 5:00 PM @ Literati Café / Student Activity Hub',
      leaderMode: 'self',
      leaderName: myDefaultLabel,
      viceLeaderName: 'Priya Patel (3rd Year CSE)',
      secretaryName: 'Devansh Joshi (3rd Year CSE)',
      requiresApproval: false,
      initialMembers: [],
    });
    setFormErrors({});
  };

  const handleAddMemberToExistingClub = (e) => {
    e.preventDefault();
    if (!activeModalClub || !detailMemberName.trim()) return;

    onUpdateClubHierarchy(activeModalClub.id, {
      action: 'add',
      name: detailMemberName.trim(),
      role: detailMemberRole,
      email: `${detailMemberName
        .trim()
        .toLowerCase()
        .split(' ')[0]}@ustu.edu.in`,
    });
    setDetailMemberName('');
    setDetailMemberRole('Member');
  };

  const handleChangeMemberRole = (memberId, nextRole) => {
    if (!activeModalClub) return;
    onUpdateClubHierarchy(activeModalClub.id, {
      action: 'role',
      memberId,
      role: nextRole,
    });
  };

  const handleRemoveMemberFromClub = (memberId) => {
    if (!activeModalClub) return;
    onUpdateClubHierarchy(activeModalClub.id, {
      action: 'remove',
      memberId,
    });
  };

  const studentSelectOptions = CAMPUS_STUDENTS_DIRECTORY.map((s) => ({
    value: s.name,
    label: `${s.studentName} (${s.branch} · ${s.division} · Roll ${s.rollNo})`,
  }));

  const activeChannelMeta = CHAT_CHANNELS.find((c) => c.id === activeChannel);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clubs, Chatrooms & Peer Communities"
        subtitle="Join communities, open full-screen club chat channels, message members 1-on-1, or inspect student profiles."
        actions={
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setCreateClubOpen(true)}
          >
            Create New Club
          </Button>
        }
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
          <Tabs
            tabs={[
              {
                id: 'all',
                label: 'All Communities',
                count: visibleClubs.length,
              },
              {
                id: 'my-clubs',
                label: 'My Joined Clubs',
                count: myClubsCount,
              },
              {
                id: 'my-proposals',
                label: 'Pending Admin Approval',
                count: myProposalsCount,
              },
            ]}
            activeTab={tabFilter}
            onChange={setTabFilter}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 lg:max-w-md">
            <SearchInput
              value={localSearch}
              onChange={setLocalSearch}
              placeholder="Search clubs, leaders, or interests..."
              ariaLabel="Search clubs by name or description"
            />
            <Select
              id="club-category-filter"
              aria-label="Filter clubs by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={CLUB_CATEGORIES}
            />
          </div>
        </div>
      </PageHeader>

      {filteredClubs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clubs match your filter"
          description="Try switching tabs, clearing your search query, or creating a new student club proposal."
          actionLabel="Show all clubs"
          onAction={() => {
            setTabFilter('all');
            setCategoryFilter('All Categories');
            setLocalSearch('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              role={role}
              onJoinClub={onJoinClub}
              onOpenChat={(c) => {
                setClubWorkspaceTab('chat');
                setActiveChannel('general');
                onOpenClubDetails(c);
              }}
              onOpenDetails={(c) => {
                setClubWorkspaceTab('overview');
                onOpenClubDetails(c);
              }}
            />
          ))}
        </div>
      )}

      {/* CREATE NEW CLUB MODAL */}
      <Modal
        isOpen={createClubOpen}
        onClose={() => setCreateClubOpen(false)}
        title="Propose & Create a Campus Club"
        subtitle="Assign leadership roles (Leader, Vice Leader, Secretary) and initial members. Your request will notify the Admin for official approval."
        maxWidth="max-w-2xl"
        footer={
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full">
            <span className="text-xs text-[#0F172A]/75">
              Requires Admin permission before public campus listing
            </span>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCreateClubOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateClubSubmit}
              >
                Submit Club for Admin Approval
              </Button>
            </div>
          </div>
        }
      >
        <form onSubmit={handleCreateClubSubmit} className="space-y-5">
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              1. Club Identity & Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Input
                  id="club-name"
                  label="Club Name"
                  required
                  placeholder="e.g., Quantum Computing Society"
                  value={clubForm.name}
                  onChange={(e) =>
                    setClubForm({ ...clubForm, name: e.target.value })
                  }
                  error={formErrors.name}
                />
              </div>
              <Select
                id="club-category"
                label="Category"
                options={CLUB_CATEGORIES.filter((c) => c !== 'All Categories')}
                value={clubForm.category}
                onChange={(e) =>
                  setClubForm({ ...clubForm, category: e.target.value })
                }
              />
            </div>

            <Textarea
              id="club-desc"
              label="Club Mission & Activities"
              required
              rows={2}
              placeholder="What will members build, learn, or organize together?"
              value={clubForm.shortDescription}
              onChange={(e) =>
                setClubForm({ ...clubForm, shortDescription: e.target.value })
              }
              error={formErrors.shortDescription}
            />

            <Input
              id="club-schedule"
              label="Proposed Weekly Meetup Schedule & Venue"
              value={clubForm.meetingSchedule}
              onChange={(e) =>
                setClubForm({ ...clubForm, meetingSchedule: e.target.value })
              }
            />
          </div>

          <div className="pt-4 border-t border-[#0F172A]/15 space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E11D48]">
              2. Assign Leadership Hierarchy (Leader & Vice Leader)
            </h3>

            <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#0F172A]/20 space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                  Who should be the Club Leader / President?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setClubForm({
                        ...clubForm,
                        leaderMode: 'self',
                        leaderName: myDefaultLabel,
                      })
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-md border text-left flex items-center justify-between ${
                      clubForm.leaderMode === 'self'
                        ? 'bg-[#4F46E5] border-[#4F46E5] text-[#F8FAFC]'
                        : 'bg-white border-[#0F172A]/25 text-[#0F172A]'
                    }`}
                  >
                    <span>Assign Myself ({userProfile.shortName})</span>
                    {clubForm.leaderMode === 'self' && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setClubForm({
                        ...clubForm,
                        leaderMode: 'other',
                        leaderName: CAMPUS_STUDENTS_DIRECTORY[2].name,
                      })
                    }
                    className={`px-3 py-2 text-xs font-semibold rounded-md border text-left flex items-center justify-between ${
                      clubForm.leaderMode === 'other'
                        ? 'bg-[#4F46E5] border-[#4F46E5] text-[#F8FAFC]'
                        : 'bg-white border-[#0F172A]/25 text-[#0F172A]'
                    }`}
                  >
                    <span>Assign Another Student</span>
                    {clubForm.leaderMode === 'other' && (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {clubForm.leaderMode === 'other' && (
                  <Select
                    id="club-leader-select"
                    label="Select Student as Club Leader"
                    options={studentSelectOptions}
                    value={clubForm.leaderName}
                    onChange={(e) =>
                      setClubForm({ ...clubForm, leaderName: e.target.value })
                    }
                  />
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Select
                  id="club-vice-leader"
                  label="Vice Leader (Required)"
                  required
                  options={studentSelectOptions}
                  value={clubForm.viceLeaderName}
                  onChange={(e) =>
                    setClubForm({ ...clubForm, viceLeaderName: e.target.value })
                  }
                  error={formErrors.viceLeaderName}
                />

                <Select
                  id="club-secretary"
                  label="Secretary / Coordinator"
                  options={studentSelectOptions}
                  value={clubForm.secretaryName}
                  onChange={(e) =>
                    setClubForm({ ...clubForm, secretaryName: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#0F172A]/15 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              3. Add Founding Members & Roles
            </h3>

            <div className="flex flex-col sm:flex-row items-end gap-2">
              <div className="w-full sm:flex-1">
                <Select
                  id="add-member-student"
                  label="Select Student from Directory"
                  options={studentSelectOptions}
                  value={newMemberStudent}
                  onChange={(e) => setNewMemberStudent(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-44">
                <Select
                  id="add-member-role"
                  label="Assign Role"
                  options={ROLE_OPTIONS}
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                size="md"
                icon={UserPlus}
                onClick={handleAddInitialMember}
              >
                Add Member
              </Button>
            </div>

            {clubForm.initialMembers.length > 0 && (
              <div className="border border-[#0F172A]/20 rounded-md divide-y divide-[#0F172A]/15">
                {clubForm.initialMembers.map((m) => (
                  <div
                    key={m.id}
                    className="px-3 py-2 flex items-center justify-between text-xs bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">
                        {m.name}
                      </span>
                      <Badge variant="warning">{m.role}</Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInitialMember(m.id)}
                      className="text-[#E11D48] hover:text-[#0F172A] p-1"
                      aria-label={`Remove ${m.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </Modal>

      {/* FULL-SCREEN CLUB CHATROOM & COMMUNITY WORKSPACE */}
      {activeModalClub && (() => {
        const canAccessClubWorkspace =
          role === 'admin' || activeModalClub.membershipState === 'Joined';
        const effectiveTab = canAccessClubWorkspace ? clubWorkspaceTab : 'overview';

        return (
        <div
          className="fixed inset-0 z-50 w-screen h-[100dvh] bg-[#F8FAFC] text-[#0F172A] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeModalClub.name} Workspace`}
        >
          {/* Full-Screen Top Navigation Header */}
          <header className="px-3 py-2.5 sm:px-6 sm:py-0 sm:h-14 bg-[#0F172A] border-b-2 border-[#F59E0B] flex flex-col md:flex-row md:items-center md:justify-between gap-2 shrink-0">
            <div className="flex items-center justify-between gap-2 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Button
                  variant="primary"
                  size="xs"
                  icon={ArrowLeft}
                  onClick={onCloseClubModal}
                >
                  <span className="hidden sm:inline">Back to Clubs</span>
                  <span className="sm:hidden">Back</span>
                </Button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs sm:text-base font-bold text-[#F8FAFC] truncate">
                      {activeModalClub.name}
                    </h2>
                    <Badge variant="warning" className="hidden sm:inline-flex">
                      {activeModalClub.category}
                    </Badge>
                    <Badge variant="primary" className="hidden lg:inline-flex">
                      {activeModalClub.memberCount} Members
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#F59E0B] font-medium truncate hidden sm:block">
                    {activeModalClub.meetingSchedule}
                  </p>
                </div>
              </div>

              {/* Mobile-only right actions on top row */}
              <div className="flex md:hidden items-center gap-1.5 shrink-0">
                {activeModalClub.approvalStatus !== 'Pending Approval' &&
                  activeModalClub.membershipState !== 'Joined' && (
                    <Button
                      variant="danger"
                      size="xs"
                      onClick={() => onJoinClub(activeModalClub.id)}
                    >
                      Join
                    </Button>
                  )}
                <button
                  type="button"
                  onClick={onCloseClubModal}
                  aria-label="Exit Full Screen"
                  className="p-1.5 rounded-lg bg-[#E11D48] hover:bg-[#F59E0B] text-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-2 overflow-x-auto">
              {canAccessClubWorkspace ? (
                <Tabs
                  tabs={[
                    {
                      id: 'chat',
                      label: 'Chat & DMs',
                      count: clubMessages.length,
                    },
                    {
                      id: 'overview',
                      label: 'Roster & Roles',
                      count: activeModalClub.members?.length || 0,
                    },
                    { id: 'projects', label: 'Projects' },
                  ]}
                  activeTab={effectiveTab}
                  onChange={setClubWorkspaceTab}
                />
              ) : (
                <Badge variant="warning">Club Details · Members Only Chat</Badge>
              )}

              {role === 'admin' &&
                activeModalClub.approvalStatus === 'Pending Approval' && (
                  <Button
                    variant="danger"
                    size="xs"
                    onClick={() => onApproveClub(activeModalClub.id)}
                  >
                    Approve
                  </Button>
                )}

              {activeModalClub.approvalStatus !== 'Pending Approval' &&
                activeModalClub.membershipState !== 'Joined' && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onJoinClub(activeModalClub.id)}
                    className="hidden md:inline-flex"
                  >
                    Join Club
                  </Button>
                )}

              <button
                type="button"
                onClick={onCloseClubModal}
                aria-label="Exit Full Screen"
                className="hidden md:inline-flex p-2 rounded-lg bg-[#E11D48] hover:bg-[#F59E0B] text-[#F8FAFC] hover:text-[#0F172A] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* FULL-SCREEN BODY */}
          {effectiveTab === 'chat' && canAccessClubWorkspace ? (
            <div className="flex-1 flex min-h-0 overflow-hidden relative">
              {/* Mobile Backdrop when Channel/DM Drawer is open */}
              {mobileChannelsOpen && (
                <div
                  className="fixed inset-0 z-30 bg-[#0F172A]/75 md:hidden"
                  onClick={() => setMobileChannelsOpen(false)}
                />
              )}

              {/* LEFT SIDEBAR: CHANNELS & DIRECT MESSAGE THREADS (Responsive Drawer on Mobile, Fixed Sidebar on md+) */}
              <aside
                className={`${
                  mobileChannelsOpen
                    ? 'fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw]'
                    : 'hidden md:flex md:w-64 lg:w-72'
                } bg-[#0F172A] border-r-2 border-[#4F46E5] flex-col justify-between shrink-0 overflow-y-auto`}
              >
                <div className="p-3.5 space-y-5">
                  <div className="flex md:hidden items-center justify-between pb-2 border-b border-[#F8FAFC]/15">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                      Channels & Direct Messages
                    </span>
                    <button
                      type="button"
                      onClick={() => setMobileChannelsOpen(false)}
                      className="p-1 rounded bg-[#E11D48] text-[#F8FAFC]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Switch Active Club Quickly */}
                  <div>
                    <label
                      htmlFor="fullscreen-club-switcher"
                      className="block px-1 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]"
                    >
                      Active Club Workspace
                    </label>
                    <select
                      id="fullscreen-club-switcher"
                      value={activeModalClub.id}
                      onChange={(e) => {
                        const nextClub = visibleClubs.find(
                          (c) => c.id === e.target.value
                        );
                        if (nextClub) {
                          setActiveChannel('general');
                          onOpenClubDetails(nextClub);
                        }
                      }}
                      className="w-full h-9 px-2.5 text-xs font-bold rounded-lg bg-[#F8FAFC] text-[#0F172A] border border-[#4F46E5]"
                    >
                      {visibleClubs.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Group Channels */}
                  <div>
                    <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                      Club Text Channels
                    </p>
                    <div className="space-y-1">
                      {CHAT_CHANNELS.map((ch) => {
                        const active = activeChannel === ch.id;
                        const chCount = clubMessages.filter(
                          (m) => (m.channel || 'general') === ch.id
                        ).length;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => {
                              setActiveChannel(ch.id);
                              setReplyToMsg(null);
                              setMobileChannelsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                              active
                                ? 'bg-[#4F46E5] text-[#F8FAFC]'
                                : 'text-[#F8FAFC]/85 hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <Hash className="w-4 h-4 shrink-0" />
                              <span className="truncate">{ch.label}</span>
                            </span>
                            {chCount > 0 && (
                              <span
                                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                  active
                                    ? 'bg-[#F59E0B] text-[#0F172A]'
                                    : 'bg-[#E11D48] text-[#F8FAFC]'
                                }`}
                              >
                                {chCount}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Direct Messages (1-on-1 with Club Peers) */}
                  <div>
                    <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                      Direct Messages (1-on-1)
                    </p>
                    <div className="space-y-1">
                      {clubPeersList.map((peer) => {
                        const dmKey = `dm:${peer.name}`;
                        const isDmActive = activeChannel === dmKey;
                        return (
                          <div
                            key={peer.id}
                            className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                              isDmActive
                                ? 'bg-[#4F46E5] text-[#F8FAFC]'
                                : 'hover:bg-[#F8FAFC]/15 text-[#F8FAFC]'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setActiveChannel(dmKey);
                                setReplyToMsg(null);
                                setMobileChannelsOpen(false);
                              }}
                              className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
                            >
                              <span className="relative shrink-0">
                                <span className="w-7 h-7 rounded-full bg-[#F59E0B] flex items-center justify-center text-[10px] font-bold text-[#0F172A]">
                                  {peer.name.slice(0, 2).toUpperCase()}
                                </span>
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5] absolute -bottom-0.5 -right-0.5 border border-[#0F172A]" />
                              </span>
                              <div className="truncate">
                                <p className="text-xs font-bold text-[#F8FAFC] truncate">
                                  {peer.name.split('(')[0].trim()}
                                </p>
                                <p
                                  className={`text-[10px] truncate ${
                                    isDmActive
                                      ? 'text-[#F8FAFC]'
                                      : 'text-[#F59E0B]'
                                  }`}
                                >
                                  {peer.role}
                                </p>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleInspectStudentProfile(
                                  peer.name,
                                  peer.role
                                )
                              }
                              title={`View ${peer.name}'s Profile`}
                              className="p-1.5 rounded bg-[#E11D48] hover:bg-[#F59E0B] text-[#F8FAFC] hover:text-[#0F172A] transition-colors shrink-0 ml-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Current User Bar */}
                <div className="p-3 bg-[#0F172A] border-t border-[#F8FAFC]/15 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#E11D48] flex items-center justify-center text-xs font-bold text-[#F8FAFC] shrink-0">
                      {userProfile.shortName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#F8FAFC] truncate">
                        {role === 'admin'
                          ? 'Dr. Anil Raina (Pro-VC)'
                          : userProfile.name}
                      </p>
                      <p className="text-[10px] text-[#4F46E5] font-semibold truncate">
                        Online · {userProfile.branchCode || 'CSE'}{' '}
                        {userProfile.division || 'Div A'}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* CENTER MAIN FULL-HEIGHT CHAT STREAM */}
              <div className="flex-1 flex flex-col bg-[#F8FAFC] min-w-0">
                {/* Mobile Quick Channel & DM Switcher Bar */}
                <div className="flex md:hidden items-center gap-1.5 px-3 py-2 bg-[#0F172A] border-b border-[#4F46E5] overflow-x-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setMobileChannelsOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-[#F59E0B] text-[#0F172A] text-[11px] font-bold shrink-0 flex items-center gap-1"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Channels & DMs</span>
                  </button>
                  {CHAT_CHANNELS.map((ch) => {
                    const active = activeChannel === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => {
                          setActiveChannel(ch.id);
                          setReplyToMsg(null);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap shrink-0 flex items-center gap-1 ${
                          active
                            ? 'bg-[#4F46E5] text-[#F8FAFC]'
                            : 'bg-[#F8FAFC]/15 text-[#F8FAFC]'
                        }`}
                      >
                        <Hash className="w-3 h-3" />
                        <span>{ch.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Channel / DM Sub-Header */}
                <div className="h-11 sm:h-12 px-3 sm:px-5 bg-white border-b border-[#0F172A]/20 flex items-center justify-between gap-2 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {isDmChannel ? (
                      <MessageSquare className="w-4 h-4 text-[#E11D48] shrink-0" />
                    ) : (
                      <Hash className="w-4 h-4 text-[#4F46E5] shrink-0" />
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                      {isDmChannel
                        ? `DM: ${activeDmPeerName}`
                        : activeChannelMeta?.label || activeChannel}
                    </h3>
                    <span className="hidden lg:inline text-xs text-[#0F172A]/75 truncate">
                      —{' '}
                      {isDmChannel
                        ? 'Click View Profile to inspect academic details & skills'
                        : activeChannelMeta?.desc}
                    </span>
                  </div>

                  {isDmChannel && (
                    <Button
                      variant="secondary"
                      size="xs"
                      icon={Eye}
                      onClick={() =>
                        handleInspectStudentProfile(
                          activeDmPeerName,
                          'Club Member'
                        )
                      }
                    >
                      <span className="hidden sm:inline">View Student Profile</span>
                      <span className="sm:hidden">Profile</span>
                    </Button>
                  )}
                </div>

                {/* Pinned Message Banner */}
                {pinnedInChannel.length > 0 && (
                  <div className="px-3 sm:px-5 py-1.5 sm:py-2 bg-[#F59E0B] border-b border-[#0F172A]/20 flex items-center justify-between gap-2 text-xs shrink-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                      <Pin className="w-3.5 h-3.5 text-[#0F172A] shrink-0" />
                      <span className="font-bold text-[#0F172A] shrink-0">
                        Pinned:
                      </span>
                      <span className="text-[#0F172A] font-medium truncate">
                        {pinnedInChannel[0].text}
                      </span>
                    </div>
                  </div>
                )}

                {/* Full-Height Scrollable Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
                  {channelMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2 p-4">
                      <MessageSquare className="w-10 h-10 text-[#4F46E5]" />
                      <p className="text-sm font-bold text-[#0F172A]">
                        {isDmChannel
                          ? `Start a 1-on-1 conversation with ${activeDmPeerName}`
                          : `Welcome to #${activeChannel}`}
                      </p>
                      <p className="text-xs text-[#0F172A]/75 max-w-md">
                        Send the first message below or tap on any member&apos;s
                        name to view their student profile.
                      </p>
                    </div>
                  ) : (
                    channelMessages.map((msg) => {
                      const isMine = msg.senderName
                        .toLowerCase()
                        .includes(userProfile.shortName.toLowerCase());

                      return (
                        <div
                          key={msg.id}
                          className={`p-3 sm:p-4 rounded-xl border-2 space-y-2 max-w-4xl ${
                            isMine
                              ? 'bg-white border-[#4F46E5] ml-auto'
                              : 'bg-white border-[#0F172A]/20'
                          }`}
                        >
                          {msg.replyTo && (
                            <div className="px-2.5 py-1.5 rounded bg-[#F8FAFC] border-l-4 border-[#E11D48] text-xs text-[#0F172A]/80 truncate">
                              Replying to{' '}
                              <strong className="text-[#0F172A]">
                                {msg.replyTo.senderName}
                              </strong>
                              : &ldquo;{msg.replyTo.text}&rdquo;
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleInspectStudentProfile(
                                    msg.senderName,
                                    msg.senderRole
                                  )
                                }
                                className="text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#4F46E5] hover:underline flex items-center gap-2 text-left min-w-0"
                              >
                                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0F172A] text-[#F59E0B] flex items-center justify-center text-[11px] sm:text-xs font-bold shrink-0">
                                  {msg.senderName.slice(0, 2).toUpperCase()}
                                </span>
                                <span className="truncate">{msg.senderName}</span>
                              </button>
                              <Badge variant="primary">{msg.senderRole}</Badge>
                              {msg.pinned && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E11D48]">
                                  <Pin className="w-3 h-3" />
                                  Pinned
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-medium text-[#0F172A]/70">
                              {msg.time}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed sm:pl-9 break-words">
                            {msg.text}
                          </p>

                          {msg.linkUrl && (
                            <div className="sm:pl-9 pt-1">
                              <a
                                href={msg.linkUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F172A] text-xs font-semibold text-[#F59E0B] hover:text-[#4F46E5] max-w-full"
                              >
                                <Link2 className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                  {msg.linkUrl}
                                </span>
                              </a>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center justify-between gap-2 sm:pl-9 pt-1.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleReactMessage(msg.id, 'likes')
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F8FAFC] hover:bg-[#4F46E5] hover:text-[#F8FAFC] border border-[#0F172A]/20 text-xs font-semibold text-[#0F172A] transition-colors"
                              >
                                <ThumbsUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4F46E5]" />
                                <span>{msg.likes || 0}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleReactMessage(msg.id, 'fires')
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F8FAFC] hover:bg-[#F59E0B] border border-[#0F172A]/20 text-xs font-semibold text-[#0F172A] transition-colors"
                              >
                                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E11D48]" />
                                <span>{msg.fires || 0}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleReactMessage(msg.id, 'rockets')
                                }
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#F8FAFC] hover:bg-[#E11D48] hover:text-[#F8FAFC] border border-[#0F172A]/20 text-xs font-semibold text-[#0F172A] transition-colors"
                              >
                                <Rocket className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F59E0B]" />
                                <span>{msg.rockets || 0}</span>
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 text-[11px] sm:text-xs font-semibold">
                              <button
                                type="button"
                                onClick={() => setReplyToMsg(msg)}
                                className="text-[#4F46E5] hover:text-[#0F172A] flex items-center gap-1"
                              >
                                <Reply className="w-3.5 h-3.5" />
                                Reply
                              </button>
                              <button
                                type="button"
                                onClick={() => handleTogglePinMessage(msg.id)}
                                className="text-[#F59E0B] hover:text-[#0F172A] flex items-center gap-1"
                              >
                                <Pin className="w-3.5 h-3.5" />
                                {msg.pinned ? 'Unpin' : 'Pin'}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleInspectStudentProfile(
                                    msg.senderName,
                                    msg.senderRole
                                  )
                                }
                                className="text-[#0F172A] hover:text-[#4F46E5] flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                Profile
                              </button>
                              {isMine && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="text-[#E11D48] hover:text-[#0F172A]"
                                  title="Delete message"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Bottom Full-Width Composer */}
                <div className="p-2.5 sm:p-4 bg-white border-t-2 border-[#4F46E5] space-y-2 shrink-0">
                  {replyToMsg && (
                    <div className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border-l-4 border-[#4F46E5] flex items-center justify-between text-xs">
                      <span className="text-[#0F172A] truncate">
                        Replying to{' '}
                        <strong className="text-[#4F46E5]">
                          {replyToMsg.senderName}
                        </strong>
                        : {replyToMsg.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyToMsg(null)}
                        className="text-[#E11D48] hover:text-[#0F172A] ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {showLinkInput && (
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={attachmentUrl}
                        onChange={(e) => setAttachmentUrl(e.target.value)}
                        placeholder="Paste GitHub repo or project link (https://...)"
                        className="flex-1 h-9 px-3 text-xs rounded-lg glass-input min-w-0"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setShowLinkInput(false);
                          setAttachmentUrl('');
                        }}
                        className="text-xs font-semibold text-[#E11D48] hover:text-[#0F172A] px-2 shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <form
                    onSubmit={handleSendChatMessage}
                    className="flex items-center gap-1.5 sm:gap-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => setShowLinkInput((prev) => !prev)}
                      title="Attach GitHub / Project Link"
                      className={`h-10 px-2.5 sm:px-3 rounded-lg border text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors ${
                        showLinkInput
                          ? 'bg-[#F59E0B] border-[#F59E0B] text-[#0F172A]'
                          : 'bg-[#0F172A] border-[#0F172A] text-[#F8FAFC] hover:bg-[#4F46E5] hover:border-[#4F46E5]'
                      }`}
                    >
                      <Link2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Attach Link</span>
                    </button>

                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={
                        isDmChannel
                          ? `Message ${activeDmPeerName}...`
                          : `Message #${
                              activeChannelMeta?.label || activeChannel
                            }...`
                      }
                      className="flex-1 min-w-0 h-10 px-3 sm:px-4 text-xs sm:text-sm rounded-lg glass-input focus:outline-none"
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      icon={Send}
                      className="shrink-0"
                    >
                      <span className="hidden sm:inline">Send Message</span>
                      <span className="sm:hidden">Send</span>
                    </Button>
                  </form>
                </div>
              </div>

              {/* RIGHT SIDEBAR: CLUB LEADERSHIP & ONLINE MEMBERS DIRECTORY */}
              <aside className="hidden xl:flex xl:w-72 bg-[#0F172A] border-l-2 border-[#F59E0B] flex-col overflow-y-auto shrink-0 p-4 space-y-5">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] mb-2.5">
                    Club Executive Officers
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        role: 'Leader / President',
                        name:
                          activeModalClub.leadName ||
                          'Rohan Verma (4th Year CSE)',
                      },
                      {
                        role: 'Vice Leader',
                        name:
                          activeModalClub.viceLeadName ||
                          'Anuj Sharma (3rd Year CSE)',
                      },
                      {
                        role: 'Secretary',
                        name:
                          activeModalClub.secretaryName ||
                          'Sneha Reddy (2nd Year Microsoft AI & ML)',
                      },
                    ].map((off) => (
                      <button
                        key={off.role}
                        type="button"
                        onClick={() =>
                          handleInspectStudentProfile(off.name, off.role)
                        }
                        className="w-full p-2.5 rounded-xl bg-white hover:bg-[#F59E0B] border-l-4 border-l-[#4F46E5] text-left transition-colors group"
                      >
                        <p className="text-[10px] font-bold uppercase text-[#E11D48] group-hover:text-[#0F172A]">
                          {off.role}
                        </p>
                        <p className="text-xs font-bold text-[#0F172A] truncate mt-0.5">
                          {off.name}
                        </p>
                        <p className="text-[10px] font-semibold text-[#4F46E5] group-hover:text-[#0F172A] mt-0.5">
                          Click to View Profile →
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F8FAFC]/15">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B]">
                      All Club Members ({clubPeersList.length})
                    </h4>
                  </div>
                  <div className="space-y-1.5">
                    {clubPeersList.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          handleInspectStudentProfile(m.name, m.role)
                        }
                        className="w-full p-2 rounded-lg bg-[#F8FAFC]/10 hover:bg-[#4F46E5] flex items-center justify-between text-left transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-semibold text-[#F8FAFC] truncate">
                            {m.name}
                          </p>
                          <p className="text-[10px] text-[#F59E0B] truncate">
                            {m.role}
                          </p>
                        </div>
                        <Eye className="w-3.5 h-3.5 text-[#F8FAFC] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            /* FULL-SCREEN DETAILS / ROSTER / PROJECTS VIEW */
            <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
              <div className="max-w-5xl mx-auto space-y-6">
                {effectiveTab === 'overview' && (
                  <>
                    {!canAccessClubWorkspace && (
                      <div className="p-5 rounded-xl bg-[#0F172A] text-[#F8FAFC] border-l-4 border-l-[#4F46E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                            <h3 className="text-sm font-bold text-[#F8FAFC]">
                              Members-Only Chats &amp; Internal Workspace
                            </h3>
                          </div>
                          <p className="text-xs text-[#F8FAFC]/80">
                            Only joined club members can view or send messages in club channels, DMs, and project sprints.
                          </p>
                        </div>
                        {activeModalClub.membershipState === 'Pending Approval' ? (
                          <Badge variant="warning">Application Pending Approval</Badge>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => onJoinClub(activeModalClub.id)}
                            className="shrink-0"
                          >
                            {activeModalClub.requiresApproval
                              ? 'Apply to Join Club'
                              : 'Join Club to Unlock Chat'}
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="p-5 rounded-xl bg-white border border-[#0F172A]/20 space-y-4">
                      <h3 className="text-base font-bold text-[#0F172A]">
                        About {activeModalClub.name}
                      </h3>
                      <p className="text-sm text-[#0F172A]/85 leading-relaxed">
                        {activeModalClub.fullDescription ||
                          activeModalClub.shortDescription}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-4 rounded-xl bg-[#0F172A] border-l-4 border-l-[#E11D48] text-left">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5" />
                            Leader / President
                          </span>
                          <p className="text-sm font-bold text-[#F8FAFC] mt-1.5">
                            {activeModalClub.leadName || 'Unassigned'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0F172A] border-l-4 border-l-[#F59E0B] text-left">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            Vice Leader
                          </span>
                          <p className="text-sm font-bold text-[#F8FAFC] mt-1.5">
                            {activeModalClub.viceLeadName || 'Not Assigned'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0F172A] border-l-4 border-l-[#4F46E5] text-left">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Secretary
                          </span>
                          <p className="text-sm font-bold text-[#F8FAFC] mt-1.5">
                            {activeModalClub.secretaryName || 'Core Team'}
                          </p>
                        </div>
                      </div>

                      {activeModalClub.activities && activeModalClub.activities.length > 0 && (
                        <div className="pt-3 border-t border-[#0F172A]/15">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5] mb-2">
                            Club Activities &amp; Focus Areas
                          </h4>
                          <ul className="space-y-1.5">
                            {activeModalClub.activities.map((act) => (
                              <li key={act} className="flex items-center gap-2 text-xs text-[#0F172A]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5] shrink-0" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Member Roster & Role Assignment Section (Members & Admin Only) */}
                    {canAccessClubWorkspace && (
                    <div className="p-5 rounded-xl bg-white border border-[#0F172A]/20 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#0F172A]">
                          Club Member Directory (
                          {activeModalClub.members?.length || 0} Active)
                        </h4>
                        <select
                          aria-label="Filter club roster by branch"
                          value={rosterBranchFilter}
                          onChange={(e) =>
                            setRosterBranchFilter(e.target.value)
                          }
                          className="h-8 px-3 text-xs glass-input rounded-lg text-[#0F172A] font-semibold"
                        >
                          <option value="ALL">All Branches & Divisions</option>
                          <option value="CSE">CSE</option>
                          <option value="IT">IT</option>
                          <option value="ECE">ECE</option>
                          <option value="AIML">AIML</option>
                          <option value="MECH">MECH</option>
                        </select>
                      </div>

                      <form
                        onSubmit={handleAddMemberToExistingClub}
                        className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/20 flex flex-col sm:flex-row items-end gap-2.5"
                      >
                        <div className="w-full sm:flex-1">
                          <Select
                            id="detail-add-member"
                            label="Add Student from USTU Directory"
                            options={CAMPUS_STUDENTS_DIRECTORY.map((s) => ({
                              value: `${s.studentName} (${s.branch} · ${s.division})`,
                              label: `${s.studentName} — ${s.branch} ${s.division} (${s.rollNo})`,
                            }))}
                            value={detailMemberName}
                            onChange={(e) =>
                              setDetailMemberName(e.target.value)
                            }
                          />
                        </div>
                        <div className="w-full sm:w-48">
                          <Select
                            id="detail-add-role"
                            label="Role"
                            options={ROLE_OPTIONS}
                            value={detailMemberRole}
                            onChange={(e) =>
                              setDetailMemberRole(e.target.value)
                            }
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          icon={UserPlus}
                        >
                          Add Member
                        </Button>
                      </form>

                      {activeModalClub.members &&
                        activeModalClub.members.length > 0 && (
                          <div className="border border-[#0F172A]/20 rounded-xl divide-y divide-[#0F172A]/15 bg-white">
                            {activeModalClub.members
                              .filter((member) =>
                                rosterBranchFilter === 'ALL'
                                  ? true
                                  : member.name
                                      .toUpperCase()
                                      .includes(
                                        rosterBranchFilter.toUpperCase()
                                      )
                              )
                              .map((member) => (
                                <div
                                  key={member.id}
                                  className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-[#F8FAFC] transition-colors"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleInspectStudentProfile(
                                        member.name,
                                        member.role
                                      )
                                    }
                                    className="flex items-center gap-3 text-left group"
                                  >
                                    <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-xs font-bold text-[#F59E0B] shrink-0">
                                      {member.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-bold text-sm text-[#0F172A] group-hover:text-[#4F46E5] flex items-center gap-2">
                                        <span>{member.name}</span>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#4F46E5] text-[#F8FAFC]">
                                          View Profile
                                        </span>
                                      </p>
                                      <p className="text-xs text-[#0F172A]/75">
                                        {member.email}
                                      </p>
                                    </div>
                                  </button>

                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="secondary"
                                      size="xs"
                                      icon={MessageSquare}
                                      onClick={() => {
                                        setActiveChannel(`dm:${member.name}`);
                                        setClubWorkspaceTab('chat');
                                      }}
                                    >
                                      Direct Chat
                                    </Button>

                                    <select
                                      aria-label={`Change role for ${member.name}`}
                                      value={member.role}
                                      onChange={(e) =>
                                        handleChangeMemberRole(
                                          member.id,
                                          e.target.value
                                        )
                                      }
                                      className="h-8 px-2.5 text-xs glass-input rounded-lg text-[#0F172A] font-semibold focus:outline-none"
                                    >
                                      {ROLE_OPTIONS.map((r) => (
                                        <option key={r} value={r}>
                                          {r}
                                        </option>
                                      ))}
                                    </select>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveMemberFromClub(member.id)
                                      }
                                      aria-label={`Remove ${member.name}`}
                                      className="p-1.5 text-[#E11D48] hover:text-[#0F172A] rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                    </div>
                    )}
                  </>
                )}

                {effectiveTab === 'projects' && canAccessClubWorkspace && (
                  <div className="space-y-5">
                    <div className="p-5 rounded-xl bg-white border border-[#0F172A]/20 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#4F46E5] flex items-center gap-2">
                          <FolderGit2 className="w-4 h-4 text-[#E11D48]" />
                          Active Club Build Sprints & Repositories (60%
                          Practical Track)
                        </h4>
                        <Badge variant="warning">2 Active Sprints</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-[#F8FAFC] border-l-4 border-l-[#4F46E5] space-y-2">
                          <Badge variant="primary">Sprint 01 · Live Build</Badge>
                          <h5 className="text-sm font-bold text-[#0F172A]">
                            {activeModalClub.name} — HackUSTU Flagship Prototype
                          </h5>
                          <p className="text-xs text-[#0F172A]/75">
                            Lead: {activeModalClub.leadName} · Discuss in
                            #project-builds
                          </p>
                          <Button
                            variant="secondary"
                            size="xs"
                            icon={MessageSquare}
                            onClick={() => {
                              setActiveChannel('projects');
                              setClubWorkspaceTab('chat');
                            }}
                          >
                            Open #project-builds Channel
                          </Button>
                        </div>

                        <div className="p-4 rounded-xl bg-[#F8FAFC] border-l-4 border-l-[#F59E0B] space-y-2">
                          <Badge variant="warning">
                            Sprint 02 · Open for Peers
                          </Badge>
                          <h5 className="text-sm font-bold text-[#0F172A]">
                            USTU Campus Open-Source Tooling & Documentation
                          </h5>
                          <p className="text-xs text-[#0F172A]/75">
                            Coord: {activeModalClub.viceLeadName} · Open to all
                            years
                          </p>
                          <Button
                            variant="secondary"
                            size="xs"
                            icon={MessageSquare}
                            onClick={() => {
                              setActiveChannel('projects');
                              setClubWorkspaceTab('chat');
                            }}
                          >
                            Join Sprint Discussion
                          </Button>
                        </div>
                      </div>
                    </div>

                    {activeModalClub.activities && (
                      <div className="p-5 rounded-xl bg-white border border-[#0F172A]/20">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E11D48] mb-3">
                          Core Club Activities & Weekly Cohorts
                        </h4>
                        <ul className="space-y-2.5">
                          {activeModalClub.activities.map((act) => (
                            <li
                              key={act}
                              className="flex items-center gap-2.5 text-sm text-[#0F172A]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        );
      })()}

      {/* STUDENT PEER PROFILE VIEWER MODAL (Renders on top of Full-Screen Chat via z-[60]) */}
      <Modal
        isOpen={Boolean(inspectedPeer)}
        onClose={() => setInspectedPeer(null)}
        title={inspectedPeer?.studentName || 'Student Profile'}
        subtitle={`${inspectedPeer?.branch || 'CSE'} · ${
          inspectedPeer?.division || 'Div A'
        } · ${
          inspectedPeer?.year || '3rd Year'
        } · Universal SkillTech University`}
        maxWidth="max-w-lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setInspectedPeer(null)}
            >
              Close Profile
            </Button>
            {inspectedPeer && (
              <Button
                variant="primary"
                size="sm"
                icon={MessageSquare}
                onClick={() =>
                  handleStartDirectChatWithPeer(inspectedPeer, directMsgText)
                }
              >
                Open 1-on-1 Direct Chat
              </Button>
            )}
          </div>
        }
      >
        {inspectedPeer && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#0F172A] text-[#F8FAFC] flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center text-base font-bold text-[#0F172A] shrink-0">
                {inspectedPeer.studentName.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#F8FAFC]">
                    {inspectedPeer.studentName}
                  </h3>
                  <Badge variant="primary">{inspectedPeer.roleInClub}</Badge>
                  {inspectedPeer.isCR && <Badge variant="danger">CR</Badge>}
                </div>
                <p className="text-xs text-[#F8FAFC]/85">
                  Roll No:{' '}
                  <strong className="text-[#F59E0B]">
                    {inspectedPeer.rollNo}
                  </strong>{' '}
                  · {inspectedPeer.branch} {inspectedPeer.division} (
                  {inspectedPeer.batch})
                </p>
                <p className="text-xs text-[#4F46E5] flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {inspectedPeer.email}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#0F172A]/20 space-y-2 text-xs">
              <p className="text-[#0F172A] leading-relaxed">
                {inspectedPeer.bio}
              </p>
              <div className="pt-2 border-t border-[#0F172A]/15 flex items-center justify-between text-[#0F172A]/80">
                <span className="flex items-center gap-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#4F46E5]" />
                  {inspectedPeer.track}
                </span>
                <span className="font-bold text-[#E11D48]">
                  CGPA: {inspectedPeer.gpa}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5] mb-2">
                Verified Skills & Domain Track
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {inspectedPeer.skills.map((sk) => (
                  <Badge key={sk} variant="warning">
                    {sk}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#E11D48] mb-2">
                Campus Roles & Achievements
              </h4>
              <ul className="space-y-1.5 text-xs text-[#0F172A] font-medium">
                {inspectedPeer.achievements.map((ach) => (
                  <li key={ach} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#0F172A]/15 space-y-2">
              <label className="block text-xs font-bold text-[#0F172A]">
                Quick Note to {inspectedPeer.studentName} (Opens 1-on-1 DM)
              </label>
              <input
                type="text"
                value={directMsgText}
                onChange={(e) => setDirectMsgText(e.target.value)}
                placeholder={`Hey ${
                  inspectedPeer.studentName.split(' ')[0]
                }, let's team up for the next sprint...`}
                className="w-full h-9 px-3 text-xs rounded-lg glass-input"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
