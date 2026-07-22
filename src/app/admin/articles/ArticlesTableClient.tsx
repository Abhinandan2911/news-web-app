'use client';

import { useState } from 'react';
import { Article } from '@/types/news';
import { reviewArticle } from '@/app/actions/articles';
import { CheckCircle2, Clock, XCircle, FileEdit, Eye, Flame, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface ArticlesTableClientProps {
  initialArticles: Article[];
}

export default function ArticlesTableClient({ initialArticles }: ArticlesTableClientProps) {
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'PENDING' | 'DRAFT' | 'REJECTED'>('ALL');
  const [articles, setArticles] = useState(initialArticles);

  const filtered = filter === 'ALL' ? articles : articles.filter(a => a.status.toUpperCase() === filter);

  async function handleRetract(id: string) {
    await reviewArticle(id, 'REJECTED', 'Retracted from live publishing by Admin.');
    setArticles(articles.map(a => a.id === id ? { ...a, status: 'REJECTED', rejection_reason: 'Retracted by Admin.' } : a));
  }

  async function handlePublish(id: string) {
    await reviewArticle(id, 'PUBLISHED');
    setArticles(articles.map(a => a.id === id ? { ...a, status: 'PUBLISHED' } : a));
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {(['ALL', 'PUBLISHED', 'PENDING', 'DRAFT', 'REJECTED'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg border transition ${
              filter === st
                ? 'bg-[#1c1917] text-white border-[#1c1917]'
                : 'bg-[#fdfcf9] text-[#44403c] border-[#e8e4d9] hover:bg-[#f4f0e8]'
            }`}
          >
            {st} ({st === 'ALL' ? articles.length : articles.filter(a => a.status.toUpperCase() === st).length})
          </button>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-[#1c1917] font-serif border-collapse">
          <thead className="bg-[#f7f4ed] border-b border-[#e8e4d9] text-[11px] uppercase font-bold text-[#78716c] tracking-wider">
            <tr>
              <th className="p-3.5">Article Title</th>
              <th className="p-3.5">Author</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e4d9]">
            {filtered.map((art) => {
              const st = art.status.toUpperCase();
              return (
                <tr key={art.id} className="hover:bg-[#fcfaf5] transition">
                  <td className="p-3.5 font-bold max-w-xs">
                    <div className="line-clamp-2">{art.title}</div>
                    {art.subtitle && <p className="text-[11px] text-[#78716c] font-normal line-clamp-1 mt-0.5">{art.subtitle}</p>}
                  </td>
                  <td className="p-3.5 font-sans text-[11px] text-[#44403c]">
                    {art.author?.full_name || 'Staff Writer'}
                  </td>
                  <td className="p-3.5 font-sans">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase border ${
                      st === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      st === 'PENDING' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                      st === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-300' :
                      'bg-gray-100 text-gray-800 border-gray-300'
                    }`}>
                      {st}
                    </span>
                  </td>
                  <td className="p-3.5 text-[11px] text-[#78716c] font-sans whitespace-nowrap">
                    {formatDate(art.created_at)}
                  </td>
                  <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                    {st === 'PUBLISHED' && (
                      <>
                        <Link
                          href={`/news/${art.slug}`}
                          target="_blank"
                          className="px-2.5 py-1 bg-[#efebe4] hover:bg-[#e2ddd3] text-[11px] text-[#1c1917] font-semibold rounded border border-[#d6d0c4]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleRetract(art.id)}
                          className="px-2.5 py-1 bg-[#b71c1c] text-white text-[11px] font-semibold rounded hover:bg-[#9a0007]"
                        >
                          Unpublish
                        </button>
                      </>
                    )}
                    {st !== 'PUBLISHED' && (
                      <button
                        onClick={() => handlePublish(art.id)}
                        className="px-2.5 py-1 bg-emerald-700 text-white text-[11px] font-semibold rounded hover:bg-emerald-800"
                      >
                        Publish
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
