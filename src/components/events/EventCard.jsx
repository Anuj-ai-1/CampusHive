import React from 'react';
import {
  MapPin,
  Clock,
  Users,
  Check,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function EventCard({
  event,
  onRegister,
  onCancelRegistration,
  onOpenDetails,
  compact = false,
}) {
  const spotsLeft = Math.max(0, event.capacity - event.registeredCount);
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 15;
  const branchTag =
    event.targetBranches && !event.targetBranches.includes('ALL')
      ? event.targetBranches.join(', ')
      : 'All Branches';

  return (
    <Card
      padding="p-4 sm:p-5"
      interactive
      className="flex flex-col justify-between h-full"
    >
      <div>
        {/* Top Row: Frosted Date Block + Category & Status */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 shadow-sm flex flex-col items-center justify-center shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#17AAAA] leading-none">
                {event.monthShort}
              </span>
              <span className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                {event.dayNumber}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="neutral">{event.category}</Badge>
                {event.isRegistered && (
                  <Badge variant="success" dot>
                    Registered
                  </Badge>
                )}
                {event.odEligible && (
                  <Badge variant="primary">OD Eligible</Badge>
                )}
                {event.approvalStatus === 'Pending Approval' && (
                  <Badge variant="warning" dot>
                    Pending Approval
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 shrink-0" />
                <span className="truncate">
                  {event.organizer} · <strong>{branchTag}</strong>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Title & Short Description */}
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="text-left group focus:outline-none block w-full"
        >
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#17AAAA] transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {event.shortDescription}
          </p>
        </button>

        {/* Metadata */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {event.startTime} · {event.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          {!compact && (
            <div className="flex items-center justify-between pt-0.5">
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  {event.registeredCount} / {event.capacity} registered
                </span>
              </span>
              {isAlmostFull && (
                <span className="text-[11px] font-medium text-amber-700">
                  {spotsLeft} spots left
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenDetails(event)}
          className="px-2"
        >
          Details & OD Sheet
        </Button>

        {event.isRegistered ? (
          <div className="flex items-center gap-1.5">
            {onCancelRegistration && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCancelRegistration(event)}
                className="text-xs text-slate-500 hover:text-red-600"
              >
                Cancel
              </Button>
            )}
            <Button
              variant="success"
              size="sm"
              icon={Check}
              onClick={() => onOpenDetails(event)}
            >
              Registered
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onRegister(event.id)}
            disabled={spotsLeft === 0}
          >
            {spotsLeft === 0 ? 'Full' : 'Register'}
          </Button>
        )}
      </div>
    </Card>
  );
}
