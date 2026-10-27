// Centralized realistic, internally consistent mock data for UniHive × Universal SkillTech University (USTU)

export const USTU_UNIVERSITY_INFO = {
  name: 'Universal SkillTech University (USTU)',
  shortName: 'USTU',
  tagline: 'Think It. Build It. Do It. Make it Happen',
  formula: 'Learn + Work + Network = Placement',
  emailDomain: '@ustu.edu.in',
  website: 'https://www.universalskilltechuniversity.edu.in/',
  practicalRatio: '60% Mandatory Practical & Lab Work · 40% Theory',
  nepStructure: '11 Foundational Courses · 6 Core Majors · 9 Interdisciplinary Minors · 6–12 Months OJT/Internship',
  knowledgePartners: ['Microsoft (AI & ML Co-Creation)', 'KPMG in India (Consulting & Strategy)', 'Industry 5.0 Skill Labs'],
  schools: [
    'School of Science, Engineering & Technology Skills',
    'School of Commerce, Entrepreneurship & Management Skills',
    'School of Design Skills',
    'School of Media & Communication Skills',
    'School of Liberal Arts (Applied Psychology)',
    'School of Allied Health Sciences',
    'School of Sports Studies'
  ],
  signatureSpaces: [
    'Archivia (Knowledge Resource Centre & Digital Library)',
    'Literati Café (Student Networking & Collaboration Hub)',
    'Microsoft AI & Cloud Co-Innovation Lab',
    'KPMG Business Analytics & Consulting Studio',
    'Design & VFX Digital Media Studio',
    'Universal Multi-Sport Turf Arena'
  ]
};

export const INITIAL_USER_PROFILE = {
  id: 'usr-student-01',
  name: 'Anuj Sharma',
  shortName: 'Anuj',
  email: 'anuj.sharma@ustu.edu.in',
  studentId: 'USTU-2024-CS108',
  rollNo: 'USTU-CS-3A-08',
  department: 'School of Science, Engineering & Technology Skills (B.Tech CSE)',
  branchCode: 'CSE',
  year: '3rd Year (Semester 5)',
  yearShort: '3rd Year',
  division: 'Div A',
  labBatch: 'Batch A1',
  minorTrack: 'AI & ML (Microsoft) + Tech Consulting (KPMG)',
  ojtStatus: '60% Practical Track · OJT Sprint Active',
  isCR: true,
  classAdvisor: 'Prof. Raghavendra Kulkarni (Professor of Practice — CSE)',
  classRoom: 'LH-301, Engineering Tech Block',
  gpa: '9.14 / 10.0',
  campus: 'Universal SkillTech University (USTU)',
  bio: 'Creator of UniHive & 3rd Year B.Tech CSE Class Representative at Universal SkillTech University (USTU). Specializing in Microsoft AI/ML architectures, KPMG tech consulting frameworks, and full-stack SaaS engineering.',
  phone: '+91 98765 43210',
  location: 'Campus Residence, Wing B-304',
  interests: [
    'Microsoft AI & Azure ML',
    'Full-Stack SaaS Architecture',
    'KPMG Tech Consulting',
    'Robotics & Industry 5.0',
    'UI/UX & Product Design',
    'Startup Incubation'
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Lead Architect — UniHive Unified University SaaS Platform',
      issuer: 'Universal SkillTech University Innovation Cell',
      date: 'Oct 2026',
      type: 'Leadership',
      credentialId: 'USTU-INNOV-2026-001'
    },
    {
      id: 'ach-2',
      title: '1st Place — HackUSTU 2026 Industry 5.0 Hackathon',
      issuer: 'School of Science, Engineering & Technology Skills',
      date: 'Sep 2026',
      type: 'Award',
      credentialId: 'USTU-HACK-2026-091'
    },
    {
      id: 'ach-3',
      title: 'Microsoft AI & Azure Applied Skills Distinction',
      issuer: 'USTU × Microsoft Knowledge Partnership',
      date: 'Aug 2026',
      type: 'Certificate',
      credentialId: 'MSFT-USTU-2026-412'
    }
  ]
};

