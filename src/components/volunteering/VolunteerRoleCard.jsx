import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function VolunteerRoleCard({ role, onApply }) {
  const spotsLeft = Math.max(0, role.requiredCount - role.filledCount);

  const getStatusBadge = () => {
    switch (role.status) {
      case 'Approved':
        return <Badge variant="success" dot>Approved Shift</Badge>;
      case 'Applied':
        return <Badge variant="primary" dot>Applied</Badge>;
      case 'Waitlisted':
        return <Badge variant="warning" dot>Waitlisted</Badge>;
      default:
        return (
          <Badge variant="neutral">
            {spotsLeft} of {role.requiredCount} open
          </Badge>
        );
    }
  };

  return (
    <Card padding="p-4 sm:p-5" interactive className="flex flex-col justify-between">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-[#17AAAA]">
            {role.eventTitle}
          </span>
          {getStatusBadge()}
        </div>

        <h3 className="text-base font-semibold text-[#363636]">{role.title}</h3>
        <p className="text-xs text-[#363636] mt-1.5 leading-relaxed">
          {role.responsibilities}
        </p>

        <div className="mt-4 pt-3 border-t border-[#363636] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#363636]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{role.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{role.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{role.venue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>
              {role.filledCount}/{role.requiredCount} volunteers · {role.serviceHours}h credit
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#363636] flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#363636]">
          Official Service Certificate Eligible
        </span>

        {role.status === 'Approved' ? (
          <Button variant="success" size="sm" icon={CheckCircle2} disabled>
            Approved
          </Button>
        ) : role.status === 'Applied' ? (
          <Button variant="secondary" size="sm" disabled>
            Application Sent
          </Button>
        ) : role.status === 'Waitlisted' ? (
          <Button variant="secondary" size="sm" disabled>
            Waitlisted
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onApply(role.id)}
          >
            Apply for Role
          </Button>
        )}
      </div>
    </Card>
  );
}
