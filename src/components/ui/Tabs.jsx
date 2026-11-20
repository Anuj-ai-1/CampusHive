import React from 'react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-[#1C1917] border border-[#1C1917] rounded-xl overflow-x-auto max-w-full ${className}`}
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
                ? 'bg-[#0D9488] text-[#FAFAF9]'
                : 'text-[#FAFAF9]/80 hover:text-[#CA8A04]'
            }`}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-bold ${
                  isActive
                    ? 'bg-[#CA8A04] text-[#1C1917]'
                    : 'bg-[#FAFAF9]/15 text-[#FAFAF9]'
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