export const ADMIN_PROFILE = {
  id: 'usr-admin-01',
  name: 'Dr. Anil Raina',
  shortName: 'Dr. Raina',
  email: 'pro.vc@ustu.edu.in',
  roleTitle: 'Pro-Vice Chancellor & Dean of Academics (USTU)',
  department: 'Office of the Pro-Vice Chancellor & Student Welfare',
  campus: 'Universal SkillTech University (USTU)'
};

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-div-1',
    title: 'CSE Div A: Microsoft AI & OS Lab shifted to Microsoft Co-Innovation Lab 302',
    source: 'Class Representative (USTU CSE Div A)',
    authorRole: 'Anuj Sharma (CR) & Prof. Kulkarni (PoP)',
    date: '2026-10-27',
    relativeTime: '30m ago',
    category: 'Division Notice',
    targetBranch: 'CSE',
    targetDivision: 'Div A',
    pinned: true,
    summary: 'October 29 afternoon 60%-Practical Lab for Batch A1/A2 will take place in Microsoft AI Lab 302 instead of Lab 104.',
    content: 'Attention 3rd Year B.Tech CSE Division A students at USTU: Due to GPU cluster upgrades in Lab 104, our Thursday afternoon Operating Systems & Microsoft Azure ML Lab will be conducted in Microsoft Co-Innovation Lab 302. Students attending the Microsoft AI Workshop in the same slot will receive automatic On-Duty (OD) attendance.'
  },
  {
    id: 'ann-branch-1',
    title: 'School of Engineering (CSE): NEP 60% Practical Capstone & OJT Review',
    source: 'Dean — School of Science, Engineering & Technology Skills',
    authorRole: 'Dr. M. S. Deshpande (HOD CSE) & Industry Mentors',
    date: '2026-10-27',
    relativeTime: '1 hour ago',
    category: 'Branch Notice',
    targetBranch: 'CSE',
    targetDivision: 'ALL',
    pinned: true,
    summary: 'All 3rd Year CSE Divisions (Div A, Div B, Div C) must submit their live Industry 5.0 project repo by November 3.',
    content: 'In alignment with USTU’s "Learn + Work + Network = Placement" framework and 60% mandatory practical evaluation, all CSE Div A, Div B, and Div C groups must submit their live deployment URL, architecture diagram, and GitHub repository for review by Professors of Practice on or before November 3, 2026.'
  },
  {
    id: 'ann-1',
    title: 'USTU SkillTech Summit 2026 — "Think It. Build It. Do It." Registrations Open',
    source: 'USTU Student Council & Office of Pro-VC',
    authorRole: 'General Secretary & EVP Office',
    date: '2026-10-27',
    relativeTime: '2 hours ago',
    category: 'Events',
    targetBranch: 'ALL',
    targetDivision: 'ALL',
    pinned: true,
    summary: 'Registrations for the annual inter-school hackathon, Microsoft AI track, KPMG consulting challenge, and design showcase are live.',
    content: 'Universal SkillTech University’s flagship festival, SkillTech Summit 2026, will take place from November 6–8, 2026. Students across all 7 USTU Schools (Engineering, Commerce & Management, Design, Media, Liberal Arts, Allied Health, and Sports) can register for 18+ hands-on tracks.'
  },
  {
    id: 'ann-2',
    title: 'KPMG in India × USTU Consulting Case Clinic this Friday',
    source: 'Knowledge Partner Cell — KPMG & USTU',
    authorRole: 'Professor of Practice (Consulting Track)',
    date: '2026-10-26',
    relativeTime: 'Yesterday',
    category: 'Academic',
    targetBranch: 'ALL',
    targetDivision: 'ALL',
    pinned: false,
    summary: 'Mandatory industry case-study session for B.Tech CSE (KPMG Minor) and BBA/MBA cohorts in Seminar Hall 1.',
    content: 'Mentors from KPMG in India will lead a live problem-solving clinic on digital transformation and enterprise consulting for USTU B.Tech and Management students this Friday at 2:30 PM.'
  },
  {
    id: 'ann-div-2',
    title: 'CSE Div B: Database Systems Practical Assessment moved to Friday 11 AM',
    source: 'Class Advisor (CSE Div B)',
    authorRole: 'Prof. Anita Menon',
    date: '2026-10-26',
    relativeTime: 'Yesterday',
    category: 'Division Notice',
    targetBranch: 'CSE',
    targetDivision: 'Div B',
    pinned: false,
    summary: 'Hands-on PostgreSQL indexing & transaction lab evaluation for CSE Division B in Data Systems Lab.',
    content: 'CSE Division B students: Please note that the DBMS Practical Evaluation 2 covering query optimization and indexing will be conducted on Friday at 11:00 AM.'
  },
  {
    id: 'ann-branch-ece',
    title: 'Cyber Security & ECE Track: IoT & Network Defense Lab Kits Ready',
    source: 'School of Science, Engineering & Technology Skills',
    authorRole: 'Lab In-charge (Kaman Block D)',
    date: '2026-10-25',
    relativeTime: '2 days ago',
    category: 'Branch Notice',
    targetBranch: 'ECE',
    targetDivision: 'ALL',
    pinned: false,
    summary: 'Hardware security tokens, STM32 boards, and FPGA kits are ready for issue to Div A & Div B teams.',
    content: 'All 3rd Year ECE & Cyber Hardware track students from Div A and Div B can collect their industry lab kits between 2:00 PM and 4:30 PM.'
  },
  {
    id: 'ann-3',
    title: 'Literati Café & Design Studio Networking Evening',
    source: 'School of Design & School of Media Skills',
    authorRole: 'Student Community Lead',
    date: '2026-10-25',
    relativeTime: '2 days ago',
    category: 'Clubs',
    targetBranch: 'ALL',
    targetDivision: 'ALL',
    pinned: false,
    summary: 'Cross-school founder, designer, and developer mixer at Literati Café every Thursday at 5:00 PM.',
    content: 'Looking for a UI/UX designer from the School of Design Skills or a filmmaker from Media Skills for your B.Tech startup project? Join the weekly "Learn + Work + Network" mixer at Literati Café.'
  },
  {
    id: 'ann-5',
    title: 'Archivia (Knowledge Resource Centre) Extended Digital Library Hours',
    source: 'Archivia Library & Knowledge Centre, USTU',
    authorRole: 'Chief Knowledge Officer',
    date: '2026-10-22',
    relativeTime: '5 days ago',
    category: 'Facilities',
    targetBranch: 'ALL',
    targetDivision: 'ALL',
    pinned: false,
    summary: 'Archivia Knowledge Resource Centre collaborative pods and IEEE/ACM digital terminals remain open till 10:00 PM.',
    content: 'To support students during the Semester 5 Mid-Term Project & Lab Viva phase, Archivia (USTU Knowledge Resource Centre) has extended access to its digital research terminals and group discussion pods.'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'Microsoft × USTU AI & Azure Copilot Engineering Workshop',
    shortDescription: 'Hands-on industry workshop on building RAG pipelines, Azure OpenAI agents, and production ML deployment.',
    fullDescription: 'Co-designed under the Universal SkillTech University × Microsoft Knowledge Partnership, this 3-hour practical lab guides B.Tech students through building and deploying enterprise AI agents. Includes official Microsoft Applied Skills lab vouchers and On-Duty (OD) attendance.',
    category: 'Technical',
    date: '2026-10-29',
    monthShort: 'OCT',
    dayNumber: '29',
    startTime: '02:30 PM',
    endTime: '05:30 PM',
    duration: '3 hours',
    venue: 'Microsoft AI Co-Innovation Lab 302, USTU',
    organizer: 'USTU × Microsoft AI Guild',
    clubId: 'clb-1',
    capacity: 80,
    registeredCount: 74,
    isRegistered: true,
    approvalStatus: 'Published',
    targetBranches: ['CSE', 'AIML', 'IT'],
    odEligible: true,
    clashInfo: {
      'CSE-Div A': 'Overlaps with CS501 OS & Kernel Lab (2:00 PM – 4:00 PM) · Auto OD Attendance Approved',
      'CSE-Div B': null
    },
    odAttendees: [
      { id: 'od-1', name: 'Anuj Sharma', rollNo: 'USTU-CS-3A-08', branch: 'CSE', division: 'Div A', status: 'OD Approved' },
      { id: 'od-2', name: 'Priya Patel', rollNo: 'USTU-CS-3A-14', branch: 'CSE', division: 'Div A', status: 'OD Approved' },
      { id: 'od-3', name: 'Devansh Joshi', rollNo: 'USTU-CS-3A-29', branch: 'CSE', division: 'Div A', status: 'OD Approved' },
      { id: 'od-4', name: 'Neha Kulkarni', rollNo: 'USTU-CS-3B-04', branch: 'CSE', division: 'Div B', status: 'OD Approved' },
      { id: 'od-5', name: 'Sneha Reddy', rollNo: 'USTU-AI-2A-33', branch: 'AIML', division: 'Div A', status: 'OD Approved' }
    ],
    eligibility: 'Open to USTU CSE, AIML & Data Science/IT students; automatic OD Attendance granted.',
    tags: ['Microsoft Partner', 'AI & ML', 'OD Eligible', '60% Practical']
  },
  {
    id: 'evt-2',
    title: 'USTU SkillTech Summit 2026 — Think It. Build It. Do It.',
    shortDescription: '36-hour flagship innovation festival across all 7 USTU Schools with live product builds and industry hiring panels.',
    fullDescription: 'The flagship annual conclave of Universal SkillTech University embodying "Learn + Work + Network = Placement". Features the 36-hour HackUSTU sprint, KPMG business case finals, robotics arena, and School of Design & Media installations.',
    category: 'Flagship',
    date: '2026-11-06',
    monthShort: 'NOV',
    dayNumber: '06',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    duration: 'Full Day',
    venue: 'USTU Main Auditorium & Central Quad',
    organizer: 'USTU Student Council & Innovation Cell',
    clubId: 'clb-2',
    capacity: 500,
    registeredCount: 462,
    isRegistered: true,
    approvalStatus: 'Published',
    targetBranches: ['ALL'],
    odEligible: true,
    clashInfo: {
      'CSE-Div A': 'Full-day USTU Flagship Summit · Blanket OD Attendance Granted for all lectures',
      'CSE-Div B': 'Full-day USTU Flagship Summit · Blanket OD Attendance Granted for all lectures'
    },
    odAttendees: [
      { id: 'od-21', name: 'Anuj Sharma', rollNo: 'USTU-CS-3A-08', branch: 'CSE', division: 'Div A', status: 'OD Approved' },
      { id: 'od-22', name: 'Aditi Nair', rollNo: 'USTU-IT-4A-19', branch: 'IT', division: 'Div A', status: 'OD Approved' },
      { id: 'od-23', name: 'Karthik Siddharth', rollNo: 'USTU-EC-3A-17', branch: 'ECE', division: 'Div A', status: 'OD Approved' }
    ],
    eligibility: 'Open to all USTU Schools & Engineering Divisions (CSE, AIML, IT, ECE, MECH).',
    tags: ['USTU Flagship', 'OD Eligible', 'Industry 5.0']
  },
  {
    id: 'evt-3',
    title: 'KPMG in India × USTU Tech Consulting & FinTech Challenge',
    shortDescription: 'Real-world corporate consulting and digital transformation case competition judged by KPMG directors.',
    fullDescription: 'Bridge technology and consulting in this intensive 4-hour case challenge. Teams analyze an enterprise cloud & AI migration problem statement curated by KPMG in India mentors and pitch actionable roadmaps.',
    category: 'Competition',
    date: '2026-11-02',
    monthShort: 'NOV',
    dayNumber: '02',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    duration: '4 hours',
    venue: 'KPMG Consulting Studio, USTU Block B',
    organizer: 'USTU Coding & FinTech Guild',
    clubId: 'clb-2',
    capacity: 150,
    registeredCount: 134,
    isRegistered: false,
    approvalStatus: 'Published',
    targetBranches: ['CSE', 'IT', 'AIML'],
    odEligible: true,
    clashInfo: {
      'CSE-Div A': 'Overlaps with DBMS Lab (10:00 AM – 12:00 PM) · Official OD Certificate issued'
    },
    eligibility: 'Open to B.Tech CSE/AIML/IT and School of Commerce & Management students.',
    tags: ['KPMG Partner', 'Consulting', 'OD Eligible']
  },
  {
    id: 'evt-4',
    title: 'Industry 5.0 Robotics & Autonomous Systems Showcase',
    shortDescription: 'Live demonstration of ROS2 rovers, IoT cyber-physical rigs, and smart manufacturing prototypes.',
    fullDescription: 'Showcasing USTU’s 60% practical learning mandate: walk through 14 student-built hardware booths demonstrating LIDAR SLAM navigation, robotic arm vision systems, and industrial automation.',
    category: 'Exhibition',
    date: '2026-11-09',
    monthShort: 'NOV',
    dayNumber: '09',
    startTime: '11:00 AM',
    endTime: '04:00 PM',
    duration: '5 hours',
    venue: 'SkillTech Robotics & Mechatronics Bay, Kaman Campus',
    organizer: 'Robotics & Industry 5.0 Society',
    clubId: 'clb-3',
    capacity: 250,
    registeredCount: 198,
    isRegistered: true,
    approvalStatus: 'Published',
    targetBranches: ['ECE', 'MECH', 'CSE', 'AIML'],
    odEligible: true,
    eligibility: 'Open to all USTU students, Professors of Practice, and visiting industry partners.',
    tags: ['Industry 5.0', 'Hardware', '60% Practical']
  },
  {
    id: 'evt-5',
    title: 'Learn + Work + Network: Founder & OJT Placement Mixer',
    shortDescription: 'Interactive networking evening with startup founders, Professors of Practice, and 6–12 month internship recruiters.',
    fullDescription: 'Connect directly with hiring partners and startup founders at Literati Café. Discuss 6-to-12 month mandatory internship tracks, live OJT projects, and campus venture incubation.',
    category: 'Career & Leadership',
    date: '2026-11-12',
    monthShort: 'NOV',
    dayNumber: '12',
    startTime: '05:00 PM',
    endTime: '07:30 PM',
    duration: '2.5 hours',
    venue: 'Literati Café & Innovation Hub, USTU',
    organizer: 'USTU Entrepreneurship & Placement Cell',
    clubId: 'clb-5',
    capacity: 120,
    registeredCount: 98,
    isRegistered: true,
    approvalStatus: 'Published',
    eligibility: 'Open to all pre-final and final year students across USTU.',
    tags: ['OJT & Internship', 'Literati Café', 'Networking']
  },
  {
    id: 'evt-6',
    title: 'School of Design & Media VFX Visual Storytelling Walk',
    shortDescription: 'Creative cinematography, UI/UX sketching, and golden-hour campus photography walk.',
    fullDescription: 'Hosted jointly by the School of Design Skills and School of Media & Communication Skills. Capture campus architecture and edit in the Digital Media VFX Studio.',
    category: 'Creative & Arts',
    date: '2026-10-31',
    monthShort: 'OCT',
    dayNumber: '31',
    startTime: '04:15 PM',
    endTime: '06:15 PM',
    duration: '2 hours',
    venue: 'Heritage Clocktower Lawn',
    organizer: 'Photography Club',
    clubId: 'clb-4',
    capacity: 45,
    registeredCount: 39,
    isRegistered: true,
    approvalStatus: 'Published',
    eligibility: 'All skill levels welcome; mobile and dedicated cameras both supported.',
    tags: ['Photography', 'Visual Arts', 'Outdoor']
  },
  {
    id: 'evt-7',
    title: 'UI/UX Design Systems & Figma Sprint',
    shortDescription: 'Build token-driven component libraries, accessible design systems, and micro-interactions from scratch.',
    fullDescription: 'Learn how world-class product teams structure Figma variables, auto-layout primitives, and developer handoff specifications. Participants will redesign a real campus workflow during a 90-minute collaborative critique.',
    category: 'Design',
    date: '2026-11-15',
    monthShort: 'NOV',
    dayNumber: '15',
    startTime: '03:00 PM',
    endTime: '05:30 PM',
    duration: '2.5 hours',
    venue: 'Design Studio 104, Architecture Wing',
    organizer: 'Design & Innovation Club',
    clubId: 'clb-7',
    capacity: 60,
    registeredCount: 51,
    isRegistered: true,
    approvalStatus: 'Published',
    eligibility: 'Open to all students; bring a laptop with Figma installed.',
    tags: ['UI/UX', 'Figma', 'Product Design']
  },
  {
    id: 'evt-8',
    title: 'Parliamentary Debate Invitational 2026',
    shortDescription: 'British Parliamentary format exhibition debate on technology ethics, policy regulation, and global governance.',
    fullDescription: 'Watch top collegiate adjudicators and debaters clash on timely motions regarding sovereign AI, urban sustainability, and economic policy, followed by an open floor Q&A.',
    category: 'Cultural & Literary',
    date: '2026-11-18',
    monthShort: 'NOV',
    dayNumber: '18',
    startTime: '04:00 PM',
    endTime: '06:30 PM',
    duration: '2.5 hours',
    venue: 'Mini Auditorium, Humanities Block',
    organizer: 'Debate and Literary Society',
    clubId: 'clb-8',
    capacity: 100,
    registeredCount: 64,
    isRegistered: false,
    approvalStatus: 'Published',
    eligibility: 'Open to all students as audience or floor speakers.',
    tags: ['Debate', 'Public Speaking', 'Policy']
  },
  {
    id: 'evt-9',
    title: 'Acoustic Unplugged Night — Autumn Sessions',
    shortDescription: 'An evening of original indie compositions, acoustic ensembles, and spoken word under the amphitheater lights.',
    fullDescription: 'Unwind after mid-semester deliverables with twelve curated musical acts from the Cultural Committee. Featuring acoustic folk, jazz fusion, and multilingual poetry.',
    category: 'Cultural & Literary',
    date: '2026-11-21',
    monthShort: 'NOV',
    dayNumber: '21',
    startTime: '06:30 PM',
    endTime: '09:00 PM',
    duration: '2.5 hours',
    venue: 'Open Air Amphitheater',
    organizer: 'Cultural Committee',
    clubId: 'clb-6',
    capacity: 350,
    registeredCount: 280,
    isRegistered: false,
    approvalStatus: 'Published',
    eligibility: 'Open to all campus residents.',
    tags: ['Music', 'Live Performance', 'Community']
  },
  {
    id: 'evt-10',
    title: 'Cloud Native & Kubernetes Bootcamp',
    shortDescription: 'Container orchestration, CI/CD pipelines, and zero-downtime deployment patterns for student projects.',
    fullDescription: 'Proposed weekend bootcamp by the Coding Club & DevOps SIG covering Docker multi-stage builds, Kubernetes pods, and GitHub Actions automation.',
    category: 'Technical',
    date: '2026-11-24',
    monthShort: 'NOV',
    dayNumber: '24',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    duration: '3 hours',
    venue: 'Cloud Lab 201, IT Block',
    organizer: 'Coding Club',
    clubId: 'clb-2',
    capacity: 75,
    registeredCount: 18,
    isRegistered: false,
    approvalStatus: 'Pending Approval',
    eligibility: 'Open to 2nd–4th year students.',
    tags: ['DevOps', 'Docker', 'Cloud']
  },
  {
    id: 'evt-11',
    title: 'Clean Energy & Smart Grid Symposium',
    shortDescription: 'Student research presentations on solar microgrids, EV battery management, and sustainable campus IoT.',
    fullDescription: 'Proposed interdisciplinary symposium connecting Electrical Engineering and Robotics students to showcase low-power sensor networks.',
    category: 'Exhibition',
    date: '2026-11-26',
    monthShort: 'NOV',
    dayNumber: '26',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    duration: '3 hours',
    venue: 'Seminar Hall 2, Admin Block',
    organizer: 'Robotics Society',
    clubId: 'clb-3',
    capacity: 90,
    registeredCount: 12,
    isRegistered: false,
    approvalStatus: 'Pending Approval',
    eligibility: 'Open to all departments.',
    tags: ['Sustainability', 'IoT', 'Research']
  }
];

