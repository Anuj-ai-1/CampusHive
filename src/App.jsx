import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  INITIAL_USER_PROFILE,
  ADMIN_PROFILE,
  INITIAL_SEMESTER_CALENDAR,
} from './data/mockData';
import { api, getAuthToken, setAuthToken, subscribeToRealtime } from './services/api';
import { AppLayout } from './components/layout/AppLayout';
import { Toast } from './components/ui/Toast';
import { OnboardingWizard } from './components/profile/OnboardingWizard';
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
  const [authSession, setAuthSession] = useState(null); // null | 'student' | 'admin'
  const [booting, setBooting] = useState(Boolean(getAuthToken()));
  const [activePage, setActivePage] = useState('home');
  const [globalSearch, setGlobalSearch] = useState('');
  const [pendingPublicClubsCount, setPendingPublicClubsCount] = useState(0);

  // Hydrated live state from SQLite Backend
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [adminProfile, setAdminProfile] = useState(ADMIN_PROFILE);
  const [campusDirectory, setCampusDirectory] = useState([]);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [volunteerRoles, setVolunteerRoles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [semesterCalendar, setSemesterCalendar] = useState(INITIAL_SEMESTER_CALENDAR);

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

  const applyBootstrap = useCallback((data) => {
    if (!data) return;
    if (data.userProfile) setUserProfile(data.userProfile);
    if (data.adminProfile) setAdminProfile(data.adminProfile);
    if (Array.isArray(data.campusDirectory)) setCampusDirectory(data.campusDirectory);
    if (Array.isArray(data.events)) setEvents(data.events);
    if (Array.isArray(data.clubs)) setClubs(data.clubs);
    if (Array.isArray(data.volunteerRoles)) setVolunteerRoles(data.volunteerRoles);
    if (Array.isArray(data.tasks)) setTasks(data.tasks);
    if (Array.isArray(data.announcements)) setAnnouncements(data.announcements);
    if (Array.isArray(data.feedbackList)) setFeedbackList(data.feedbackList);
    if (Array.isArray(data.notifications)) setNotifications(data.notifications);
    if (Array.isArray(data.semesterCalendar)) setSemesterCalendar(data.semesterCalendar);
  }, []);

  const refreshBootstrap = useCallback(async () => {
    if (!getAuthToken()) return null;
    const data = await api.bootstrap();
    applyBootstrap(data);
    return data;
  }, [applyBootstrap]);

  // Restore authenticated session on initial mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      api
        .publicSummary()
        .then((res) => setPendingPublicClubsCount(res.pendingClubsCount || 0))
        .catch(() => {});
      setBooting(false);
      return;
    }

    refreshBootstrap()
      .then((data) => {
        if (data?.currentUser) {
          const role = data.currentUser.role;
          setAuthSession(role);
          setActivePage(role === 'admin' ? 'admin' : 'home');
        } else {
          setAuthToken(null);
          setAuthSession(null);
        }
      })
      .catch(() => {
        setAuthToken(null);
        setAuthSession(null);
      })
      .finally(() => setBooting(false));
  }, [refreshBootstrap]);

  // Real-time Server-Sent Events subscription across tabs
  useEffect(() => {
    if (!authSession) return undefined;
    const unsubscribe = subscribeToRealtime(() => {
      refreshBootstrap().catch(() => {});
    });
    return unsubscribe;
  }, [authSession, refreshBootstrap]);

  const runAction = async (fn, successTitle, successDesc, type = 'success') => {
    try {
      const result = await fn();
      await refreshBootstrap();
      if (successTitle) {
        addToast(
          successTitle,
          typeof successDesc === 'function' ? successDesc(result) : successDesc,
          type
        );
      }
      return result;
    } catch (err) {
      addToast('Action Failed', err.message || 'Please try again.', 'error');
      return null;
    }
  };

  // Login & Logout handlers
  const handleAuthSuccess = async (res) => {
    setAuthToken(res.token);
    try {
      const data = await refreshBootstrap();
      const role = data?.currentUser?.role || res.role || 'student';
      setAuthSession(role);
      setActivePage(role === 'admin' ? 'admin' : 'home');
      addToast(
        role === 'admin' ? 'Signed in to Admin Portal' : 'Signed in to Student Portal',
        `Welcome back, ${data?.currentUser?.name || res.user?.name}.`,
        role === 'admin' ? 'info' : 'success'
      );
    } catch (err) {
      setAuthToken(null);
      addToast('Sign In Error', err.message, 'error');
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setAuthSession(null);
    setSelectedEventForModal(null);
    setSelectedClubForModal(null);
    api
      .publicSummary()
      .then((res) => setPendingPublicClubsCount(res.pendingClubsCount || 0))
      .catch(() => {});
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
    runAction(
      () => api.registerEvent(eventId),
      'Registration Confirmed',
      `You are registered for "${target.title}" on ${target.date}.`
    );
  };

  // Cancel Event Registration
  const handleCancelRegistration = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    if (!target || !target.isRegistered) return;
    runAction(
      () => api.cancelEventRegistration(eventId),
      'Registration Cancelled',
      `Your seat for "${target.title}" has been released.`,
      'info'
    );
  };

  // Create New Event (Admin publishes immediately, Student submits for approval)
  const handleCreateEvent = (form) => {
    runAction(
      () => api.createEvent(form),
      authSession === 'admin' ? 'Event Published' : 'Event Proposal Submitted',
      authSession === 'admin'
        ? `"${form.title.trim()}" is now live across UniHive.`
        : `"${form.title.trim()}" has been sent to Admin for approval.`
    );
  };

  // Student Creates a New Club Proposal -> Sends Notification to Admin for Permission
  const handleCreateClubProposal = (clubForm) => {
    runAction(
      () => api.createClub(clubForm),
      'Club Proposal Sent to Admin',
      `"${clubForm.name}" has been saved and notified to the Admin for permission.`
    );
  };

  // Update Club Roster / Leadership Roles
  const handleUpdateClubHierarchy = (clubId, payload) => {
    runAction(
      () => api.updateClubHierarchy(clubId, payload),
      'Club Roster Updated',
      'Leadership roles and member list have been persisted to the database.'
    );
  };

  // Club Chat & DMs
  const handleSendClubMessage = (clubId, payload) => {
    return runAction(() => api.sendClubMessage(clubId, payload));
  };

  const handleUpdateClubMessage = (clubId, msgId, payload) => {
    return runAction(() => api.updateClubMessage(clubId, msgId, payload));
  };

  const handleDeleteClubMessage = (clubId, msgId) => {
    return runAction(
      () => api.deleteClubMessage(clubId, msgId),
      'Message Deleted',
      '',
      'info'
    );
  };

  // Admin Grants Permission to Student-Created Club
  const handleApproveClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    runAction(
      () => api.approveClub(clubId),
      'Club Permission Granted',
      `"${target?.name || 'Club'}" is now officially approved and open to all students.`
    );
  };

  // Admin Rejects Club Request
  const handleRejectClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    runAction(
      () => api.rejectClub(clubId),
      'Club Proposal Rejected',
      `"${target?.name || 'Club'}" was declined and removed from the permission queue.`,
      'info'
    );
  };

  // Join or Apply to Club
  const handleJoinClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    if (!target || target.membershipState === 'Joined' || target.membershipState === 'Pending Approval') {
      return;
    }
    runAction(
      () => api.joinClub(clubId),
      target.requiresApproval ? 'Membership Application Sent' : 'Joined Community',
      target.requiresApproval
        ? `Your application to ${target.name} has been sent to the club lead.`
        : `Welcome to ${target.name}!`
    );
  };

  // Leave Club
  const handleLeaveClub = (clubId) => {
    const target = clubs.find((c) => c.id === clubId);
    runAction(
      () => api.leaveClub(clubId),
      'Membership Updated',
      `You have left ${target?.name || 'the club'}.`,
      'info'
    );
  };

  // Apply for Volunteer Role
  const handleApplyVolunteer = (roleId) => {
    const target = volunteerRoles.find((r) => r.id === roleId);
    if (!target || target.status !== 'Open') return;
    runAction(
      () => api.applyVolunteer(roleId),
      'Volunteer Application Submitted',
      `Applied for "${target.title}" (${target.eventTitle}).`
    );
  };

  // Toggle Volunteer Task Completion
  const handleToggleTask = (taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;
    const nextCompleted = !target.completed;
    runAction(
      () => api.toggleTask(taskId),
      nextCompleted ? 'Task Completed' : 'Task Reopened',
      target.title,
      nextCompleted ? 'success' : 'info'
    );
  };

  const handleCreateTask = (payload) => {
    runAction(
      () => api.createTask(payload),
      'Task Added',
      payload.title
    );
  };

  // Submit Feedback
  const handleSubmitFeedback = (payload) => {
    runAction(
      () => api.submitFeedback(payload),
      'Feedback Submitted',
      (res) => `Ticket ${res?.referenceId || ''} recorded in SQLite database.`
    );
  };

  // Admin: Approve or Reject Event
  const handleApproveEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    runAction(
      () => api.approveEvent(eventId),
      'Event Proposal Approved',
      `"${target?.title || 'Event'}" is now published to the student Events directory.`
    );
  };

  const handleRejectEvent = (eventId) => {
    const target = events.find((e) => e.id === eventId);
    runAction(
      () => api.rejectEvent(eventId),
      'Event Proposal Returned',
      `"${target?.title || 'Event'}" was removed from the publication queue.`,
      'info'
    );
  };

  // Admin: Update Feedback Status
  const handleUpdateFeedbackStatus = (feedbackId, nextStatus) => {
    const target = feedbackList.find((f) => f.id === feedbackId);
    runAction(
      () => api.updateFeedbackStatus(feedbackId, nextStatus),
      `Ticket ${target?.referenceId || ''} Updated`,
      `Status changed to "${nextStatus}".`
    );
  };

  // Profile Update
  const handleUpdateProfile = (updatedProfile) => {
    runAction(
      () => api.updateProfile(updatedProfile),
      'Profile Updated',
      'Your student profile changes have been saved to SQLite.'
    );
  };

  // Post Division / Branch Announcement (CR / Admin)
  const handlePostDivisionAnnouncement = (newNotice) => {
    runAction(
      () => api.postAnnouncement(newNotice),
      'Targeted Notice Published',
      `Posted to ${newNotice.targetBranch} ${
        newNotice.targetDivision === 'ALL' ? 'All Divisions' : newNotice.targetDivision
      }.`
    );
  };

  // Add New Milestone to Branch & Semester Academic Calendar
  const handleAddSemesterItem = (newMilestone) => {
    runAction(
      () => api.addCalendarMilestone(newMilestone),
      'Semester Calendar Updated',
      `"${newMilestone.title}" added for ${newMilestone.branch} (${newMilestone.semester}).`
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
    runAction(() => api.markAllNotificationsRead());
  };

  // Reset Demo Data
  const handleResetDemoData = () => {
    runAction(
      () => api.resetDemoData(),
      'Database Reset',
      'All SQLite tables have been restored to initial defaults.',
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

  if (booting) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-[#064E3B] border-t-4 border-t-[#059669] rounded-xl px-6 py-5 text-center shadow-lg">
          <p className="text-sm font-bold text-[#064E3B]">
            Connecting to UniHive SQLite Backend...
          </p>
          <p className="text-xs text-[#059669] mt-1 font-medium">
            Syncing campus workspace &amp; live session
          </p>
        </div>
      </div>
    );
  }

  // Render Login Portal if not authenticated
  if (!authSession) {
    return (
      <>
        <Login
          onAuthSuccess={handleAuthSuccess}
          pendingClubRequestsCount={pendingPublicClubsCount}
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
        adminProfile={adminProfile}
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
            campusDirectory={campusDirectory}
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
            campusDirectory={campusDirectory}
            role={authSession}
            globalSearch={globalSearch}
            onJoinClub={handleJoinClub}
            onLeaveClub={handleLeaveClub}
            onCreateClubProposal={handleCreateClubProposal}
            onUpdateClubHierarchy={handleUpdateClubHierarchy}
            onSendClubMessage={handleSendClubMessage}
            onUpdateClubMessage={handleUpdateClubMessage}
            onDeleteClubMessage={handleDeleteClubMessage}
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
            onCreateTask={handleCreateTask}
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
            campusDirectory={campusDirectory}
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

      {authSession === 'student' && userProfile?.profileCompleted === false && (
        <OnboardingWizard
          isOpen
          userProfile={userProfile}
          onCompleteProfile={handleUpdateProfile}
        />
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
