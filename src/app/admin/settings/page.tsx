'use client';

import { useState } from 'react';
import { Settings, Save, Globe, ShieldCheck, DollarSign } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteTitle, setSiteTitle] = useState('TIMES NOW - Breaking News & Editorial');
  const [metaDesc, setMetaDesc] = useState('Stay informed with live breaking news, tech reviews, sports updates, and in-depth business reporting.');
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#e8e4d9] pb-4">
        <h1 className="text-2xl font-serif font-bold text-[#1c1917]">System Settings & Site Configuration</h1>
        <p className="text-xs text-[#78716c] mt-0.5">
          Manage global SEO metadata, legal policies, and advertising placement slots.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-800 text-xs font-bold">
          ✓ Configuration settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SEO & Metadata */}
        <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#1c1917] flex items-center gap-2 border-b border-[#e8e4d9] pb-2">
            <Globe className="w-4 h-4 text-[#b71c1c]" /> SEO & Platform Metadata
          </h3>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#78716c] mb-1">
              Global Platform Title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#78716c] mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3 py-2 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c]"
            />
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#1c1917] flex items-center gap-2 border-b border-[#e8e4d9] pb-2">
            <ShieldCheck className="w-4 h-4 text-[#78716c]" /> Legal & Compliance Pages
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs font-serif">
            <div className="p-4 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg">
              <span className="font-bold block text-[#1c1917] mb-1">Terms of Service</span>
              <span className="text-[11px] text-[#78716c] block mb-3">Last updated: July 2026</span>
              <button type="button" className="px-3 py-1 bg-[#efebe4] border border-[#d6d0c4] text-[#1c1917] font-semibold rounded text-[11px]">
                Edit Terms Page
              </button>
            </div>

            <div className="p-4 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg">
              <span className="font-bold block text-[#1c1917] mb-1">Privacy Policy</span>
              <span className="text-[11px] text-[#78716c] block mb-3">Last updated: June 2026</span>
              <button type="button" className="px-3 py-1 bg-[#efebe4] border border-[#d6d0c4] text-[#1c1917] font-semibold rounded text-[11px]">
                Edit Privacy Page
              </button>
            </div>
          </div>
        </div>

        {/* Ad Placement Slots */}
        <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#1c1917] flex items-center gap-2 border-b border-[#e8e4d9] pb-2">
            <DollarSign className="w-4 h-4 text-emerald-700" /> Sponsored Ad Banner Placement Slots
          </h3>

          <div className="space-y-3 text-xs font-serif">
            <div className="flex items-center justify-between p-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg">
              <div>
                <span className="font-bold block text-[#1c1917]">Top Header Leaderboard Banner</span>
                <span className="text-[10px] text-[#78716c]">Slot size: 728x90 px</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg">
              <div>
                <span className="font-bold block text-[#1c1917]">Right Sidebar Rectangle Ad Slot</span>
                <span className="text-[10px] text-[#78716c]">Slot size: 300x250 px</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">ACTIVE</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </form>
    </div>
  );
}
