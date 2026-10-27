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
          <h3 className="text-sm font-bold text-[#363636]">
            Event Registrations & Attendance Over Time
          </h3>
          <p className="text-xs text-[#363636]/75 mt-0.5">
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
                  <stop offset="5%" stopColor="#17AAAA" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#17AAAA" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(54, 54, 54, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 11, fill: '#363636' }}
                axisLine={{ stroke: 'rgba(54, 54, 54, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#363636' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#363636',
                  borderColor: '#17AAAA',
                  color: '#EEEEEE',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="registrations"
                name="Registrations"
                stroke="#17AAAA"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#regFill)"
              />
              <Area
                type="monotone"
                dataKey="attendance"
                name="Verified Attendance"
                stroke="#F63F3A"
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
          <h3 className="text-sm font-bold text-[#363636]">
            Participation by Event Category
          </h3>
          <p className="text-xs text-[#363636]/75 mt-0.5">
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
                stroke="rgba(54, 54, 54, 0.14)"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: '#363636' }}
                axisLine={{ stroke: 'rgba(54, 54, 54, 0.25)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#363636' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#363636',
                  borderColor: '#FFA42E',
                  color: '#EEEEEE',
                  borderRadius: '10px',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="count"
                name="Participants"
                fill="#FFA42E"
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
