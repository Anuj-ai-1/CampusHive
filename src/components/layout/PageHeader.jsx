import React from 'react';

export function PageHeader({ title, subtitle, actions, children }) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#363636]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[#363636] mt-1">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
