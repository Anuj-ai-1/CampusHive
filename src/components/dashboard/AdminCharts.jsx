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
          <h3 className="text-sm font-bold text-[#1C1917]">
            Event Registrations & Attendance Over Time
          </h3>
          <p className="text-xs text-[#1C1917]/75 mt-0.5">
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
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(28, 25, 23, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: '#1C1917' }}
                axisLine={{ stroke: 'rgba(28, 25, 23, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#1C1917' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1917',
                  borderColor: '#0D9488',
                  color: '#FAFAF9',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#0D9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#regFill)"
              />
              <Area
                type="monotone"
                dataKey="attendance"
                name="Verified Attendance"
                stroke="#EA580C"
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
          <h3 className="text-sm font-bold text-[#1C1917]">
            Participation by Event Category
          </h3>
          <p className="text-xs text-[#1C1917]/75 mt-0.5">
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
                stroke="rgba(28, 25, 23, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: '#1C1917' }}
                axisLine={{ stroke: 'rgba(28, 25, 23, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#1C1917' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1917',
                  borderColor: '#CA8A04',
                  color: '#FAFAF9',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="count"
                name="Participants"
                fill="#CA8A04"
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
