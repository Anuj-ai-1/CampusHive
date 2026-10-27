import React, { useRef, useEffect } from 'react';
import { User, RotateCcw, LogOut, ShieldCheck } from 'lucide-react';

export function ProfileMenu({
  isOpen,
  onClose,
  role,
  onLogout,
  onNavigateProfile,
  onResetDemoData,
  userProfile,
  adminProfile,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePerson = role === 'admin' ? adminProfile : userProfile;

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Account menu"
      className="fixed sm:absolute right-3 sm:right-0 top-16 sm:top-auto sm:mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-white border-2 border-[#363636] rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-slate-200/60 bg-white/50">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-semibold text-slate-900">
            {activePerson.name}
          </p>
          {role === 'admin' && (
            <ShieldCheck className="w-3.5 h-3.5 text-[#17AAAA]" />
          )}
        </div>
        <p className="text-xs text-slate-500 truncate">{activePerson.email}</p>
        <p className="text-[11px] text-slate-500 mt-1">
          {role === 'admin'
            ? activePerson.roleTitle
            : `${userProfile.department} · ${userProfile.year}`}
        </p>
      </div>

      <div className="p-1.5 space-y-0.5">
        {role === 'student' && (
          <button
            type="button"
            onClick={() => {
              onNavigateProfile();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-800 hover:bg-white/70 rounded-lg transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            My Student Profile
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            onResetDemoData();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-white/70 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo State
        </button>

        <button
          type="button"
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-red-700 hover:bg-red-50/80 rounded-lg transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out to Login Page
        </button>
      </div>
    </div>
  );
}
