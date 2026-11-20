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
      className="flex flex-col justify-between h-full border-t-4 border-t-[#059669]"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
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
          <h3 className="text-base font-bold text-[#064E3B] group-hover:text-[#059669] transition-colors">
            {club.name}
          </h3>
          <p className="text-xs text-[#064E3B]/75 mt-1.5 line-clamp-2 leading-relaxed">
            {club.shortDescription}
          </p>
        </button>

        <div className="mt-4 pt-3 border-t border-[#064E3B]/15 flex items-center justify-between gap-2 text-xs text-[#064E3B]/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-[#059669]" />
            {club.memberCount} members
          </span>
          {club.leadName && (
            <span className="flex items-center gap-1 truncate max-w-[55%]">
              <Crown className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              <span className="truncate font-medium">
                {club.leadName.split('(')[0].trim()}
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#064E3B]/15 flex items-center justify-between gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={MessageSquare}
          onClick={() => (onOpenChat ? onOpenChat(club) : onOpenDetails(club))}
        >
          Open Chat
        </Button>

        {isPendingAdminApproval ? (
          <Button
            variant="accentSubtle"
            size="sm"
            icon={Clock}
            onClick={() => onOpenDetails(club)}
          >
            Pending
          </Button>
        ) : isJoined ? (
          <Button
            variant="subtle"
            size="sm"
            icon={UserCheck}
            onClick={() => onOpenDetails(club)}
          >
            Roster
          </Button>
        ) : isPendingMember ? (
          <Button variant="subtle" size="sm" icon={Clock} disabled>
            Applied
          </Button>
        ) : (
          <Button
            variant="secondary"
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
