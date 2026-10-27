import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  GraduationCap,
  FileCheck,
  Award,
  Layers,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Building2,
  RotateCcw,
  CalendarDays,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { SearchInput } from '../components/ui/SearchInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import {
  BRANCHES_LIST,
  DIVISION_TIMETABLE_DATA,
  SEMESTER_METADATA,
  BRANCH_SEMESTER_CURRICULUM,
  INITIAL_SEMESTER_CALENDAR,
} from '../data/mockData';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MONTH_SHORT = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

const ODD_SEM_MONTHS = [
  { key: '2026-07', label: 'July 2026', short: 'Jul 2026' },
  { key: '2026-08', label: 'August 2026', short: 'Aug 2026' },
  { key: '2026-09', label: 'September 2026', short: 'Sep 2026' },
  { key: '2026-10', label: 'October 2026', short: 'Oct 2026' },
  { key: '2026-11', label: 'November 2026', short: 'Nov 2026' },
  { key: '2026-12', label: 'December 2026', short: 'Dec 2026' },
];

const EVEN_SEM_MONTHS = [
  { key: '2027-01', label: 'January 2027', short: 'Jan 2027' },
  { key: '2027-02', label: 'February 2027', short: 'Feb 2027' },
  { key: '2027-03', label: 'March 2027', short: 'Mar 2027' },
  { key: '2027-04', label: 'April 2027', short: 'Apr 2027' },
  { key: '2027-05', label: 'May 2027', short: 'May 2027' },
];

// Weekly recurring lecture templates per branch so every weekday on the calendar is dynamically populated
const WEEKLY_BRANCH_LECTURES = {
  CSE: [
    { day: 1, time: '09:30 AM - 10:30 AM', subject: 'Operating Systems (CS501)', type: 'Lecture', room: 'LH-201', faculty: 'Prof. S. Kulkarni' },
    { day: 1, time: '11:00 AM - 01:00 PM', subject: 'DBMS & SQL Lab (CS502)', type: 'Lab Session', room: 'Data Systems Lab', faculty: 'Dr. R. Deshmukh' },
    { day: 2, time: '10:00 AM - 11:00 AM', subject: 'Computer Networks (CS503)', type: 'Lecture', room: 'LH-201', faculty: 'Prof. A. Verma' },
    { day: 2, time: '02:00 PM - 04:00 PM', subject: 'Linux Kernel & OS Lab (CS501)', type: 'Lab Session', room: 'Turing Lab 302', faculty: 'Prof. S. Kulkarni' },
    { day: 3, time: '09:30 AM - 10:30 AM', subject: 'Theory of Computation (CS504)', type: 'Lecture', room: 'LH-201', faculty: 'Dr. M. Chatterjee' },
    { day: 3, time: '11:15 AM - 12:15 PM', subject: 'Distributed Cloud Systems (CS505E)', type: 'Elective', room: 'Cloud Lab 204', faculty: 'Prof. N. Joshi' },
    { day: 4, time: '10:00 AM - 11:00 AM', subject: 'Database Management Systems (CS502)', type: 'Lecture', room: 'LH-201', faculty: 'Dr. R. Deshmukh' },
    { day: 4, time: '02:30 PM - 04:30 PM', subject: 'Computer Networks & TCP/IP Lab', type: 'Lab Session', room: 'Cisco NetLab 104', faculty: 'Prof. A. Verma' },
    { day: 5, time: '09:30 AM - 10:30 AM', subject: 'Compiler Design & Automata (CS504)', type: 'Lecture', room: 'LH-201', faculty: 'Dr. M. Chatterjee' },
    { day: 5, time: '02:00 PM - 04:00 PM', subject: 'Mini-Project II Mentorship & Sprint', type: 'Project Lab', room: 'CSE Innovation Bay', faculty: 'Project Guide Panel' },
  ],
  IT: [
    { day: 1, time: '09:30 AM - 10:30 AM', subject: 'Enterprise Web Engineering (IT501)', type: 'Lecture', room: 'LH-105', faculty: 'Prof. M. Joshi' },
    { day: 2, time: '11:00 AM - 01:00 PM', subject: 'Cloud & DevOps Kubernetes Lab (IT502)', type: 'Lab Session', room: 'Cloud Lab 204', faculty: 'Dr. V. Nair' },
    { day: 3, time: '10:00 AM - 11:00 AM', subject: 'Information Security & Crypto (IT503)', type: 'Lecture', room: 'LH-105', faculty: 'Prof. K. Bansal' },
    { day: 4, time: '02:00 PM - 04:00 PM', subject: 'Microservices & Full-Stack Studio', type: 'Lab Session', room: 'Web Studio 204', faculty: 'Prof. M. Joshi' },
    { day: 5, time: '10:00 AM - 11:00 AM', subject: 'Data Warehousing & BI (IT504)', type: 'Lecture', room: 'LH-105', faculty: 'Dr. S. Gokhale' },
  ],
  ECE: [
    { day: 1, time: '09:30 AM - 10:30 AM', subject: 'Digital Signal Processing (EC501)', type: 'Lecture', room: 'ECE-301', faculty: 'Dr. K. Iyer' },
    { day: 2, time: '02:00 PM - 04:00 PM', subject: 'CMOS VLSI & Verilog HDL Lab (EC502)', type: 'Lab Session', room: 'VLSI Cadence Lab 208', faculty: 'Prof. T. Subramanian' },
    { day: 3, time: '10:00 AM - 11:00 AM', subject: 'Embedded RTOS & ARM Cortex (EC503)', type: 'Lecture', room: 'ECE-301', faculty: 'Dr. P. Menon' },
    { day: 4, time: '11:00 AM - 01:00 PM', subject: 'Embedded IoT & Microcontroller Lab', type: 'Lab Session', room: 'Embedded Bay 102', faculty: 'Dr. P. Menon' },
    { day: 5, time: '09:30 AM - 10:30 AM', subject: 'Electromagnetic Waves & Antennas (EC504)', type: 'Lecture', room: 'ECE-301', faculty: 'Prof. R. Kulkarni' },
  ],
  AIML: [
    { day: 1, time: '09:30 AM - 10:30 AM', subject: 'Deep Learning Architectures (AI501)', type: 'Lecture', room: 'LH-402', faculty: 'Dr. P. Banerjee' },
    { day: 2, time: '02:00 PM - 04:00 PM', subject: 'PyTorch & Transformer NLP Lab (AI502)', type: 'Lab Session', room: 'AI Compute Lab 401', faculty: 'Prof. S. Sengupta' },
    { day: 3, time: '10:00 AM - 11:00 AM', subject: 'Computer Vision & Perception (AI503)', type: 'Lecture', room: 'LH-402', faculty: 'Dr. A. Kapoor' },
    { day: 4, time: '11:00 AM - 01:00 PM', subject: 'Computer Vision & GPU Lab', type: 'Lab Session', room: 'Vision & Robotics Lab', faculty: 'Dr. A. Kapoor' },
    { day: 5, time: '10:00 AM - 11:00 AM', subject: 'Probabilistic Graphical Models (AI504)', type: 'Lecture', room: 'LH-402', faculty: 'Prof. R. Krishnan' },
  ],
  MECH: [
    { day: 1, time: '09:30 AM - 10:30 AM', subject: 'Heat & Mass Transfer (ME501)', type: 'Lecture', room: 'ME-101', faculty: 'Dr. H. Patil' },
    { day: 2, time: '02:00 PM - 04:00 PM', subject: 'CAD/CAM & SolidWorks Studio (ME502)', type: 'Lab Session', room: 'CAD/CAM Studio 101', faculty: 'Prof. G. Deshpande' },
    { day: 3, time: '10:00 AM - 11:00 AM', subject: 'Mechatronics & PLC Automation (ME503)', type: 'Lecture', room: 'ME-101', faculty: 'Prof. V. Shinde' },
    { day: 4, time: '11:00 AM - 01:00 PM', subject: 'Finite Element Analysis ANSYS Lab (ME504)', type: 'Lab Session', room: 'ANSYS Simulation Center', faculty: 'Dr. S. Sawant' },
    { day: 5, time: '02:00 PM - 04:00 PM', subject: 'Thermal Engineering Lab', type: 'Lab Session', room: 'Thermal Engg Lab', faculty: 'Dr. H. Patil' },
  ],
};

