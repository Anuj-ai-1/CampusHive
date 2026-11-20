import express from 'express';
import cors from 'cors';
import {
  db,
  seedDatabase,
  serializeUser,
  getBootstrapData,
} from './db.js';
import {
  hashPassword,
  verifyPassword,
  signToken,
  requireAuth,
  requireAdmin,
} from './auth.js';
import {
  addSseClient,
  broadcastEvent,
  getConnectedClientsCount,
} from './realtime.js';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Health check endpoint (verifies SQLite + API availability)
app.get('/api/health', (req, res) => {
  try {
    const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
    const clubCount = db.prepare('SELECT COUNT(*) AS count FROM clubs').get().count;
    const eventCount = db.prepare('SELECT COUNT(*) AS count FROM events').get().count;
    const msgCount = db.prepare('SELECT COUNT(*) AS count FROM club_messages').get().count;
    res.json({
      status: 'ok',
      database: 'SQLite (node:sqlite)',
      realtimeClients: getConnectedClientsCount(),
      counts: { users: userCount, clubs: clubCount, events: eventCount, messages: msgCount },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Real-time Server-Sent Events stream
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();
  res.write(`data: ${JSON.stringify({ type: 'CONNECTED', timestamp: new Date().toISOString() })}\n\n`);
  addSseClient(res);
});

// ==================== AUTHENTICATION ====================

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const userRow = db
    .prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)')
    .get(String(email).trim());

  if (!userRow || !verifyPassword(password, userRow.password_hash)) {
    return res.status(401).json({ error: 'Invalid institutional email or password.' });
  }

  const token = signToken({
    id: userRow.id,
    email: userRow.email,
    role: userRow.role,
    name: userRow.name,
  });

  res.json({
    token,
    role: userRow.role,
    user: serializeUser(userRow),
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, branchCode = 'CSE', division = 'Div A', rollNo } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || password.length < 4) {
    return res.status(400).json({ error: 'Name, email, and password (min 4 chars) are required.' });
  }

  const existing = db
    .prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)')
    .get(email.trim());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const cleanName = name.trim();
  const shortName = cleanName.split(' ')[0] || cleanName;
  const id = `usr-stu-${Date.now()}`;
  const generatedRoll =
    rollNo?.trim() || `USTU-${branchCode.slice(0, 2).toUpperCase()}-3A-${Math.floor(40 + Math.random() * 55)}`;

  db.prepare(`
    INSERT INTO users (
      id, role, name, short_name, email, password_hash, student_id, roll_no,
      department, branch_code, year, year_short, division, lab_batch,
      minor_track, ojt_status, is_cr, class_advisor, class_room, gpa,
      campus, bio, phone, location, interests_json, achievements_json, profile_completed
    ) VALUES (?, 'student', ?, ?, ?, ?, ?, ?, ?, ?, '3rd Year (Semester 5)', '3rd Year', ?, 'Batch A1', 'AI & ML (Microsoft)', '60% Practical Track', 0, 'Prof. Raghavendra Kulkarni', 'LH-301', '8.90 / 10.0', 'Universal SkillTech University (USTU)', ?, '+91 98000 00000', 'USTU Campus', ?, '[]', 0)
  `).run(
    id,
    cleanName,
    shortName,
    email.trim().toLowerCase(),
    hashPassword(password),
    `USTU-2026-${Math.floor(100 + Math.random() * 899)}`,
    generatedRoll,
    `School of Science, Engineering & Technology Skills (B.Tech ${branchCode})`,
    branchCode,
    division,
    `Student at Universal SkillTech University (${branchCode} · ${division}).`,
    JSON.stringify(['AI & ML', 'Full-Stack Dev', 'Campus Clubs'])
  );

  // Give new student starter onboarding tasks
  const insertTask = db.prepare(`
    INSERT INTO tasks (id, user_id, title, event_title, deadline, priority, completed)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `);
  insertTask.run(
    `tsk-onb-1-${Date.now()}`,
    id,
    'Complete your student profile, bio & campus interests',
    'UniHive Onboarding',
    'Today',
    'High'
  );
  insertTask.run(
    `tsk-onb-2-${Date.now()}`,
    id,
    'Join a campus club & say hello in #general-chat',
    'Clubs & Communities',
    'This Week',
    'Medium'
  );

  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  const token = signToken({
    id: userRow.id,
    email: userRow.email,
    role: userRow.role,
    name: userRow.name,
  });

  broadcastEvent('STATE_SYNC', { entity: 'directory' });
  res.status(201).json({
    token,
    role: userRow.role,
    user: serializeUser(userRow),
  });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!userRow) {
    return res.status(404).json({ error: 'User not found.' });
  }
  res.json({ user: serializeUser(userRow) });
});

