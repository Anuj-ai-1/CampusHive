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
    { id: 'classroom', label: 'My Class', icon: GraduationCap },
    { id: 'events', label: 'Events & OD', icon: CalendarDays },
    { id: 'clubs', label: 'Clubs & Chat', icon: Users },
    { id: 'volunteering', label: 'Volunteering', icon: HeartHandshake },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareText },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ];

  const adminWorkspaceNav = [
    {
      id: 'admin',
      label: 'Dashboard',
      icon: ShieldCheck,
      badge: pendingApprovalsCount,
    },
    { id: 'classroom', label: 'Classes', icon: GraduationCap },
    { id: 'clubs', label: 'Clubs & Chat', icon: Users },
    { id: 'events', label: 'Events & OD', icon: CalendarDays },
    { id: 'feedback', label: 'Tickets', icon: MessageSquareText },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  ];

  const currentPerson = role === 'admin' ? adminProfile : userProfile;
  const activeNavList =
    role === 'admin' ? adminWorkspaceNav : studentWorkspaceNav;

  return (
    <aside
      aria-label="Primary Sidebar"
      className="hidden lg:flex lg:flex-col lg:w-[240px] lg:fixed lg:inset-y-0 bg-[#1C1917] border-r-2 border-[#0D9488] select-none z-30"
    >
      {/* Brand identity */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#FAFAF9]/15 bg-[#1C1917]">
        <button
          type="button"
          onClick={() => onNavigate(role === 'admin' ? 'admin' : 'home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#EA580C] flex items-center justify-center text-[#FAFAF9]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-[#FAFAF9] leading-none">
              UniHive × USTU
            </div>
            <div className="text-[11px] text-[#CA8A04] font-medium mt-0.5 truncate max-w-[145px]">
              {role === 'admin' ? 'USTU Pro-VC Admin' : 'USTU Student Portal'}
            </div>
          </div>
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#CA8A04]">
            {role === 'admin' ? 'Admin Menu' : 'Menu'}
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0D9488] text-[#FAFAF9] border border-[#0D9488]'
                      : 'text-[#FAFAF9]/80 hover:text-[#1C1917] hover:bg-[#FAFAF9] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#FAFAF9]' : 'text-[#0D9488]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#EA580C] text-[#FAFAF9] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer + Logout to Login Screen */}
      <div className="p-3 border-t border-[#FAFAF9]/15 bg-[#1C1917] space-y-2">
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          {currentPerson?.avatarUrl ? (
            <img
              src={currentPerson.avatarUrl}
              alt={currentPerson.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-[#CA8A04] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#CA8A04] flex items-center justify-center text-xs font-bold text-[#1C1917] shrink-0">
              {(currentPerson?.shortName || currentPerson?.name || 'UH')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#FAFAF9] truncate">
              {currentPerson?.name || 'UniHive User'}
            </p>
            <p className="text-[11px] text-[#0D9488] font-medium truncate">
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
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold text-[#FAFAF9] bg-[#EA580C] hover:bg-[#CA8A04] hover:text-[#1C1917] rounded-lg transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out / Switch Portal
        </button>
      </div>
    </aside>
  );
}