export const CAMPUS_STUDENTS_DIRECTORY = [
  { id: 'stu-1', name: 'Anuj Sharma (3rd Year CSE)', studentName: 'Anuj Sharma', branch: 'CSE', division: 'Div A', year: '3rd Year', batch: 'Batch A1', isCR: true, email: 'anuj.sharma@ustu.edu.in', rollNo: 'USTU-CS-3A-08' },
  { id: 'stu-2', name: 'Priya Patel (3rd Year CSE)', studentName: 'Priya Patel', branch: 'CSE', division: 'Div A', year: '3rd Year', batch: 'Batch A1', isCR: true, email: 'priya.patel@ustu.edu.in', rollNo: 'USTU-CS-3A-14' },
  { id: 'stu-7', name: 'Devansh Joshi (3rd Year CSE)', studentName: 'Devansh Joshi', branch: 'CSE', division: 'Div A', year: '3rd Year', batch: 'Batch A2', isCR: false, email: 'devansh.j@ustu.edu.in', rollNo: 'USTU-CS-3A-29' },
  { id: 'stu-11', name: 'Ishaan Gupta (3rd Year CSE)', studentName: 'Ishaan Gupta', branch: 'CSE', division: 'Div A', year: '3rd Year', batch: 'Batch A2', isCR: false, email: 'ishaan.g@ustu.edu.in', rollNo: 'USTU-CS-3A-35' },
  { id: 'stu-12', name: 'Neha Kulkarni (3rd Year CSE)', studentName: 'Neha Kulkarni', branch: 'CSE', division: 'Div B', year: '3rd Year', batch: 'Batch B1', isCR: true, email: 'neha.k@ustu.edu.in', rollNo: 'USTU-CS-3B-04' },
  { id: 'stu-13', name: 'Vikramjit Singh (3rd Year CSE)', studentName: 'Vikramjit Singh', branch: 'CSE', division: 'Div B', year: '3rd Year', batch: 'Batch B2', isCR: false, email: 'vikram.s@ustu.edu.in', rollNo: 'USTU-CS-3B-19' },
  { id: 'stu-14', name: 'Sanya Malhotra (3rd Year CSE)', studentName: 'Sanya Malhotra', branch: 'CSE', division: 'Div C', year: '3rd Year', batch: 'Batch C1', isCR: true, email: 'sanya.m@ustu.edu.in', rollNo: 'USTU-CS-3C-11' },
  { id: 'stu-3', name: 'Rohan Verma (4th Year CSE)', studentName: 'Rohan Verma', branch: 'CSE', division: 'Div A', year: '4th Year', batch: 'Batch A1', isCR: false, email: 'rohan.verma@ustu.edu.in', rollNo: 'USTU-CS-4A-02' },
  { id: 'stu-4', name: 'Aditi Nair (4th Year Data Science & IT)', studentName: 'Aditi Nair', branch: 'IT', division: 'Div A', year: '4th Year', batch: 'Batch A1', isCR: true, email: 'aditi.nair@ustu.edu.in', rollNo: 'USTU-IT-4A-19' },
  { id: 'stu-5', name: 'Karthik Siddharth (3rd Year Cyber & ECE)', studentName: 'Karthik Siddharth', branch: 'ECE', division: 'Div A', year: '3rd Year', batch: 'Batch A1', isCR: true, email: 'karthik.s@ustu.edu.in', rollNo: 'USTU-EC-3A-17' },
  { id: 'stu-6', name: 'Meera Krishnan (3rd Year School of Design)', studentName: 'Meera Krishnan', branch: 'AIML', division: 'Div B', year: '3rd Year', batch: 'Batch B1', isCR: false, email: 'meera.k@ustu.edu.in', rollNo: 'USTU-AI-3B-21' },
  { id: 'stu-8', name: 'Aarav Sengupta (3rd Year KPMG FinTech Track)', studentName: 'Aarav Sengupta', branch: 'IT', division: 'Div B', year: '3rd Year', batch: 'Batch B2', isCR: false, email: 'aarav.s@ustu.edu.in', rollNo: 'USTU-IT-3B-12' },
  { id: 'stu-9', name: 'Sneha Reddy (2nd Year Microsoft AI & ML)', studentName: 'Sneha Reddy', branch: 'AIML', division: 'Div A', year: '2nd Year', batch: 'Batch A1', isCR: true, email: 'sneha.reddy@ustu.edu.in', rollNo: 'USTU-AI-2A-33' },
  { id: 'stu-10', name: 'Kabir Malhotra (2nd Year Mechatronics)', studentName: 'Kabir Malhotra', branch: 'MECH', division: 'Div A', year: '2nd Year', batch: 'Batch A2', isCR: false, email: 'kabir.m@ustu.edu.in', rollNo: 'USTU-ME-2A-55' }
];

export const DIVISION_TIMETABLE_DATA = {
  'CSE-Div A': [
    { id: 'tt-1', day: 'Thu', date: '2026-10-29', time: '09:30 AM – 11:00 AM', subject: 'Operating Systems & Kernel Design (CS501)', type: 'Lecture', room: 'LH-301, USTU Tech Block', faculty: 'Prof. R. Kulkarni (PoP)' },
    { id: 'tt-2', day: 'Thu', date: '2026-10-29', time: '02:00 PM – 04:00 PM', subject: 'Microsoft AI & OS Practical Lab (60% Practical Track)', type: 'Lab', room: 'Microsoft AI Lab 302', faculty: 'Prof. R. Kulkarni', overlapsEventId: 'evt-1' },
    { id: 'tt-3', day: 'Sat', date: '2026-10-31', time: '10:00 AM – 11:30 AM', subject: 'KPMG Tech Consulting & Cloud Architecture (CS505E)', type: 'Lecture', room: 'KPMG Studio 204', faculty: 'KPMG Professor of Practice' },
    { id: 'tt-4', day: 'Mon', date: '2026-11-02', time: '10:00 AM – 12:00 PM', subject: 'Database Management Systems Practical Lab', type: 'Lab', room: 'Data Systems Lab 204', faculty: 'Prof. A. Menon', overlapsEventId: 'evt-3' },
    { id: 'tt-5', day: 'Fri', date: '2026-11-06', time: '09:30 AM – 11:30 AM', subject: 'Theory of Computation & Compilers (CS504)', type: 'Lecture', room: 'LH-301, USTU Tech Block', faculty: 'Prof. V. Deshmukh', overlapsEventId: 'evt-2' }
  ],
  'CSE-Div B': [
    { id: 'tt-b1', day: 'Thu', date: '2026-10-29', time: '10:00 AM – 12:00 PM', subject: 'Database Systems Lecture (CS502)', type: 'Lecture', room: 'LH-302, USTU Tech Block', faculty: 'Prof. A. Menon' },
    { id: 'tt-b2', day: 'Fri', date: '2026-11-06', time: '02:00 PM – 04:00 PM', subject: 'Operating Systems Lab (Batch B1)', type: 'Lab', room: 'Microsoft AI Lab 302', faculty: 'Prof. M. Joshi', overlapsEventId: 'evt-2' }
  ]
};

