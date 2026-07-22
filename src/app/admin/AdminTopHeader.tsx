'use client';

import { useState } from 'react';
import { Search, Bell, Sidebar } from 'lucide-react';

export default function AdminTopHeader() {
  const [search, setSearch] = useState('');

  return (
    <header className="h-16 border-b border-[#e8e4d9] bg-[#fdfcf9] px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button className="p-1 text-[#78716c] hover:text-[#1c1917] rounded">
          <Sidebar className="w-4 h-4" />
        </button>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search articles, drafts, employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f4f0e8] border border-[#e2ddd3] rounded-lg text-xs text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
          />
          <Search className="w-3.5 h-3.5 text-[#a8a29e] absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-[#78716c] hover:text-[#1c1917] hover:bg-[#f4f0e8] rounded-full transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#b71c1c]" />
        </button>
      </div>
    </header>
  );
}
