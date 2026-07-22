'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Shield, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { loginAction } from '@/app/actions/auth';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = (await loginAction(formData)) as { error?: string } | undefined;
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  async function handleQuickDemoLogin(role: 'author' | 'admin' | 'reader') {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('email', `${role}@timesnow.com`);
    formData.append('password', 'password123');
    formData.append('demoRole', role);
    const res = (await loginAction(formData)) as { error?: string } | undefined;
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917] flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-3xl font-extrabold font-serif text-[#1c1917] tracking-wider">
          <Newspaper className="w-8 h-8 text-[#b71c1c]" />
          <span>TIMES<span className="text-[#b71c1c]">NOW</span></span>
        </Link>
        <p className="text-[#78716c] text-xs font-serif mt-1">Editorial Workspace & Newsroom Portal</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-6 text-center">Sign In to Newsroom</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs font-serif flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#b71c1c] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="editor@timesnow.com"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Role Buttons */}
        <div className="mt-8 pt-6 border-t border-[#e8e4d9]">
          <p className="text-[10px] font-bold uppercase text-[#78716c] text-center mb-3 font-serif">
            Quick 1-Click Role Access
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleQuickDemoLogin('author')}
              className="px-3 py-2.5 bg-[#efebe4] hover:bg-[#e2ddd3] text-[#1c1917] border border-[#d6d0c4] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <UserCheck className="w-4 h-4 text-emerald-700" />
              Employee / Author
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="px-3 py-2.5 bg-[#efebe4] hover:bg-[#e2ddd3] text-[#1c1917] border border-[#d6d0c4] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Shield className="w-4 h-4 text-[#b71c1c]" />
              Admin / Editor
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#78716c] font-serif">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#b71c1c] hover:underline font-bold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
