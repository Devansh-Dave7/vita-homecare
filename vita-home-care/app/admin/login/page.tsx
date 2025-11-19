"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth/actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        // Force a hard navigation to ensure auth state is refreshed
        window.location.href = '/admin/dashboard';
      } else {
        setError(result.error || 'Login failed');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] border border-[#dbeafe] p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-onest font-bold text-[#2c254c] mb-2">
              Admin Login
            </h1>
            <p className="text-[#4f4865] font-onest">
              Sign in to manage your content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="admin@vitahomecare.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a 
              href="/"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
