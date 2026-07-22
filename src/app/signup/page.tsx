'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Newspaper, AlertCircle, ArrowRight } from 'lucide-react';
import { signupAction } from '@/app/actions/auth';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = (await signupAction(formData)) as { error?: string } | undefined;
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
        <p className="text-[#78716c] text-xs font-serif mt-1">Join the News & Editorial Team</p>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-6 text-center">Create New Account</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-900 text-xs font-serif flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#b71c1c] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-serif">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Ananya Rao"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="ananya_rao"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="ananya@timesnow.com"
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
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#78716c] mb-1.5 font-serif">
              Account Role
            </label>
            <select
              name="role"
              defaultValue="author"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs font-serif text-[#1c1917] focus:outline-none focus:border-[#b71c1c] transition"
            >
              <option value="author">Employee Writer / Author</option>
              <option value="editor">Editor / Admin</option>
              <option value="reader">Public Reader</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold rounded-lg text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-[#78716c] font-serif">
          Already have an account?{' '}
          <Link href="/login" className="text-[#b71c1c] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
