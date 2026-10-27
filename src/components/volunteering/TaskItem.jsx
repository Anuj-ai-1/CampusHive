import React from 'react';
import { Clock, Check, RotateCcw } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function TaskItem({ task, onToggleTask }) {
  const priorityVariant =
    task.priority === 'High'
      ? 'error'
      : task.priority === 'Medium'
      ? 'warning'
      : 'neutral';

  return (
    <div
      className={`p-3.5 rounded-xl border transition-all duration-150 ${
        task.completed
          ? 'bg-white/45 backdrop-blur-md border-white/70 opacity-80'
          : 'bg-white/75 backdrop-blur-md border-white/90 hover:bg-white/90 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={`Mark "${task.title}" as ${
            task.completed ? 'incomplete' : 'complete'
          }`}
          onClick={() => onToggleTask(task.id)}
          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
            task.completed
              ? 'bg-[#17AAAA] border-[#17AAAA] text-white'
              : 'bg-white/80 border-slate-300 hover:border-[#17AAAA]'
          }`}
        >
          {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-medium text-slate-500 truncate">
              {task.eventTitle}
            </span>
            <Badge variant={task.completed ? 'success' : priorityVariant}>
              {task.completed ? 'Completed' : `${task.priority} Priority`}
            </Badge>
          </div>

          <p
            className={`text-xs font-medium leading-snug ${
              task.completed ? 'line-through text-slate-400' : 'text-slate-900'
            }`}
          >
            {task.title}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Due {task.deadline}
            </span>

            <button
              type="button"
              onClick={() => onToggleTask(task.id)}
              className="inline-flex items-center gap-1 font-medium text-[#17AAAA] hover:text-[#F63F3A]"
            >
              {task.completed ? (
                <>
                  <RotateCcw className="w-3 h-3" />
                  Reopen
                </>
              ) : (
                'Mark complete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
