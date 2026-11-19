import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

export function Login({ onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
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
      onAuthSuccess(res);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] text-[#363636] flex flex-col justify-center py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#F63F3A] flex items-center justify-center text-[#EEEEEE] mb-4 shadow-md">
            <Layers className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#363636]">
            UniHive
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#17AAAA] mt-1.5">
            Universal SkillTech University × UniHive
          </p>
        </div>

        <Card
          padding="px-6 py-9 sm:px-9 sm:py-11"
          className="mt-8 border-t-4 border-t-[#17AAAA] shadow-lg min-h-[410px] flex flex-col justify-center"
        >
          {/* Mode Toggle: Sign In vs Create Account */}
          <div className="flex items-center justify-center mb-7 pb-5 border-b border-[#363636]/15">
            <div className="inline-flex rounded-lg bg-[#EEEEEE] p-1 border border-[#363636]/20">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-[#363636] text-[#EEEEEE]'
                    : 'text-[#363636]/75 hover:text-[#363636]'
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
                className={`px-4 py-2 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-[#17AAAA] text-[#EEEEEE]'
                    : 'text-[#363636]/75 hover:text-[#363636]'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Create Account
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              label="Institutional Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@ustu.edu.in"
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
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                disabled={loading}
                className="w-full h-11"
              >
                {loading
                  ? 'Please wait...'
                  : authMode === 'register'
                  ? 'Create Account & Set Up Profile'
                  : 'Sign In to UniHive'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
