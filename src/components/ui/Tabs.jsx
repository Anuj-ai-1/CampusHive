import React from 'react';

export function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-[#363636] border border-[#363636] rounded-xl overflow-x-auto max-w-full ${className}`}
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
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-150 ${
              isActive
                ? 'bg-[#17AAAA] text-[#EEEEEE]'
                : 'text-[#EEEEEE]/80 hover:text-[#FFA42E]'
            }`}
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  isActive
                    ? 'bg-[#FFA42E] text-[#363636]'
                    : 'bg-[#EEEEEE]/15 text-[#EEEEEE]'
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