// Public meta for Login screen (pending club count)
app.get('/api/public/summary', (req, res) => {
  const pendingClubs = db
    .prepare("SELECT COUNT(*) AS count FROM clubs WHERE approval_status = 'Pending Approval'")
    .get().count;
  res.json({ pendingClubsCount: pendingClubs });
});

// Full Hydrated State
app.get('/api/bootstrap', requireAuth, (req, res) => {
  const data = getBootstrapData(req.user.id, req.user.role);
  res.json(data);
});

// ==================== PROFILE ====================

app.put('/api/profile', requireAuth, (req, res) => {
  const {
    name,
    shortName,
    branchCode,
    division,
    labBatch,
    rollNo,
    department,
    year,
    yearShort,
    phone,
    gpa,
    bio,
    location,
    interests,
    achievements,
    avatarUrl,
  } = req.body || {};

  const targetUserId = req.user.role === 'student' ? req.user.id : 'usr-student-01';
  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(targetUserId);
  if (!existing) return res.status(404).json({ error: 'Profile not found.' });

  const nextName = name?.trim() || existing.name;
  const nextShort = shortName?.trim() || nextName.split(' ')[0] || existing.short_name;
  const nextYear = year || existing.year;
  const derivedYearShort = yearShort || (nextYear ? nextYear.split('(')[0].trim() : existing.year_short);

  db.prepare(`
    UPDATE users SET
      name = ?, short_name = ?, branch_code = ?, division = ?, lab_batch = ?,
      roll_no = ?, department = ?, year = ?, year_short = ?, phone = ?, gpa = ?,
      bio = ?, location = ?, interests_json = ?, achievements_json = ?, avatar_url = ?, profile_completed = 1
    WHERE id = ?
  `).run(
    nextName,
    nextShort,
    branchCode || existing.branch_code,
    division || existing.division,
    labBatch || existing.lab_batch,
    rollNo || existing.roll_no,
    department || existing.department,
    nextYear,
    derivedYearShort,
    phone !== undefined ? phone : existing.phone,
    gpa !== undefined ? gpa : existing.gpa,
    bio !== undefined ? bio : existing.bio,
    location !== undefined ? location : existing.location,
    Array.isArray(interests) ? JSON.stringify(interests) : existing.interests_json,
    Array.isArray(achievements) ? JSON.stringify(achievements) : existing.achievements_json,
    avatarUrl !== undefined ? avatarUrl : existing.avatar_url,
    targetUserId
  );

  const updated = serializeUser(db.prepare('SELECT * FROM users WHERE id = ?').get(targetUserId));
  broadcastEvent('STATE_SYNC', { entity: 'profile' });
  res.json({ userProfile: updated });
});

// ==================== ANNOUNCEMENTS ====================

app.post('/api/announcements', requireAuth, (req, res) => {
  const { title, summary, content, targetBranch = 'CSE', targetDivision = 'Div A', category = 'Division Notice', source, authorRole } = req.body || {};
  if (!title?.trim() || !summary?.trim()) {
    return res.status(400).json({ error: 'Title and summary are required.' });
  }

  const id = `ann-div-${Date.now()}`;
  const today = new Date().toISOString().slice(0, 10);

  db.prepare(`
    INSERT INTO announcements (
      id, title, source, author_role, date, relative_time, category,
      target_branch, target_division, pinned, summary, content
    ) VALUES (?, ?, ?, ?, ?, 'Just now', ?, ?, ?, 1, ?, ?)
  `).run(
    id,
    title.trim(),
    source || `Class Representative (${targetBranch} ${targetDivision})`,
    authorRole || `${req.user.name}`,
    today,
    category,
    targetBranch,
    targetDivision,
    summary.trim(),
    (content || summary).trim()
  );

  broadcastEvent('STATE_SYNC', { entity: 'announcements' });
  res.status(201).json({ id });
});

