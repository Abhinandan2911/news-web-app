'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, X, Sparkles } from 'lucide-react';

export default function SubscribeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={() => {
            setSubscribed(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {subscribed ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-900">You're Subscribed!</h3>
            <p className="text-sm text-slate-600">
              Thank you for subscribing to <strong>Times Now Daily Briefings</strong>. Check your inbox for breaking updates.
            </p>
            <button
              onClick={() => {
                setSubscribed(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 transition"
            >
              Continue Reading
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Times Now Digital Pass</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
              Get Unlimited Breaking News & Daily Briefings
            </h3>
            <p className="text-xs text-slate-600">
              Subscribe now to receive real-time breaking alerts, exclusive editorials, and daily morning digests directly in your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-600"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition"
              >
                Subscribe Free Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
