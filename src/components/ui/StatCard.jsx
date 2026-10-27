import React from 'react';
import { Card } from './Card';

export function StatCard({ icon: Icon, label, value, subtext, onClick }) {
  return (
    <Card
      padding="p-4 sm:p-5"
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
      className={`border-t-4 border-t-[#17AAAA] ${
        onClick ? 'cursor-pointer text-left' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#363636]/75">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-[#FFA42E] flex items-center justify-center text-[#363636]">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#363636]">
          {value}
        </span>
        {subtext && (
          <span className="text-[11px] font-medium text-[#17AAAA] truncate">
            {subtext}
          </span>
        )}
      </div>
    </Card>
  );
}
