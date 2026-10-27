import React from 'react';
import {
  Home,
  CalendarDays,
  Users,
  HeartHandshake,
  MessageSquareText,
  Calendar as CalendarIcon,
  UserCircle,
  ShieldCheck,
  X,
  Layers,
  LogOut,
  GraduationCap,
} from 'lucide-react';

export function MobileNavigation({
  activePage,
  onNavigate,
  isDrawerOpen,
  onCloseDrawer,
  role,
  onLogout,
  pendingApprovalsCount = 0,
}) {
  const bottomItems =
    role === 'admin'
      ? [
          { id: 'admin', label: 'Admin', icon: ShieldCheck },
          { id: 'classroom', label: 'Divisions', icon: GraduationCap },
          { id: 'clubs', label: 'Clubs', icon: Users },
          { id: 'events', label: 'Events', icon: CalendarDays },
          { id: 'feedback', label: 'Tickets', icon: MessageSquareText },
        ]
      : [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'classroom', label: 'Division', icon: GraduationCap },
          { id: 'events', label: 'Events', icon: CalendarDays },
          { id: 'clubs', label: 'Clubs', icon: Users },
          { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
        ];

  const drawerItems =
    role === 'admin'
      ? [
          { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
          { id: 'classroom', label: 'Branches & Divisions', icon: GraduationCap },
          { id: 'clubs', label: 'Clubs & Permissions', icon: Users },
          { id: 'events', label: 'Events & OD Sheets', icon: CalendarDays },
          { id: 'feedback', label: 'Grievance Tickets', icon: MessageSquareText },
          { id: 'calendar', label: 'Campus Calendar', icon: CalendarIcon },
        ]
      : [
          { id: 'home', label: 'Home', icon: Home },
          { id: 'classroom', label: 'My Branch & Division Hub', icon: GraduationCap },
          { id: 'events', label: 'Events & OD', icon: CalendarDays },
          { id: 'clubs', label: 'Clubs & Communities', icon: Users },
          { id: 'volunteering', label: 'Volunteering', icon: HeartHandshake },
          { id: 'feedback', label: 'Feedback & Grievance', icon: MessageSquareText },
          { id: 'calendar', label: 'Campus Calendar', icon: CalendarIcon },
          { id: 'profile', label: 'My Profile', icon: UserCircle },
        ];

  return (
    <>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="fixed inset-0 bg-[#363636]/75"
            onClick={onCloseDrawer}
          />
          <div className="relative w-72 max-w-[85vw] bg-[#363636] h-full border-r-2 border-[#17AAAA] flex flex-col z-10 shadow-2xl">
            <div className="h-14 px-4 flex items-center justify-between border-b border-[#EEEEEE]/15">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#F63F3A] flex items-center justify-center text-[#EEEEEE]">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-[#EEEEEE]">
                  UniHive × USTU
                </span>
              </div>
              <button
                type="button"
                onClick={onCloseDrawer}
                aria-label="Close navigation drawer"
                className="p-1.5 text-[#EEEEEE] hover:bg-[#17AAAA] rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      onCloseDrawer();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#17AAAA] text-[#EEEEEE]'
                        : 'text-[#EEEEEE] hover:bg-[#EEEEEE] hover:text-[#363636]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </span>
                    {item.id === 'admin' && pendingApprovalsCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[11px] bg-[#F63F3A] text-[#EEEEEE] font-bold rounded-full">
                        {pendingApprovalsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-[#EEEEEE]/15 bg-[#363636]">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onCloseDrawer();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#EEEEEE] bg-[#F63F3A] rounded-lg hover:bg-[#FFA42E] hover:text-[#363636]"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out / Switch Portal
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Mobile quick navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 h-14 bg-[#363636] border-t-2 border-[#17AAAA] flex items-center justify-around z-30 px-1"
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-semibold transition-colors ${
                isActive ? 'text-[#FFA42E]' : 'text-[#EEEEEE]/80 hover:text-[#17AAAA]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
