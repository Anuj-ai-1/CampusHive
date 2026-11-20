import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import { hashPassword } from './auth.js';
import {
  INITIAL_USER_PROFILE,
  ADMIN_PROFILE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_CLUBS,
  INITIAL_VOLUNTEER_ROLES,
  INITIAL_TASKS,
  INITIAL_FEEDBACK,
  INITIAL_NOTIFICATIONS,
  INITIAL_SEMESTER_CALENDAR,
  CAMPUS_STUDENTS_DIRECTORY,
} from '../src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.VERCEL
  ? '/tmp/unihive.db'
  : path.join(__dirname, 'data', 'unihive.db');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

export const db = new DatabaseSync(DB_PATH);

db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      role TEXT NOT NULL DEFAULT 'student',
      name TEXT NOT NULL,
      short_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      student_id TEXT,
      roll_no TEXT,
      department TEXT,
      branch_code TEXT DEFAULT 'CSE',
      year TEXT DEFAULT '3rd Year (Semester 5)',
      year_short TEXT DEFAULT '3rd Year',
      division TEXT DEFAULT 'Div A',
      lab_batch TEXT DEFAULT 'Batch A1',
      minor_track TEXT,
      ojt_status TEXT,
      is_cr INTEGER DEFAULT 0,
      class_advisor TEXT,
      class_room TEXT,
      gpa TEXT DEFAULT '8.80 / 10.0',
      campus TEXT DEFAULT 'Universal SkillTech University (USTU)',
      bio TEXT,
      phone TEXT,
      location TEXT,
      interests_json TEXT DEFAULT '[]',
      achievements_json TEXT DEFAULT '[]',
      role_title TEXT,
      avatar_url TEXT,
      profile_completed INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      source TEXT NOT NULL,
      author_role TEXT NOT NULL,
      date TEXT NOT NULL,
      relative_time TEXT NOT NULL,
      category TEXT NOT NULL,
      target_branch TEXT DEFAULT 'ALL',
      target_division TEXT DEFAULT 'ALL',
      pinned INTEGER DEFAULT 0,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      month_short TEXT NOT NULL,
      day_number TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT,
      duration TEXT,
      venue TEXT NOT NULL,
      organizer TEXT NOT NULL,
      club_id TEXT,
      capacity INTEGER NOT NULL DEFAULT 100,
      registered_count INTEGER NOT NULL DEFAULT 0,
      approval_status TEXT NOT NULL DEFAULT 'Published',
      od_eligible INTEGER DEFAULT 1,
      eligibility TEXT,
      target_branches_json TEXT DEFAULT '["ALL"]',
      tags_json TEXT DEFAULT '[]',
      clash_info_json TEXT DEFAULT '{}',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS event_registrations (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      student_name TEXT NOT NULL,
      roll_no TEXT,
      branch TEXT,
      division TEXT,
      status TEXT DEFAULT 'OD Approved',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(event_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS clubs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT,
      category TEXT NOT NULL,
      member_count INTEGER NOT NULL DEFAULT 1,
      lead_name TEXT,
      vice_lead_name TEXT,
      secretary_name TEXT,
      created_by TEXT,
      created_by_name TEXT,
      approval_status TEXT NOT NULL DEFAULT 'Approved',
      meeting_schedule TEXT,
      requires_approval INTEGER DEFAULT 0,
      activities_json TEXT DEFAULT '[]',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS club_memberships (
      id TEXT PRIMARY KEY,
      club_id TEXT NOT NULL,
      user_id TEXT,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Member',
      email TEXT,
      membership_state TEXT NOT NULL DEFAULT 'Joined',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS club_messages (
      id TEXT PRIMARY KEY,
      club_id TEXT NOT NULL,
      channel TEXT NOT NULL DEFAULT 'general',
      sender_id TEXT,
      sender_name TEXT NOT NULL,
      sender_role TEXT NOT NULL,
      time_label TEXT NOT NULL,
      text TEXT NOT NULL,
      reply_to_json TEXT,
      link_url TEXT,
      pinned INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      fires INTEGER DEFAULT 0,
      rockets INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS volunteer_roles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      event_id TEXT,
      event_title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT NOT NULL,
      required_count INTEGER NOT NULL DEFAULT 5,
      filled_count INTEGER NOT NULL DEFAULT 0,
      service_hours REAL NOT NULL DEFAULT 3,
      responsibilities TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS volunteer_applications (
      id TEXT PRIMARY KEY,
      role_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Applied',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(role_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      event_title TEXT NOT NULL,
      deadline TEXT NOT NULL,
      priority TEXT NOT NULL DEFAULT 'Medium',
      completed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS feedback_tickets (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      user_id TEXT,
      submitted_by_name TEXT,
      category TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      related_event TEXT DEFAULT '',
      submitted_date TEXT NOT NULL,
      updated_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Open',
      admin_response TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      recipient_role TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      time_label TEXT NOT NULL,
      unread INTEGER NOT NULL DEFAULT 1,
      target_tab TEXT NOT NULL DEFAULT 'home',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS semester_calendar (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      month_label TEXT NOT NULL,
      week_tag TEXT NOT NULL,
      category TEXT NOT NULL,
      branch TEXT NOT NULL DEFAULT 'ALL',
      semester TEXT NOT NULL DEFAULT 'ALL',
      venue TEXT NOT NULL,
      coordinator TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Upcoming',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe schema migration for existing SQLite databases
  try {
    db.exec('ALTER TABLE users ADD COLUMN avatar_url TEXT;');
  } catch {
    // Column already exists
  }
}

function getDefaultClubMessages(club) {
  return [
    {
      id: `msg-${club.id}-1`,
      channel: 'announcements',
      senderName: club.leadName || 'Rohan Verma (4th Year CSE)',
      senderRole: 'Leader / President',
      time: 'Yesterday, 6:15 PM',
      text: `Welcome to the official ${club.name} workspace on UniHive! Check out our upcoming meetup schedule (${club.meetingSchedule}) and drop your project ideas in #project-builds.`,
      pinned: true,
      likes: 12,
      fires: 5,
      rockets: 7,
    },
    {
      id: `msg-${club.id}-2`,
      channel: 'general',
      senderName: club.viceLeadName || 'Anuj Sharma (3rd Year CSE)',
      senderRole: 'Vice Leader',
      time: 'Today, 10:20 AM',
      text: `Hey everyone! We are forming 3-4 member squads for the USTU SkillTech Summit 2026 sprint. Anyone from CSE, AIML, or Design looking for a team?`,
      pinned: true,
      likes: 8,
      fires: 4,
      rockets: 6,
    },
    {
      id: `msg-${club.id}-3`,
      channel: 'general',
      senderName: club.secretaryName || 'Sneha Reddy (2nd Year Microsoft AI & ML)',
      senderRole: 'Secretary',
      time: 'Today, 11:05 AM',
      text: `I have uploaded the starter kit and lab access instructions in the Archivia digital repository. Click on any member's name here to view their profile or start a 1-on-1 DM!`,
      linkUrl: 'https://github.com/ustu-skilltech/starter-kit-2026',
      pinned: false,
      likes: 6,
      fires: 3,
      rockets: 4,
    },
    {
      id: `msg-${club.id}-4`,
      channel: 'projects',
      senderName: 'Priya Patel (3rd Year CSE)',
      senderRole: 'Core Member',
      time: 'Today, 12:30 PM',
      text: `Pushed the latest FastAPI + React microservice prototype to our club GitHub org. Ready for review before Friday's session!`,
      linkUrl: 'https://github.com/ustu-skilltech/rag-agent-service',
      pinned: false,
      likes: 9,
      fires: 6,
      rockets: 5,
    },
    {
      id: `msg-${club.id}-5`,
      channel: 'doubts',
      senderName: 'Devansh Joshi (3rd Year CSE)',
      senderRole: 'Core Member',
      time: 'Today, 01:15 PM',
      text: `Can someone share the Docker compose config for the Microsoft AI Lab GPU runner? Facing a port binding issue on port 8080.`,
      pinned: false,
      likes: 3,
      fires: 1,
      rockets: 2,
    },
  ];
}

export function seedDatabase(forceReset = false) {
  initSchema();

  if (forceReset) {
    db.exec(`
      DELETE FROM event_registrations;
      DELETE FROM events;
      DELETE FROM club_messages;
      DELETE FROM club_memberships;
      DELETE FROM clubs;
      DELETE FROM volunteer_applications;
      DELETE FROM volunteer_roles;
      DELETE FROM tasks;
      DELETE FROM feedback_tickets;
      DELETE FROM notifications;
      DELETE FROM announcements;
      DELETE FROM semester_calendar;
      DELETE FROM users;
    `);
  }

  const countRow = db.prepare('SELECT COUNT(*) AS cnt FROM users').get();
  if (countRow.cnt > 0) return;

  const insertUser = db.prepare(`
    INSERT INTO users (
      id, role, name, short_name, email, password_hash, student_id, roll_no,
      department, branch_code, year, year_short, division, lab_batch,
      minor_track, ojt_status, is_cr, class_advisor, class_room, gpa,
      campus, bio, phone, location, interests_json, achievements_json, role_title
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const studentPassHash = hashPassword('ustu2026');
  const adminPassHash = hashPassword('ustuadmin2026');

  // Primary Demo Student (Anuj Sharma)
  insertUser.run(
    INITIAL_USER_PROFILE.id,
    'student',
    INITIAL_USER_PROFILE.name,
    INITIAL_USER_PROFILE.shortName,
    INITIAL_USER_PROFILE.email,
    studentPassHash,
    INITIAL_USER_PROFILE.studentId,
    INITIAL_USER_PROFILE.rollNo,
    INITIAL_USER_PROFILE.department,
    INITIAL_USER_PROFILE.branchCode,
    INITIAL_USER_PROFILE.year,
    INITIAL_USER_PROFILE.yearShort,
    INITIAL_USER_PROFILE.division,
    INITIAL_USER_PROFILE.labBatch,
    INITIAL_USER_PROFILE.minorTrack,
    INITIAL_USER_PROFILE.ojtStatus,
    INITIAL_USER_PROFILE.isCR ? 1 : 0,
    INITIAL_USER_PROFILE.classAdvisor,
    INITIAL_USER_PROFILE.classRoom,
    INITIAL_USER_PROFILE.gpa,
    INITIAL_USER_PROFILE.campus,
    INITIAL_USER_PROFILE.bio,
    INITIAL_USER_PROFILE.phone,
    INITIAL_USER_PROFILE.location,
    JSON.stringify(INITIAL_USER_PROFILE.interests),
    JSON.stringify(INITIAL_USER_PROFILE.achievements),
    null
  );

  // Admin User (Dr. Anil Raina)
  insertUser.run(
    ADMIN_PROFILE.id,
    'admin',
    ADMIN_PROFILE.name,
    ADMIN_PROFILE.shortName,
    ADMIN_PROFILE.email,
    adminPassHash,
    null,
    null,
    ADMIN_PROFILE.department,
    'ADMIN',
    'Administration',
    'Pro-VC',
    'Executive',
    null,
    null,
    null,
    0,
    null,
    'Admin Block 101',
    null,
    ADMIN_PROFILE.campus,
    'Pro-Vice Chancellor & Dean of Academics at Universal SkillTech University.',
    '+91 22 4000 1001',
    'Chancellery Wing, USTU',
    '[]',
    '[]',
    ADMIN_PROFILE.roleTitle
  );

  // Seed directory students so any peer can also log in if desired
  for (const stu of CAMPUS_STUDENTS_DIRECTORY) {
    if (stu.email.toLowerCase() === INITIAL_USER_PROFILE.email.toLowerCase()) continue;
    insertUser.run(
      stu.id,
      'student',
      stu.studentName,
      stu.studentName.split(' ')[0],
      stu.email,
      studentPassHash,
      `USTU-2024-${stu.rollNo.slice(-4)}`,
      stu.rollNo,
      `School of Engineering (${stu.branch})`,
      stu.branch,
      `${stu.year} (Semester 5)`,
      stu.year,
      stu.division,
      stu.batch,
      'AI & ML (Microsoft)',
      '60% Practical Track',
      stu.isCR ? 1 : 0,
      'Prof. Raghavendra Kulkarni',
      'LH-301',
      '8.85 / 10.0',
      'Universal SkillTech University (USTU)',
      `${stu.year} ${stu.branch} (${stu.division}) student at Universal SkillTech University.`,
      '+91 98000 00000',
      'USTU Campus',
      JSON.stringify(['AI & ML', 'Full-Stack Dev', 'Hackathons']),
      JSON.stringify([]),
      null
    );
  }

  // Announcements
  const insertAnn = db.prepare(`
    INSERT INTO announcements (
      id, title, source, author_role, date, relative_time, category,
      target_branch, target_division, pinned, summary, content
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const a of INITIAL_ANNOUNCEMENTS) {
    insertAnn.run(
      a.id,
      a.title,
      a.source,
      a.authorRole,
      a.date,
      a.relativeTime,
      a.category,
      a.targetBranch || 'ALL',
      a.targetDivision || 'ALL',
      a.pinned ? 1 : 0,
      a.summary,
      a.content
    );
  }

  // Events & Registrations
  const insertEvt = db.prepare(`
    INSERT INTO events (
      id, title, short_description, full_description, category, date,
      month_short, day_number, start_time, end_time, duration, venue,
      organizer, club_id, capacity, registered_count, approval_status,
      od_eligible, eligibility, target_branches_json, tags_json, clash_info_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertReg = db.prepare(`
    INSERT OR IGNORE INTO event_registrations (
      id, event_id, user_id, student_name, roll_no, branch, division, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const e of INITIAL_EVENTS) {
    insertEvt.run(
      e.id,
      e.title,
      e.shortDescription,
      e.fullDescription || e.shortDescription,
      e.category,
      e.date,
      e.monthShort,
      e.dayNumber,
      e.startTime,
      e.endTime || '05:00 PM',
      e.duration || '2 hours',
      e.venue,
      e.organizer,
      e.clubId || null,
      e.capacity || 100,
      e.registeredCount || 0,
      e.approvalStatus || 'Published',
      e.odEligible === false ? 0 : 1,
      e.eligibility || 'Open to all enrolled students.',
      JSON.stringify(e.targetBranches || ['ALL']),
      JSON.stringify(e.tags || []),
      JSON.stringify(e.clashInfo || {})
    );

    if (e.isRegistered) {
      insertReg.run(
        `reg-${e.id}-${INITIAL_USER_PROFILE.id}`,
        e.id,
        INITIAL_USER_PROFILE.id,
        INITIAL_USER_PROFILE.name,
        INITIAL_USER_PROFILE.rollNo,
        INITIAL_USER_PROFILE.branchCode,
        INITIAL_USER_PROFILE.division,
        'OD Approved'
      );
    }

    if (Array.isArray(e.odAttendees)) {
      for (const att of e.odAttendees) {
        const matchedUser = att.name === INITIAL_USER_PROFILE.name
          ? INITIAL_USER_PROFILE.id
          : `ext-${att.rollNo || att.id}`;
        insertReg.run(
          `${e.id}-${att.id}`,
          e.id,
          matchedUser,
          att.name,
          att.rollNo,
          att.branch,
          att.division,
          att.status || 'OD Approved'
        );
      }
    }
  }

  // Clubs, Memberships & Chat Messages
  const insertClub = db.prepare(`
    INSERT INTO clubs (
      id, name, short_description, full_description, category, member_count,
      lead_name, vice_lead_name, secretary_name, created_by, created_by_name,
      approval_status, meeting_schedule, requires_approval, activities_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMember = db.prepare(`
    INSERT INTO club_memberships (
      id, club_id, user_id, name, role, email, membership_state
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertMsg = db.prepare(`
    INSERT INTO club_messages (
      id, club_id, channel, sender_id, sender_name, sender_role, time_label,
      text, reply_to_json, link_url, pinned, likes, fires, rockets
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const c of INITIAL_CLUBS) {
    insertClub.run(
      c.id,
      c.name,
      c.shortDescription,
      c.fullDescription || c.shortDescription,
      c.category,
      c.memberCount || 1,
      c.leadName || '',
      c.viceLeadName || '',
      c.secretaryName || '',
      c.createdBy || INITIAL_USER_PROFILE.id,
      c.createdByName || INITIAL_USER_PROFILE.name,
      c.approvalStatus || 'Approved',
      c.meetingSchedule || '',
      c.requiresApproval ? 1 : 0,
      JSON.stringify(c.activities || [])
    );

    const members = c.members || [];
    let hasPrimaryUser = false;
    for (const m of members) {
      const isPrimary = m.name.toLowerCase().includes(INITIAL_USER_PROFILE.shortName.toLowerCase());
      if (isPrimary) hasPrimaryUser = true;
      insertMember.run(
        `${c.id}-${m.id}`,
        c.id,
        isPrimary ? INITIAL_USER_PROFILE.id : null,
        m.name,
        m.role,
        m.email || 'student@ustu.edu.in',
        c.membershipState || 'Joined'
      );
    }

    if (!hasPrimaryUser && (c.membershipState === 'Joined' || c.membershipState === 'Pending Approval')) {
      insertMember.run(
        `${c.id}-me`,
        c.id,
        INITIAL_USER_PROFILE.id,
        `${INITIAL_USER_PROFILE.name} (3rd Year CSE)`,
        'Member',
        INITIAL_USER_PROFILE.email,
        c.membershipState
      );
    }

    const msgs = c.chatMessages || getDefaultClubMessages(c);
    for (const msg of msgs) {
      insertMsg.run(
        msg.id,
        c.id,
        msg.channel || 'general',
        null,
        msg.senderName,
        msg.senderRole,
        msg.time || 'Today',
        msg.text,
        msg.replyTo ? JSON.stringify(msg.replyTo) : null,
        msg.linkUrl || null,
        msg.pinned ? 1 : 0,
        msg.likes || 0,
        msg.fires || 0,
        msg.rockets || 0
      );
    }
  }

  // Volunteer Roles & Applications
  const insertVol = db.prepare(`
    INSERT INTO volunteer_roles (
      id, title, event_id, event_title, date, time, venue,
      required_count, filled_count, service_hours, responsibilities
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertVolApp = db.prepare(`
    INSERT OR IGNORE INTO volunteer_applications (id, role_id, user_id, status)
    VALUES (?, ?, ?, ?)
  `);

  for (const r of INITIAL_VOLUNTEER_ROLES) {
    insertVol.run(
      r.id,
      r.title,
      r.eventId || null,
      r.eventTitle,
      r.date,
      r.time,
      r.venue,
      r.requiredCount,
      r.filledCount,
      r.serviceHours,
      r.responsibilities
    );
    if (r.status && r.status !== 'Open') {
      insertVolApp.run(`vapp-${r.id}`, r.id, INITIAL_USER_PROFILE.id, r.status);
    }
  }

  // Tasks
  const insertTask = db.prepare(`
    INSERT INTO tasks (id, user_id, title, event_title, deadline, priority, completed)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  for (const t of INITIAL_TASKS) {
    insertTask.run(
      t.id,
      INITIAL_USER_PROFILE.id,
      t.title,
      t.eventTitle,
      t.deadline,
      t.priority,
      t.completed ? 1 : 0
    );
  }

  // Feedback Tickets
  const insertFdb = db.prepare(`
    INSERT INTO feedback_tickets (
      id, reference_id, user_id, category, subject, description,
      related_event, submitted_date, updated_date, status, admin_response
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const f of INITIAL_FEEDBACK) {
    insertFdb.run(
      f.id,
      f.referenceId,
      INITIAL_USER_PROFILE.id,
      f.category,
      f.subject,
      f.description,
      f.relatedEvent || '',
      f.submittedDate,
      f.updatedDate,
      f.status,
      f.adminResponse || ''
    );
  }

  // Notifications
  const insertNotif = db.prepare(`
    INSERT INTO notifications (id, recipient_role, title, message, time_label, unread, target_tab)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  for (const n of INITIAL_NOTIFICATIONS) {
    insertNotif.run(
      n.id,
      n.recipientRole || 'student',
      n.title,
      n.message,
      n.time,
      n.unread ? 1 : 0,
      n.targetTab || 'home'
    );
  }

  // Semester Calendar
  const insertCal = db.prepare(`
    INSERT INTO semester_calendar (
      id, title, description, start_date, end_date, month_label,
      week_tag, category, branch, semester, venue, coordinator, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const c of INITIAL_SEMESTER_CALENDAR) {
    insertCal.run(
      c.id,
      c.title,
      c.description,
      c.startDate,
      c.endDate,
      c.monthLabel,
      c.weekTag,
      c.category,
      c.branch || 'ALL',
      c.semester || 'ALL',
      c.venue,
      c.coordinator,
      c.status || 'Upcoming'
    );
  }
}

export function serializeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: row.role,
    name: row.name,
    shortName: row.short_name,
    email: row.email,
    studentId: row.student_id,
    rollNo: row.roll_no,
    department: row.department,
    branchCode: row.branch_code,
    year: row.year,
    yearShort: row.year_short,
    division: row.division,
    labBatch: row.lab_batch,
    minorTrack: row.minor_track,
    ojtStatus: row.ojt_status,
    isCR: Boolean(row.is_cr),
    classAdvisor: row.class_advisor,
    classRoom: row.class_room,
    gpa: row.gpa,
    campus: row.campus,
    bio: row.bio,
    phone: row.phone,
    location: row.location,
    interests: JSON.parse(row.interests_json || '[]'),
    achievements: JSON.parse(row.achievements_json || '[]'),
    roleTitle: row.role_title,
    avatarUrl: row.avatar_url || '',
    profileCompleted: row.profile_completed !== 0,
  };
}

export function getBootstrapData(userId, role) {
  const userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  const studentRow =
    role === 'student'
      ? userRow
      : db.prepare("SELECT * FROM users WHERE role = 'student' LIMIT 1").get();
  const adminRow =
    role === 'admin'
      ? userRow
      : db.prepare("SELECT * FROM users WHERE role = 'admin' LIMIT 1").get();

  const announcements = db
    .prepare('SELECT * FROM announcements ORDER BY pinned DESC, created_at DESC')
    .all()
    .map((a) => ({
      id: a.id,
      title: a.title,
      source: a.source,
      authorRole: a.author_role,
      date: a.date,
      relativeTime: a.relative_time,
      category: a.category,
      targetBranch: a.target_branch,
      targetDivision: a.target_division,
      pinned: Boolean(a.pinned),
      summary: a.summary,
      content: a.content,
    }));

  const regRows = db.prepare('SELECT * FROM event_registrations').all();
  const events = db
    .prepare('SELECT * FROM events ORDER BY date ASC, created_at DESC')
    .all()
    .map((e) => {
      const eventRegs = regRows.filter((r) => r.event_id === e.id);
      const isRegistered = eventRegs.some((r) => r.user_id === userId);
      return {
        id: e.id,
        title: e.title,
        shortDescription: e.short_description,
        fullDescription: e.full_description,
        category: e.category,
        date: e.date,
        monthShort: e.month_short,
        dayNumber: e.day_number,
        startTime: e.start_time,
        endTime: e.end_time,
        duration: e.duration,
        venue: e.venue,
        organizer: e.organizer,
        clubId: e.club_id,
        capacity: e.capacity,
        registeredCount: e.registered_count,
        isRegistered,
        approvalStatus: e.approval_status,
        odEligible: Boolean(e.od_eligible),
        eligibility: e.eligibility,
        targetBranches: JSON.parse(e.target_branches_json || '["ALL"]'),
        tags: JSON.parse(e.tags_json || '[]'),
        clashInfo: JSON.parse(e.clash_info_json || '{}'),
        odAttendees: eventRegs.map((r) => ({
          id: r.id,
          name: r.student_name,
          rollNo: r.roll_no,
          branch: r.branch,
          division: r.division,
          status: r.user_id === userId ? 'OD Approved (You)' : r.status,
        })),
      };
    });

  const memberRows = db.prepare('SELECT * FROM club_memberships ORDER BY created_at ASC').all();
  const msgRows = db.prepare('SELECT * FROM club_messages ORDER BY created_at ASC').all();
  const clubs = db
    .prepare('SELECT * FROM clubs ORDER BY created_at DESC')
    .all()
    .map((c) => {
      const cMembers = memberRows.filter((m) => m.club_id === c.id);
      const myMembership = cMembers.find((m) => m.user_id === userId);
      const membershipState = myMembership
        ? myMembership.membership_state
        : c.requires_approval
        ? 'Approval Required'
        : 'Open';
      const hasAccess = role === 'admin' || membershipState === 'Joined';
      const cMsgs = hasAccess
        ? msgRows
            .filter((m) => m.club_id === c.id)
            .map((m) => ({
              id: m.id,
              channel: m.channel,
              senderName: m.sender_name,
              senderRole: m.sender_role,
              time: m.time_label,
              text: m.text,
              replyTo: m.reply_to_json ? JSON.parse(m.reply_to_json) : null,
              linkUrl: m.link_url,
              pinned: Boolean(m.pinned),
              likes: m.likes,
              fires: m.fires,
              rockets: m.rockets,
            }))
        : [];

      return {
        id: c.id,
        name: c.name,
        shortDescription: c.short_description,
        fullDescription: c.full_description,
        category: c.category,
        memberCount: c.member_count,
        leadName: c.lead_name,
        viceLeadName: c.vice_lead_name,
        secretaryName: c.secretary_name,
        createdBy: c.created_by,
        createdByName: c.created_by_name,
        approvalStatus: c.approval_status,
        meetingSchedule: c.meeting_schedule,
        membershipState,
        requiresApproval: Boolean(c.requires_approval),
        members: hasAccess
          ? cMembers.map((m) => ({
              id: m.id,
              name: m.name,
              role: m.role,
              email: m.email,
            }))
          : [],
        activities: JSON.parse(c.activities_json || '[]'),
        chatMessages: cMsgs,
      };
    });

  const volApps = db
    .prepare('SELECT * FROM volunteer_applications WHERE user_id = ?')
    .all(userId);
  const volunteerRoles = db
    .prepare('SELECT * FROM volunteer_roles ORDER BY date ASC')
    .all()
    .map((r) => {
      const app = volApps.find((a) => a.role_id === r.id);
      return {
        id: r.id,
        title: r.title,
        eventId: r.event_id,
        eventTitle: r.event_title,
        date: r.date,
        time: r.time,
        venue: r.venue,
        requiredCount: r.required_count,
        filledCount: r.filled_count,
        serviceHours: r.service_hours,
        responsibilities: r.responsibilities,
        status: app ? app.status : 'Open',
      };
    });

  const tasks = db
    .prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC')
    .all(userId)
    .map((t) => ({
      id: t.id,
      title: t.title,
      eventTitle: t.event_title,
      deadline: t.deadline,
      priority: t.priority,
      completed: Boolean(t.completed),
    }));

  const feedbackList = db
    .prepare('SELECT * FROM feedback_tickets ORDER BY created_at DESC')
    .all()
    .map((f) => ({
      id: f.id,
      referenceId: f.reference_id,
      submittedByName: f.submitted_by_name || 'Student',
      category: f.category,
      subject: f.subject,
      description: f.description,
      relatedEvent: f.related_event,
      submittedDate: f.submitted_date,
      updatedDate: f.updated_date,
      status: f.status,
      adminResponse: f.admin_response,
    }));

  const notifications = db
    .prepare('SELECT * FROM notifications WHERE recipient_role = ? ORDER BY created_at DESC')
    .all(role)
    .map((n) => ({
      id: n.id,
      recipientRole: n.recipient_role,
      title: n.title,
      message: n.message,
      time: n.time_label,
      unread: Boolean(n.unread),
      targetTab: n.target_tab,
    }));

  const semesterCalendar = db
    .prepare('SELECT * FROM semester_calendar ORDER BY start_date ASC')
    .all()
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      startDate: c.start_date,
      endDate: c.end_date,
      monthLabel: c.month_label,
      weekTag: c.week_tag,
      category: c.category,
      branch: c.branch,
      semester: c.semester,
      venue: c.venue,
      coordinator: c.coordinator,
      status: c.status,
    }));

  const campusDirectory = db
    .prepare("SELECT * FROM users WHERE role = 'student' ORDER BY name ASC")
    .all()
    .map((u) => serializeUser(u));

  return {
    currentUser: serializeUser(userRow),
    userProfile: serializeUser(studentRow),
    adminProfile: serializeUser(adminRow),
    campusDirectory,
    announcements,
    events,
    clubs,
    volunteerRoles,
    tasks,
    feedbackList,
    notifications,
    semesterCalendar,
  };
}

// Initialize and seed on import
seedDatabase(false);
