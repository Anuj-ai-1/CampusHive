const TOKEN_KEY = 'unihive_auth_token_v1';

export function getAuthToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

async function request(path, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(path, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await res.json().catch(() => ({}))
    : { error: await res.text().catch(() => 'Request failed') };

  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  health: () => request('/api/health'),
  publicSummary: () => request('/api/public/summary'),

  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (payload) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  bootstrap: () => request('/api/bootstrap'),

  updateProfile: (payload) =>
    request('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  postAnnouncement: (payload) =>
    request('/api/announcements', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  createEvent: (payload) =>
    request('/api/events', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  registerEvent: (eventId) =>
    request(`/api/events/${eventId}/register`, {
      method: 'POST',
    }),

  cancelEventRegistration: (eventId) =>
    request(`/api/events/${eventId}/register`, {
      method: 'DELETE',
    }),

  approveEvent: (eventId) =>
    request(`/api/events/${eventId}/approve`, {
      method: 'POST',
    }),

  rejectEvent: (eventId) =>
    request(`/api/events/${eventId}`, {
      method: 'DELETE',
    }),

  createClub: (payload) =>
    request('/api/clubs', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  joinClub: (clubId) =>
    request(`/api/clubs/${clubId}/join`, {
      method: 'POST',
    }),

  leaveClub: (clubId) =>
    request(`/api/clubs/${clubId}/leave`, {
      method: 'DELETE',
    }),

  approveClub: (clubId) =>
    request(`/api/clubs/${clubId}/approve`, {
      method: 'POST',
    }),

  rejectClub: (clubId) =>
    request(`/api/clubs/${clubId}`, {
      method: 'DELETE',
    }),

  updateClubHierarchy: (clubId, payload) =>
    request(`/api/clubs/${clubId}/hierarchy`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  sendClubMessage: (clubId, payload) =>
    request(`/api/clubs/${clubId}/messages`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateClubMessage: (clubId, msgId, payload) =>
    request(`/api/clubs/${clubId}/messages/${msgId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteClubMessage: (clubId, msgId) =>
    request(`/api/clubs/${clubId}/messages/${msgId}`, {
      method: 'DELETE',
    }),

  applyVolunteer: (roleId) =>
    request(`/api/volunteering/${roleId}/apply`, {
      method: 'POST',
    }),

  toggleTask: (taskId) =>
    request(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    }),

  createTask: (payload) =>
    request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitFeedback: (payload) =>
    request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateFeedbackStatus: (ticketId, status) =>
    request(`/api/feedback/${ticketId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  markAllNotificationsRead: () =>
    request('/api/notifications/read-all', {
      method: 'POST',
    }),

  addCalendarMilestone: (payload) =>
    request('/api/calendar', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  resetDemoData: () =>
    request('/api/reset-demo', {
      method: 'POST',
    }),
};

export function subscribeToRealtime(onSync) {
  if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
    return () => {};
  }
  const source = new EventSource('/api/stream');
  source.onmessage = (event) => {
    try {
      const parsed = JSON.parse(event.data);
      if (parsed?.type === 'STATE_SYNC') {
        onSync(parsed);
      }
    } catch {
      // ignore malformed frames
    }
  };
  return () => {
    source.close();
  };
}
