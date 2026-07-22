'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Crown, Sun, Tv, BellRing, Lock } from 'lucide-react';
import SubscribeModal from './SubscribeModal';

interface NewsHeaderProps {
  activeCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

export default function NewsHeader({ activeCategory = 'All', onSelectCategory }: NewsHeaderProps) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'India',
    'World',
    'Entertainment',
    'Sports',
    'Business',
    'Lifestyle',
    'Tech',
    'Pickleball',
    'Crypto',
    'Videos',
    'Games',
  ];

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        {/* Top Dark Bar matching Times Now screenshot */}
        <div className="bg-[#121212] text-xs text-white px-3 py-1.5 flex items-center justify-between overflow-x-auto whitespace-nowrap">
          {/* Sister Channel Brands */}
          <div className="flex items-center space-x-4 font-semibold text-gray-300">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[11px] font-bold">Times Now</span>
            <span className="hover:text-white cursor-pointer transition">Times Now Navbharat</span>
            <span className="hover:text-white cursor-pointer transition">Zoom</span>
            <span className="hover:text-white cursor-pointer transition">ET Now</span>
            <span className="hover:text-white cursor-pointer transition">ET Now Swadesh</span>
          </div>

          {/* Right Action Icons: Premium, Weather, Search, Live TV, Subscribe */}
          <div className="flex items-center space-x-3 ml-4 shrink-0">
            <button
              onClick={() => setIsSubscribeOpen(true)}
              className="flex items-center gap-1 text-amber-400 font-bold hover:text-amber-300 text-[11px] bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded transition"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-400" />
              <span>Premium</span>
            </button>

            <div className="flex items-center gap-1 text-gray-300 text-[11px]">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>28°C Bengaluru</span>
            </div>

            <button
              onClick={() => setIsSubscribeOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3 py-0.5 rounded flex items-center gap-1 shadow transition"
            >
              <BellRing className="w-3 h-3" />
              <span>SUBSCRIBE</span>
            </button>

            <Link
              href="/login"
              className="flex items-center gap-1 text-gray-300 hover:text-white text-[11px] border border-gray-700 px-2 py-0.5 rounded transition"
            >
              <Lock className="w-3 h-3 text-red-500" />
              <span>Portal Login</span>
            </Link>

            <button className="bg-red-700 hover:bg-red-800 text-white font-bold text-[11px] px-2.5 py-0.5 rounded flex items-center gap-1">
              <Tv className="w-3 h-3" />
              <span>LIVE TV</span>
            </button>
          </div>
        </div>

        {/* Main Times Now Logo Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <Link href="/" className="mx-auto md:mx-0 flex items-center gap-1">
            <span className="text-3xl sm:text-4xl font-black tracking-tighter text-[#002B49] font-serif">
              TIMES<span className="text-[#E31837] ml-1">NOW</span>
            </span>
          </Link>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative w-64">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-gray-100 text-gray-800 text-xs rounded-full border border-gray-300 focus:outline-none focus:border-red-600"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Category Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6 text-sm font-bold text-gray-800 py-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory && onSelectCategory(cat)}
                className={`whitespace-nowrap transition border-b-2 pb-0.5 ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'text-red-600 border-red-600 font-extrabold'
                    : 'border-transparent text-gray-700 hover:text-red-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        {/* Breaking News Ticker */}
        <div className="bg-slate-900 text-white text-xs py-1.5 px-4 flex items-center space-x-3 overflow-hidden">
          <span className="bg-red-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider shrink-0 uppercase animate-pulse">
            BREAKING NEWS
          </span>
          <p className="text-gray-200 truncate">
            Bengaluru Tech Institute Review Initiated • Sensex Surges 700 Points • Global AI Ethics Summit 2026 Concludes
          </p>
        </div>
      </header>

      {/* Subscribe Modal */}
      <SubscribeModal isOpen={isSubscribeOpen} onClose={() => setIsSubscribeOpen(false)} />
    </>
  );
}