export const INITIAL_CLUBS = [
  {
    id: 'clb-1',
    name: 'USTU × Microsoft AI & ML Guild',
    shortDescription: 'Co-created AI engineering sprints, Azure OpenAI labs, and deep learning research at USTU.',
    fullDescription: 'Anchored in Universal SkillTech University’s knowledge partnership with Microsoft, this guild brings together B.Tech CSE, AIML, and Data Science builders to ship generative AI agents, RAG pipelines, and applied ML models.',
    category: 'Technology',
    memberCount: 214,
    leadName: 'Rohan Verma (4th Year CSE)',
    viceLeadName: 'Anuj Sharma (3rd Year CSE)',
    secretaryName: 'Sneha Reddy (2nd Year Microsoft AI & ML)',
    createdBy: 'usr-student-01',
    approvalStatus: 'Approved',
    meetingSchedule: 'Wednesdays, 5:00 PM @ Microsoft AI Lab 302',
    membershipState: 'Joined',
    requiresApproval: false,
    members: [
      { id: 'm-1', name: 'Rohan Verma (4th Year CSE)', role: 'Leader / President', email: 'rohan.verma@ustu.edu.in' },
      { id: 'm-2', name: 'Anuj Sharma (3rd Year CSE)', role: 'Vice Leader', email: 'anuj.sharma@ustu.edu.in' },
      { id: 'm-3', name: 'Sneha Reddy (2nd Year Microsoft AI & ML)', role: 'Secretary', email: 'sneha.reddy@ustu.edu.in' },
      { id: 'm-4', name: 'Priya Patel (3rd Year CSE)', role: 'Core Member', email: 'priya.patel@ustu.edu.in' }
    ],
    activities: [
      'Microsoft Azure AI & Copilot Build Sprints',
      'Open-Source LLM Fine-tuning & RAG Labs',
      'Annual HackUSTU AI Track Mentorship'
    ]
  },
  {
    id: 'clb-2',
    name: 'USTU Coding & KPMG FinTech Collective',
    shortDescription: 'Full-stack software engineering, competitive coding, and KPMG-aligned tech consulting projects.',
    fullDescription: 'The flagship developer and consulting community at USTU Kaman Campus. Combines algorithmic coding, SaaS product engineering, and enterprise case problem-solving with KPMG in India mentors.',
    category: 'Technology',
    memberCount: 342,
    leadName: 'Aditi Nair (4th Year Data Science & IT)',
    viceLeadName: 'Devansh Joshi (3rd Year CSE)',
    secretaryName: 'Anuj Sharma (3rd Year CSE)',
    createdBy: 'stu-4',
    approvalStatus: 'Approved',
    meetingSchedule: 'Tuesdays & Fridays, 5:30 PM @ KPMG Studio 204',
    membershipState: 'Joined',
    requiresApproval: false,
    members: [
      { id: 'm-21', name: 'Aditi Nair (4th Year Data Science & IT)', role: 'Leader / President', email: 'aditi.nair@ustu.edu.in' },
      { id: 'm-22', name: 'Devansh Joshi (3rd Year CSE)', role: 'Vice Leader', email: 'devansh.j@ustu.edu.in' },
      { id: 'm-23', name: 'Anuj Sharma (3rd Year CSE)', role: 'Core Member', email: 'anuj.sharma@ustu.edu.in' }
    ],
    activities: [
      'Bi-weekly Competitive Coding & System Design',
      'KPMG Digital Transformation Case Sprints',
      'Full-Stack SaaS & Open-Source Guild'
    ]
  },
  {
    id: 'clb-3',
    name: 'Industry 5.0 Robotics & Cyber-Physical Society',
    shortDescription: 'Building autonomous rovers, IoT hardware, custom PCBs, and ROS2 mechatronic systems (60% Practical).',
    fullDescription: 'Operating out of USTU’s SkillTech Robotics & Mechatronics Bay, students build real hardware prototypes from scratch—spanning CAD modeling, embedded firmware, PCB fabrication, and SLAM navigation.',
    category: 'Hardware & Engineering',
    memberCount: 128,
    leadName: 'Karthik Siddharth (3rd Year Cyber & ECE)',
    viceLeadName: 'Kabir Malhotra (2nd Year Mechatronics)',
    secretaryName: 'Priya Patel (3rd Year CSE)',
    createdBy: 'stu-5',
    approvalStatus: 'Approved',
    meetingSchedule: 'Saturdays, 10:00 AM @ SkillTech Robotics Bay',
    membershipState: 'Approval Required',
    requiresApproval: true,
    members: [
      { id: 'm-31', name: 'Karthik Siddharth (3rd Year Cyber & ECE)', role: 'Leader / President', email: 'karthik.s@ustu.edu.in' },
      { id: 'm-32', name: 'Kabir Malhotra (2nd Year Mechatronics)', role: 'Vice Leader', email: 'kabir.m@ustu.edu.in' }
    ],
    activities: [
      'Autonomous Rover & Drone Fleet Development',
      'Embedded IoT & Hardware Security Workshops',
      'National Robocon & Industry 5.0 Showcase'
    ]
  },
  {
    id: 'clb-4',
    name: 'School of Design & Media VFX Studio Club',
    shortDescription: 'UI/UX design, 3D animation, visual effects, cinematography, and storytelling at Literati Café.',
    fullDescription: 'Uniting students from USTU’s School of Design Skills, School of Media & Communication Skills, and Engineering to craft product interfaces, short films, and visual installations.',
    category: 'Arts & Media',
    memberCount: 165,
    leadName: 'Meera Krishnan (3rd Year School of Design)',
    viceLeadName: 'Aarav Sengupta (3rd Year KPMG FinTech Track)',
    secretaryName: 'Sneha Reddy (2nd Year Microsoft AI & ML)',
    createdBy: 'stu-6',
    approvalStatus: 'Approved',
    meetingSchedule: 'Thursdays, 4:30 PM @ Design & VFX Studio',
    membershipState: 'Joined',
    requiresApproval: false,
    members: [
      { id: 'm-41', name: 'Meera Krishnan (3rd Year School of Design)', role: 'Leader / President', email: 'meera.k@ustu.edu.in' },
      { id: 'm-42', name: 'Aarav Sengupta (3rd Year KPMG FinTech Track)', role: 'Vice Leader', email: 'aarav.s@ustu.edu.in' },
      { id: 'm-43', name: 'Anuj Sharma (3rd Year CSE)', role: 'Member', email: 'anuj.sharma@westfield.edu' }
    ],
    activities: [
      'Weekend Photowalks & Critique Circles',
      'Official Event Coverage & Documentary Crew',
      'Annual "Frames of Westfield" Print Exhibition'
    ]
  },
  {
    id: 'clb-5',
    name: 'Entrepreneurship Cell',
    shortDescription: 'Empowering student founders with startup incubation, venture mentorship, product clinics, and micro-grants.',
    fullDescription: 'E-Cell connects ambitious student builders with alumni founders, angel investors, and legal/product advisors to help turn dorm-room prototypes into scalable ventures.',
    category: 'Leadership & Business',
    memberCount: 190,
    leadName: 'Siddharth Mehta (4th Year Mech)',
    viceLeadName: 'Rohan Verma (4th Year CSE)',
    secretaryName: 'Aditi Nair (4th Year IT)',
    createdBy: 'stu-3',
    approvalStatus: 'Approved',
    meetingSchedule: 'Thursdays, 5:00 PM @ Innovation Hub',
    membershipState: 'Open',
    requiresApproval: false,
    members: [
      { id: 'm-51', name: 'Siddharth Mehta (4th Year Mech)', role: 'Leader / President', email: 'siddharth.m@westfield.edu' },
      { id: 'm-52', name: 'Rohan Verma (4th Year CSE)', role: 'Vice Leader', email: 'rohan.verma@westfield.edu' }
    ],
    activities: [
      'Zero-to-One Founder Cohort',
      'Campus Seed Grant Pitch Days',
      'Venture Capital & Product Management Bootcamps'
    ]
  },
  {
    id: 'clb-6',
    name: 'Cultural Committee',
    shortDescription: 'Curating campus concerts, theater productions, acoustic nights, and multicultural heritage festivals.',
    fullDescription: 'The heartbeat of campus life outside the classroom. We organize acoustic evenings, theatre repertory showcases, classical arts recitals, and the annual spring cultural festival.',
    category: 'Cultural',
    memberCount: 276,
    leadName: 'Tanvi Deshmukh (4th Year Architecture)',
    viceLeadName: 'Meera Krishnan (3rd Year Design)',
    secretaryName: 'Aarav Sengupta (3rd Year Economics)',
    createdBy: 'stu-6',
    approvalStatus: 'Approved',
    meetingSchedule: 'Mondays, 5:30 PM @ SAC Room 101',
    membershipState: 'Open',
    requiresApproval: false,
    members: [
      { id: 'm-61', name: 'Tanvi Deshmukh (4th Year Architecture)', role: 'Leader / President', email: 'tanvi.d@westfield.edu' },
      { id: 'm-62', name: 'Meera Krishnan (3rd Year Design)', role: 'Vice Leader', email: 'meera.k@westfield.edu' }
    ],
    activities: [
      'Autumn & Spring Unplugged Music Nights',
      'Street Play & Stage Drama Productions',
      'Festival Logistics & Artist Hospitality'
    ]
  },
  {
    id: 'clb-7',
    name: 'Design & Innovation Club',
    shortDescription: 'Human-centered UI/UX design, design systems, interactive prototyping, and industrial product aesthetics.',
    fullDescription: 'A multidisciplinary collective of interface designers, front-end craftspeople, and industrial thinkers focused on solving real usability challenges across campus and industry.',
    category: 'Arts & Media',
    memberCount: 112,
    leadName: 'Devansh Joshi (3rd Year CSE)',
    viceLeadName: 'Meera Krishnan (3rd Year Design)',
    secretaryName: 'Priya Patel (3rd Year CSE)',
    createdBy: 'stu-7',
    approvalStatus: 'Approved',
    meetingSchedule: 'Wednesdays, 4:30 PM @ Design Studio 104',
    membershipState: 'Approval Required',
    requiresApproval: true,
    members: [
      { id: 'm-71', name: 'Devansh Joshi (3rd Year CSE)', role: 'Leader / President', email: 'devansh.j@westfield.edu' },
      { id: 'm-72', name: 'Meera Krishnan (3rd Year Design)', role: 'Vice Leader', email: 'meera.k@westfield.edu' }
    ],
    activities: [
      'Figma Design System Sprints',
      'Peer Portfolio & Case Study Reviews',
      'Human-Computer Interaction Research Projects'
    ]
  },
  {
    id: 'clb-8',
    name: 'Debate and Literary Society',
    shortDescription: 'Parliamentary debating, policy analysis, creative writing journals, and quizzing tournaments.',
    fullDescription: 'Home to critical thinkers, writers, and debaters. We represent the university at international parliamentary tournaments and publish the semesterly campus literary review.',
    category: 'Cultural',
    memberCount: 94,
    leadName: 'Aarav Sengupta (3rd Year Economics)',
    viceLeadName: 'Sneha Reddy (2nd Year AI & DS)',
    secretaryName: 'Kabir Malhotra (2nd Year Mech)',
    createdBy: 'stu-8',
    approvalStatus: 'Approved',
    meetingSchedule: 'Fridays, 4:45 PM @ Humanities Room 208',
    membershipState: 'Open',
    requiresApproval: false,
    members: [
      { id: 'm-81', name: 'Aarav Sengupta (3rd Year Economics)', role: 'Leader / President', email: 'aarav.s@westfield.edu' },
      { id: 'm-82', name: 'Sneha Reddy (2nd Year AI & DS)', role: 'Vice Leader', email: 'sneha.reddy@westfield.edu' }
    ],
    activities: [
      'British & Asian Parliamentary Practice Debates',
      'The Westfield Chronicle Editorial Board',
      'General & Sci-Tech Quizzing League'
    ]
  },
  {
    id: 'clb-9',
    name: 'Web3 & Cybersecurity Guild',
    shortDescription: 'Exploring zero-knowledge proofs, CTF security competitions, smart contract auditing, and decentralized systems.',
    fullDescription: 'Proposed student club by Anuj Sharma & team to train students for international Capture-The-Flag (CTF) cybersecurity competitions and distributed protocol engineering.',
    category: 'Technology',
    memberCount: 4,
    leadName: 'Anuj Sharma (3rd Year CSE)',
    viceLeadName: 'Priya Patel (3rd Year CSE)',
    secretaryName: 'Devansh Joshi (3rd Year CSE)',
    createdBy: 'usr-student-01',
    createdByName: 'Anuj Sharma',
    approvalStatus: 'Pending Approval',
    meetingSchedule: 'Fridays, 5:00 PM @ InfoSec Lab 104',
    membershipState: 'Joined',
    requiresApproval: false,
    members: [
      { id: 'm-91', name: 'Anuj Sharma (3rd Year CSE)', role: 'Leader / President', email: 'anuj.sharma@westfield.edu' },
      { id: 'm-92', name: 'Priya Patel (3rd Year CSE)', role: 'Vice Leader', email: 'priya.patel@westfield.edu' },
      { id: 'm-93', name: 'Devansh Joshi (3rd Year CSE)', role: 'Secretary', email: 'devansh.j@westfield.edu' },
      { id: 'm-94', name: 'Sneha Reddy (2nd Year AI & DS)', role: 'Founding Member', email: 'sneha.reddy@westfield.edu' }
    ],
    activities: [
      'Weekly HackTheBox & CTF Practice',
      'Cryptography & Protocol Reading Group',
      'Campus Security Bug Bounty Workshops'
    ]
  }
];

