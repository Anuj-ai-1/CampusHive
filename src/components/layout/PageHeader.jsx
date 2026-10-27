import React from 'react';

export function PageHeader({ title, subtitle, actions, children }) {
  return (
    <div className="mb-5 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#363636] break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#363636]/80 mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
      {children && <div className="mt-3.5 sm:mt-4">{children}</div>}
    </div>
  );
}
