import React from 'react';
import { Badge } from '../ui/Badge';
import { Pin, ChevronRight } from 'lucide-react';

export function AnnouncementItem({ announcement, onSelect }) {
  const categoryVariants = {
    'Division Notice': 'primary',
    'Branch Notice': 'warning',
    Events: 'primary',
    Clubs: 'neutral',
    Academic: 'warning',
    Volunteering: 'success',
    Facilities: 'neutral',
    Opportunities: 'primary',
  };

  const scopeBadgeLabel =
    announcement.targetBranch && announcement.targetBranch !== 'ALL'
      ? announcement.targetDivision && announcement.targetDivision !== 'ALL'
        ? `${announcement.targetBranch} · ${announcement.targetDivision}`
        : `${announcement.targetBranch} Branch`
      : null;

  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(announcement)}
      className="w-full text-left p-4 hover:bg-white/65 transition-colors duration-150 flex items-start justify-between gap-4 group"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {announcement.pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#17AAAA]">
              <Pin className="w-3 h-3" />
              Pinned
            </span>
          )}
          {scopeBadgeLabel && (
            <Badge variant="dark">{scopeBadgeLabel}</Badge>
          )}
          <Badge variant={categoryVariants[announcement.category] || 'neutral'}>
            {announcement.category}
          </Badge>
          <span className="text-xs text-slate-500">{announcement.source}</span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">
            {announcement.relativeTime}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#17AAAA] transition-colors">
          {announcement.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
          {announcement.summary}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 mt-1 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
