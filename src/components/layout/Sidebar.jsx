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
      className="hidden lg:flex lg:flex-col lg:w-[240px] lg:fixed lg:inset-y-0 bg-[#0F172A] border-r-2 border-[#4F46E5] select-none z-30"
    >
      {/* Brand identity */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#F8FAFC]/15 bg-[#0F172A]">
        <button
          type="button"
          onClick={() => onNavigate(role === 'admin' ? 'admin' : 'home')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#E11D48] flex items-center justify-center text-[#F8FAFC]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-[#F8FAFC] leading-none">
              UniHive × USTU
            </div>
            <div className="text-[11px] text-[#F59E0B] font-medium mt-0.5 truncate max-w-[145px]">
              {role === 'admin' ? 'USTU Pro-VC Admin' : 'USTU Student Portal'}
            </div>
          </div>
        </button>
      </div>

      {/* Main navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        <div>
          <p className="px-2.5 mb-2 text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
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
                      ? 'bg-[#4F46E5] text-[#F8FAFC] border border-[#4F46E5]'
                      : 'text-[#F8FAFC]/80 hover:text-[#0F172A] hover:bg-[#F8FAFC] border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#F8FAFC]' : 'text-[#4F46E5]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#E11D48] text-[#F8FAFC] rounded-full">
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
      <div className="p-3 border-t border-[#F8FAFC]/15 bg-[#0F172A] space-y-2">
        <div className="flex items-center gap-2.5 px-1.5 py-1">
          {currentPerson?.avatarUrl ? (
            <img
              src={currentPerson.avatarUrl}
              alt={currentPerson.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-[#F59E0B] shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-xs font-bold text-[#0F172A] shrink-0">
              {(currentPerson?.shortName || currentPerson?.name || 'UH')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#F8FAFC] truncate">
              {currentPerson?.name || 'UniHive User'}
            </p>
            <p className="text-[11px] text-[#4F46E5] font-medium truncate">
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
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-xs font-semibold text-[#F8FAFC] bg-[#E11D48] hover:bg-[#F59E0B] hover:text-[#0F172A] rounded-lg transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out / Switch Portal
        </button>
      </div>
    </aside>
  );
}
