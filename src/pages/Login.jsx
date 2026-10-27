import React, { useState } from 'react';
import {
  Layers,
  User,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function Login({ onLogin, pendingClubRequestsCount = 0 }) {
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('anuj.sharma@ustu.edu.in');
  const [password, setPassword] = useState('ustu2026');
  const [error, setError] = useState('');

  const handleSelectPortal = (portalRole) => {
    setSelectedRole(portalRole);
    setError('');
    if (portalRole === 'admin') {
      setEmail('pro.vc@ustu.edu.in');
      setPassword('ustuadmin2026');
    } else {
      setEmail('anuj.sharma@ustu.edu.in');
      setPassword('ustu2026');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your campus email and password.');
      return;
    }
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#363636] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#363636] text-[11px] font-semibold text-[#FFA42E] mb-3">
            <span>UniHive Platform</span>
            <span>·</span>
            <span className="text-[#EEEEEE]">USTU Deployment</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#F63F3A] flex items-center justify-center text-[#EEEEEE] mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#363636]">
            Universal SkillTech University
          </h1>
          <p className="text-xs font-medium text-[#17AAAA] mt-1">
            Think It. Build It. Do It. · Learn + Work + Network = Placement
          </p>
        </div>

        <Card
          padding="p-6 sm:p-7"
          className="mt-6 border-t-4 border-t-[#17AAAA] shadow-lg"
        >
          {/* Role Portal Selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-[#363636] mb-2">
              Select Account Workspace
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelectPortal('student')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  selectedRole === 'student'
                    ? 'bg-[#363636] border-[#17AAAA] text-[#EEEEEE]'
                    : 'bg-[#EEEEEE] border-[#363636]/20 text-[#363636] hover:border-[#17AAAA]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <User
                    className={`w-4 h-4 ${
                      selectedRole === 'student'
                        ? 'text-[#17AAAA]'
                        : 'text-[#363636]'
                    }`}
                  />
                  {selectedRole === 'student' && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA42E]" />
                  )}
                </div>
                <p
                  className={`text-xs font-bold ${
                    selectedRole === 'student'
                      ? 'text-[#EEEEEE]'
                      : 'text-[#363636]'
                  }`}
                >
                  Student Portal
                </p>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    selectedRole === 'student'
                      ? 'text-[#FFA42E]'
                      : 'text-[#363636]/75'
                  }`}
                >
                  Anuj Sharma (CSE Div A)
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPortal('admin')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all relative ${
                  selectedRole === 'admin'
                    ? 'bg-[#363636] border-[#F63F3A] text-[#EEEEEE]'
                    : 'bg-[#EEEEEE] border-[#363636]/20 text-[#363636] hover:border-[#F63F3A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      selectedRole === 'admin'
                        ? 'text-[#F63F3A]'
                        : 'text-[#363636]'
                    }`}
                  />
                  {pendingClubRequestsCount > 0 ? (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold bg-[#F63F3A] text-[#EEEEEE] rounded-full">
                      {pendingClubRequestsCount} Pending
                    </span>
                  ) : (
                    selectedRole === 'admin' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFA42E]" />
                    )
                  )}
                </div>
                <p
                  className={`text-xs font-bold ${
                    selectedRole === 'admin'
                      ? 'text-[#EEEEEE]'
                      : 'text-[#363636]'
                  }`}
                >
                  Admin Portal
                </p>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    selectedRole === 'admin'
                      ? 'text-[#FFA42E]'
                      : 'text-[#363636]/75'
                  }`}
                >
                  Dr. Anil Raina (Pro-VC)
                </p>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="login-email"
              label="USTU Institutional Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@ustu.edu.in"
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error}
            />

            <div className="p-3 rounded-xl bg-[#EEEEEE] border border-[#363636]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#363636]/80">
                <Mail className="w-3.5 h-3.5 text-[#17AAAA] shrink-0" />
                <span>
                  Portal:{' '}
                  <strong className="text-[#363636]">
                    {selectedRole === 'admin'
                      ? 'Campus Administrator'
                      : 'Student (Anuj Sharma)'}
                  </strong>
                </span>
              </div>
              <Badge variant={selectedRole === 'admin' ? 'danger' : 'primary'}>
                {selectedRole === 'admin' ? 'Admin' : 'Student'}
              </Badge>
            </div>

            <Button
              type="submit"
              variant={selectedRole === 'admin' ? 'danger' : 'primary'}
              size="lg"
              iconRight={ArrowRight}
              className="w-full"
            >
              Sign in to {selectedRole === 'admin' ? 'Admin' : 'Student'} Workspace
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-[#363636]/15 flex items-center justify-between text-[11px] text-[#363636]/75">
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#17AAAA]" />
              SSO Credentials Pre-filled
            </span>
            <span>Switch portals anytime via Sign Out</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
