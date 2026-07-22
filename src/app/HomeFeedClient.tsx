'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/news';
import NewsHeader from '@/components/NewsHeader';
import ArchivesSidebar from '@/components/ArchivesSidebar';
import {
  Clock,
  Sparkles,
  Image as ImageIcon,
  Flame,
  FilterX,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface HomeFeedClientProps {
  initialArticles: Article[];
}

export default function HomeFeedClient({ initialArticles }: HomeFeedClientProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArchive, setSelectedArchive] = useState<string | null>(null);

  // Filter PUBLISHED articles
  let published = initialArticles.filter((a) => a.status.toUpperCase() === 'PUBLISHED');

  // Filter by category if selected
  if (activeCategory !== 'All') {
    published = published.filter(
      (a) =>
        (a.category_id && a.category_id.toLowerCase() === activeCategory.toLowerCase()) ||
        a.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (a.summary && a.summary.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }

  // Filter by archive date if selected
  if (selectedArchive) {
    published = published.filter((a) => {
      const artDate = new Date(a.published_at || a.created_at);
      const monthYear = artDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      return monthYear.toLowerCase() === selectedArchive.toLowerCase() || true;
    });
  }

  const heroArticle = published[0] || initialArticles[0];
  const secondaryArticles = published.slice(1, 5);
  const remainingArticles = published.slice(5);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917] flex flex-col font-sans">
      {/* Header Bar with Subscribe & Category Tabs */}
      <NewsHeader activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        {/* Active Filter Bar */}
        {(activeCategory !== 'All' || selectedArchive) && (
          <div className="mb-6 p-3.5 bg-[#b71c1c] text-white rounded-xl flex items-center justify-between shadow-xs text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span>Active Filter:</span>
              {activeCategory !== 'All' && (
                <span className="bg-white text-[#b71c1c] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  Category: {activeCategory}
                </span>
              )}
              {selectedArchive && (
                <span className="bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full font-bold">
                  Archive: {selectedArchive}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedArchive(null);
              }}
              className="flex items-center gap-1 bg-[#9a0007] hover:bg-[#800000] px-3 py-1 rounded-lg text-white font-bold transition"
            >
              <FilterX className="w-3.5 h-3.5" /> Clear Filters
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDEBAR: Archives List (interactive filtering) */}
          <ArchivesSidebar selectedArchive={selectedArchive} onSelectArchive={setSelectedArchive} />

          {/* MAIN NEWS CONTENT AREA */}
          <main className="flex-1 space-y-8">
            {heroArticle ? (
              <section className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-2">
                {/* Hero Image */}
                <div className="h-64 md:h-full bg-[#efebe4] relative">
                  {heroArticle.featured_image_url ? (
                    <img
                      src={heroArticle.featured_image_url}
                      alt={heroArticle.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-xs">No Featured Image</span>
                    </div>
                  )}
                  {heroArticle.is_breaking && (
                    <span className="absolute top-3 left-3 bg-[#b71c1c] text-white font-extrabold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase shadow-xs">
                      BREAKING NEWS
                    </span>
                  )}
                </div>

                {/* Hero Text */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#78716c] mb-2 font-serif">
                      <span className="font-bold text-[#b71c1c] uppercase">
                        {heroArticle.category_id || 'Top Story'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(heroArticle.created_at)}
                      </span>
                    </div>

                    <Link href={`/news/${heroArticle.slug}`}>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1917] font-serif leading-tight hover:text-[#b71c1c] transition">
                        {heroArticle.title}
                      </h1>
                    </Link>

                    {heroArticle.subtitle && (
                      <p className="text-[#44403c] text-sm font-serif mt-3 line-clamp-3 leading-relaxed">
                        {heroArticle.subtitle}
                      </p>
                    )}

                    {heroArticle.summary && (
                      <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-900 rounded-r font-serif">
                        <strong className="font-bold flex items-center gap-1 mb-1 text-amber-800">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Key Takeaway:
                        </strong>
                        {heroArticle.summary}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#e8e4d9] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#78716c] font-serif">
                      By {heroArticle.author?.full_name || 'Times Bureau'}
                    </span>
                    <Link
                      href={`/news/${heroArticle.slug}`}
                      className="text-xs font-bold text-[#b71c1c] hover:underline flex items-center gap-1 font-serif"
                    >
                      Read Full Article →
                    </Link>
                  </div>
                </div>
              </section>
            ) : (
              <div className="p-12 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl text-center font-serif">
                <p className="text-[#78716c] text-sm">No published articles found for this topic filter.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedArchive(null);
                  }}
                  className="mt-3 px-4 py-2 bg-[#b71c1c] text-white rounded-lg text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* SECONDARY NEWS GRID */}
            {secondaryArticles.length > 0 && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {secondaryArticles.map((art) => (
                  <div
                    key={art.id}
                    className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition flex flex-col justify-between"
                  >
                    <div>
                      {art.featured_image_url && (
                        <div className="h-40 bg-[#efebe4] overflow-hidden">
                          <img src={art.featured_image_url} alt={art.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-[#b71c1c] uppercase tracking-wider font-serif">
                          {art.category_id || art.source_name || 'News'}
                        </span>
                        <Link href={`/news/${art.slug}`}>
                          <h3 className="text-base font-bold text-[#1c1917] font-serif leading-snug hover:text-[#b71c1c] transition mt-1">
                            {art.title}
                          </h3>
                        </Link>
                        {art.subtitle && <p className="text-xs text-[#78716c] font-serif mt-1 line-clamp-2">{art.subtitle}</p>}
                      </div>
                    </div>

                    <div className="px-4 pb-4 text-[11px] text-[#78716c] font-serif flex items-center justify-between border-t border-[#e8e4d9] pt-2">
                      <span>{formatDate(art.created_at)}</span>
                      <Link href={`/news/${art.slug}`} className="text-[#b71c1c] font-bold hover:underline">
                        Read →
                      </Link>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* MORE LATEST NEWS */}
            {remainingArticles.length > 0 && (
              <section className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-5 shadow-xs space-y-4">
                <h3 className="text-lg font-extrabold text-[#1c1917] font-serif border-b border-[#e8e4d9] pb-2">
                  More Latest News Stories
                </h3>

                <div className="divide-y divide-[#e8e4d9]">
                  {remainingArticles.map((art) => (
                    <div key={art.id} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/news/${art.slug}`}>
                          <h4 className="font-bold text-sm text-[#1c1917] font-serif hover:text-[#b71c1c] transition">
                            {art.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-[#78716c] font-serif mt-1 line-clamp-1">{art.subtitle}</p>
                      </div>
                      <span className="text-[11px] text-[#78716c] font-serif shrink-0">{formatDate(art.created_at)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* RIGHT SIDEBAR: Entertainment & Lifestyle Spotlight */}
          <aside className="w-full lg:w-72 space-y-6 shrink-0">
            <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-4 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#b71c1c] font-extrabold text-sm border-b border-[#e8e4d9] pb-2 mb-3 uppercase tracking-wider font-serif">
                <Flame className="w-4 h-4 fill-[#b71c1c]" />
                <span>Entertainment Spotlight</span>
              </div>

              <div className="space-y-4">
                <Link href="/news/friday-ott-releases-sci-fi-thriller-breaks-streaming-records" className="block group">
                  <div className="h-32 bg-slate-900 rounded-lg overflow-hidden relative mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80"
                      alt="OTT Review"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#b71c1c] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Cinema Review
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1c1917] font-serif group-hover:text-[#b71c1c] transition">
                    Friday OTT Releases: Sci-Fi Thriller Breaks Streaming Records
                  </h4>
                </Link>

                <div className="border-t border-[#e8e4d9] pt-3 space-y-1">
                  <h5 className="text-xs font-bold text-[#1c1917] font-serif hover:text-[#b71c1c] cursor-pointer">
                    Celebrity Spotlight: Red Carpet Trends 2026
                  </h5>
                  <span className="text-[10px] text-[#78716c] block font-serif">3 hours ago</span>
                </div>

                <div className="border-t border-[#e8e4d9] pt-3 space-y-1">
                  <h5 className="text-xs font-bold text-[#1c1917] font-serif hover:text-[#b71c1c] cursor-pointer">
                    International Film Festival Nominees Announced
                  </h5>
                  <span className="text-[10px] text-[#78716c] block font-serif">6 hours ago</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Main Website Footer with Social Media Links */}
      <footer className="bg-[#1c1917] text-gray-300 text-xs py-10 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-col items-center gap-2">
            <p className="font-serif text-white font-black text-2xl tracking-tight">
              TIMES<span className="text-[#b71c1c]">NOW</span>
            </p>
            <p className="text-gray-400 text-xs max-w-md font-serif">
              Live 24/7 Breaking News, Business Analysis, Tech Reviews, and Global Coverage.
            </p>
          </div>

          {/* Social Media Link Buttons in Footer */}
          <div className="flex justify-center items-center gap-4 py-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#b71c1c] text-white flex items-center justify-center transition"
              title="Follow on Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition"
              title="Follow on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#0A66C2] text-white flex items-center justify-center transition"
              title="Follow on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 text-white flex items-center justify-center transition"
              title="Follow on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 text-white flex items-center justify-center transition"
              title="Subscribe on YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#25D366] text-white flex items-center justify-center transition"
              title="Join WhatsApp Channel"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-gray-500 gap-4">
            <p>© 2026 Times Now Media Network. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-white">Privacy Policy</Link>
              <Link href="/" className="hover:text-white">Terms of Service</Link>
              <Link href="/login" className="hover:text-white text-[#b71c1c] font-bold">Newsroom Portal Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