// ==================== EVENTS & OD ====================

app.post('/api/events', requireAuth, (req, res) => {
  const { title, shortDescription, category = 'Technical', date = '2026-11-20', startTime = '03:00 PM', duration = '2 hours', venue, organizer = 'Student Council', capacity = 100, targetBranch = 'ALL', eligibility } = req.body || {};
  if (!title?.trim() || !venue?.trim()) {
    return res.status(400).json({ error: 'Event title and venue are required.' });
  }

  const id = `evt-${Date.now()}`;
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthIdx = Math.max(0, Math.min(11, Number(date.slice(5, 7)) - 1));
  const monthShort = monthNames[monthIdx] || 'NOV';
  const dayNumber = date.slice(-2) || '20';
  const approvalStatus = req.user.role === 'admin' ? 'Published' : 'Pending Approval';

  db.prepare(`
    INSERT INTO events (
      id, title, short_description, full_description, category, date,
      month_short, day_number, start_time, end_time, duration, venue,
      organizer, capacity, registered_count, approval_status, od_eligible,
      eligibility, target_branches_json, tags_json, clash_info_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '05:00 PM', ?, ?, ?, ?, 0, ?, 1, ?, ?, ?, '{}')
  `).run(
    id,
    title.trim(),
    (shortDescription || title).trim(),
    (shortDescription || title).trim(),
    category,
    date,
    monthShort,
    dayNumber,
    startTime,
    duration,
    venue.trim(),
    organizer.trim(),
    parseInt(capacity, 10) || 100,
    approvalStatus,
    eligibility || 'Open to all enrolled students.',
    JSON.stringify([targetBranch || 'ALL']),
    JSON.stringify([category, 'UniHive'])
  );

  if (approvalStatus === 'Pending Approval') {
    db.prepare(`
      INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
      VALUES (?, 'admin', 'New Event Proposal', ?, 'Just now', 1, 'admin')
    `).run(
      `notif-evt-adm-${Date.now()}`,
      `${req.user.name} proposed event "${title.trim()}" on ${date} at ${venue.trim()}.`
    );
  }

  broadcastEvent('STATE_SYNC', { entity: 'events' });
  res.status(201).json({ id, approvalStatus });
});

app.post('/api/events/:id/register', requireAuth, (req, res) => {
  const eventId = req.params.id;
  const evt = db.prepare('SELECT * FROM events WHERE id = ?').get(eventId);
  if (!evt) return res.status(404).json({ error: 'Event not found.' });

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const existing = db
    .prepare('SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?')
    .get(eventId, req.user.id);

  if (existing) {
    return res.json({ status: 'already_registered' });
  }

  if (evt.registered_count >= evt.capacity) {
    return res.status(400).json({ error: 'Event capacity is full.' });
  }

  db.prepare(`
    INSERT INTO event_registrations (id, event_id, user_id, student_name, roll_no, branch, division, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'OD Approved')
  `).run(
    `reg-${Date.now()}`,
    eventId,
    req.user.id,
    user.name,
    user.roll_no || 'USTU-STU-01',
    user.branch_code || 'CSE',
    user.division || 'Div A'
  );

  db.prepare('UPDATE events SET registered_count = MIN(capacity, registered_count + 1) WHERE id = ?').run(eventId);

  broadcastEvent('STATE_SYNC', { entity: 'events', eventId });
  res.json({ status: 'registered' });
});

app.delete('/api/events/:id/register', requireAuth, (req, res) => {
  const eventId = req.params.id;
  const info = db
    .prepare('DELETE FROM event_registrations WHERE event_id = ? AND user_id = ?')
    .run(eventId, req.user.id);

  if (info.changes > 0) {
    db.prepare('UPDATE events SET registered_count = MAX(0, registered_count - 1) WHERE id = ?').run(eventId);
  }

  broadcastEvent('STATE_SYNC', { entity: 'events', eventId });
  res.json({ status: 'cancelled' });
});

