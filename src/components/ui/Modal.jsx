import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-2.5 sm:p-4 bg-[#363636]/80 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-white border-2 border-[#363636] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 border-b-2 border-[#17AAAA] bg-[#363636] shrink-0">
          <div className="min-w-0">
            <h2
              id="modal-title"
              className="text-sm sm:text-base font-bold text-[#EEEEEE] break-words"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-[#FFA42E] font-medium mt-0.5 break-words">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#EEEEEE] hover:bg-[#F63F3A] rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-3.5 sm:px-5 sm:py-4 overflow-y-auto flex-1 text-sm text-[#363636]">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-2 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#EEEEEE] border-t border-[#363636]/15 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
