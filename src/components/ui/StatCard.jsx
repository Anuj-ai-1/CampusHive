import React from 'react';
import { Card } from './Card';

export function StatCard({ icon: Icon, label, value, subtext, onClick }) {
  return (
    <Card
      padding="p-3.5 sm:p-5"
      interactive={Boolean(onClick)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`border-t-4 border-t-[#4F46E5] ${
        onClick ? 'cursor-pointer text-left' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-semibold text-[#0F172A]/75 leading-tight">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F59E0B] flex items-center justify-center text-[#0F172A] shrink-0">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2">
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A]">
          {value}
        </span>
        {subtext && (
          <span className="text-[10px] sm:text-[11px] font-medium text-[#4F46E5] truncate">
            {subtext}
          </span>
        )}
      </div>
    </Card>
  );
}