export const INITIAL_VOLUNTEER_ROLES = [
  {
    id: 'vol-1',
    title: 'Registration Desk Volunteer',
    eventId: 'evt-2',
    eventTitle: 'Campus Tech Fest 2026 — Nexus',
    date: '2026-11-06',
    time: '08:00 AM – 11:30 AM',
    venue: 'Main Auditorium Foyer',
    requiredCount: 12,
    filledCount: 9,
    status: 'Approved', // 'Open' | 'Applied' | 'Approved' | 'Waitlisted'
    serviceHours: 4,
    responsibilities: 'Verify digital QR passes, distribute delegate kits and NFC badges, and guide external participants to track venues.'
  },
  {
    id: 'vol-2',
    title: 'Technical Support Volunteer',
    eventId: 'evt-1',
    eventTitle: 'AI & Machine Learning Workshop',
    date: '2026-10-29',
    time: '02:00 PM – 05:30 PM',
    venue: 'Turing Lab 302, CS Block',
    requiredCount: 6,
    filledCount: 5,
    status: 'Approved',
    serviceHours: 3.5,
    responsibilities: 'Assist attendees with Docker environment setup, local Jupyter server troubleshooting, and API key provisioning.'
  },
  {
    id: 'vol-3',
    title: 'Stage Management Volunteer',
    eventId: 'evt-2',
    eventTitle: 'Campus Tech Fest 2026 — Nexus',
    date: '2026-11-06',
    time: '01:30 PM – 05:30 PM',
    venue: 'Main Auditorium Stage',
    requiredCount: 8,
    filledCount: 6,
    status: 'Open',
    serviceHours: 4,
    responsibilities: 'Coordinate speaker mic handoffs, presentation timer cues, and lighting transitions with the AV booth.'
  },
  {
    id: 'vol-4',
    title: 'Event Photography Volunteer',
    eventId: 'evt-4',
    eventTitle: 'Robotics Club Exhibition',
    date: '2026-11-09',
    time: '11:00 AM – 02:30 PM',
    venue: 'Mechatronics Atrium, Block D',
    requiredCount: 4,
    filledCount: 3,
    status: 'Open',
    serviceHours: 3.5,
    responsibilities: 'Capture high-resolution action shots of rover demonstrations, team portraits, and short vertical clips for the campus archive.'
  },
  {
    id: 'vol-5',
    title: 'Logistics Coordinator',
    eventId: 'evt-3',
    eventTitle: 'Inter-College Coding Competition',
    date: '2026-11-02',
    time: '09:00 AM – 02:30 PM',
    venue: 'Central Computing Center (Floor 2)',
    requiredCount: 10,
    filledCount: 10,
    status: 'Waitlisted',
    serviceHours: 5.5,
    responsibilities: 'Manage workstation seating charts, proctor contest rules, and coordinate refreshment distribution across lab bays.'
  },
  {
    id: 'vol-6',
    title: 'Guest Assistance Volunteer',
    eventId: 'evt-5',
    eventTitle: 'Entrepreneurship & Startup Meetup',
    date: '2026-11-12',
    time: '04:30 PM – 07:30 PM',
    venue: 'Innovation Hub Seminar Hall',
    requiredCount: 6,
    filledCount: 4,
    status: 'Open',
    serviceHours: 3,
    responsibilities: 'Escort visiting VC panelists and alumni speakers from the Main Gate VIP Lounge to the Innovation Hub green room.'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'tsk-1',
    title: 'Verify lab Docker images & local LLM weights cache on 40 workstations',
    eventTitle: 'AI & Machine Learning Workshop',
    deadline: 'Oct 28, 05:00 PM',
    priority: 'High',
    completed: false
  },
  {
    id: 'tsk-2',
    title: 'Collect printed QR lanyard badges from Student Welfare Office',
    eventTitle: 'Campus Tech Fest 2026 — Nexus',
    deadline: 'Oct 30, 04:00 PM',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'tsk-3',
    title: 'Submit dietary & Wi-Fi guest voucher count for external workshop mentors',
    eventTitle: 'AI & Machine Learning Workshop',
    deadline: 'Oct 29, 11:00 AM',
    priority: 'High',
    completed: false
  },
  {
    id: 'tsk-4',
    title: 'Confirm check-in desk tablet scanners and backup offline roster sheet',
    eventTitle: 'Campus Tech Fest 2026 — Nexus',
    deadline: 'Nov 04, 03:00 PM',
    priority: 'Low',
    completed: false
  },
  {
    id: 'tsk-5',
    title: 'Complete mandatory annual volunteer code-of-conduct acknowledgment',
    eventTitle: 'UniHive Volunteer Operations',
    deadline: 'Oct 24, 06:00 PM',
    priority: 'Medium',
    completed: true
  },
  {
    id: 'tsk-6',
    title: 'Publish starter GitHub repository & dataset link to registered workshop participants',
    eventTitle: 'AI & Machine Learning Workshop',
    deadline: 'Oct 26, 08:00 PM',
    priority: 'High',
    completed: true
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: 'fdb-1',
    referenceId: 'CMP-2026-8419',
    category: 'Campus Facilities',
    subject: 'Additional power outlets needed in Central Library 2nd Floor quiet zone',
    description: 'During evening project hours, nearly half the study tables on the 2nd floor east wing lack working 3-pin sockets. Installing multi-socket power strips along the middle rows would help laptop users tremendously.',
    relatedEvent: '',
    submittedDate: '2026-10-18',
    updatedDate: '2026-10-25',
    status: 'Resolved',
    adminResponse: 'Electrical Maintenance completed installation of 24 surge-protected desk power modules across East Wing tables B1–B12 on Oct 25.'
  },
  {
    id: 'fdb-2',
    referenceId: 'CMP-2026-8602',
    category: 'Event Feedback',
    subject: 'Request for recorded livestreams of overlapping technical tracks',
    description: 'Often two high-interest workshops happen at the same time in different blocks. Having automatic lecture capture or unlisted campus streams would let students catch up on both.',
    relatedEvent: 'Campus Tech Fest 2026 — Nexus',
    submittedDate: '2026-10-22',
    updatedDate: '2026-10-26',
    status: 'In Progress',
    adminResponse: 'Media Club and AV Operations are configuring OBS recording feeds for the Main Auditorium and Turing Lab 302.'
  },
  {
    id: 'fdb-3',
    referenceId: 'CMP-2026-8740',
    category: 'Technical Issue',
    subject: 'Slow eduroam Wi-Fi handoff between CS Block and Mechatronics Atrium',
    description: 'Access point roaming drops active SSH sessions when walking from CS Block corridor to Block D. Suggest checking AP channel overlap on the 5GHz band.',
    relatedEvent: '',
    submittedDate: '2026-10-25',
    updatedDate: '2026-10-26',
    status: 'In Progress',
    adminResponse: 'Assigned to Network Infrastructure Team (Ticket #NET-409). Controller fast-roaming (802.11r) tuning scheduled for this weekend.'
  },
  {
    id: 'fdb-4',
    referenceId: 'CMP-2026-8815',
    category: 'Club Activities',
    subject: 'Unified equipment borrowing portal for DSLR & tripod kits',
    description: 'Currently clubs request media kits via paper forms. A shared reservation slot in UniHive would streamline weekend event shoots.',
    relatedEvent: 'Golden Hour Campus Photography Walk',
    submittedDate: '2026-10-26',
    updatedDate: '2026-10-26',
    status: 'Open',
    adminResponse: 'Under review by the Student Activity Center inventory committee.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-admin-club-1',
    recipientRole: 'admin',
    title: 'New Club Creation Request',
    message: 'Anuj Sharma proposed a new club: "Web3 & Cybersecurity Guild" (Leader: Anuj Sharma, Vice Leader: Priya Patel). Grant permission to publish.',
    time: '10m ago',
    unread: true,
    targetTab: 'admin'
  },
  {
    id: 'notif-admin-evt-1',
    recipientRole: 'admin',
    title: 'Pending Event Proposal',
    message: 'Coding Club submitted "Cloud Native & Kubernetes Bootcamp" for approval.',
    time: '2h ago',
    unread: true,
    targetTab: 'admin'
  },
  {
    id: 'notif-1',
    recipientRole: 'student',
    title: 'Volunteer Shift Approved',
    message: 'Your role as Technical Support Volunteer for AI & Machine Learning Workshop has been confirmed.',
    time: '35m ago',
    unread: true,
    targetTab: 'volunteering'
  },
  {
    id: 'notif-2',
    recipientRole: 'student',
    title: 'Feedback Ticket Updated',
    message: 'Reference CMP-2026-8602 moved to "In Progress" by AV Operations.',
    time: '3h ago',
    unread: true,
    targetTab: 'feedback'
  },
  {
    id: 'notif-3',
    recipientRole: 'student',
    title: 'Event Reminder: AI & ML Workshop',
    message: 'Happening Oct 29 at 02:30 PM in Turing Lab 302. Starter repo is now live.',
    time: 'Yesterday',
    unread: false,
    targetTab: 'events'
  },
  {
    id: 'notif-4',
    recipientRole: 'student',
    title: 'Library 24x7 Hours Activated',
    message: 'Central Library Wing B is now open 24 hours through November.',
    time: '2d ago',
    unread: false,
    targetTab: 'home'
  }
];

