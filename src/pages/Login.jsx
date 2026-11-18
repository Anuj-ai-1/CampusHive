import React, { useState, useEffect } from 'react';
import {
  Layers,
  User,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Database,
  UserPlus,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';

export function Login({ onAuthSuccess, pendingClubRequestsCount = 0 }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('anuj.sharma@ustu.edu.in');
  const [password, setPassword] = useState('ustu2026');
  const [regName, setRegName] = useState('');
  const [regBranch, setRegBranch] = useState('CSE');
  const [regDivision, setRegDivision] = useState('Div A');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  useEffect(() => {
    let active = true;
    api
      .health()
      .then(() => {
        if (active) setBackendStatus('online');
      })
      .catch(() => {
        if (active) setBackendStatus('offline');
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSelectPortal = (portalRole) => {
    setAuthMode('login');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'register') {
      if (!regName.trim() || !email.trim() || password.length < 4) {
        setError('Please enter your full name, email, and password (min 4 chars).');
        return;
      }
      setLoading(true);
      try {
        const res = await api.register({
          name: regName.trim(),
          email: email.trim(),
          password,
          branchCode: regBranch,
          division: regDivision,
        });
        onAuthSuccess(res);
      } catch (err) {
        setError(err.message || 'Registration failed.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Please enter your campus email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login(email.trim(), password);
      onAuthSuccess(res);
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#363636] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#363636] text-[11px] font-semibold text-[#FFA42E] mb-3">
            <span>UniHive Platform</span>
            <span>·</span>
            <span className="text-[#EEEEEE]">Full-Stack SQLite Edition</span>
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
          padding="p-5 sm:p-7"
          className="mt-6 border-t-4 border-t-[#17AAAA] shadow-lg"
        >
          {/* Mode Toggle: Sign In vs Register Student */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#363636]/15">
            <div className="inline-flex rounded-lg bg-[#EEEEEE] p-0.5 border border-[#363636]/20">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  authMode === 'login'
                    ? 'bg-[#363636] text-[#EEEEEE]'
                    : 'text-[#363636]/75 hover:text-[#363636]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1 ${
                  authMode === 'register'
                    ? 'bg-[#17AAAA] text-[#EEEEEE]'
                    : 'text-[#363636]/75 hover:text-[#363636]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                New Student
              </button>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                backendStatus === 'online'
                  ? 'bg-[#17AAAA]/15 text-[#17AAAA]'
                  : backendStatus === 'offline'
                  ? 'bg-[#F63F3A]/15 text-[#F63F3A]'
                  : 'bg-[#FFA42E]/20 text-[#363636]'
              }`}
            >
              <Database className="w-3 h-3" />
              {backendStatus === 'online'
                ? 'SQLite API Live'
                : backendStatus === 'offline'
                ? 'API Offline'
                : 'Connecting...'}
            </span>
          </div>

          {authMode === 'login' && (
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
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <>
                <Input
                  id="reg-name"
                  label="Full Name"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g., Riya Deshmukh"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    id="reg-branch"
                    label="Branch"
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    options={['CSE', 'IT', 'ECE', 'AIML', 'MECH']}
                  />
                  <Select
                    id="reg-division"
                    label="Division"
                    value={regDivision}
                    onChange={(e) => setRegDivision(e.target.value)}
                    options={['Div A', 'Div B', 'Div C']}
                  />
                </div>
              </>
            )}

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

            {authMode === 'login' && (
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
            )}

            <Button
              type="submit"
              variant={
                authMode === 'login' && selectedRole === 'admin'
                  ? 'danger'
                  : 'primary'
              }
              size="lg"
              iconRight={ArrowRight}
              disabled={loading}
              className="w-full"
            >
              {loading
                ? 'Authenticating...'
                : authMode === 'register'
                ? 'Create Student Account & Enter'
                : `Sign in to ${selectedRole === 'admin' ? 'Admin' : 'Student'} Workspace`}
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-[#363636]/15 flex items-center justify-between text-[11px] text-[#363636]/75">
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#17AAAA]" />
              HMAC-SHA256 Token Auth
            </span>
            <span>Real-time SQLite Persistence</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
