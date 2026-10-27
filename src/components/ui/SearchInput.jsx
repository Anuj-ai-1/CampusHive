import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  ariaLabel = 'Search',
}) {
  return (
    <div className={`relative ${className}`}>
      <Search
        className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full h-9 pl-9 pr-8 text-sm glass-input text-slate-900 placeholder-slate-400 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#17AAAA]/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