export const ADMIN_ANALYTICS_DATA = {
  registrationsTrend: [
    { week: 'Sep W3', registrations: 310, attendance: 285 },
    { week: 'Sep W4', registrations: 440, attendance: 398 },
    { week: 'Oct W1', registrations: 520, attendance: 475 },
    { week: 'Oct W2', registrations: 690, attendance: 640 },
    { week: 'Oct W3', registrations: 840, attendance: 790 },
    { week: 'Oct W4', registrations: 1253, attendance: 1140 }
  ],
  categoryParticipation: [
    { category: 'Technical', count: 640, share: '36%' },
    { category: 'Flagship', count: 448, share: '25%' },
    { category: 'Cultural & Arts', count: 383, share: '21%' },
    { category: 'Exhibition', count: 206, share: '11%' },
    { category: 'Leadership', count: 125, share: '7%' }
  ],
  recentAdminLogs: [
    {
      id: 'log-1',
      action: 'Venue acoustic clearance verified for Main Auditorium',
      actor: 'Facilities Desk',
      time: 'Today, 09:40 AM'
    },
    {
      id: 'log-2',
      action: 'Robotics Society submitted "Clean Energy & Smart Grid Symposium"',
      actor: 'Karthik Siddharth',
      time: 'Yesterday, 06:15 PM'
    },
    {
      id: 'log-3',
      action: 'Coding Club submitted "Cloud Native & Kubernetes Bootcamp"',
      actor: 'Aditi Nair',
      time: 'Yesterday, 03:20 PM'
    },
    {
      id: 'log-4',
      action: 'Resolved facility request CMP-2026-8419 (Library East Wing sockets)',
      actor: 'Electrical Maintenance',
      time: 'Oct 25, 04:50 PM'
    }
  ]
};

export const BRANCHES_LIST = [
  {
    code: 'CSE',
    name: 'Computer Science & Engineering',
    hod: 'Dr. M. S. Deshpande',
    divisions: ['Div A', 'Div B', 'Div C']
  },
  {
    code: 'IT',
    name: 'Information Technology',
    hod: 'Dr. V. Nair',
    divisions: ['Div A', 'Div B']
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    hod: 'Dr. K. Iyer',
    divisions: ['Div A', 'Div B']
  },
  {
    code: 'AIML',
    name: 'Artificial Intelligence & Machine Learning',
    hod: 'Dr. P. Banerjee',
    divisions: ['Div A', 'Div B']
  },
  {
    code: 'MECH',
    name: 'Mechanical & Automation Engineering',
    hod: 'Dr. H. Patil',
    divisions: ['Div A', 'Div B']
  }
];

export const SEMESTER_METADATA = [
  {
    id: 'Sem 1',
    label: 'Semester 1 (FE Odd)',
    yearLabel: '1st Year · B.Tech',
    session: 'Jul 2026 – Dec 2026',
    workingWeeks: 18,
    instructionDays: 90,
    totalCredits: 20,
    currentWeek: 'Week 13 of 18',
    midSemWindow: 'Oct 12 – Oct 17, 2026',
    vivaWindow: 'Nov 23 – Nov 28, 2026',
    endSemWindow: 'Dec 03 – Dec 16, 2026',
    resultDate: 'Jan 05, 2027'
  },
  {
    id: 'Sem 2',
    label: 'Semester 2 (FE Even)',
    yearLabel: '1st Year · B.Tech',
    session: 'Jan 2027 – May 2027',
    workingWeeks: 18,
    instructionDays: 88,
    totalCredits: 21,
    currentWeek: 'Upcoming Cycle',
    midSemWindow: 'Mar 08 – Mar 13, 2027',
    vivaWindow: 'Apr 26 – May 02, 2027',
    endSemWindow: 'May 06 – May 19, 2027',
    resultDate: 'Jun 08, 2027'
  },
  {
    id: 'Sem 3',
    label: 'Semester 3 (SE Odd)',
    yearLabel: '2nd Year · B.Tech',
    session: 'Jul 2026 – Dec 2026',
    workingWeeks: 18,
    instructionDays: 92,
    totalCredits: 22,
    currentWeek: 'Week 13 of 18',
    midSemWindow: 'Oct 12 – Oct 17, 2026',
    vivaWindow: 'Nov 20 – Nov 26, 2026',
    endSemWindow: 'Dec 01 – Dec 14, 2026',
    resultDate: 'Jan 04, 2027'
  },
  {
    id: 'Sem 4',
    label: 'Semester 4 (SE Even)',
    yearLabel: '2nd Year · B.Tech',
    session: 'Jan 2027 – May 2027',
    workingWeeks: 18,
    instructionDays: 90,
    totalCredits: 22,
    currentWeek: 'Upcoming Cycle',
    midSemWindow: 'Mar 08 – Mar 13, 2027',
    vivaWindow: 'Apr 24 – Apr 30, 2027',
    endSemWindow: 'May 05 – May 18, 2027',
    resultDate: 'Jun 05, 2027'
  },
  {
    id: 'Sem 5',
    label: 'Semester 5 (TE Odd)',
    yearLabel: '3rd Year · B.Tech (Active)',
    session: 'Jul 2026 – Dec 2026',
    workingWeeks: 18,
    instructionDays: 94,
    totalCredits: 23,
    currentWeek: 'Week 13 of 18 (Mid-Term Phase)',
    midSemWindow: 'Oct 12 – Oct 17, 2026',
    vivaWindow: 'Nov 18 – Nov 25, 2026',
    endSemWindow: 'Dec 01 – Dec 15, 2026',
    resultDate: 'Jan 04, 2027'
  },
  {
    id: 'Sem 6',
    label: 'Semester 6 (TE Even)',
    yearLabel: '3rd Year · B.Tech',
    session: 'Jan 2027 – May 2027',
    workingWeeks: 18,
    instructionDays: 91,
    totalCredits: 23,
    currentWeek: 'Upcoming Cycle',
    midSemWindow: 'Mar 08 – Mar 13, 2027',
    vivaWindow: 'Apr 22 – Apr 29, 2027',
    endSemWindow: 'May 04 – May 18, 2027',
    resultDate: 'Jun 04, 2027'
  },
  {
    id: 'Sem 7',
    label: 'Semester 7 (BE Odd)',
    yearLabel: '4th Year · B.Tech',
    session: 'Jul 2026 – Dec 2026',
    workingWeeks: 18,
    instructionDays: 90,
    totalCredits: 20,
    currentWeek: 'Week 13 of 18',
    midSemWindow: 'Oct 12 – Oct 16, 2026',
    vivaWindow: 'Nov 16 – Nov 22, 2026',
    endSemWindow: 'Nov 28 – Dec 10, 2026',
    resultDate: 'Dec 28, 2026'
  },
  {
    id: 'Sem 8',
    label: 'Semester 8 (BE Even)',
    yearLabel: '4th Year · B.Tech (Capstone & Internship)',
    session: 'Jan 2027 – May 2027',
    workingWeeks: 18,
    instructionDays: 85,
    totalCredits: 18,
    currentWeek: 'Upcoming Cycle',
    midSemWindow: 'Mar 01 – Mar 05, 2027',
    vivaWindow: 'Apr 15 – Apr 22, 2027',
    endSemWindow: 'Apr 26 – May 06, 2027',
    resultDate: 'May 24, 2027'
  }
];

