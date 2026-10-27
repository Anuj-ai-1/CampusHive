import React, { useState, useCallback, useMemo } from 'react';
import {
  INITIAL_USER_PROFILE,
  ADMIN_PROFILE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_CLUBS,
  INITIAL_VOLUNTEER_ROLES,
  INITIAL_TASKS,
  INITIAL_FEEDBACK,
  INITIAL_NOTIFICATIONS,
  INITIAL_SEMESTER_CALENDAR,
} from './data/mockData';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { AppLayout } from './components/layout/AppLayout';
import { Toast } from './components/ui/Toast';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Classroom } from './pages/Classroom';
import { Events } from './pages/Events';
import { Clubs } from './pages/Clubs';
import { Volunteering } from './pages/Volunteering';
import { Feedback } from './pages/Feedback';
import { Calendar } from './pages/Calendar';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  // Authentication session: null (logged out) | 'student' | 'admin'
  const [authSession, setAuthSession] = useLocalStorageState(
    'campusone_auth_session_v2',
    null
  );
  const [activePage, setActivePage] = useState('home');
  const [globalSearch, setGlobalSearch] = useState('');

  // Shared persistent state across all UniHive × USTU views
  const [userProfile, setUserProfile] = useLocalStorageState(
    'unihive_ustu_profile_v4',
    INITIAL_USER_PROFILE
  );
  const [events, setEvents] = useLocalStorageState(
    'unihive_ustu_events_v4',
    INITIAL_EVENTS
  );
  const [clubs, setClubs] = useLocalStorageState(
    'unihive_ustu_clubs_v4',
    INITIAL_CLUBS
  );
  const [volunteerRoles, setVolunteerRoles] = useLocalStorageState(
    'unihive_ustu_volunteer_roles_v4',
    INITIAL_VOLUNTEER_ROLES
  );
  const [tasks, setTasks] = useLocalStorageState(
    'unihive_ustu_tasks_v4',
    INITIAL_TASKS
  );
  const [announcements, setAnnouncements] = useLocalStorageState(
    'unihive_ustu_announcements_v4',
    INITIAL_ANNOUNCEMENTS
  );
  const [feedbackList, setFeedbackList] = useLocalStorageState(
    'unihive_ustu_feedback_v4',
    INITIAL_FEEDBACK
  );
  const [notifications, setNotifications] = useLocalStorageState(
    'unihive_ustu_notifications_v4',
    INITIAL_NOTIFICATIONS
  );
  const [semesterCalendar, setSemesterCalendar] = useLocalStorageState(
    'unihive_ustu_semester_calendar_v4',
    INITIAL_SEMESTER_CALENDAR
  );

  // Cross-page detail modals
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [selectedClubForModal, setSelectedClubForModal] = useState(null);

  // Toast notification queue
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, description = '', type = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Login & Logout handlers
  const handleLogin = (selectedRole) => {
    setAuthSession(selectedRole);
    if (selectedRole === 'admin') {
      setActivePage('admin');
      addToast(
        'Signed in to Admin Portal',
        `Welcome back, ${ADMIN_PROFILE.name}.`,
        'info'
      );
    } else {
      setActivePage('home');
      addToast(
        'Signed in to Student Portal',
        `Welcome back, ${userProfile.name}.`
      );
    }
  };

  const handleLogout = () => {
    setAuthSession(null);
    setSelectedEventForModal(null);
    setSelectedClubForModal(null);
    addToast(
      'Signed Out',
      'You have been logged out. Select Student or Admin portal to sign in.',
      'info'
    );
  };

  // Event Registration
  const handleRegisterEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target || target.isRegistered) return;

    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? {
              ...evt,
              isRegistered: true,
              registeredCount: Math.min(evt.capacity, evt.registeredCount + 1),
            }
          : evt
      )
    );
    addToast(
      'Registration Confirmed',
      `You are registered for "${target.title}" on ${target.date}.`
    );
  };

  // Cancel Event Registration
  const handleCancelRegistration = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target || !target.isRegistered) return;

    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === eventId
          ? {
              ...evt,
              isRegistered: false,
              registeredCount: Math.max(0, evt.registeredCount - 1),
            }
          : evt
      )
    );
    addToast(
      'Registration Cancelled',
      `Your seat for "${target.title}" has been released.`,
      'info'
    );
  };

  // Create New Event (Admin/Organizer)
  const handleCreateEvent = (form) => {
    const dateObj = form.date || '2026-11-20';
    const monthShort = dateObj.startsWith('2026-10') ? 'OCT' : 'NOV';
    const dayNumber = dateObj.slice(-2);

    const newEvent = {
      id: `evt-${Date.now()}`,
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.shortDescription.trim(),
      category: form.category,
      date: dateObj,
      monthShort,
      dayNumber,
      startTime: form.startTime || '03:00 PM',
      endTime: '05:00 PM',
      duration: form.duration || '2 hours',
      venue: form.venue.trim(),
      organizer: form.organizer.trim() || 'Student Council',
      capacity: parseInt(form.capacity, 10) || 100,
      registeredCount: 1,
      isRegistered: true,
      approvalStatus: 'Published',
      eligibility: form.eligibility || 'Open to all enrolled students.',
      tags: [form.category, 'UniHive'],
    };

    setEvents((prev) => [newEvent, ...prev]);
    addToast(
      'Event Published',
      `"${newEvent.title}" is now live across the student directory and calendar.`
    );
  };

  // Student Creates a New Club Proposal -> Sends Notification to Admin for Permission
  const handleCreateClubProposal = (clubForm) => {
    const officersList = [
      {
        id: `m-lead-${Date.now()}`,
        name: clubForm.leadName,
        role: 'Leader / President',
        email: 'leader@westfield.edu',
      },
      {
        id: `m-vlead-${Date.now()}`,
        name: clubForm.viceLeadName,
        role: 'Vice Leader',
        email: 'viceleader@westfield.edu',
      },
    ];

    if (clubForm.secretaryName) {
      officersList.push({
        id: `m-sec-${Date.now()}`,
        name: clubForm.secretaryName,
        role: 'Secretary',
        email: 'secretary@westfield.edu',
      });
    }

    // Deduplicate any initial members that match officers
    const extraMembers = (clubForm.initialMembers || []).filter(
      (m) => !officersList.some((o) => o.name === m.name)
    );
    const fullRoster = [...officersList, ...extraMembers];

    const newClub = {
      id: `clb-${Date.now()}`,
      name: clubForm.name,
      shortDescription: clubForm.shortDescription,
      fullDescription: clubForm.shortDescription,
      category: clubForm.category,
      memberCount: fullRoster.length,
      leadName: clubForm.leadName,
      viceLeadName: clubForm.viceLeadName,
      secretaryName: clubForm.secretaryName,
      createdBy: userProfile.id,
      createdByName: userProfile.name,
      approvalStatus: 'Pending Approval',
      meetingSchedule: clubForm.meetingSchedule,
      membershipState: 'Joined',
      requiresApproval: Boolean(clubForm.requiresApproval),
      members: fullRoster,
      activities: [
        'Weekly Core Team & Member Meetups',
        'Hands-on Campus Workshops & Projects',
        'Inter-department Collaborative Sprints',
      ],
    };

    setClubs((prev) => [newClub, ...prev]);

    // Push instant Notification to Admin
    const adminNotif = {
      id: `notif-admin-${Date.now()}`,
      recipientRole: 'admin',
      title: 'New Club Creation Permission Request',
      message: `${userProfile.name} proposed "${newClub.name}" (Leader: ${newClub.leadName}, Vice Leader: ${newClub.viceLeadName}). Grant permission to publish.`,
      time: 'Just now',
      unread: true,
      targetTab: 'admin',
    };

    setNotifications((prev) => [adminNotif, ...prev]);

    addToast(
      'Club Proposal Sent to Admin',
      `"${newClub.name}" has been created and notified to the Admin for permission.`
    );
  };

  // Update Club Roster / Leadership Roles
  const handleUpdateClubHierarchy = (clubId, updates) => {
    setClubs((prev) =>
      prev.map((club) => (club.id === clubId ? { ...club, ...updates } : club))
    );
    addToast(
      'Club Roster Updated',
      'Leadership roles and member list have been updated.'
    );
  };

  // Admin Grants Permission to Student-Created Club
  const handleApproveClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    if (!target) return;

    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId ? { ...c, approvalStatus: 'Approved' } : c
      )
    );

    const studentNotif = {
      id: `notif-stu-club-${Date.now()}`,
      recipientRole: 'student',
      title: 'Club Permission Granted by Admin!',
      message: `Admin approved your club "${target.name}". It is now officially live across UniHive.`,
      time: 'Just now',
      unread: true,
      targetTab: 'clubs',
    };
    setNotifications((prev) => [studentNotif, ...prev]);

    addToast(
      'Club Permission Granted',
      `"${target.name}" is now officially approved and open to all students.`
    );
  };

  // Admin Rejects Club Request
  const handleRejectClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    if (!target) return;

    setClubs((prev) => prev.filter((c) => c.id !== clubId));
    addToast(
      'Club Proposal Rejected',
      `"${target.name}" was declined and removed from the permission queue.`,
      'info'
    );
  };

  // Join or Apply to Club
  const handleJoinClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    if (
      !target ||
      target.membershipState === 'Joined' ||
      target.membershipState === 'Pending Approval'
    ) {
      return;
    }

    const nextState = target.requiresApproval ? 'Pending Approval' : 'Joined';
    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              membershipState: nextState,
              memberCount:
                nextState === 'Joined'
                  ? club.memberCount + 1
                  : club.memberCount,
            }
          : club
      )
    );

    if (nextState === 'Joined') {
      addToast(
        'Joined Community',
        `Welcome to ${target.name}! Weekly meetup details added to your profile.`
      );
    } else {
      addToast(
        'Membership Application Sent',
        `Your application to ${target.name} has been sent to the club lead.`
      );
    }
  };

  // Leave Club
  const handleLeaveClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    if (!target) return;

    setClubs((prev) =>
      prev.map((club) =>
        club.id === clubId
          ? {
              ...club,
              membershipState: club.requiresApproval
                ? 'Approval Required'
                : 'Open',
              memberCount: Math.max(0, club.memberCount - 1),
            }
          : club
      )
    );
    addToast('Membership Updated', `You have left ${target.name}.`, 'info');
  };

  // Apply for Volunteer Role
  const handleApplyVolunteer = (roleId) => {
    const target = volunteerRoles.find((r) => r.id === roleId);
    if (!target || target.status !== 'Open') return;

    setVolunteerRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              status: 'Applied',
              filledCount: Math.min(r.requiredCount, r.filledCount + 1),
            }
          : r
      )
    );

    addToast(
      'Volunteer Application Submitted',
      `Applied for "${target.title}" (${target.eventTitle}).`
    );
  };

  // Toggle Volunteer Task Completion
  const handleToggleTask = (taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;

    const nextCompleted = !target.completed;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: nextCompleted } : t
      )
    );

    addToast(
      nextCompleted ? 'Task Completed' : 'Task Reopened',
      target.title,
      nextCompleted ? 'success' : 'info'
    );
  };

  // Submit Feedback
  const handleSubmitFeedback = ({
    category,
    subject,
    description,
    relatedEvent,
  }) => {
    const randomNum = Math.floor(8900 + Math.random() * 999);
    const refId = `CMP-2026-${randomNum}`;
    const today = '2026-10-27';

    const newEntry = {
      id: `fdb-${Date.now()}`,
      referenceId: refId,
      category,
      subject,
      description,
      relatedEvent,
      submittedDate: today,
      updatedDate: today,
      status: 'Open',
      adminResponse:
        'Logged via UniHive portal. Assigned to the respective campus coordinator for initial review.',
    };

    setFeedbackList((prev) => [newEntry, ...prev]);
    addToast(
      `Feedback Submitted (${refId})`,
      'Your submission has been recorded and can be tracked below.'
    );
  };

  // Admin: Approve or Reject Event
  const handleApproveEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, approvalStatus: 'Published' } : e
      )
    );
    addToast(
      'Event Proposal Approved',
      `"${target.title}" is now published to the student Events directory.`
    );
  };

  const handleRejectEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return;

    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    addToast(
      'Event Proposal Returned',
      `"${target.title}" was removed from the publication queue.`,
      'info'
    );
  };

  // Admin: Update Feedback Status
  const handleUpdateFeedbackStatus = (feedbackId, nextStatus) => {
    const target = feedbackList.find((f) => f.id === feedbackId);
    if (!target) return;

    setFeedbackList((prev) =>
      prev.map((f) =>
        f.id === feedbackId
          ? {
              ...f,
              status: nextStatus,
              updatedDate: '2026-10-27',
              adminResponse:
                nextStatus === 'Resolved'
                  ? 'Verified and resolved by Campus Operations Administration on Oct 27, 2026.'
                  : 'Assigned to department supervisor; resolution in progress.',
            }
          : f
      )
    );
    addToast(
      `Ticket ${target.referenceId} Updated`,
      `Status changed to "${nextStatus}".`
    );
  };

  // Profile Update
  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    addToast('Profile Updated', 'Your student profile changes have been saved.');
  };

  // Post Division / Branch Announcement (CR / Admin)
  const handlePostDivisionAnnouncement = (newNotice) => {
    const entry = {
      id: `ann-div-${Date.now()}`,
      title: newNotice.title,
      source: newNotice.source,
      authorRole: newNotice.authorRole,
      date: '2026-10-27',
      relativeTime: 'Just now',
      category: newNotice.category,
      targetBranch: newNotice.targetBranch,
      targetDivision: newNotice.targetDivision,
      pinned: true,
      summary: newNotice.summary,
      content: newNotice.content,
    };
    setAnnouncements((prev) => [entry, ...prev]);
    addToast(
      'Targeted Notice Published',
      `Posted to ${newNotice.targetBranch} ${
        newNotice.targetDivision === 'ALL'
          ? 'All Divisions'
          : newNotice.targetDivision
      }.`
    );
  };

  // Add New Milestone to Branch & Semester Academic Calendar
  const handleAddSemesterItem = (newMilestone) => {
    setSemesterCalendar((prev) => [newMilestone, ...prev]);
    addToast(
      'Semester Calendar Updated',
      `"${newMilestone.title}" added for ${
        newMilestone.branch === 'ALL' ? 'All Branches' : newMilestone.branch
      } (${newMilestone.semester}).`
    );
  };

  // Filter notifications by logged-in role
  const roleNotifications = useMemo(() => {
    if (!authSession) return [];
    return notifications.filter(
      (n) => !n.recipientRole || n.recipientRole === authSession
    );
  }, [notifications, authSession]);

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        !n.recipientRole || n.recipientRole === authSession
          ? { ...n, unread: false }
          : n
      )
    );
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    setUserProfile(INITIAL_USER_PROFILE);
    setEvents(INITIAL_EVENTS);
    setClubs(INITIAL_CLUBS);
    setVolunteerRoles(INITIAL_VOLUNTEER_ROLES);
    setTasks(INITIAL_TASKS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setFeedbackList(INITIAL_FEEDBACK);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSemesterCalendar(INITIAL_SEMESTER_CALENDAR);
    addToast(
      'Demo State Reset',
      'All events, clubs, tasks, and feedback have been restored to initial defaults.',
      'info'
    );
  };

  // Open detail helpers that work from any page
  const handleOpenEventDetails = (evt) => {
    setSelectedEventForModal(evt);
    if (activePage !== 'events') {
      setActivePage('events');
    }
  };

  const handleOpenClubDetails = (club) => {
    setSelectedClubForModal(club);
    if (activePage !== 'clubs') {
      setActivePage('clubs');
    }
  };

  const pendingClubsCount = clubs.filter(
    (c) => c.approvalStatus === 'Pending Approval'
  ).length;

  const pendingApprovalsCount =
    pendingClubsCount +
    events.filter((e) => e.approvalStatus === 'Pending Approval').length +
    feedbackList.filter((f) => f.status !== 'Resolved').length;

  // Render Login Portal if not authenticated
  if (!authSession) {
    return (
      <>
        <Login
          onLogin={handleLogin}
          pendingClubRequestsCount={pendingClubsCount}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <>
      <AppLayout
        activePage={activePage}
        onNavigate={(page) => setActivePage(page)}
        role={authSession}
        onLogout={handleLogout}
        globalSearch={globalSearch}
        onGlobalSearchChange={(val) => {
          setGlobalSearch(val);
        }}
        notifications={roleNotifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onResetDemoData={handleResetDemoData}
        userProfile={userProfile}
        adminProfile={ADMIN_PROFILE}
        pendingApprovalsCount={pendingApprovalsCount}
      >
        {activePage === 'home' && (
          <Home
            userProfile={userProfile}
            events={events}
            clubs={clubs}
            volunteerRoles={volunteerRoles}
            tasks={tasks}
            announcements={announcements}
            onNavigate={setActivePage}
            onRegisterEvent={handleRegisterEvent}
            onJoinClub={handleJoinClub}
            onOpenEventDetails={handleOpenEventDetails}
            onOpenClubDetails={handleOpenClubDetails}
          />
        )}

        {activePage === 'classroom' && (
          <Classroom
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            announcements={announcements}
            onPostDivisionAnnouncement={handlePostDivisionAnnouncement}
            events={events}
            onOpenEventDetails={handleOpenEventDetails}
          />
        )}

        {activePage === 'events' && (
          <Events
            events={events}
            userProfile={userProfile}
            role={authSession}
            globalSearch={globalSearch}
            onRegisterEvent={handleRegisterEvent}
            onCancelRegistration={handleCancelRegistration}
            onCreateEvent={handleCreateEvent}
            selectedEventForModal={selectedEventForModal}
            onCloseEventModal={() => setSelectedEventForModal(null)}
            onOpenEventDetails={(evt) => setSelectedEventForModal(evt)}
          />
        )}

        {activePage === 'clubs' && (
          <Clubs
            clubs={clubs}
            userProfile={userProfile}
            role={authSession}
            globalSearch={globalSearch}
            onJoinClub={handleJoinClub}
            onLeaveClub={handleLeaveClub}
            onCreateClubProposal={handleCreateClubProposal}
            onUpdateClubHierarchy={handleUpdateClubHierarchy}
            onApproveClub={handleApproveClub}
            onRejectClub={handleRejectClub}
            selectedClubForModal={selectedClubForModal}
            onCloseClubModal={() => setSelectedClubForModal(null)}
            onOpenClubDetails={(club) => setSelectedClubForModal(club)}
          />
        )}

        {activePage === 'volunteering' && (
          <Volunteering
            volunteerRoles={volunteerRoles}
            tasks={tasks}
            onApplyVolunteer={handleApplyVolunteer}
            onToggleTask={handleToggleTask}
          />
        )}

        {activePage === 'feedback' && (
          <Feedback
            feedbackList={feedbackList}
            events={events}
            onSubmitFeedback={handleSubmitFeedback}
            role={authSession}
            onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
          />
        )}

        {activePage === 'calendar' && (
          <Calendar
            events={events}
            volunteerRoles={volunteerRoles}
            userProfile={userProfile}
            role={authSession}
            semesterCalendar={semesterCalendar}
            onAddSemesterItem={handleAddSemesterItem}
            onOpenEventDetails={handleOpenEventDetails}
          />
        )}

        {activePage === 'profile' && (
          <Profile
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            events={events}
            clubs={clubs}
            volunteerRoles={volunteerRoles}
            tasks={tasks}
            onOpenEventDetails={handleOpenEventDetails}
            onOpenClubDetails={handleOpenClubDetails}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboard
            events={events}
            clubs={clubs}
            feedbackList={feedbackList}
            onApproveEvent={handleApproveEvent}
            onRejectEvent={handleRejectEvent}
            onApproveClub={handleApproveClub}
            onRejectClub={handleRejectClub}
            onOpenClubDetails={handleOpenClubDetails}
            onUpdateFeedbackStatus={handleUpdateFeedbackStatus}
            onNavigate={setActivePage}
          />
        )}
      </AppLayout>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
