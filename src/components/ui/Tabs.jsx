import React from 'react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-[#064E3B] border border-[#064E3B] rounded-xl overflow-x-auto max-w-full ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 ${
              isActive
                ? 'bg-[#059669] text-[#FAF8F5]'
                : 'text-[#FAF8F5]/80 hover:text-[#F59E0B]'
            }`}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-bold ${
                  isActive
                    ? 'bg-[#F59E0B] text-[#064E3B]'
                    : 'bg-[#FAF8F5]/15 text-[#FAF8F5]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
