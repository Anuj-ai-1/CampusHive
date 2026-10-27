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
  Layers,
  LogOut,
  GraduationCap,
} from 'lucide-react';

export function Sidebar({
  activePage,
  onNavigate,
  role,
  onLogout,
  userProfile,
  adminProfile,
  pendingApprovalsCount = 0,
}) {
  const studentWorkspaceNav = [
    { id: 'home', label: 'Home', icon: Home },
    {
      id: 'classroom',
      label: `My Division (${userProfile?.branchCode || 'CSE'} ${
        userProfile?.division || 'Div A'
      })`,
      icon: GraduationCap,
    },
    { id: 'events', label: 'Events & OD', icon: CalendarDays },
    { id: 'clubs', label: 'Clubs & Communities', icon: Users },
    { id: 'volunteering', label: 'Volunteering', icon: HeartHandshake },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareText },
    { id: 'calendar', label: 'Semester Calendar', icon: CalendarIcon },
  ];

  const adminWorkspaceNav = [
    {
      id: 'admin',
      label: 'Admin Dashboard',
      icon: ShieldCheck,
      badge: pendingApprovalsCount,
    },
    { id: 'classroom', label: 'Branches & Divisions', icon: GraduationCap },
    { id: 'clubs', label: 'Clubs & Permissions', icon: Users },
    { id: 'events', label: 'Events & OD Sheets', icon: CalendarDays },
    { id: 'feedback', label: 'Grievance Tickets', icon: MessageSquareText },
    { id: 'calendar', label: 'Semester Calendar', icon: CalendarIcon },
  ];

  const personalNav = [
    { id: 'profile', label: 'My Profile', icon: UserCircle },
  ];

  const currentPerson = role === 'admin' ? adminProfile : userProfile;
  const activeNavList =
    role === 'admin' ? adminWorkspaceNav : studentWorkspaceNav;

  return (
    <aside
      aria-label="Primary Sidebar"
      className="hidden lg:flex lg:flex-col lg:w-[240px] lg:fixed lg:inset-y-0 bg-[#363636] border-r-2 border-[#17AAAA] select-none z-30"
    >
      {/* Brand identity */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#EEEEEE]/15 bg-[#363636]">
        <button
          type="button"
          onClick={() => onNavigate(role === 'admin' ? 'admin' : 'home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#F63F3A] flex items-center justify-center text-[#EEEEEE]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-[#EEEEEE] leading-none">
              UniHive × USTU
            </div>
            <div className="text-[11px] text-[#FFA42E] font-medium mt-0.5 truncate max-w-[145px]">
              {role === 'admin' ? 'USTU Pro-VC Admin' : 'USTU Student Portal'}
            </div>
          </div>
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-2.5 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFA42E]">
            {role === 'admin' ? 'Administration' : 'Workspace'}
          </p>
          <nav className="space-y-1" aria-label="Workspace navigation">
            {activeNavList.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-[#17AAAA] text-[#EEEEEE] border border-[#17AAAA]'
                      : 'text-[#EEEEEE]/80 hover:text-[#363636] hover:bg-[#EEEEEE] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#EEEEEE]' : 'text-[#17AAAA]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#F63F3A] text-[#EEEEEE] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {role === 'student' && (
          <div>
            <p className="px-2.5 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFA42E]">
              Personal
            </p>
            <nav className="space-y-1" aria-label="Personal navigation">
              {personalNav.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
                      isActive
                        ? 'bg-[#17AAAA] text-[#EEEEEE] border border-[#17AAAA]'
                        : 'text-[#EEEEEE]/80 hover:text-[#363636] hover:bg-[#EEEEEE] border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#EEEEEE]' : 'text-[#17AAAA]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* User Footer + Logout to Login Screen */}
      <div className="p-3 border-t border-[#EEEEEE]/15 bg-[#363636] space-y-2">
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          <div className="w-8 h-8 rounded-full bg-[#FFA42E] flex items-center justify-center text-xs font-bold text-[#363636] shrink-0">
            {currentPerson.shortName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#EEEEEE] truncate">
              {currentPerson.name}
            </p>
            <p className="text-[11px] text-[#17AAAA] font-medium truncate">
              {role === 'admin'
                ? 'Pro-Vice Chancellor (USTU)'
                : `${userProfile?.branchCode || 'CSE'} · ${
                    userProfile?.division || 'Div A'
                  } · ${userProfile?.yearShort || '3rd Yr'}`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold text-[#EEEEEE] bg-[#F63F3A] hover:bg-[#FFA42E] hover:text-[#363636] rounded-lg transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out / Switch Portal
        </button>
      </div>
    </aside>
  );
}
