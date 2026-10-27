import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  ClipboardList,
  Award,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { VolunteerRoleCard } from '../components/volunteering/VolunteerRoleCard';
import { TaskItem } from '../components/volunteering/TaskItem';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';

export function Volunteering({
  volunteerRoles,
  tasks,
  onApplyVolunteer,
  onToggleTask,
}) {
  const [roleFilter, setRoleFilter] = useState('all'); // 'all' | 'my-roles'

  const todoTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const displayedRoles =
    roleFilter === 'my-roles'
      ? volunteerRoles.filter((r) => r.status !== 'Open')
      : volunteerRoles;

  const approvedHours = volunteerRoles
    .filter((r) => r.status === 'Approved')
    .reduce((acc, r) => acc + (r.serviceHours || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Volunteering & Task Management"
        subtitle="Contribute to campus events, manage shift assignments, and track verified service hours."
        actions={
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle">
            <Award className="w-4 h-4 text-[#17AAAA]" />
            <span className="text-xs font-medium text-slate-800">
              Approved Credit: <strong>{approvedHours} hrs</strong>
            </span>
          </div>
        }
      />

      {/* A. Available Opportunities */}
      <section aria-labelledby="volunteer-roles-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              id="volunteer-roles-heading"
              className="text-base font-semibold text-slate-900"
            >
              Volunteer Opportunities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Recruiting active roles across upcoming workshops, exhibitions, and festivals
            </p>
          </div>

          <Tabs
            tabs={[
              {
                id: 'all',
                label: 'All Roles',
                count: volunteerRoles.length,
              },
              {
                id: 'my-roles',
                label: 'My Applications & Shifts',
                count: volunteerRoles.filter((r) => r.status !== 'Open').length,
              },
            ]}
            activeTab={roleFilter}
            onChange={setRoleFilter}
          />
        </div>

        {displayedRoles.length === 0 ? (
          <EmptyState
            icon={HeartHandshake}
            title="No volunteer applications yet"
            description="Browse open roles and apply to join an event operations crew."
            actionLabel="View all open roles"
            onAction={() => setRoleFilter('all')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedRoles.map((role) => (
              <VolunteerRoleCard
                key={role.id}
                role={role}
                onApply={onApplyVolunteer}
              />
            ))}
          </div>
        )}
      </section>

      {/* B. My Tasks Board (2 Glass Columns: To Do / Completed) */}
      <section
        aria-labelledby="volunteer-tasks-heading"
        className="pt-4 border-t border-slate-200/60 space-y-4"
      >
        <div>
          <h2
            id="volunteer-tasks-heading"
            className="text-base font-semibold text-slate-900"
          >
            My Assigned Tasks
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Action items for your approved volunteer shifts and club responsibilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: To Do */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#17AAAA]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  To Do
                </h3>
              </div>
              <Badge variant="primary">{todoTasks.length}</Badge>
            </div>

            {todoTasks.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="All tasks completed"
                description="You have cleared every pending volunteer task for your upcoming shifts."
                className="py-8"
              />
            ) : (
              <div className="space-y-2.5">
                {todoTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Completed */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  Completed
                </h3>
              </div>
              <Badge variant="success">{completedTasks.length}</Badge>
            </div>

            {completedTasks.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No completed tasks yet"
                description="Check off tasks in the To Do list as you finish your shift preparations."
                className="py-8"
              />
            ) : (
              <div className="space-y-2.5">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
