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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#363636]/80 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-white border-2 border-[#363636] rounded-xl shadow-2xl overflow-hidden my-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b-2 border-[#17AAAA] bg-[#363636]">
          <div>
            <h2
              id="modal-title"
              className="text-base font-bold text-[#EEEEEE]"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[#FFA42E] font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#EEEEEE] hover:bg-[#F63F3A] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[75vh] overflow-y-auto text-sm text-[#363636]">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 bg-[#EEEEEE] border-t border-[#363636]/15">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
