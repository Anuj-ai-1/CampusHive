import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { Card } from '../ui/Card';

export function AdminCharts({ registrationsTrend, categoryParticipation }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card padding="p-5">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Event Registrations & Attendance Over Time
          </h3>
          <p className="text-xs text-[#0F172A]/75 mt-0.5">
            Weekly student sign-ups vs. verified check-ins across campus venues
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={registrationsTrend}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="regFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(15, 23, 42, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: '#0F172A' }}
                axisLine={{ stroke: 'rgba(15, 23, 42, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#0F172A' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#4F46E5',
                  color: '#F8FAFC',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#4F46E5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#regFill)"
              />
              <Area
                type="monotone"
                dataKey="attendance"
                name="Verified Attendance"
                stroke="#E11D48"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card padding="p-5">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Participation by Event Category
          </h3>
          <p className="text-xs text-[#0F172A]/75 mt-0.5">
            Distribution of active student registrations across campus tracks
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryParticipation}
              margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(15, 23, 42, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: '#0F172A' }}
                axisLine={{ stroke: 'rgba(15, 23, 42, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#0F172A' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#F59E0B',
                  color: '#F8FAFC',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="count"
                name="Participants"
                fill="#F59E0B"
                radius={[6, 6, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