function parseYearMonth(ymStr) {
  const [y, m] = (ymStr || '2026-10').split('-').map(Number);
  return { year: y || 2026, monthIndex: (m || 10) - 1 };
}

function formatYearMonth(year, monthIndex) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
}

function getMonthDetails(ymStr) {
  const { year, monthIndex } = parseYearMonth(ymStr);
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  return {
    year,
    monthIndex,
    firstDay,
    daysInMonth,
    label: `${MONTH_NAMES[monthIndex]} ${year}`,
    short: `${MONTH_SHORT[monthIndex]} ${year}`,
    monthShortOnly: MONTH_SHORT[monthIndex],
  };
}

function formatReadableDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const dateObj = new Date(y, m - 1, d);
  const weekday = WEEKDAYS[dateObj.getDay()];
  return `${weekday}, ${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

// Shifts Odd-Semester (Jul-Dec 2026) dates to Even-Semester (Jan-May 2027) when an even semester is viewed
function adaptDateForSemester(dateStr, isEvenSem) {
  if (!isEvenSem || !dateStr || !dateStr.startsWith('2026-')) return dateStr;
  const monthShiftMap = {
    '2026-07': '2027-01',
    '2026-08': '2027-02',
    '2026-09': '2027-03',
    '2026-10': '2027-03',
    '2026-11': '2027-04',
    '2026-12': '2027-05',
  };
  const prefix = dateStr.slice(0, 7);
  const dayPart = dateStr.slice(8, 10);
  const mappedPrefix = monthShiftMap[prefix] || '2027-04';
  const maxDay = getMonthDetails(mappedPrefix).daysInMonth;
  const safeDay = String(Math.min(Number(dayPart) || 15, maxDay)).padStart(2, '0');
  return `${mappedPrefix}-${safeDay}`;
}

function getCurriculumForBranchAndSem(branchCode, semId) {
  const branchData =
    BRANCH_SEMESTER_CURRICULUM[branchCode] || BRANCH_SEMESTER_CURRICULUM.CSE;
  const semNum = Number(semId.replace('Sem ', '')) || 5;
  const isEvenSem = semNum % 2 === 0;
  const baseCourses = branchData['Sem 5'] || [];

  return baseCourses.map((course, idx) => {
    const adaptedMid = adaptDateForSemester(course.midSemDate, isEvenSem);
    const adaptedEnd = adaptDateForSemester(course.endSemDate, isEvenSem);
    const adaptedViva = course.vivaDate.startsWith('2026-')
      ? adaptDateForSemester(course.vivaDate, isEvenSem)
      : course.vivaDate;

    if (semId === 'Sem 5') return course;

    return {
      ...course,
      code: `${branchCode.slice(0, 2)}${semNum}0${idx + 1}`,
      midSemDate: adaptedMid,
      endSemDate: adaptedEnd,
      vivaDate: adaptedViva,
      title:
        semNum <= 2
          ? [
              'Engineering Calculus & Differential Equations',
              'Applied Physics & Quantum Mechanics',
              `Foundations of ${branchCode} Engineering`,
              'Digital Logic & Microprocessors',
              'System Design & Engineering Graphics',
              `${branchCode} Innovation & Coding Studio`,
            ][idx] || course.title
          : `${course.title} (${semId})`,
    };
  });
}

export function Calendar({
  events,
  volunteerRoles,
  userProfile,
  role = 'student',
  semesterCalendar = INITIAL_SEMESTER_CALENDAR,
  onAddSemesterItem,
  onOpenEventDetails,
}) {
  // Strictly lock to the logged-in student's branch & division
  const studentBranch = userProfile?.branchCode || 'CSE';
  const userDiv = userProfile?.division || 'Div A';

  // Admin can inspect branches, but Student is strictly locked to their own branch
  const [adminBranchFilter, setAdminBranchFilter] = useState(studentBranch);
  const activeBranch = role === 'admin' ? adminBranchFilter : studentBranch;

  // Detect student's default semester from profile (e.g., "3rd Year (Semester 5)" -> "Sem 5")
  const defaultSem = useMemo(() => {
    const match = userProfile?.year?.match(/Semester\s*(\d)/i);
    return match ? `Sem ${match[1]}` : 'Sem 5';
  }, [userProfile?.year]);

  const [selectedSemester, setSelectedSemester] = useState(defaultSem);
  const [viewMode, setViewMode] = useState('semester'); // 'semester' | 'month' | 'agenda'
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('ALL'); // 'ALL' or 'YYYY-MM'
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Month Grid & Interactive Date Picker state
  const [currentMonth, setCurrentMonth] = useState('2026-10');
  const [selectedDate, setSelectedDate] = useState('2026-10-27');
  const [scopeFilter, setScopeFilter] = useState('all'); // 'all' | 'exams-only' | 'classes-only'

  const [selectedShiftModal, setSelectedShiftModal] = useState(null);
  const [selectedMilestoneModal, setSelectedMilestoneModal] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const isEvenSem = useMemo(() => {
    const num = Number(selectedSemester.replace('Sem ', '')) || 5;
    return num % 2 === 0;
  }, [selectedSemester]);

  const semesterMonthsList = isEvenSem ? EVEN_SEM_MONTHS : ODD_SEM_MONTHS;

  // Whenever the user switches between an Odd Semester (2026) and Even Semester (2027), sync the active month & date automatically
  useEffect(() => {
    setSelectedMonthFilter('ALL');
    if (isEvenSem && currentMonth.startsWith('2026-')) {
      setCurrentMonth('2027-03');
      setSelectedDate('2027-03-08');
    } else if (!isEvenSem && currentMonth.startsWith('2027-')) {
      setCurrentMonth('2026-10');
      setSelectedDate('2026-10-27');
    }
  }, [isEvenSem]);

  const [newMilestoneForm, setNewMilestoneForm] = useState({
    title: '',
    description: '',
    startDate: '2026-10-27',
    endDate: '2026-10-27',
    weekTag: 'Week 13',
    category: 'Exam',
    semester: selectedSemester,
    venue: 'Examination Block A',
    coordinator: `${activeBranch} Exam Cell`,
  });

  // Active Semester Metadata
  const activeSemMeta = useMemo(() => {
    return (
      SEMESTER_METADATA.find((s) => s.id === selectedSemester) ||
      SEMESTER_METADATA[4]
    );
  }, [selectedSemester]);

  // Active Branch Metadata (strictly student's branch for students)
  const activeBranchMeta = useMemo(() => {
    return (
      BRANCHES_LIST.find((b) => b.code === activeBranch) || BRANCHES_LIST[0]
    );
  }, [activeBranch]);

  // Active Branch + Semester Curriculum & Exam Schedule
  const activeCurriculum = useMemo(() => {
    return getCurriculumForBranchAndSem(activeBranch, selectedSemester);
  }, [activeBranch, selectedSemester]);

  // Adapt semester milestones to the selected semester & strictly filter to activeBranch + ALL
  const branchSemesterMilestones = useMemo(() => {
    return semesterCalendar
      .filter((item) => {
        // Strictly only items for the student's branch or common ALL-branch academic items
        const matchesBranch =
          item.branch === 'ALL' || item.branch === activeBranch;
        const matchesSem =
          item.semester === 'ALL' || item.semester === selectedSemester;
        return matchesBranch && matchesSem;
      })
      .map((item) => {
        const startDate = adaptDateForSemester(item.startDate, isEvenSem);
        const endDate = adaptDateForSemester(item.endDate, isEvenSem);
        const monthInfo = getMonthDetails(startDate.slice(0, 7));
        return {
          ...item,
          startDate,
          endDate,
          monthKey: startDate.slice(0, 7),
          monthLabel: monthInfo.label,
        };
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [semesterCalendar, activeBranch, selectedSemester, isEvenSem]);

  // Filtered Semester Milestones for Blueprint View (supports Category, Month, and Search filters)
  const filteredSemesterMilestones = useMemo(() => {
    return branchSemesterMilestones.filter((item) => {
      const matchesCategory =
        categoryFilter === 'ALL' || item.category === categoryFilter;
      const matchesMonth =
        selectedMonthFilter === 'ALL' ||
        item.startDate.startsWith(selectedMonthFilter) ||
        item.endDate.startsWith(selectedMonthFilter);
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.venue.toLowerCase().includes(q) ||
        item.weekTag.toLowerCase().includes(q);

      return matchesCategory && matchesMonth && matchesSearch;
    });
  }, [
    branchSemesterMilestones,
    categoryFilter,
    selectedMonthFilter,
    searchQuery,
  ]);

  // Group Semester Milestones by Month for Blueprint View
  const milestonesByMonth = useMemo(() => {
    const groups = [];
    const map = new Map();

    filteredSemesterMilestones.forEach((item) => {
      const mLabel = item.monthLabel || 'Academic Cycle';
      if (!map.has(mLabel)) {
        const groupObj = {
          monthLabel: mLabel,
          monthKey: item.monthKey,
          items: [],
        };
        map.set(mLabel, groupObj);
        groups.push(groupObj);
      }
      map.get(mLabel).items.push(item);
    });

    return groups;
  }, [filteredSemesterMilestones]);

  // Helper: get all activities for any specific YYYY-MM-DD date (including multi-day ranges & recurring division classes)
  const getActivitiesForDate = useMemo(() => {
    const publishedEvents = events.filter(
      (e) => e.approvalStatus === 'Published'
    );
    const approvedShifts = volunteerRoles.filter(
      (r) => r.status === 'Approved'
    );
    const divKey = `${activeBranch}-${userDiv}`;
    const explicitSlots =
      DIVISION_TIMETABLE_DATA[divKey] || DIVISION_TIMETABLE_DATA['CSE-Div A'] || [];
    const weeklyTemplates =
      WEEKLY_BRANCH_LECTURES[activeBranch] || WEEKLY_BRANCH_LECTURES.CSE;

    return (dateStr) => {
      const results = [];

      // 1. Semester Milestones & Exams (matches single day OR any day inside startDate..endDate)
      const matchingMilestones = branchSemesterMilestones.filter(
        (m) => dateStr >= m.startDate && dateStr <= m.endDate
      );
      const isHolidayOnDate = matchingMilestones.some(
        (m) => m.category === 'Holiday'
      );

      matchingMilestones.forEach((m) => {
        results.push({
          id: `sem-${m.id}-${dateStr}`,
          type: 'semester',
          category: m.category,
          title: m.title,
          subtitle: `${m.weekTag} · ${
            m.branch === 'ALL' ? `${activeBranch} & Campus` : `${m.branch} Department`
          }`,
          date: dateStr,
          time:
            m.startDate === m.endDate
              ? 'All Day Milestone'
              : `${m.startDate} → ${m.endDate}`,
          venue: m.venue,
          statusLabel: m.category,
          isMine: true,
          raw: m,
        });
      });

      // 2. Subject-specific Mid-Sem, Lab Viva, or End-Sem exam on this date
      activeCurriculum.forEach((sub) => {
        if (sub.midSemDate === dateStr) {
          results.push({
            id: `sub-mid-${sub.code}-${dateStr}`,
            type: 'exam-paper',
            category: 'Exam',
            title: `Mid-Sem Paper: ${sub.title} (${sub.code})`,
            subtitle: `${activeBranch} ${selectedSemester} · ${sub.faculty}`,
            date: dateStr,
            time: '10:30 AM - 12:00 PM',
            venue: sub.room,
            statusLabel: 'Mid-Sem Paper',
            isMine: true,
            raw: sub,
          });
        }
        if (sub.vivaDate === dateStr) {
          results.push({
            id: `sub-viva-${sub.code}-${dateStr}`,
            type: 'exam-paper',
            category: 'Lab & Viva',
            title: `External Viva: ${sub.title} (${sub.code})`,
            subtitle: `${activeBranch} ${userDiv} · ${sub.faculty}`,
            date: dateStr,
            time: '09:30 AM - 04:00 PM',
            venue: sub.room,
            statusLabel: 'Lab Viva Voce',
            isMine: true,
            raw: sub,
          });
        }
        if (sub.endSemDate === dateStr) {
          results.push({
            id: `sub-end-${sub.code}-${dateStr}`,
            type: 'exam-paper',
            category: 'Exam',
            title: `End-Sem Exam: ${sub.title} (${sub.code})`,
            subtitle: `${activeBranch} ${selectedSemester} · ${sub.credits} Credits`,
            date: dateStr,
            time: '10:00 AM - 01:00 PM',
            venue: 'Examination Block A',
            statusLabel: 'End-Sem Theory',
            isMine: true,
            raw: sub,
          });
        }
      });

      // 3. Campus Events on this date
      publishedEvents
        .filter((e) => e.date === dateStr)
        .forEach((e) => {
          results.push({
            id: `evt-${e.id}`,
            type: 'event',
            category: e.category,
            title: e.title,
            subtitle: `Organized by ${e.organizer}`,
            date: e.date,
            time: e.startTime,
            venue: e.venue,
            statusLabel: e.isRegistered ? 'Registered (OD)' : 'Campus Event',
            isMine: e.isRegistered,
            raw: e,
          });
        });

      // 4. Approved Volunteer Shifts on this date
      approvedShifts
        .filter((r) => r.date === dateStr)
        .forEach((r) => {
          results.push({
            id: `vol-${r.id}`,
            type: 'volunteer',
            category: 'Volunteer Shift',
            title: `Shift: ${r.title}`,
            subtitle: r.eventTitle,
            date: r.date,
            time: r.time,
            venue: r.venue,
            statusLabel: 'Volunteer Shift',
            isMine: true,
            raw: r,
          });
        });

      // 5. Branch & Division Lectures/Labs (Explicit dates + Weekly weekday schedule when not a holiday)
      const explicitForDay = explicitSlots.filter((s) => s.date === dateStr);
      if (explicitForDay.length > 0) {
        explicitForDay.forEach((slot) => {
          results.push({
            id: `cls-exp-${slot.id}`,
            type: 'class',
            category: slot.type,
            title: slot.subject,
            subtitle: `${activeBranch} ${userDiv} · ${slot.faculty}`,
            date: dateStr,
            time: slot.time,
            venue: slot.room,
            statusLabel: `${activeBranch} ${userDiv} ${slot.type}`,
            isMine: true,
            raw: slot,
          });
        });
      } else if (!isHolidayOnDate) {
        const [y, m, d] = dateStr.split('-').map(Number);
        const dayOfWeek = new Date(y, m - 1, d).getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          weeklyTemplates
            .filter((tpl) => tpl.day === dayOfWeek)
            .forEach((tpl, idx) => {
              results.push({
                id: `cls-wk-${dateStr}-${idx}`,
                type: 'class',
                category: tpl.type,
                title: tpl.subject,
                subtitle: `${activeBranch} ${userDiv} · ${tpl.faculty}`,
                date: dateStr,
                time: tpl.time,
                venue: tpl.room,
                statusLabel: `${activeBranch} ${userDiv} ${tpl.type}`,
                isMine: true,
                raw: tpl,
              });
            });
        }
      }

      return results.filter((item) => {
        if (scopeFilter === 'exams-only') {
          return item.type === 'semester' || item.type === 'exam-paper';
        }
        if (scopeFilter === 'classes-only') {
          return item.type === 'class';
        }
        return true;
      });
    };
  }, [
    events,
    volunteerRoles,
    activeBranch,
    userDiv,
    branchSemesterMilestones,
    activeCurriculum,
    selectedSemester,
    scopeFilter,
  ]);

  // Dynamic Month Grid Metadata & Cells
  const monthMeta = useMemo(() => getMonthDetails(currentMonth), [currentMonth]);

  const monthCells = useMemo(() => {
    const blanks = Array.from({ length: monthMeta.firstDay }, (_, i) => ({
      blank: true,
      key: `blank-${i}`,
    }));

    const days = Array.from({ length: monthMeta.daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      const dateStr = `${currentMonth}-${String(dayNum).padStart(2, '0')}`;
      const activities = getActivitiesForDate(dateStr);
      return {
        blank: false,
        dayNum,
        dateStr,
        activities,
        key: dateStr,
      };
    });

    return [...blanks, ...days];
  }, [currentMonth, monthMeta, getActivitiesForDate]);

  // Activities for the currently selected date in Month Grid / Date Picker
  const selectedDateActivities = useMemo(() => {
    return getActivitiesForDate(selectedDate);
  }, [getActivitiesForDate, selectedDate]);

  // Agenda items for the active month (`currentMonth`)
  const monthAgendaDays = useMemo(() => {
    const list = [];
    for (let d = 1; d <= monthMeta.daysInMonth; d++) {
      const dateStr = `${currentMonth}-${String(d).padStart(2, '0')}`;
      const acts = getActivitiesForDate(dateStr);
      if (acts.length > 0) {
        list.push({
          dateStr,
          readableDate: formatReadableDate(dateStr),
          dayNum: String(d).padStart(2, '0'),
          monthShort: monthMeta.monthShortOnly,
          activities: acts,
        });
      }
    }
    return list;
  }, [currentMonth, monthMeta, getActivitiesForDate]);

  // Navigate to Previous or Next Month dynamically
  const handleStepMonth = (delta) => {
    const { year, monthIndex } = parseYearMonth(currentMonth);
    const nextDate = new Date(year, monthIndex + delta, 1);
    const nextYm = formatYearMonth(nextDate.getFullYear(), nextDate.getMonth());
    setCurrentMonth(nextYm);
    setSelectedDate(`${nextYm}-01`);
  };

  // Handle direct date selection from date input or calendar grid
  const handlePickDate = (dateStr) => {
    if (!dateStr) return;
    setSelectedDate(dateStr);
    const ym = dateStr.slice(0, 7);
    if (ym !== currentMonth) {
      setCurrentMonth(ym);
    }
  };

  const handleJumpToToday = () => {
    const todayStr = '2026-10-27';
    setCurrentMonth('2026-10');
    setSelectedDate(todayStr);
    setSelectedMonthFilter('ALL');
  };

  const handleSelectItem = (item) => {
    if (item.type === 'event') {
      onOpenEventDetails(item.raw);
    } else if (item.type === 'volunteer') {
      setSelectedShiftModal(item.raw);
    } else if (item.type === 'semester') {
      setSelectedMilestoneModal(item.raw);
    }
  };

  const handleOpenAddModalForDate = (targetDate = selectedDate) => {
    setNewMilestoneForm({
      title: '',
      description: '',
      startDate: targetDate || '2026-10-27',
      endDate: targetDate || '2026-10-27',
      weekTag: 'Week 13',
      category: 'Exam',
      semester: selectedSemester,
      venue: `${activeBranch} Department Block`,
      coordinator: `${activeBranch} Exam Cell`,
    });
    setIsAddModalOpen(true);
  };

  const handleCreateMilestoneSubmit = (e) => {
    e.preventDefault();
    if (!newMilestoneForm.title.trim()) return;

    const mDetails = getMonthDetails(newMilestoneForm.startDate.slice(0, 7));

    const createdItem = {
      id: `sem-cal-${Date.now()}`,
      title: newMilestoneForm.title.trim(),
      description:
        newMilestoneForm.description.trim() ||
        `Scheduled academic milestone for ${activeBranch} (${newMilestoneForm.semester}).`,
      startDate: newMilestoneForm.startDate,
      endDate: newMilestoneForm.endDate || newMilestoneForm.startDate,
      monthLabel: mDetails.label,
      weekTag: newMilestoneForm.weekTag || 'Academic Week',
      category: newMilestoneForm.category,
      branch: activeBranch, // Locked to the active branch
      semester: newMilestoneForm.semester,
      venue: newMilestoneForm.venue.trim() || `${activeBranch} Complex`,
      coordinator:
        newMilestoneForm.coordinator.trim() || `${activeBranch} Academic Cell`,
      status: 'Upcoming',
    };

    if (onAddSemesterItem) {
      onAddSemesterItem(createdItem);
    }
    handlePickDate(createdItem.startDate);
    setIsAddModalOpen(false);
  };

  const getCategoryBadgeVariant = (cat) => {
    if (cat === 'Exam') return 'danger';
    if (cat === 'Lab & Viva') return 'warning';
    if (cat === 'Project') return 'primary';
    if (cat === 'Co-Curricular') return 'success';
    return 'neutral';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${activeBranch} Branch — Semester Calendar`}
        subtitle={`Personalized academic calendar, exam datesheet, lab vivas, and daily ${activeBranch} ${userDiv} schedule exclusively for ${activeBranchMeta.name}.`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              tabs={[
                { id: 'semester', label: 'Semester Blueprint' },
                { id: 'month', label: 'Interactive Month & Date' },
                { id: 'agenda', label: 'Daily Agenda' },
              ]}
              activeTab={viewMode}
              onChange={setViewMode}
            />
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => handleOpenAddModalForDate(selectedDate)}
            >
              Add Date / Exam
            </Button>
          </div>
        }
      >
        {/* Locked Student Branch Identity + Dynamic Semester & Date Controls */}
        <div className="pt-3 space-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#363636] border-l-4 border-l-[#17AAAA]">
            {/* Left: Locked Student Branch Pill (Admin gets branch selector; Student sees ONLY their own branch) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#17AAAA] text-xs font-bold text-[#EEEEEE]">
                <Building2 className="w-4 h-4 text-[#EEEEEE]" />
                <span>
                  {activeBranchMeta.code} — {activeBranchMeta.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFA42E] text-[#363636] text-[10px] font-bold">
                  {userDiv} · {userProfile?.labBatch || 'Batch A1'}
                </span>
              </div>

              {role === 'admin' && (
                <div className="flex items-center gap-1 ml-1">
                  {BRANCHES_LIST.map((b) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setAdminBranchFilter(b.code)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeBranch === b.code
                          ? 'bg-[#FFA42E] text-[#363636]'
                          : 'bg-[#EEEEEE]/15 text-[#EEEEEE] hover:bg-[#17AAAA]'
                      }`}
                    >
                      {b.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Semester Selector Pills (Sem 1 to Sem 8) */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 sm:flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFA42E] mr-1 flex items-center gap-1 shrink-0">
                <GraduationCap className="w-3.5 h-3.5" />
                Semester:
              </span>
              {SEMESTER_METADATA.map((sem) => {
                const active = selectedSemester === sem.id;
                const isCurrentStudentSem = defaultSem === sem.id;
                return (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => setSelectedSemester(sem.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                      active
                        ? 'bg-[#F63F3A] text-[#EEEEEE]'
                        : 'bg-[#EEEEEE]/15 text-[#EEEEEE] hover:bg-[#17AAAA]'
                    }`}
                  >
                    <span>{sem.id}</span>
                    {isCurrentStudentSem && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          active ? 'bg-[#FFA42E]' : 'bg-[#17AAAA]'
                        }`}
                        title="Your current semester"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Month & Date Navigator Bar (Works across all 3 views!) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 px-3 sm:px-4 py-3 rounded-2xl bg-white border border-[#363636]/20">
            {/* Month Quick Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 sm:flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F63F3A] mr-1 flex items-center gap-1 shrink-0">
                <CalendarDays className="w-3.5 h-3.5" />
                Month:
              </span>
              {viewMode === 'semester' && (
                <button
                  type="button"
                  onClick={() => setSelectedMonthFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    selectedMonthFilter === 'ALL'
                      ? 'bg-[#363636] text-[#EEEEEE]'
                      : 'bg-[#EEEEEE] text-[#363636] hover:bg-[#FFA42E]'
                  }`}
                >
                  Full Semester
                </button>
              )}
              {semesterMonthsList.map((m) => {
                const isActive =
                  viewMode === 'semester'
                    ? selectedMonthFilter === m.key
                    : currentMonth === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      setCurrentMonth(m.key);
                      setSelectedDate(`${m.key}-01`);
                      if (viewMode === 'semester') {
                        setSelectedMonthFilter(m.key);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#17AAAA] text-[#EEEEEE]'
                        : 'bg-[#EEEEEE] text-[#363636] hover:bg-[#FFA42E]'
                    }`}
                  >
                    {m.short}
                  </button>
                );
              })}
            </div>

            {/* Direct Date Picker + Prev/Next Month + Today Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStepMonth(-1)}
                  title="Previous Month"
                  className="p-1.5 rounded-lg bg-[#363636] text-[#EEEEEE] hover:bg-[#17AAAA] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2.5 text-xs font-bold text-[#363636] min-w-[115px] text-center">
                  {monthMeta.label}
                </span>
                <button
                  type="button"
                  onClick={() => handleStepMonth(1)}
                  title="Next Month"
                  className="p-1.5 rounded-lg bg-[#363636] text-[#EEEEEE] hover:bg-[#17AAAA] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <label
                  htmlFor="calendar-jump-date"
                  className="text-[11px] font-bold text-[#363636]"
                >
                  Jump to Date:
                </label>
                <input
                  id="calendar-jump-date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    handlePickDate(e.target.value);
                    if (viewMode === 'semester') {
                      setViewMode('month');
                    }
                  }}
                  className="h-8 px-2.5 text-xs rounded-lg glass-input cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={handleJumpToToday}
                className="inline-flex items-center gap-1 h-8 px-2.5 rounded-lg bg-[#FFA42E] hover:bg-[#F63F3A] text-[#363636] hover:text-[#EEEEEE] text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                Today (Oct 27)
              </button>
            </div>
          </div>
        </div>
      </PageHeader>

      {/* VIEW 1: BRANCH-LOCKED SEMESTER BLUEPRINT */}
      {viewMode === 'semester' && (
        <div className="space-y-6">
          {/* Semester Executive Summary Banner */}
          <Card padding="p-5" className="relative overflow-hidden border-t-4 border-t-[#17AAAA]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#363636]/15">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <Badge variant="primary" dot>
                    {activeBranchMeta.code} Department Only
                  </Badge>
                  <Badge variant="warning">{activeSemMeta.label}</Badge>
                  <Badge variant="dark">{activeSemMeta.session}</Badge>
                </div>
                <h2 className="text-lg font-bold text-[#363636]">
                  {activeBranchMeta.name} — {activeSemMeta.label} Academic Blueprint
                </h2>
                <p className="text-xs text-[#363636]/75 mt-0.5">
                  HOD: {activeBranchMeta.hod} · Division: {userDiv} ·{' '}
                  {activeSemMeta.workingWeeks} Teaching Weeks ({activeSemMeta.instructionDays} Days) ·{' '}
                  {activeSemMeta.totalCredits} Credits
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-[#363636] border-l-4 border-l-[#FFA42E]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFA42E]">
                  Academic Cycle Progress
                </p>
                <p className="text-xs font-bold text-[#EEEEEE] mt-0.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#17AAAA]" />
                  {activeSemMeta.currentWeek}
                </p>
              </div>
            </div>

            {/* 4 Key Examination & Milestone Windows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-[#EEEEEE] border-l-4 border-l-[#F63F3A]">
                <div className="flex items-center justify-between text-xs text-[#F63F3A] mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    Mid-Sem Theory (MSE)
                  </span>
                  <FileCheck className="w-4 h-4 text-[#F63F3A]" />
                </div>
                <p className="text-sm font-bold text-[#363636]">
                  {activeSemMeta.midSemWindow}
                </p>
                <p className="text-[11px] text-[#363636]/75 mt-0.5">
                  30 Marks · {activeBranch} Core Papers
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EEEEEE] border-l-4 border-l-[#FFA42E]">
                <div className="flex items-center justify-between text-xs text-[#363636] mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    {activeBranch} Practical & Viva
                  </span>
                  <Layers className="w-4 h-4 text-[#FFA42E]" />
                </div>
                <p className="text-sm font-bold text-[#363636]">
                  {activeSemMeta.vivaWindow}
                </p>
                <p className="text-[11px] text-[#363636]/75 mt-0.5">
                  Lab Batches ({userProfile?.labBatch || 'Batch A1'})
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EEEEEE] border-l-4 border-l-[#17AAAA]">
                <div className="flex items-center justify-between text-xs text-[#17AAAA] mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    End-Sem Theory (ESE)
                  </span>
                  <GraduationCap className="w-4 h-4 text-[#17AAAA]" />
                </div>
                <p className="text-sm font-bold text-[#363636]">
                  {activeSemMeta.endSemWindow}
                </p>
                <p className="text-[11px] text-[#363636]/75 mt-0.5">
                  60 Marks · University Exam
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#EEEEEE] border-l-4 border-l-[#363636]">
                <div className="flex items-center justify-between text-xs text-[#363636] mb-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">
                    Result Declaration
                  </span>
                  <Award className="w-4 h-4 text-[#F63F3A]" />
                </div>
                <p className="text-sm font-bold text-[#363636]">
                  {activeSemMeta.resultDate}
                </p>
                <p className="text-[11px] text-[#363636]/75 mt-0.5">
                  SGPA / CGPA Grade Card
                </p>
              </div>
            </div>
          </Card>

          {/* Branch & Semester Subject + Interactive Exam Date Matrix */}
          <Card padding="p-0" className="overflow-hidden">
            <div className="px-5 py-4 border-b-2 border-[#17AAAA] bg-[#363636] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#EEEEEE] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FFA42E]" />
                  {activeBranch} {selectedSemester} — Subject Syllabus, Lab Viva & Exam Datesheet
                </h3>
                <p className="text-xs text-[#EEEEEE]/80 mt-0.5">
                  Click any exam or viva date below to jump directly to that day on the interactive calendar grid.
                </p>
              </div>
              <Badge variant="warning">
                {activeCurriculum.reduce((acc, c) => acc + c.credits, 0)} Course Credits
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#363636]/20 bg-[#EEEEEE] text-[11px] font-bold uppercase tracking-wider text-[#363636]">
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">{activeBranch} Course & Lab Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4">Faculty Coordinator</th>
                    <th className="py-3 px-4">Mid-Sem Date</th>
                    <th className="py-3 px-4">Lab Viva / Demo</th>
                    <th className="py-3 px-4">End-Sem Paper</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#363636]/15 text-xs">
                  {activeCurriculum.map((sub) => (
                    <tr
                      key={sub.code}
                      className="hover:bg-[#EEEEEE]/70 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-[#17AAAA]">
                        {sub.code}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-[#363636]">{sub.title}</p>
                        <p className="text-[11px] text-[#363636]/75">{sub.room}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            sub.type.includes('Project')
                              ? 'primary'
                              : sub.type.includes('Lab')
                              ? 'warning'
                              : 'neutral'
                          }
                        >
                          {sub.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#363636]">
                        {sub.credits} Cr
                      </td>
                      <td className="py-3 px-4 text-[#363636]/85 font-medium">
                        {sub.faculty}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            handlePickDate(sub.midSemDate);
                            setViewMode('month');
                          }}
                          className="px-2 py-1 rounded-md bg-[#EEEEEE] hover:bg-[#17AAAA] text-[#363636] hover:text-[#EEEEEE] border border-[#363636]/25 font-semibold transition-colors"
                          title="Open this date in Month Grid"
                        >
                          {sub.midSemDate}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        {sub.vivaDate.includes('-') ? (
                          <button
                            type="button"
                            onClick={() => {
                              handlePickDate(sub.vivaDate);
                              setViewMode('month');
                            }}
                            className="px-2 py-1 rounded-md bg-[#FFA42E] hover:bg-[#363636] text-[#363636] hover:text-[#EEEEEE] font-bold transition-colors"
                            title="Open this date in Month Grid"
                          >
                            {sub.vivaDate}
                          </button>
                        ) : (
                          <span className="text-[#363636]/75 font-medium">{sub.vivaDate}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => {
                            handlePickDate(sub.endSemDate);
                            setViewMode('month');
                          }}
                          className="px-2 py-1 rounded-md bg-[#F63F3A] hover:bg-[#363636] text-[#EEEEEE] font-bold transition-colors"
                          title="Open this date in Month Grid"
                        >
                          {sub.endSemDate}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Category Filters & Search for Complete Semester Timeline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: `All ${activeBranch} Semester Items` },
                { id: 'Exam', label: 'Exams (ISE / MSE / ESE)' },
                { id: 'Lab & Viva', label: `${activeBranch} Lab Viva` },
                { id: 'Project', label: 'Project & Capstone' },
                { id: 'Academic', label: 'Academic & Submissions' },
                { id: 'Co-Curricular', label: 'Fests & Hackathons' },
                { id: 'Holiday', label: 'Holidays & Breaks' },
              ].map((cat) => {
                const active = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-[#17AAAA] text-[#EEEEEE]'
                        : 'bg-white text-[#363636] hover:bg-[#FFA42E] border border-[#363636]/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="w-full md:w-64">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${activeBranch} exams, viva, dates...`}
              />
            </div>
          </div>

          {/* Month-by-Month Semester Calendar Timeline */}
          {milestonesByMonth.length === 0 ? (
            <EmptyState
              icon={CalendarIcon}
              title="No matching semester milestones"
              description="Reset your month or category filter to view all scheduled dates for your branch."
              actionLabel="Show Full Semester"
              onAction={() => {
                setCategoryFilter('ALL');
                setSelectedMonthFilter('ALL');
                setSearchQuery('');
              }}
            />
          ) : (
            <div className="space-y-6">
              {milestonesByMonth.map((group) => (
                <Card
                  key={group.monthLabel}
                  padding="p-0"
                  className="overflow-hidden"
                >
                  <div className="px-5 py-3 bg-[#363636] border-b-2 border-[#FFA42E] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#FFA42E]" />
                      <h3 className="text-sm font-bold text-[#EEEEEE]">
                        {group.monthLabel}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#17AAAA]">
                        {group.items.length}{' '}
                        {group.items.length === 1 ? 'Milestone' : 'Milestones'}
                      </span>
                      <Button
                        variant="primary"
                        size="xs"
                        onClick={() => {
                          setCurrentMonth(group.monthKey);
                          setSelectedDate(`${group.monthKey}-01`);
                          setViewMode('month');
                        }}
                      >
                        Open {group.monthLabel} Grid
                      </Button>
                    </div>
                  </div>

                  <div className="divide-y divide-[#363636]/15">
                    {group.items.map((item) => {
                      const dayStart = item.startDate.slice(-2);
                      const dayEnd = item.endDate.slice(-2);
                      const isMultiDay = item.startDate !== item.endDate;

                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedMilestoneModal(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedMilestoneModal(item);
                            }
                          }}
                          className="p-4 sm:p-5 hover:bg-[#EEEEEE]/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-[#363636] flex flex-col items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold uppercase text-[#FFA42E] leading-none">
                                {item.weekTag}
                              </span>
                              <span className="text-sm font-bold text-[#EEEEEE] leading-tight mt-1">
                                {isMultiDay ? `${dayStart}–${dayEnd}` : dayStart}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                  variant={getCategoryBadgeVariant(
                                    item.category
                                  )}
                                >
                                  {item.category}
                                </Badge>
                                <Badge variant="primary">
                                  {item.branch === 'ALL'
                                    ? `${activeBranch} & All Branches`
                                    : `${item.branch} Exclusive`}
                                </Badge>
                                <span
                                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                    item.status === 'Completed'
                                      ? 'bg-[#17AAAA] text-[#EEEEEE]'
                                      : item.status === 'Ongoing'
                                      ? 'bg-[#F63F3A] text-[#EEEEEE]'
                                      : 'bg-[#FFA42E] text-[#363636]'
                                  }`}
                                >
                                  {item.status === 'Completed' ? (
                                    <CheckCircle2 className="w-3 h-3" />
                                  ) : (
                                    <AlertCircle className="w-3 h-3" />
                                  )}
                                  {item.status}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-[#363636]">
                                {item.title}
                              </h4>
                              <p className="text-xs text-[#363636]/75 leading-relaxed max-w-3xl">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col lg:items-end gap-1.5 text-xs text-[#363636]/75 pl-18 lg:pl-0 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePickDate(item.startDate);
                                setViewMode('month');
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#363636] hover:bg-[#17AAAA] text-[#EEEEEE] font-bold transition-colors"
                            >
                              <Clock className="w-3.5 h-3.5 text-[#FFA42E]" />
                              {isMultiDay
                                ? `${item.startDate} → ${item.endDate}`
                                : item.startDate}
                            </button>
                            <span className="flex items-center gap-1.5 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-[#F63F3A]" />
                              {item.venue}
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px]">
                              <UserCheck className="w-3.5 h-3.5 text-[#17AAAA]" />
                              {item.coordinator}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: INTERACTIVE MONTH GRID + SELECTED DATE INSPECTOR PANEL */}
      {viewMode === 'month' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left 8 Columns: Interactive Month Grid */}
          <Card padding="p-0" className="xl:col-span-8 overflow-hidden">
            <div className="px-5 py-3.5 border-b-2 border-[#17AAAA] bg-[#363636] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#EEEEEE] flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#FFA42E]" />
                  {monthMeta.label}
                </h2>
                <p className="text-xs text-[#EEEEEE]/80">
                  Click any date cell to inspect or add {activeBranch} {userDiv} classes, exams, and events.
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="primary"
                  size="xs"
                  icon={ChevronLeft}
                  onClick={() => handleStepMonth(-1)}
                >
                  Prev Month
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  iconRight={ChevronRight}
                  onClick={() => handleStepMonth(1)}
                >
                  Next Month
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 border-b border-[#363636]/20 bg-[#EEEEEE] text-center">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#363636]"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 divide-x divide-y divide-[#363636]/15">
              {monthCells.map((cell) =>
                cell.blank ? (
                  <div
                    key={cell.key}
                    className="min-h-[64px] sm:min-h-[116px] bg-[#EEEEEE]/60 p-1 sm:p-1.5"
                  />
                ) : (
                  <div
                    key={cell.key}
                    onClick={() => setSelectedDate(cell.dateStr)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedDate(cell.dateStr);
                      }
                    }}
                    className={`min-h-[64px] sm:min-h-[116px] p-1 sm:p-2 transition-all cursor-pointer text-left ${
                      selectedDate === cell.dateStr
                        ? 'bg-[#FFA42E]/20 ring-2 ring-inset ring-[#F63F3A]'
                        : 'bg-white hover:bg-[#EEEEEE]/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-1">
                      <span
                        className={`text-[11px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                          selectedDate === cell.dateStr
                            ? 'bg-[#F63F3A] text-[#EEEEEE]'
                            : cell.dateStr === '2026-10-27'
                            ? 'bg-[#17AAAA] text-[#EEEEEE]'
                            : 'text-[#363636]'
                        }`}
                      >
                        {cell.dayNum}
                      </span>

                      {cell.activities.length > 0 && (
                        <span className="text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.2 rounded-full bg-[#363636] text-[#FFA42E] self-start sm:self-auto">
                          {cell.activities.length}
                        </span>
                      )}
                    </div>

                    {/* Mobile compact color dots */}
                    {cell.activities.length > 0 && (
                      <div className="flex sm:hidden flex-wrap gap-1 mt-1">
                        {cell.activities.slice(0, 4).map((act) => (
                          <span
                            key={act.id}
                            className={`w-2 h-2 rounded-full ${
                              act.type === 'semester' ||
                              act.type === 'exam-paper'
                                ? 'bg-[#F63F3A]'
                                : act.type === 'event' ||
                                  act.type === 'volunteer'
                                ? 'bg-[#FFA42E]'
                                : 'bg-[#17AAAA]'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Desktop/Tablet activity pills */}
                    <div className="hidden sm:block space-y-1">
                      {cell.activities.slice(0, 3).map((act) => (
                        <div
                          key={act.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(cell.dateStr);
                            handleSelectItem(act);
                          }}
                          className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] font-semibold truncate ${
                            act.type === 'semester' || act.type === 'exam-paper'
                              ? 'bg-[#F63F3A] text-[#EEEEEE]'
                              : act.type === 'event' || act.type === 'volunteer'
                              ? 'bg-[#FFA42E] text-[#363636]'
                              : 'bg-[#17AAAA] text-[#EEEEEE]'
                          }`}
                        >
                          {act.title}
                        </div>
                      ))}
                      {cell.activities.length > 3 && (
                        <p className="text-[10px] font-bold text-[#F63F3A] pl-1">
                          +{cell.activities.length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Right 4 Columns: Selected Date Live Inspector Panel */}
          <Card padding="p-5" className="xl:col-span-4 space-y-4 sticky top-20 border-t-4 border-t-[#F63F3A]">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#363636]/15">
              <div>
                <Badge variant="primary" dot>
                  Selected Date Schedule
                </Badge>
                <h3 className="text-base font-bold text-[#363636] mt-1.5">
                  {formatReadableDate(selectedDate)}
                </h3>
                <p className="text-xs text-[#363636]/75 mt-0.5">
                  {activeBranch} {userDiv} · {selectedSemester}
                </p>
              </div>
              <Button
                variant="secondary"
                size="xs"
                icon={Plus}
                onClick={() => handleOpenAddModalForDate(selectedDate)}
              >
                Add on Date
              </Button>
            </div>

            {selectedDateActivities.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <CalendarIcon className="w-8 h-8 text-[#17AAAA] mx-auto" />
                <p className="text-sm font-bold text-[#363636]">
                  Weekend / Free Study Day
                </p>
                <p className="text-xs text-[#363636]/75">
                  No lectures or exams scheduled on {selectedDate}.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                {selectedDateActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => handleSelectItem(act)}
                    className="p-3.5 rounded-xl bg-[#EEEEEE] hover:bg-[#FFA42E]/25 border-l-4 border-l-[#17AAAA] transition-colors cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant={
                          act.type === 'semester' || act.type === 'exam-paper'
                            ? 'danger'
                            : act.type === 'class'
                            ? 'primary'
                            : 'warning'
                        }
                      >
                        {act.statusLabel}
                      </Badge>
                      <span className="text-[11px] font-bold text-[#363636] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F63F3A]" />
                        {act.time}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[#363636]">
                      {act.title}
                    </h4>
                    {act.subtitle && (
                      <p className="text-[11px] text-[#363636]/75">{act.subtitle}</p>
                    )}
                    <p className="text-[11px] text-[#363636]/80 font-medium flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3 h-3 text-[#17AAAA]" />
                      {act.venue}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* VIEW 3: DYNAMIC MONTHLY & DAILY AGENDA STREAM */}
      {viewMode === 'agenda' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Tabs
              tabs={[
                { id: 'all', label: `All ${activeBranch} Schedule (${monthMeta.short})` },
                { id: 'exams-only', label: 'Semester Exams, Vivas & Milestones' },
                { id: 'classes-only', label: `${activeBranch} ${userDiv} Lectures & Labs` },
              ]}
              activeTab={scopeFilter}
              onChange={setScopeFilter}
            />

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="xs"
                icon={ChevronLeft}
                onClick={() => handleStepMonth(-1)}
              >
                Prev Month
              </Button>
              <span className="text-xs font-bold text-[#363636] px-2">
                {monthMeta.label}
              </span>
              <Button
                variant="secondary"
                size="xs"
                iconRight={ChevronRight}
                onClick={() => handleStepMonth(1)}
              >
                Next Month
              </Button>
            </div>
          </div>

          {monthAgendaDays.length === 0 ? (
            <EmptyState
              icon={CalendarIcon}
              title={`No activities in ${monthMeta.label}`}
              description="Use the Month bar above to switch months or change the filter tab."
              actionLabel="Show All Schedule"
              onAction={() => setScopeFilter('all')}
            />
          ) : (
            <div className="space-y-4">
              {monthAgendaDays.map((dayGroup) => (
                <Card
                  key={dayGroup.dateStr}
                  padding="p-0"
                  className="overflow-hidden"
                >
                  <div className="px-5 py-2.5 bg-[#363636] border-b-2 border-[#17AAAA] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#FFA42E] text-[#363636] text-xs font-bold">
                        {dayGroup.monthShort} {dayGroup.dayNum}
                      </span>
                      <h3 className="text-xs font-bold text-[#EEEEEE]">
                        {dayGroup.readableDate}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold text-[#17AAAA]">
                      {dayGroup.activities.length}{' '}
                      {dayGroup.activities.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="divide-y divide-[#363636]/15">
                    {dayGroup.activities.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className="p-4 hover:bg-[#EEEEEE] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant={
                                item.type === 'semester' ||
                                item.type === 'exam-paper'
                                  ? 'danger'
                                  : item.type === 'class'
                                  ? 'primary'
                                  : 'warning'
                              }
                            >
                              {item.statusLabel}
                            </Badge>
                            <span className="text-xs font-semibold text-[#363636]/75">
                              {item.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#363636]">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <p className="text-xs text-[#363636]/75">
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col sm:items-end gap-1 text-xs text-[#363636]/75">
                          <span className="flex items-center gap-1.5 font-bold text-[#363636]">
                            <Clock className="w-3.5 h-3.5 text-[#F63F3A]" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#17AAAA]" />
                            {item.venue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Semester Milestone Details Modal */}
      <Modal
        isOpen={Boolean(selectedMilestoneModal)}
        onClose={() => setSelectedMilestoneModal(null)}
        title={selectedMilestoneModal?.title || 'Semester Milestone'}
        subtitle={`${selectedMilestoneModal?.weekTag || ''} · ${
          selectedMilestoneModal?.monthLabel || ''
        }`}
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (selectedMilestoneModal?.startDate) {
                  handlePickDate(selectedMilestoneModal.startDate);
                  setSelectedMilestoneModal(null);
                  setViewMode('month');
                }
              }}
            >
              View on Month Grid
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedMilestoneModal(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedMilestoneModal && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={getCategoryBadgeVariant(
                  selectedMilestoneModal.category
                )}
              >
                {selectedMilestoneModal.category}
              </Badge>
              <Badge variant="primary">
                {activeBranch} Department ({selectedSemester})
              </Badge>
            </div>

            <p className="text-sm text-[#363636] leading-relaxed">
              {selectedMilestoneModal.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#EEEEEE] border border-[#363636]/20 text-xs space-y-2 text-[#363636]">
              <p className="flex items-center justify-between">
                <span className="text-[#363636]/75">Schedule Window:</span>
                <span className="font-bold">
                  {selectedMilestoneModal.startDate ===
                  selectedMilestoneModal.endDate
                    ? selectedMilestoneModal.startDate
                    : `${selectedMilestoneModal.startDate} to ${selectedMilestoneModal.endDate}`}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[#363636]/75">Venue / Portal:</span>
                <span className="font-bold">
                  {selectedMilestoneModal.venue}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[#363636]/75">Coordinator / Authority:</span>
                <span className="font-bold">
                  {selectedMilestoneModal.coordinator}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[#363636]/75">Current Status:</span>
                <span className="font-bold text-[#17AAAA]">
                  {selectedMilestoneModal.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Add New Semester Calendar Milestone Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={`Add ${activeBranch} Semester Calendar Date`}
        subtitle={`Schedule a new exam, lab viva, submission, or reminder for ${activeBranch} (${selectedSemester}).`}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateMilestoneSubmit}
            >
              Save to {activeBranch} Calendar
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateMilestoneSubmit} className="space-y-3.5">
          <Input
            label="Milestone / Exam / Event Title"
            placeholder={`e.g., ${activeBranch} Internal Lab Assessment`}
            value={newMilestoneForm.title}
            onChange={(e) =>
              setNewMilestoneForm((p) => ({ ...p, title: e.target.value }))
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Semester"
              value={newMilestoneForm.semester}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({ ...p, semester: e.target.value }))
              }
              options={SEMESTER_METADATA.map((s) => ({
                value: s.id,
                label: s.label,
              }))}
            />
            <Select
              label="Category"
              value={newMilestoneForm.category}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({ ...p, category: e.target.value }))
              }
              options={[
                { value: 'Exam', label: 'Exam (ISE/MSE/ESE)' },
                { value: 'Lab & Viva', label: 'Lab Practical & Viva' },
                { value: 'Project', label: 'Project Review' },
                { value: 'Academic', label: 'Academic / Submission' },
                { value: 'Co-Curricular', label: 'Fest / Hackathon' },
                { value: 'Holiday', label: 'Holiday / Break' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={newMilestoneForm.startDate}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({
                  ...p,
                  startDate: e.target.value,
                  endDate: e.target.value,
                }))
              }
            />
            <Input
              label="End Date"
              type="date"
              value={newMilestoneForm.endDate}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({ ...p, endDate: e.target.value }))
              }
            />
            <Input
              label="Academic Week"
              placeholder="e.g., Week 14"
              value={newMilestoneForm.weekTag}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({ ...p, weekTag: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Venue / Lab / Hall"
              placeholder="e.g., Turing Lab 302"
              value={newMilestoneForm.venue}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({ ...p, venue: e.target.value }))
              }
            />
            <Input
              label="Coordinator / Faculty"
              placeholder="e.g., Prof. S. Kulkarni"
              value={newMilestoneForm.coordinator}
              onChange={(e) =>
                setNewMilestoneForm((p) => ({
                  ...p,
                  coordinator: e.target.value,
                }))
              }
            />
          </div>

          <Textarea
            label="Syllabus Scope / Instructions"
            rows={3}
            placeholder="Describe modules covered, batch timings, or submission guidelines..."
            value={newMilestoneForm.description}
            onChange={(e) =>
              setNewMilestoneForm((p) => ({
                ...p,
                description: e.target.value,
              }))
            }
          />
        </form>
      </Modal>

      {/* Volunteer Shift Details Modal */}
      <Modal
        isOpen={Boolean(selectedShiftModal)}
        onClose={() => setSelectedShiftModal(null)}
        title={selectedShiftModal?.title || 'Volunteer Shift'}
        subtitle={selectedShiftModal?.eventTitle}
        footer={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedShiftModal(null)}
          >
            Close
          </Button>
        }
      >
        {selectedShiftModal && (
          <div className="space-y-3">
            <Badge variant="success" dot>
              Approved Volunteer Shift ({selectedShiftModal.serviceHours} hrs)
            </Badge>
            <p className="text-sm text-[#363636] leading-relaxed">
              {selectedShiftModal.responsibilities}
            </p>
            <div className="p-3.5 rounded-xl glass-panel-subtle text-xs space-y-1.5 text-[#363636]">
              <p>
                <strong>Date:</strong> {selectedShiftModal.date}
              </p>
              <p>
                <strong>Shift Time:</strong> {selectedShiftModal.time}
              </p>
              <p>
                <strong>Reporting Venue:</strong> {selectedShiftModal.venue}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
