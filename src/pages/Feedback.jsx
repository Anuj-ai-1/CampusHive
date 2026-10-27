import React, { useState } from 'react';
import { MessageSquareText, Send, Shield, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { FeedbackTable } from '../components/feedback/FeedbackTable';

const FEEDBACK_CATEGORIES = [
  'Event Feedback',
  'Campus Facilities',
  'Club Activities',
  'Technical Issue',
  'General Suggestion',
  'Grievance',
];

export function Feedback({
  feedbackList,
  events,
  onSubmitFeedback,
  role,
  onUpdateFeedbackStatus,
}) {
  const [category, setCategory] = useState('Event Feedback');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [relatedEvent, setRelatedEvent] = useState('');
  const [errors, setErrors] = useState({});

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const eventOptions = [
    { value: '', label: 'None (General Campus)' },
    ...events
      .filter((e) => e.approvalStatus === 'Published')
      .map((e) => ({ value: e.title, label: e.title })),
  ];

  const validate = () => {
    const newErrors = {};
    if (!subject.trim()) {
      newErrors.subject = 'Please provide a clear subject line.';
    } else if (subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters.';
    }

    if (!description.trim()) {
      newErrors.description = 'Please enter a detailed description.';
    } else if (description.trim().length < 15) {
      newErrors.description =
        'Please provide at least 15 characters so our team can act on it.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitFeedback({
      category,
      subject: subject.trim(),
      description: description.trim(),
      relatedEvent,
    });

    setSubject('');
    setDescription('');
    setRelatedEvent('');
    setErrors({});
  };

  const filteredSubmissions =
    statusFilter === 'All'
      ? feedbackList
      : feedbackList.filter((item) => item.status === statusFilter);

  const activeTicket = selectedTicket
    ? feedbackList.find((f) => f.id === selectedTicket.id) || selectedTicket
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Feedback & Grievance Resolution"
        subtitle="Submit suggestions, report facility issues, and track transparent resolution timelines."
      />

      {/* A. Centered Feedback Form */}
      <div className="max-w-2xl mx-auto">
        <Card padding="p-5 sm:p-6">
          <div className="mb-5 pb-4 border-b border-[#363636]">
            <h2 className="text-lg font-semibold text-[#363636]">
              Share your feedback
            </h2>
            <p className="text-xs text-[#363636] mt-0.5">
              Your feedback helps us build a better campus experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="feedback-category"
                label="Category"
                required
                options={FEEDBACK_CATEGORIES}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Select
                id="feedback-related-event"
                label="Related Event (Optional)"
                options={eventOptions}
                value={relatedEvent}
                onChange={(e) => setRelatedEvent(e.target.value)}
              />
            </div>

            <Input
              id="feedback-subject"
              label="Subject"
              required
              placeholder="Brief summary of your feedback or issue"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (errors.subject) setErrors({ ...errors, subject: '' });
              }}
              error={errors.subject}
            />

            <Textarea
              id="feedback-description"
              label="Description"
              required
              rows={4}
              placeholder="Include specific locations, dates, or constructive details..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors({ ...errors, description: '' });
              }}
              error={errors.description}
            />

            {category === 'Grievance' && (
              <div className="flex items-start gap-2.5 p-3 rounded-md bg-[#EEEEEE] border border-[#363636] text-xs text-[#363636]">
                <Shield className="w-4 h-4 text-[#17AAAA] shrink-0 mt-0.5" />
                <span>
                  Grievance submissions are strictly confidential and routed
                  directly to the Dean of Student Welfare. Private descriptions
                  are never exposed publicly.
                </span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end">
              <Button type="submit" variant="primary" size="md" icon={Send}>
                Submit Feedback
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* B. Previous Submissions History */}
      <section
        aria-labelledby="submissions-history-heading"
        className="space-y-4 pt-4 border-t border-[#363636]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              id="submissions-history-heading"
              className="text-base font-semibold text-[#363636]"
            >
              Previous Submissions
            </h2>
            <p className="text-xs text-[#363636] mt-0.5">
              Track reference IDs and official responses from campus administration
            </p>
          </div>

          <Tabs
            tabs={[
              { id: 'All', label: 'All', count: feedbackList.length },
              {
                id: 'Open',
                label: 'Open',
                count: feedbackList.filter((f) => f.status === 'Open').length,
              },
              {
                id: 'In Progress',
                label: 'In Progress',
                count: feedbackList.filter((f) => f.status === 'In Progress')
                  .length,
              },
              {
                id: 'Resolved',
                label: 'Resolved',
                count: feedbackList.filter((f) => f.status === 'Resolved')
                  .length,
              },
            ]}
            activeTab={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {filteredSubmissions.length === 0 ? (
          <EmptyState
            icon={MessageSquareText}
            title="No submissions in this status"
            description="Switch status filters to view your other feedback tickets."
            actionLabel="Show all tickets"
            onAction={() => setStatusFilter('All')}
          />
        ) : (
          <FeedbackTable
            submissions={filteredSubmissions}
            onSelectSubmission={(item) => setSelectedTicket(item)}
          />
        )}
      </section>

      {/* Feedback Details Modal */}
      <Modal
        isOpen={Boolean(activeTicket)}
        onClose={() => setSelectedTicket(null)}
        title={activeTicket ? `Ticket ${activeTicket.referenceId}` : 'Ticket'}
        subtitle={
          activeTicket
            ? `Submitted on ${activeTicket.submittedDate} · Last updated ${activeTicket.updatedDate}`
            : ''
        }
        maxWidth="max-w-lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedTicket(null)}
            >
              Close
            </Button>
            {role === 'admin' &&
              activeTicket &&
              activeTicket.status !== 'Resolved' && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={CheckCircle2}
                  onClick={() => {
                    onUpdateFeedbackStatus(activeTicket.id, 'Resolved');
                  }}
                >
                  Mark as Resolved
                </Button>
              )}
          </div>
        }
      >
        {activeTicket && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="neutral">{activeTicket.category}</Badge>
              <Badge
                variant={
                  activeTicket.status === 'Resolved'
                    ? 'success'
                    : activeTicket.status === 'In Progress'
                    ? 'warning'
                    : 'neutral'
                }
                dot
              >
                {activeTicket.status}
              </Badge>
              {activeTicket.relatedEvent && (
                <Badge variant="primary">{activeTicket.relatedEvent}</Badge>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#363636]">
                {activeTicket.subject}
              </h3>
              <p className="text-xs text-[#363636] mt-1.5 leading-relaxed whitespace-pre-line">
                {activeTicket.description}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#EEEEEE] border border-[#363636]">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#363636] mb-1">
                Administration Resolution Log
              </p>
              <p className="text-xs text-[#363636] leading-relaxed">
                {activeTicket.adminResponse ||
                  'Ticket logged and queued for department coordinator review.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
