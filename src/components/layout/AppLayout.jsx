import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNavigation } from './MobileNavigation';

export function AppLayout({
  children,
  activePage,
  onNavigate,
  role,
  onLogout,
  globalSearch,
  onGlobalSearchChange,
  notifications,
  onMarkAllNotificationsRead,
  onResetDemoData,
  userProfile,
  adminProfile,
  pendingApprovalsCount,
}) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#363636] flex flex-col lg:flex-row relative overflow-x-hidden">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        role={role}
        onLogout={onLogout}
        userProfile={userProfile}
        adminProfile={adminProfile}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      <MobileNavigation
        activePage={activePage}
        onNavigate={onNavigate}
        isDrawerOpen={mobileDrawerOpen}
        onCloseDrawer={() => setMobileDrawerOpen(false)}
        role={role}
        onLogout={onLogout}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      <div className="flex-1 flex flex-col lg:pl-[240px] min-w-0">
        <Topbar
          activePage={activePage}
          onNavigate={onNavigate}
          onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
          globalSearch={globalSearch}
          onGlobalSearchChange={onGlobalSearchChange}
          notifications={notifications}
          onMarkAllNotificationsRead={onMarkAllNotificationsRead}
          onSelectNotification={(n) => {
            if (n.targetTab) onNavigate(n.targetTab);
          }}
          role={role}
          onLogout={onLogout}
          onResetDemoData={onResetDemoData}
          userProfile={userProfile}
          adminProfile={adminProfile}
        />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 lg:pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
