import React, { useRef, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';

export function NotificationPopover({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onSelectNotification,
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

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Notifications"
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/85 backdrop-blur-2xl border border-white/90 ring-1 ring-slate-200/70 rounded-2xl shadow-xl z-40 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 bg-white/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-900">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-medium bg-indigo-50/80 text-[#17AAAA] rounded-full border border-indigo-200/80">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#17AAAA] hover:text-[#F63F3A]"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-200/60 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 px-4 text-center">
            <Bell className="w-5 h-5 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">You are all caught up.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                onSelectNotification(n);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 transition-colors hover:bg-white/70 flex items-start gap-3 ${
                n.unread ? 'bg-indigo-50/30' : 'bg-transparent'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  n.unread ? 'bg-[#17AAAA]' : 'bg-slate-300'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {n.title}
                  </p>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {n.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {n.message}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