app.post('/api/events/:id/approve', requireAuth, requireAdmin, (req, res) => {
  const eventId = req.params.id;
  const evt = db.prepare('SELECT * FROM events WHERE id = ?').get(eventId);
  if (!evt) return res.status(404).json({ error: 'Event not found.' });

  db.prepare("UPDATE events SET approval_status = 'Published' WHERE id = ?").run(eventId);
  broadcastEvent('STATE_SYNC', { entity: 'events' });
  res.json({ status: 'published' });
});

app.delete('/api/events/:id', requireAuth, requireAdmin, (req, res) => {
  const eventId = req.params.id;
  db.prepare('DELETE FROM event_registrations WHERE event_id = ?').run(eventId);
  db.prepare('DELETE FROM events WHERE id = ?').run(eventId);
  broadcastEvent('STATE_SYNC', { entity: 'events' });
  res.json({ status: 'deleted' });
});

// ==================== CLUBS, APPROVALS & REAL-TIME CHAT ====================

app.post('/api/clubs', requireAuth, (req, res) => {
  const {
    name,
    shortDescription,
    category = 'Technology',
    leadName,
    viceLeadName,
    secretaryName,
    meetingSchedule,
    requiresApproval = false,
    initialMembers = [],
  } = req.body || {};

  if (!name?.trim() || !shortDescription?.trim()) {
    return res.status(400).json({ error: 'Club name and description are required.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const clubId = `clb-${Date.now()}`;

  const officers = [
    {
      name: leadName || `${user.name} (${user.year_short || '3rd Year'} ${user.branch_code || 'CSE'})`,
      role: 'Leader / President',
      email: user.email,
      userId: user.id,
    },
  ];
  if (viceLeadName) {
    officers.push({
      name: viceLeadName,
      role: 'Vice Leader',
      email: 'viceleader@ustu.edu.in',
      userId: null,
    });
  }
  if (secretaryName) {
    officers.push({
      name: secretaryName,
      role: 'Secretary',
      email: 'secretary@ustu.edu.in',
      userId: null,
    });
  }

  const extra = (initialMembers || []).filter(
    (m) => !officers.some((o) => o.name === m.name)
  );
  const fullRoster = [
    ...officers,
    ...extra.map((m) => ({
      name: m.name,
      role: m.role || 'Core Member',
      email: m.email || 'student@ustu.edu.in',
      userId: null,
    })),
  ];

  db.prepare(`
    INSERT INTO clubs (
      id, name, short_description, full_description, category, member_count,
      lead_name, vice_lead_name, secretary_name, created_by, created_by_name,
      approval_status, meeting_schedule, requires_approval, activities_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Approval', ?, ?, ?)
  `).run(
    clubId,
    name.trim(),
    shortDescription.trim(),
    shortDescription.trim(),
    category,
    fullRoster.length,
    officers[0]?.name || '',
    viceLeadName || '',
    secretaryName || '',
    user.id,
    user.name,
    meetingSchedule || 'Fridays, 5:00 PM @ Literati Café',
    requiresApproval ? 1 : 0,
    JSON.stringify([
      'Weekly Core Team & Member Meetups',
      'Hands-on Campus Workshops & Projects',
      'Inter-department Collaborative Sprints',
    ])
  );

  const insertMem = db.prepare(`
    INSERT INTO club_memberships (id, club_id, user_id, name, role, email, membership_state)
    VALUES (?, ?, ?, ?, ?, ?, 'Joined')
  `);
  fullRoster.forEach((m, idx) => {
    const isCreator = m.userId === user.id || m.name.toLowerCase().includes(user.short_name.toLowerCase());
    insertMem.run(
      `mem-${Date.now()}-${idx}`,
      clubId,
      isCreator ? user.id : null,
      m.name,
      m.role,
      m.email
    );
  });

  // Welcome message in the new club's #announcements
  db.prepare(`
    INSERT INTO club_messages (
      id, club_id, channel, sender_id, sender_name, sender_role, time_label,
      text, pinned, likes, fires, rockets
    ) VALUES (?, ?, 'announcements', ?, ?, 'Leader / President', 'Just now', ?, 1, 1, 0, 0)
  `).run(
    `msg-${Date.now()}`,
    clubId,
    user.id,
    officers[0]?.name || user.name,
    `Welcome to ${name.trim()}! Proposal submitted to Pro-VC Admin for official campus approval.`
  );

  // Instant notification to Admin
  db.prepare(`
    INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
    VALUES (?, 'admin', 'New Club Creation Permission Request', ?, 'Just now', 1, 'admin')
  `).run(
    `notif-adm-${Date.now()}`,
    `${user.name} proposed "${name.trim()}" (Leader: ${officers[0]?.name || user.name}). Grant permission to publish.`
  );

  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.status(201).json({ id: clubId });
});

app.post('/api/clubs/:id/join', requireAuth, (req, res) => {
  const clubId = req.params.id;
  const club = db.prepare('SELECT * FROM clubs WHERE id = ?').get(clubId);
  if (!club) return res.status(404).json({ error: 'Club not found.' });

  const existing = db
    .prepare('SELECT * FROM club_memberships WHERE club_id = ? AND user_id = ?')
    .get(clubId, req.user.id);
  if (existing) {
    return res.json({ membershipState: existing.membership_state });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const nextState = club.requires_approval ? 'Pending Approval' : 'Joined';

  db.prepare(`
    INSERT INTO club_memberships (id, club_id, user_id, name, role, email, membership_state)
    VALUES (?, ?, ?, ?, 'Member', ?, ?)
  `).run(
    `mem-${Date.now()}`,
    clubId,
    user.id,
    `${user.name} (${user.year_short || '3rd Year'} ${user.branch_code || 'CSE'})`,
    user.email,
    nextState
  );

  if (nextState === 'Joined') {
    db.prepare('UPDATE clubs SET member_count = member_count + 1 WHERE id = ?').run(clubId);
  }

  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.json({ membershipState: nextState });
});

app.delete('/api/clubs/:id/leave', requireAuth, (req, res) => {
  const clubId = req.params.id;
  const info = db
    .prepare('DELETE FROM club_memberships WHERE club_id = ? AND user_id = ?')
    .run(clubId, req.user.id);

  if (info.changes > 0) {
    db.prepare('UPDATE clubs SET member_count = MAX(1, member_count - 1) WHERE id = ?').run(clubId);
  }
  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.json({ status: 'left' });
});

app.post('/api/clubs/:id/approve', requireAuth, requireAdmin, (req, res) => {
  const clubId = req.params.id;
  const club = db.prepare('SELECT * FROM clubs WHERE id = ?').get(clubId);
  if (!club) return res.status(404).json({ error: 'Club not found.' });

  db.prepare("UPDATE clubs SET approval_status = 'Approved' WHERE id = ?").run(clubId);

  db.prepare(`
    INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
    VALUES (?, 'student', 'Club Permission Granted by Admin!', ?, 'Just now', 1, 'clubs')
  `).run(
    `notif-stu-${Date.now()}`,
    `Admin approved your club "${club.name}". It is now officially live across UniHive.`
  );

  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.json({ status: 'approved' });
});

app.delete('/api/clubs/:id', requireAuth, requireAdmin, (req, res) => {
  const clubId = req.params.id;
  db.prepare('DELETE FROM club_messages WHERE club_id = ?').run(clubId);
  db.prepare('DELETE FROM club_memberships WHERE club_id = ?').run(clubId);
  db.prepare('DELETE FROM clubs WHERE id = ?').run(clubId);
  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.json({ status: 'rejected' });
});

function hasJoinedClubAccess(clubId, user) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  const row = db
    .prepare(
      "SELECT id FROM club_memberships WHERE club_id = ? AND user_id = ? AND membership_state = 'Joined'"
    )
    .get(clubId, user.id);
  return Boolean(row);
}

app.patch('/api/clubs/:id/hierarchy', requireAuth, (req, res) => {
  const clubId = req.params.id;
  if (!hasJoinedClubAccess(clubId, req.user)) {
    return res.status(403).json({ error: 'Only joined club members can manage the club roster.' });
  }
  const club = db.prepare('SELECT * FROM clubs WHERE id = ?').get(clubId);
  if (!club) return res.status(404).json({ error: 'Club not found.' });

  const { action, memberId, name, role = 'Member', email } = req.body || {};

  if (action === 'add' && name?.trim()) {
    const newId = `mem-${Date.now()}`;
    db.prepare(`
      INSERT INTO club_memberships (id, club_id, user_id, name, role, email, membership_state)
      VALUES (?, ?, NULL, ?, ?, ?, 'Joined')
    `).run(newId, clubId, name.trim(), role, email || `${name.trim().toLowerCase().split(' ')[0]}@ustu.edu.in`);
    db.prepare('UPDATE clubs SET member_count = member_count + 1 WHERE id = ?').run(clubId);

    if (role === 'Leader / President') {
      db.prepare('UPDATE clubs SET lead_name = ? WHERE id = ?').run(name.trim(), clubId);
    } else if (role === 'Vice Leader') {
      db.prepare('UPDATE clubs SET vice_lead_name = ? WHERE id = ?').run(name.trim(), clubId);
    } else if (role === 'Secretary') {
      db.prepare('UPDATE clubs SET secretary_name = ? WHERE id = ?').run(name.trim(), clubId);
    }
  } else if (action === 'role' && memberId) {
    const mem = db.prepare('SELECT * FROM club_memberships WHERE id = ? AND club_id = ?').get(memberId, clubId);
    if (mem) {
      db.prepare('UPDATE club_memberships SET role = ? WHERE id = ?').run(role, memberId);
      if (role === 'Leader / President') {
        db.prepare('UPDATE clubs SET lead_name = ? WHERE id = ?').run(mem.name, clubId);
      } else if (role === 'Vice Leader') {
        db.prepare('UPDATE clubs SET vice_lead_name = ? WHERE id = ?').run(mem.name, clubId);
      } else if (role === 'Secretary') {
        db.prepare('UPDATE clubs SET secretary_name = ? WHERE id = ?').run(mem.name, clubId);
      }
    }
  } else if (action === 'remove' && memberId) {
    const info = db.prepare('DELETE FROM club_memberships WHERE id = ? AND club_id = ?').run(memberId, clubId);
    if (info.changes > 0) {
      db.prepare('UPDATE clubs SET member_count = MAX(1, member_count - 1) WHERE id = ?').run(clubId);
    }
  }

  broadcastEvent('STATE_SYNC', { entity: 'clubs', clubId });
  res.json({ status: 'updated' });
});

// Club Chat Messages
app.post('/api/clubs/:id/messages', requireAuth, (req, res) => {
  const clubId = req.params.id;
  if (!hasJoinedClubAccess(clubId, req.user)) {
    return res.status(403).json({ error: 'Join this club first to view or send messages.' });
  }
  const { channel = 'general', text, replyTo = null, linkUrl = null, senderRoleOverride } = req.body || {};
  if (!text?.trim()) {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  const myMembership = db
    .prepare('SELECT role FROM club_memberships WHERE club_id = ? AND user_id = ?')
    .get(clubId, req.user.id);

  const senderRole =
    senderRoleOverride ||
    (req.user.role === 'admin'
      ? 'USTU Admin / Pro-VC'
      : myMembership?.role || 'Club Member');

  const senderName =
    req.user.role === 'admin'
      ? `${user.name} (Pro-VC)`
      : `${user.name} (${user.year_short || '3rd Year'} ${user.branch_code || 'CSE'})`;

  const msgId = `msg-${Date.now()}`;
  const timeLabel = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  db.prepare(`
    INSERT INTO club_messages (
      id, club_id, channel, sender_id, sender_name, sender_role, time_label,
      text, reply_to_json, link_url, pinned, likes, fires, rockets
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 0, 0)
  `).run(
    msgId,
    clubId,
    channel,
    user.id,
    senderName,
    senderRole,
    timeLabel,
    text.trim(),
    replyTo ? JSON.stringify(replyTo) : null,
    linkUrl || null
  );

  broadcastEvent('STATE_SYNC', { entity: 'chat', clubId, channel });
  res.status(201).json({ id: msgId });
});

app.patch('/api/clubs/:id/messages/:msgId', requireAuth, (req, res) => {
  const { id: clubId, msgId } = req.params;
  if (!hasJoinedClubAccess(clubId, req.user)) {
    return res.status(403).json({ error: 'Join this club first to interact with messages.' });
  }
  const { reactField, togglePin } = req.body || {};

  if (reactField && ['likes', 'fires', 'rockets'].includes(reactField)) {
    db.prepare(`UPDATE club_messages SET ${reactField} = ${reactField} + 1 WHERE id = ? AND club_id = ?`).run(msgId, clubId);
  }
  if (togglePin) {
    db.prepare('UPDATE club_messages SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ? AND club_id = ?').run(msgId, clubId);
  }

  broadcastEvent('STATE_SYNC', { entity: 'chat', clubId });
  res.json({ status: 'updated' });
});

app.delete('/api/clubs/:id/messages/:msgId', requireAuth, (req, res) => {
  const { id: clubId, msgId } = req.params;
  if (!hasJoinedClubAccess(clubId, req.user)) {
    return res.status(403).json({ error: 'Join this club first to manage messages.' });
  }
  db.prepare('DELETE FROM club_messages WHERE id = ? AND club_id = ?').run(msgId, clubId);
  broadcastEvent('STATE_SYNC', { entity: 'chat', clubId });
  res.json({ status: 'deleted' });
});

// ==================== VOLUNTEERING & TASKS ====================

app.post('/api/volunteering/:id/apply', requireAuth, (req, res) => {
  const roleId = req.params.id;
  const roleRow = db.prepare('SELECT * FROM volunteer_roles WHERE id = ?').get(roleId);
  if (!roleRow) return res.status(404).json({ error: 'Volunteer role not found.' });

  const existing = db
    .prepare('SELECT id FROM volunteer_applications WHERE role_id = ? AND user_id = ?')
    .get(roleId, req.user.id);
  if (existing) {
    return res.json({ status: 'already_applied' });
  }

  db.prepare(`
    INSERT INTO volunteer_applications (id, role_id, user_id, status)
    VALUES (?, ?, ?, 'Applied')
  `).run(`vapp-${Date.now()}`, roleId, req.user.id);

  db.prepare('UPDATE volunteer_roles SET filled_count = MIN(required_count, filled_count + 1) WHERE id = ?').run(roleId);

  broadcastEvent('STATE_SYNC', { entity: 'volunteering' });
  res.json({ status: 'applied' });
});

app.patch('/api/tasks/:id/toggle', requireAuth, (req, res) => {
  const taskId = req.params.id;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found.' });

  const nextCompleted = task.completed ? 0 : 1;
  db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(nextCompleted, taskId);

  broadcastEvent('STATE_SYNC', { entity: 'tasks' });
  res.json({ completed: Boolean(nextCompleted) });
});

app.post('/api/tasks', requireAuth, (req, res) => {
  const { title, eventTitle = 'Personal Goal', deadline = 'This Week', priority = 'Medium' } = req.body || {};
  if (!title?.trim()) return res.status(400).json({ error: 'Task title is required.' });
  const id = `tsk-${Date.now()}`;
  db.prepare(`
    INSERT INTO tasks (id, user_id, title, event_title, deadline, priority, completed)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `).run(id, req.user.id, title.trim(), eventTitle, deadline, priority);
  broadcastEvent('STATE_SYNC', { entity: 'tasks' });
  res.status(201).json({ id });
});

// ==================== FEEDBACK & GRIEVANCES ====================

app.post('/api/feedback', requireAuth, (req, res) => {
  const { category, subject, description, relatedEvent = '' } = req.body || {};
  if (!subject?.trim() || !description?.trim()) {
    return res.status(400).json({ error: 'Subject and description are required.' });
  }

  const id = `fdb-${Date.now()}`;
  const referenceId = `CMP-2026-${Math.floor(8900 + Math.random() * 999)}`;
  const today = new Date().toISOString().slice(0, 10);

  db.prepare(`
    INSERT INTO feedback_tickets (
      id, reference_id, user_id, submitted_by_name, category, subject, description,
      related_event, submitted_date, updated_date, status, admin_response
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Open', ?)
  `).run(
    id,
    referenceId,
    req.user.id,
    req.user.name,
    category || 'General Suggestion',
    subject.trim(),
    description.trim(),
    relatedEvent || '',
    today,
    today,
    'Logged via UniHive portal. Assigned to the respective campus coordinator for initial review.'
  );

  db.prepare(`
    INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
    VALUES (?, 'admin', ?, ?, 'Just now', 1, 'feedback')
  `).run(
    `notif-fdb-${Date.now()}`,
    `New Ticket ${referenceId}`,
    `${req.user.name} submitted a ${category || 'Feedback'} ticket: "${subject.trim()}"`
  );

  broadcastEvent('STATE_SYNC', { entity: 'feedback' });
  res.status(201).json({ id, referenceId });
});

app.patch('/api/feedback/:id/status', requireAuth, requireAdmin, (req, res) => {
  const ticketId = req.params.id;
  const { status } = req.body || {};
  const ticket = db.prepare('SELECT * FROM feedback_tickets WHERE id = ?').get(ticketId);
  if (!ticket) return res.status(404).json({ error: 'Ticket not found.' });

  const today = new Date().toISOString().slice(0, 10);
  const adminResponse =
    status === 'Resolved'
      ? `Verified and resolved by Campus Operations Administration on ${today}.`
      : 'Assigned to department supervisor; resolution in progress.';

  db.prepare(`
    UPDATE feedback_tickets SET status = ?, updated_date = ?, admin_response = ? WHERE id = ?
  `).run(status, today, adminResponse, ticketId);

  db.prepare(`
    INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
    VALUES (?, 'student', ?, ?, 'Just now', 1, 'feedback')
  `).run(
    `notif-fdb-stu-${Date.now()}`,
    `Ticket ${ticket.reference_id} Updated`,
    `Your ticket "${ticket.subject}" is now "${status}".`
  );

  broadcastEvent('STATE_SYNC', { entity: 'feedback' });
  res.json({ status });
});

// ==================== NOTIFICATIONS ====================

app.post('/api/notifications/read-all', requireAuth, (req, res) => {
  db.prepare('UPDATE notifications SET unread = 0 WHERE recipient_role = ?').run(req.user.role);
  broadcastEvent('STATE_SYNC', { entity: 'notifications' });
  res.json({ status: 'ok' });
});

// ==================== SEMESTER CALENDAR ====================

app.post('/api/calendar', requireAuth, (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    monthLabel,
    weekTag = 'Academic Week',
    category = 'Exam',
    branch = 'CSE',
    semester = 'Sem 5',
    venue = 'Academic Block',
    coordinator = 'Exam Cell',
  } = req.body || {};

  if (!title?.trim() || !startDate) {
    return res.status(400).json({ error: 'Title and start date are required.' });
  }

  const id = `sem-cal-${Date.now()}`;
  db.prepare(`
    INSERT INTO semester_calendar (
      id, title, description, start_date, end_date, month_label,
      week_tag, category, branch, semester, venue, coordinator, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Upcoming')
  `).run(
    id,
    title.trim(),
    description?.trim() || `Scheduled milestone for ${branch} (${semester}).`,
    startDate,
    endDate || startDate,
    monthLabel || startDate.slice(0, 7),
    weekTag,
    category,
    branch,
    semester,
    venue,
    coordinator
  );

  broadcastEvent('STATE_SYNC', { entity: 'calendar' });
  res.status(201).json({ id });
});

// ==================== RESET DEMO DATABASE ====================

app.post('/api/reset-demo', requireAuth, (req, res) => {
  seedDatabase(true);
  broadcastEvent('STATE_SYNC', { entity: 'all' });
  res.json({ status: 'reset' });
});
