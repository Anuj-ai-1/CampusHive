import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';
import { ProfileMenu } from './ProfileMenu';

const PAGE_LABELS = {
  home: 'Home Dashboard',
  classroom: 'My Branch & Division Classroom',
  events: 'Events & OD Attendance',
  clubs: 'Clubs & Communities',
  volunteering: 'Volunteering & Tasks',
  feedback: 'Feedback & Grievance',
  calendar: 'Branch & Semester Calendar',
  profile: 'My Profile',
  admin: 'Admin Dashboard',
};

export function Topbar({
  activePage,
  onNavigate,
  onOpenMobileDrawer,
  globalSearch,
  onGlobalSearchChange,
  notifications,
  onMarkAllNotificationsRead,
  onSelectNotification,
  role,
  onLogout,
  onResetDemoData,
  userProfile,
  adminProfile,
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = (notifications || []).filter((n) => n.unread).length;
  const activePerson = role === 'admin' ? adminProfile : userProfile;

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && globalSearch.trim()) {
      if (activePage !== 'events' && activePage !== 'clubs') {
        onNavigate('events');
      }
    }
  };

  return (
    <header className="sticky top-0 z-20 h-14 bg-[#363636] border-b-2 border-[#FFA42E] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          aria-label="Open navigation menu"
          className="lg:hidden p-1.5 -ml-1 text-[#EEEEEE] hover:bg-[#17AAAA] rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs min-w-0">
          <button
            type="button"
            onClick={() => onNavigate(role === 'admin' ? 'admin' : 'home')}
            className="text-[#EEEEEE]/75 hover:text-[#FFA42E] font-medium hidden sm:inline"
          >
            UniHive
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#FFA42E] hidden sm:inline shrink-0" />
          <span className="font-bold text-[#EEEEEE] truncate text-sm sm:text-xs">
            {PAGE_LABELS[activePage] || 'Dashboard'}
          </span>
        </nav>

        <span
          className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
            role === 'admin'
              ? 'bg-[#F63F3A] text-[#EEEEEE]'
              : 'bg-[#17AAAA] text-[#EEEEEE]'
          }`}
        >
          {role === 'admin' && <ShieldCheck className="w-3 h-3" />}
          {role === 'admin' ? 'Admin Session' : 'Student Session'}
        </span>
      </div>

      {/* Right: Quick Search, Notifications, Profile, Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search
            className="w-3.5 h-3.5 text-[#363636]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={globalSearch}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Quick find events or clubs..."
            aria-label="Quick search across campus"
            className="w-full h-8 pl-8 pr-3 text-xs bg-[#EEEEEE] text-[#363636] placeholder-[#363636]/60 border border-[#17AAAA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA42E]"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            aria-expanded={notifOpen}
            className="relative p-1.5 text-[#EEEEEE] hover:bg-[#17AAAA] rounded-lg transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#F63F3A] border border-[#363636]" />
            )}
          </button>

          <NotificationPopover
            isOpen={notifOpen}
            onClose={() => setNotifOpen(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllNotificationsRead}
            onSelectNotification={(n) => {
              if (n.targetTab) onNavigate(n.targetTab);
            }}
          />
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            aria-label="Open user menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#EEEEEE]/15 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-[#FFA42E] flex items-center justify-center text-xs font-bold text-[#363636]">
              {(activePerson?.shortName || activePerson?.name || 'UH')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-[#EEEEEE]">
              {activePerson?.shortName || 'User'}
            </span>
          </button>

          <ProfileMenu
            isOpen={profileOpen}
            onClose={() => setProfileOpen(false)}
            role={role}
            onLogout={onLogout}
            onNavigateProfile={() => onNavigate('profile')}
            onResetDemoData={onResetDemoData}
            userProfile={userProfile}
            adminProfile={adminProfile}
          />
        </div>

        <button
          type="button"
          onClick={onLogout}
          title="Sign Out / Switch Portal"
          className="inline-flex items-center gap-1.5 h-8 px-2.5 text-xs font-semibold rounded-lg bg-[#F63F3A] text-[#EEEEEE] hover:bg-[#FFA42E] hover:text-[#363636] transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