export const BRANCH_SEMESTER_CURRICULUM = {
  CSE: {
    'Sem 5': [
      {
        code: 'CS501',
        title: 'Operating Systems & Kernel Design',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. S. Kulkarni',
        midSemDate: '2026-10-12',
        endSemDate: '2026-12-01',
        vivaDate: '2026-11-19',
        room: 'LH-201 / Turing Lab 302'
      },
      {
        code: 'CS502',
        title: 'Database Management Systems (DBMS)',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. R. Deshmukh',
        midSemDate: '2026-10-13',
        endSemDate: '2026-12-03',
        vivaDate: '2026-11-21',
        room: 'LH-201 / Data Systems Lab'
      },
      {
        code: 'CS503',
        title: 'Computer Networks & TCP/IP',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. A. Verma',
        midSemDate: '2026-10-14',
        endSemDate: '2026-12-05',
        vivaDate: '2026-11-23',
        room: 'LH-201 / Cisco NetLab 104'
      },
      {
        code: 'CS504',
        title: 'Theory of Computation & Compilers',
        type: 'Theory',
        credits: 4,
        faculty: 'Dr. M. Chatterjee',
        midSemDate: '2026-10-15',
        endSemDate: '2026-12-08',
        vivaDate: 'Internal Assessment',
        room: 'LH-201'
      },
      {
        code: 'CS505E',
        title: 'Microsoft Track: Applied AI, ML & Azure Cloud Systems',
        type: 'Microsoft Partner Lab',
        credits: 3,
        faculty: 'Microsoft Professor of Practice',
        midSemDate: '2026-10-16',
        endSemDate: '2026-12-11',
        vivaDate: '2026-11-24',
        room: 'Microsoft AI Co-Innovation Lab 302'
      },
      {
        code: 'CS506P',
        title: 'KPMG Consulting & Industry 5.0 Practical Capstone (60% Practical)',
        type: 'Project + OJT',
        credits: 4,
        faculty: 'KPMG Mentor Panel & PoP Guides',
        midSemDate: '2026-10-21',
        endSemDate: '2026-11-25',
        vivaDate: '2026-11-25',
        room: 'KPMG Studio 204 & Innovation Bay'
      }
    ]
  },
  IT: {
    'Sem 5': [
      {
        code: 'IT501',
        title: 'Enterprise Web Engineering & Microservices',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. M. Joshi',
        midSemDate: '2026-10-12',
        endSemDate: '2026-12-01',
        vivaDate: '2026-11-18',
        room: 'LH-105 / Web Studio 204'
      },
      {
        code: 'IT502',
        title: 'Cloud Infrastructure & DevOps Automation',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. V. Nair',
        midSemDate: '2026-10-13',
        endSemDate: '2026-12-03',
        vivaDate: '2026-11-20',
        room: 'Cloud Lab 204'
      },
      {
        code: 'IT503',
        title: 'Information Security & Cryptography',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. K. Bansal',
        midSemDate: '2026-10-14',
        endSemDate: '2026-12-05',
        vivaDate: '2026-11-22',
        room: 'CyberSec Lab 305'
      },
      {
        code: 'IT504',
        title: 'Data Warehousing & Business Intelligence',
        type: 'Theory',
        credits: 4,
        faculty: 'Dr. S. Gokhale',
        midSemDate: '2026-10-15',
        endSemDate: '2026-12-08',
        vivaDate: 'Internal Assessment',
        room: 'LH-105'
      },
      {
        code: 'IT505P',
        title: 'Software Architecture & DevSecOps Project',
        type: 'Project',
        credits: 4,
        faculty: 'IT Project Committee',
        midSemDate: '2026-10-22',
        endSemDate: '2026-11-24',
        vivaDate: '2026-11-24',
        room: 'IT Seminar Hall'
      }
    ]
  },
  ECE: {
    'Sem 5': [
      {
        code: 'EC501',
        title: 'Digital Signal Processing (DSP) & Filters',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. K. Iyer',
        midSemDate: '2026-10-12',
        endSemDate: '2026-12-01',
        vivaDate: '2026-11-19',
        room: 'ECE-301 / Texas Instruments Lab'
      },
      {
        code: 'EC502',
        title: 'CMOS VLSI Design & Verilog HDL',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. T. Subramanian',
        midSemDate: '2026-10-13',
        endSemDate: '2026-12-03',
        vivaDate: '2026-11-20',
        room: 'VLSI Cadence Lab 208'
      },
      {
        code: 'EC503',
        title: 'Embedded RTOS & ARM Cortex Controllers',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. P. Menon',
        midSemDate: '2026-10-14',
        endSemDate: '2026-12-05',
        vivaDate: '2026-11-22',
        room: 'Embedded & IoT Bay 102'
      },
      {
        code: 'EC504',
        title: 'Electromagnetic Waves & Antenna Propagation',
        type: 'Theory',
        credits: 4,
        faculty: 'Prof. R. Kulkarni',
        midSemDate: '2026-10-15',
        endSemDate: '2026-12-08',
        vivaDate: 'Internal Assessment',
        room: 'ECE-301'
      },
      {
        code: 'EC505P',
        title: 'Hardware PCB & Embedded Systems Prototype',
        type: 'Project',
        credits: 4,
        faculty: 'ECE Hardware Panel',
        midSemDate: '2026-10-23',
        endSemDate: '2026-11-25',
        vivaDate: '2026-11-25',
        room: 'Robotics & Hardware Arena'
      }
    ]
  },
  AIML: {
    'Sem 5': [
      {
        code: 'AI501',
        title: 'Deep Learning & Neural Architectures',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. P. Banerjee',
        midSemDate: '2026-10-12',
        endSemDate: '2026-12-01',
        vivaDate: '2026-11-18',
        room: 'AI Compute Lab 401'
      },
      {
        code: 'AI502',
        title: 'Natural Language Processing & Transformers',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. S. Sengupta',
        midSemDate: '2026-10-13',
        endSemDate: '2026-12-03',
        vivaDate: '2026-11-20',
        room: 'AI Compute Lab 402'
      },
      {
        code: 'AI503',
        title: 'Computer Vision & Image Understanding',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. A. Kapoor',
        midSemDate: '2026-10-14',
        endSemDate: '2026-12-05',
        vivaDate: '2026-11-22',
        room: 'Vision & Robotics Lab'
      },
      {
        code: 'AI504',
        title: 'Probabilistic Graphical Models & Bayesian ML',
        type: 'Theory',
        credits: 4,
        faculty: 'Prof. R. Krishnan',
        midSemDate: '2026-10-15',
        endSemDate: '2026-12-08',
        vivaDate: 'Internal Assessment',
        room: 'LH-402'
      },
      {
        code: 'AI505P',
        title: 'Applied Generative AI & LLM Capstone',
        type: 'Project',
        credits: 4,
        faculty: 'AIML Research Cluster',
        midSemDate: '2026-10-21',
        endSemDate: '2026-11-24',
        vivaDate: '2026-11-24',
        room: 'NVIDIA AI Center'
      }
    ]
  },
  MECH: {
    'Sem 5': [
      {
        code: 'ME501',
        title: 'Heat & Mass Transfer',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Dr. H. Patil',
        midSemDate: '2026-10-12',
        endSemDate: '2026-12-01',
        vivaDate: '2026-11-19',
        room: 'Thermal Engg Lab'
      },
      {
        code: 'ME502',
        title: 'Design of Machine Elements',
        type: 'Theory + Drawing',
        credits: 4,
        faculty: 'Prof. G. Deshpande',
        midSemDate: '2026-10-13',
        endSemDate: '2026-12-03',
        vivaDate: '2026-11-21',
        room: 'CAD/CAM Studio 101'
      },
      {
        code: 'ME503',
        title: 'Mechatronics & Industrial Automation',
        type: 'Theory + Lab',
        credits: 4,
        faculty: 'Prof. V. Shinde',
        midSemDate: '2026-10-14',
        endSemDate: '2026-12-05',
        vivaDate: '2026-11-23',
        room: 'Pneumatics & PLC Lab'
      },
      {
        code: 'ME504',
        title: 'Finite Element Analysis (FEA)',
        type: 'Theory + Simulation',
        credits: 4,
        faculty: 'Dr. S. Sawant',
        midSemDate: '2026-10-15',
        endSemDate: '2026-12-08',
        vivaDate: '2026-11-24',
        room: 'ANSYS Simulation Center'
      },
      {
        code: 'ME505P',
        title: 'CAD/CAM & EV Drivetrain Prototype',
        type: 'Project',
        credits: 4,
        faculty: 'Mechanical Workshop Panel',
        midSemDate: '2026-10-22',
        endSemDate: '2026-11-25',
        vivaDate: '2026-11-25',
        room: 'Central Mechanical Workshop'
      }
    ]
  }
};

