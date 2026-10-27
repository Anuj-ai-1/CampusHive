import React from 'react';
import {
  Users,
  UserCheck,
  Clock,
  ShieldAlert,
  Crown,
  Award,
  MessageSquare,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function ClubCard({ club, onJoinClub, onOpenDetails, onOpenChat }) {
  const isPendingAdminApproval = club.approvalStatus === 'Pending Approval';
  const isJoined = club.membershipState === 'Joined';
  const isPendingMember = club.membershipState === 'Pending Approval';
  const requiresApproval = club.membershipState === 'Approval Required';

  const getBadgeProps = () => {
    if (isPendingAdminApproval) {
      return {
        variant: 'warning',
        text: 'Awaiting Admin Approval',
        dot: true,
      };
    }
    if (isJoined) return { variant: 'success', text: 'Member', dot: true };
    if (isPendingMember)
      return { variant: 'warning', text: 'Application Pending', dot: true };
    if (requiresApproval)
      return { variant: 'dark', text: 'Recruitment Open', dot: false };
    return { variant: 'primary', text: 'Open Membership', dot: false };
  };

  const badge = getBadgeProps();
  const msgCount = club.chatMessages ? club.chatMessages.length : 4;

  return (
    <Card
      padding="p-4 sm:p-5"
      interactive
      className="flex flex-col justify-between h-full border-t-4 border-t-[#17AAAA]"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant="neutral">{club.category}</Badge>
          <Badge variant={badge.variant} dot={badge.dot}>
            {badge.text}
          </Badge>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetails(club)}
          className="text-left group focus:outline-none block w-full"
        >
          <h3 className="text-base font-bold text-[#363636] group-hover:text-[#17AAAA] transition-colors">
            {club.name}
          </h3>
          <p className="text-xs text-[#363636]/75 mt-1.5 line-clamp-2 leading-relaxed">
            {club.shortDescription}
          </p>
        </button>

        <div className="mt-4 pt-3 border-t border-[#363636]/15 space-y-1.5 text-xs text-[#363636]/80">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#17AAAA]" />
              <span>
                {club.members ? club.members.length : club.memberCount} members
                {club.memberCount > (club.members?.length || 0)
                  ? ` (${club.memberCount} total)`
                  : ''}
              </span>
            </span>
            {club.requiresApproval && !isJoined && !isPendingAdminApproval && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#F63F3A]">
                <ShieldAlert className="w-3 h-3" />
                Approval required
              </span>
            )}
          </div>

          {club.leadName && (
            <p className="text-xs text-[#363636]/80 truncate flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-[#FFA42E] shrink-0" />
              <span className="truncate">
                Leader:{' '}
                <span className="text-[#363636] font-semibold">
                  {club.leadName}
                </span>
              </span>
            </p>
          )}

          {club.viceLeadName && (
            <p className="text-xs text-[#363636]/80 truncate flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#17AAAA] shrink-0" />
              <span className="truncate">
                Vice Leader:{' '}
                <span className="text-[#363636] font-semibold">
                  {club.viceLeadName}
                </span>
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#363636]/15 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            icon={MessageSquare}
            onClick={() =>
              onOpenChat ? onOpenChat(club) : onOpenDetails(club)
            }
          >
            Chat ({msgCount})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenDetails(club)}
            className="px-2"
          >
            Roster
          </Button>
        </div>

        {isPendingAdminApproval ? (
          <Button
            variant="accentSubtle"
            size="sm"
            icon={Clock}
            onClick={() => onOpenDetails(club)}
          >
            Pending Admin
          </Button>
        ) : isJoined ? (
          <Button
            variant="success"
            size="sm"
            icon={UserCheck}
            onClick={() => onOpenDetails(club)}
          >
            Joined
          </Button>
        ) : isPendingMember ? (
          <Button variant="subtle" size="sm" icon={Clock} disabled>
            Applied
          </Button>
        ) : (
          <Button
            variant={requiresApproval ? 'accentSubtle' : 'primary'}
            size="sm"
            onClick={() => onJoinClub(club.id)}
          >
            {requiresApproval ? 'Apply' : 'Join'}
          </Button>
        )}
      </div>
    </Card>
  );
}
