import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Eye } from 'lucide-react';

export function FeedbackTable({ submissions, onSelectSubmission }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return (
          <Badge variant="success" dot>
            Resolved
          </Badge>
        );
      case 'In Progress':
        return (
          <Badge variant="warning" dot>
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="neutral" dot>
            Open
          </Badge>
        );
    }
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/60 bg-white/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Reference ID</th>
              <th className="py-3.5 px-4">Subject</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Submitted</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Last Updated</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50 text-xs">
            {submissions.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/60 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                  {item.referenceId}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs truncate">
                  {item.subject}
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  <Badge variant="neutral">{item.category}</Badge>
                </td>
                <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                  {item.submittedDate}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                  {item.updatedDate}
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="xs"
                    icon={Eye}
                    onClick={() => onSelectSubmission(item)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards */}
      <div className="md:hidden divide-y divide-slate-200/60">
        {submissions.map((item) => (
          <div key={item.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-semibold text-[#17AAAA]">
                {item.referenceId}
              </span>
              {getStatusBadge(item.status)}
            </div>
            <h4 className="text-sm font-semibold text-slate-900">
              {item.subject}
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>{item.category}</span>
              <span>Updated {item.updatedDate}</span>
            </div>
            <div className="pt-2">
              <Button
                variant="secondary"
                size="xs"
                onClick={() => onSelectSubmission(item)}
                className="w-full"
              >
                View Ticket Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