export const INITIAL_SEMESTER_CALENDAR = [
  // JULY 2026 — SEMESTER COMMENCEMENT & REGISTRATION
  {
    id: 'sem-cal-1',
    title: 'Odd Semester Commencement & Academic Orientation',
    description: 'First day of instruction for Semester 1, 3, 5 & 7 across all engineering departments. Timetable and lab batch allocations go live.',
    startDate: '2026-07-15',
    endDate: '2026-07-15',
    monthLabel: 'July 2026',
    weekTag: 'Week 01',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'All Department Lecture Halls',
    coordinator: 'Dean of Academics',
    status: 'Completed'
  },
  {
    id: 'sem-cal-2',
    title: 'Department Elective & Lab Batch Registration Window',
    description: 'Students lock their Program Electives, Open Electives, and Honours/Minor tracks for the semester.',
    startDate: '2026-07-20',
    endDate: '2026-07-25',
    monthLabel: 'July 2026',
    weekTag: 'Week 02',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'UniHive Academic Portal',
    coordinator: 'ERP & Examination Cell',
    status: 'Completed'
  },

  // AUGUST 2026 — PROJECTS, HACKATHONS & IN-SEM 1
  {
    id: 'sem-cal-3',
    title: 'Mini / Major Project Topic & Guide Allotment',
    description: 'Finalization of 3-4 member project groups and allotment of department faculty mentors.',
    startDate: '2026-08-05',
    endDate: '2026-08-08',
    monthLabel: 'August 2026',
    weekTag: 'Week 04',
    category: 'Project',
    branch: 'ALL',
    semester: 'Sem 5',
    venue: 'Respective Department HOD Cabins',
    coordinator: 'Project Coordinators',
    status: 'Completed'
  },
  {
    id: 'sem-cal-4',
    title: 'Independence Day — National Holiday & Campus Parade',
    description: 'Institute remains closed for lectures. Flag hoisting ceremony at Central Lawn at 08:30 AM.',
    startDate: '2026-08-15',
    endDate: '2026-08-15',
    monthLabel: 'August 2026',
    weekTag: 'Week 05',
    category: 'Holiday',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Central Campus Quad',
    coordinator: 'Student Council & NCC',
    status: 'Completed'
  },
  {
    id: 'sem-cal-5',
    title: 'In-Semester Assessment 1 (ISE-1 / Unit Test 1)',
    description: '20-mark internal assessment covering Modules 1 & 2 across all core branch subjects.',
    startDate: '2026-08-24',
    endDate: '2026-08-28',
    monthLabel: 'August 2026',
    weekTag: 'Week 07',
    category: 'Exam',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Department Exam Halls',
    coordinator: 'Exam Cell',
    status: 'Completed'
  },

  // SEPTEMBER 2026 — ATTENDANCE REVIEW 1 & SYNOPSIS
  {
    id: 'sem-cal-6',
    title: 'First Attendance Review & Provisional Defaulter List',
    description: 'Mandatory 75% attendance audit for Weeks 1–8. Counselling sessions for students below threshold.',
    startDate: '2026-09-07',
    endDate: '2026-09-09',
    monthLabel: 'September 2026',
    weekTag: 'Week 09',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Department Notice Boards & Classroom Hub',
    coordinator: 'Class Teachers & HODs',
    status: 'Completed'
  },
  {
    id: 'sem-cal-7',
    title: 'CSE & AIML Project Synopsis & System Architecture Review',
    description: 'Stage-1 presentation of problem statement, dataset pipeline, ER diagrams, and system architecture.',
    startDate: '2026-09-18',
    endDate: '2026-09-19',
    monthLabel: 'September 2026',
    weekTag: 'Week 10',
    category: 'Project',
    branch: 'CSE',
    semester: 'Sem 5',
    venue: 'Turing Lab 302 & CSE Seminar Hall',
    coordinator: 'Prof. S. Kulkarni & Panel',
    status: 'Completed'
  },
  {
    id: 'sem-cal-8',
    title: 'ECE & MECH Hardware BOM & CAD Design Review',
    description: 'Verification of Bill of Materials, PCB schematics, and 3D CAD assemblies for semester projects.',
    startDate: '2026-09-19',
    endDate: '2026-09-20',
    monthLabel: 'September 2026',
    weekTag: 'Week 10',
    category: 'Project',
    branch: 'ECE',
    semester: 'Sem 5',
    venue: 'VLSI Lab & CAD Studio',
    coordinator: 'Dr. K. Iyer',
    status: 'Completed'
  },

  // OCTOBER 2026 — MID-SEM EXAMS, PROJECT DEMOS & WORKSHOPS (CURRENT MONTH)
  {
    id: 'sem-cal-9',
    title: 'Mahatma Gandhi Jayanti — National Holiday',
    description: 'Academic holiday across all departments and administrative offices.',
    startDate: '2026-10-02',
    endDate: '2026-10-02',
    monthLabel: 'October 2026',
    weekTag: 'Week 11',
    category: 'Holiday',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Campus-Wide',
    coordinator: 'Registrar Office',
    status: 'Completed'
  },
  {
    id: 'sem-cal-10',
    title: 'Mid-Semester Theory Examinations (MSE — 30 Marks)',
    description: 'Centralized mid-term written examinations covering Modules 1, 2, and 3 for all branches.',
    startDate: '2026-10-12',
    endDate: '2026-10-17',
    monthLabel: 'October 2026',
    weekTag: 'Week 12',
    category: 'Exam',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Examination Block A & B',
    coordinator: 'Controller of Examinations',
    status: 'Completed'
  },
  {
    id: 'sem-cal-11',
    title: 'Mid-Semester Answer Script Showing & Marks Verification',
    description: 'Students review evaluated mid-sem answer sheets with subject faculty and verify internal marks.',
    startDate: '2026-10-26',
    endDate: '2026-10-28',
    monthLabel: 'October 2026',
    weekTag: 'Week 13',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Respective Division Classrooms',
    coordinator: 'Subject Faculty',
    status: 'Ongoing'
  },
  {
    id: 'sem-cal-12',
    title: 'CSE Lab Assessment: Operating Systems Shell & Kernel Module',
    description: 'Practical lab execution test on process scheduling, semaphores, and custom Linux shell scripting.',
    startDate: '2026-10-29',
    endDate: '2026-10-30',
    monthLabel: 'October 2026',
    weekTag: 'Week 13',
    category: 'Lab & Viva',
    branch: 'CSE',
    semester: 'Sem 5',
    venue: 'Turing Lab 302',
    coordinator: 'Prof. S. Kulkarni',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-13',
    title: 'IT Lab Assessment: Docker & Kubernetes Microservice Deployment',
    description: 'Hands-on continuous deployment evaluation for IT Sem 5 Divisions A & B.',
    startDate: '2026-10-30',
    endDate: '2026-10-31',
    monthLabel: 'October 2026',
    weekTag: 'Week 13',
    category: 'Lab & Viva',
    branch: 'IT',
    semester: 'Sem 5',
    venue: 'Cloud Lab 204',
    coordinator: 'Dr. V. Nair',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-14',
    title: 'AIML Mid-Term Model Checkpoint & Dataset Benchmark Viva',
    description: 'Live evaluation of training loss curves, validation metrics, and model inference latency.',
    startDate: '2026-10-30',
    endDate: '2026-10-31',
    monthLabel: 'October 2026',
    weekTag: 'Week 13',
    category: 'Lab & Viva',
    branch: 'AIML',
    semester: 'Sem 5',
    venue: 'AI Compute Lab 401',
    coordinator: 'Dr. P. Banerjee',
    status: 'Upcoming'
  },

  // NOVEMBER 2026 — FESTS, DIWALI BREAK, LAB VIVAS & TERM WORK
  {
    id: 'sem-cal-15',
    title: 'Tech Fest 2026 — Nexus of Innovation (OD Approved)',
    description: 'Annual 2-day flagship technical symposium, hackathon finals, and robotics arena. Official On-Duty attendance granted.',
    startDate: '2026-11-02',
    endDate: '2026-11-03',
    monthLabel: 'November 2026',
    weekTag: 'Week 14',
    category: 'Co-Curricular',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Main Auditorium & Innovation Lawn',
    coordinator: 'Student Council & Technical Board',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-16',
    title: 'Diwali & Mid-Semester Festival Break',
    description: 'Academic recess for Diwali celebrations. Hostels and 24x7 Central Library reading wing remain accessible.',
    startDate: '2026-11-07',
    endDate: '2026-11-11',
    monthLabel: 'November 2026',
    weekTag: 'Week 15',
    category: 'Holiday',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Campus-Wide Holiday',
    coordinator: 'Office of the Dean',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-17',
    title: 'In-Semester Assessment 2 (ISE-2 / Modules 4 & 5)',
    description: 'Second internal test and quiz assessment before term-work certification.',
    startDate: '2026-11-13',
    endDate: '2026-11-16',
    monthLabel: 'November 2026',
    weekTag: 'Week 16',
    category: 'Exam',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Department Lecture Halls',
    coordinator: 'Department Exam Coordinators',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-18',
    title: 'Final Attendance Defaulter List & Term-Work Journal Submission',
    description: 'Certification of lab journals, tutorial files, and final attendance clearance for End-Sem Hall Tickets.',
    startDate: '2026-11-17',
    endDate: '2026-11-18',
    monthLabel: 'November 2026',
    weekTag: 'Week 16',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Department Labs',
    coordinator: 'HOD & Lab In-Charges',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-19',
    title: 'CSE External Practical & Oral Viva Voce (OS, DBMS, CN)',
    description: 'University-appointed external examiners conduct practical exams and oral viva for CSE Sem 5 batches B1, B2, B3.',
    startDate: '2026-11-19',
    endDate: '2026-11-23',
    monthLabel: 'November 2026',
    weekTag: 'Week 17',
    category: 'Lab & Viva',
    branch: 'CSE',
    semester: 'Sem 5',
    venue: 'Turing Lab 302 & Cisco NetLab 104',
    coordinator: 'CSE Exam Cell',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-20',
    title: 'ECE External Practical Viva (DSP, CMOS VLSI & Embedded RTOS)',
    description: 'Hardware interfacing test and external viva voce on Verilog FPGA synthesis and ARM Cortex boards.',
    startDate: '2026-11-19',
    endDate: '2026-11-22',
    monthLabel: 'November 2026',
    weekTag: 'Week 17',
    category: 'Lab & Viva',
    branch: 'ECE',
    semester: 'Sem 5',
    venue: 'VLSI Lab 208 & Embedded Bay 102',
    coordinator: 'Dr. K. Iyer',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-21',
    title: 'MECH External Lab Viva (Heat Transfer, CAD/CAM & PLC Automation)',
    description: 'Thermal rig experimentation and ANSYS/SolidWorks practical examination.',
    startDate: '2026-11-19',
    endDate: '2026-11-24',
    monthLabel: 'November 2026',
    weekTag: 'Week 17',
    category: 'Lab & Viva',
    branch: 'MECH',
    semester: 'Sem 5',
    venue: 'Thermal Lab & CAD Studio 101',
    coordinator: 'Dr. H. Patil',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-22',
    title: 'Final Mini-Project / Capstone Live Demonstration & Viva',
    description: 'Working prototype demonstration, GitHub repository audit, and project report defense before external panel.',
    startDate: '2026-11-24',
    endDate: '2026-11-26',
    monthLabel: 'November 2026',
    weekTag: 'Week 17',
    category: 'Project',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Department Project Labs',
    coordinator: 'External Project Panel',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-23',
    title: 'Last Day of Instruction & End-Sem Hall Ticket Issue',
    description: 'Conclusion of teaching weeks and digital release of End-Semester Exam Admit Cards.',
    startDate: '2026-11-27',
    endDate: '2026-11-28',
    monthLabel: 'November 2026',
    weekTag: 'Week 17',
    category: 'Academic',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'UniHive Student Portal',
    coordinator: 'Dean of Academics',
    status: 'Upcoming'
  },

  // DECEMBER 2026 — END-SEMESTER THEORY EXAMINATIONS & WINTER BREAK
  {
    id: 'sem-cal-24',
    title: 'End-Semester Theory Examinations (ESE — 60 Marks)',
    description: 'Final 3-hour university theory examinations across all core and elective courses.',
    startDate: '2026-12-01',
    endDate: '2026-12-15',
    monthLabel: 'December 2026',
    weekTag: 'Week 18',
    category: 'Exam',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Central Examination Complex',
    coordinator: 'Controller of Examinations',
    status: 'Upcoming'
  },
  {
    id: 'sem-cal-25',
    title: 'Winter Vacation & Industrial Internship Window',
    description: 'Inter-semester winter break and optional 3-week winter industrial training credit program.',
    startDate: '2026-12-16',
    endDate: '2027-01-03',
    monthLabel: 'December 2026',
    weekTag: 'Post-Sem',
    category: 'Holiday',
    branch: 'ALL',
    semester: 'ALL',
    venue: 'Off-Campus / Partner Industries',
    coordinator: 'Training & Placement Cell',
    status: 'Upcoming'
  }
];

