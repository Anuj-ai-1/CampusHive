import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  UserPlus,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

export function Login({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regBranch, setRegBranch] = useState('CSE');
  const [regDivision, setRegDivision] = useState('Div A');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setError('Please enter your institutional email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.login(email.trim(), password);
      if (authMode === 'admin' && res.role !== 'admin') {
        setError('This account does not have Administrator privileges.');
        return;
      }
      onAuthSuccess(res);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1C1917] flex flex-col justify-center py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#EA580C] flex items-center justify-center text-[#FAFAF9] mb-4 shadow-md">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1C1917]">
            UniHive
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#0D9488] mt-1.5">
            Universal SkillTech University × UniHive
          </p>
        </div>

        <Card
          padding="px-6 py-9 sm:px-9 sm:py-11"
          className="mt-8 border-t-4 border-t-[#0D9488] shadow-lg min-h-[410px] flex flex-col justify-center"
        >
          {/* Mode Toggle: Student Sign In vs Create Account vs Admin Portal */}
          <div className="flex items-center justify-center mb-7 pb-5 border-b border-[#1C1917]/15">
            <div className="inline-flex flex-wrap justify-center rounded-lg bg-[#FAFAF9] p-1 border border-[#1C1917]/20 gap-0.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-[#1C1917] text-[#FAFAF9]'
                    : 'text-[#1C1917]/75 hover:text-[#1C1917]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-[#0D9488] text-[#FAFAF9]'
                    : 'text-[#1C1917]/75 hover:text-[#1C1917]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('admin');
                  setError('');
                }}
                className={`px-3.5 py-2 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  authMode === 'admin'
                    ? 'bg-[#EA580C] text-[#FAFAF9]'
                    : 'text-[#1C1917]/75 hover:text-[#1C1917]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {authMode === 'admin' && (
              <div className="p-3 rounded-xl bg-[#1C1917] text-[#FAFAF9] border-l-4 border-l-[#EA580C] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#FAFAF9]">
                    University Administration Portal
                  </p>
                  <p className="text-[11px] text-[#CA8A04]">
                    Sign in with Pro-VC / Admin credentials to manage approvals &amp; tickets.
                  </p>
                </div>
              </div>
            )}
            {authMode === 'register' && (
              <>
                <Input
                  id="reg-name"
                  label="Full Name"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g., Riya Deshmukh"
                  className="[&_input]:h-11"
                />
                <div className="grid grid-cols-2 gap-3.5">
                  <Select
                    id="reg-branch"
                    label="Branch"
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    options={['CSE', 'IT', 'ECE', 'AIML', 'MECH']}
                    className="[&_select]:h-11"
                  />
                  <Select
                    id="reg-division"
                    label="Division"
                    value={regDivision}
                    onChange={(e) => setRegDivision(e.target.value)}
                    options={['Div A', 'Div B', 'Div C']}
                    className="[&_select]:h-11"
                  />
                </div>
              </>
            )}

            <Input
              id="login-email"
              label={authMode === 'admin' ? 'Administrator Email' : 'Institutional Email'}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={authMode === 'admin' ? 'pro.vc@ustu.edu.in' : 'name@ustu.edu.in'}
              className="[&_input]:h-11"
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={error}
              className="[&_input]:h-11"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant={authMode === 'admin' ? 'danger' : 'primary'}
                size="lg"
                iconRight={ArrowRight}
                disabled={loading}
                className="w-full h-11"
              >
                {loading
                  ? 'Please wait...'
                  : authMode === 'register'
                  ? 'Create Account & Set Up Profile'
                  : authMode === 'admin'
                  ? 'Sign In to Admin Portal'
                  : 'Sign In to UniHive'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
