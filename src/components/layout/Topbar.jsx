import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  ChevronRight,
} from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';
import { ProfileMenu } from './ProfileMenu';

const PAGE_LABELS = {
  home: 'Home',
  classroom: 'My Class',
  events: 'Events & OD',
  clubs: 'Clubs & Chat',
  volunteering: 'Volunteering',
  feedback: 'Feedback',
  calendar: 'Calendar',
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
    <header className="sticky top-0 z-20 h-14 bg-[#1C1917] border-b-2 border-[#CA8A04] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileDrawer}
          aria-label="Open navigation menu"
          className="lg:hidden p-1.5 -ml-1 text-[#FAFAF9] hover:bg-[#0D9488] rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs min-w-0">
          <button
            type="button"
            onClick={() => onNavigate(role === 'admin' ? 'admin' : 'home')}
            className="text-[#FAFAF9]/75 hover:text-[#CA8A04] font-medium hidden sm:inline"
          >
            UniHive
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#CA8A04] hidden sm:inline shrink-0" />
          <span className="font-bold text-[#FAFAF9] truncate text-sm">
            {PAGE_LABELS[activePage] || 'Dashboard'}
          </span>
        </nav>
      </div>

      {/* Right: Quick Search, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search
            className="w-3.5 h-3.5 text-[#1C1917]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={globalSearch}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search events or clubs..."
            aria-label="Quick search across campus"
            className="w-full h-8 pl-8 pr-3 text-xs bg-[#FAFAF9] text-[#1C1917] placeholder-[#1C1917]/60 border border-[#0D9488] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CA8A04]"
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
            className="relative p-1.5 text-[#FAFAF9] hover:bg-[#0D9488] rounded-lg transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#EA580C] border border-[#1C1917]" />
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
            className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-[#FAFAF9]/15 transition-all"
          >
            {activePerson?.avatarUrl ? (
              <img
                src={activePerson.avatarUrl}
                alt={activePerson.name || 'User'}
                className="w-7 h-7 rounded-full object-cover border border-[#CA8A04]"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#CA8A04] flex items-center justify-center text-xs font-bold text-[#1C1917]">
                {(activePerson?.shortName || activePerson?.name || 'UH')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
            <span className="hidden sm:inline text-xs font-semibold text-[#FAFAF9]">
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
      </div>
    </header>
  );
}
