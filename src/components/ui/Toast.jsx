import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-16 md:bottom-5 right-4 z-[70] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const Icon =
          t.type === 'error'
            ? AlertCircle
            : t.type === 'info'
            ? Info
            : CheckCircle2;

        const iconColor =
          t.type === 'error'
            ? 'text-[#F63F3A]'
            : t.type === 'info'
            ? 'text-[#FFA42E]'
            : 'text-[#17AAAA]';

        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[#363636] border-2 border-[#17AAAA] rounded-xl shadow-2xl"
          >
            <Icon
              className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#EEEEEE]">{t.title}</p>
              {t.description && (
                <p className="text-xs text-[#EEEEEE]/80 mt-0.5 leading-snug">
                  {t.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-[#EEEEEE]/70 hover:text-[#F63F3A] p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
