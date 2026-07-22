'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Newspaper, ArrowLeft, Send, Save, Image as ImageIcon, Sparkles } from 'lucide-react';
import TipTapEditor from '@/components/TipTapEditor';
import { createArticle } from '@/app/actions/articles';

export default function NewArticlePage() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917]">
      {/* Header */}
      <header className="border-b border-[#e8e4d9] bg-[#fdfcf9] sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/workspace"
              className="p-2 hover:bg-[#efebe4] rounded-lg text-[#78716c] hover:text-[#1c1917] transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/" className="flex items-center gap-2 text-xl font-black font-serif text-[#1c1917] tracking-wider">
              <Newspaper className="w-6 h-6 text-[#b71c1c]" />
              <span>TIMES<span className="text-[#b71c1c]">NOW</span></span>
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#efebe4] border border-[#e2ddd3] text-[#44403c] font-semibold">
              Article Creator
            </span>
          </div>

          <div className="text-xs text-[#78716c] font-serif hidden sm:block">
            Status: <span className="text-amber-800 font-bold">Editing Draft</span>
          </div>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <form
          action={async (formData) => {
            setSubmitting(true);
            formData.set('content', content);
            await createArticle(formData);
          }}
          className="space-y-6 bg-[#fdfcf9] border border-[#e8e4d9] p-6 sm:p-8 rounded-2xl shadow-xs"
        >
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
              Article Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Sensex Surges 700 Points Following Tech Quarterly Earnings"
              className="w-full px-4 py-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-lg font-serif font-bold text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
              Subtitle / Deck Headline
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="Brief subtitle summarizing key outcome"
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          {/* Featured Image URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
              Featured Image URL (Optional)
            </label>
            <div className="relative flex-1">
              <input
                type="url"
                name="featured_image_url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
              />
              <ImageIcon className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-3" />
            </div>
            {imageUrl && (
              <div className="mt-3 relative w-full h-48 bg-[#efebe4] rounded-xl overflow-hidden border border-[#e2ddd3]">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 bg-[#1c1917]/80 px-2.5 py-1 rounded text-[10px] text-white font-serif">
                  Featured Image Upload Preview
                </span>
              </div>
            )}
          </div>

          {/* AI Summary / Bullet Highlights */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] font-serif">
                Key Highlights / Summary Excerpt
              </label>
              <span className="text-[11px] text-[#b71c1c] flex items-center gap-1 font-serif font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> AI Editorial Assistant
              </span>
            </div>
            <textarea
              name="summary"
              rows={2}
              placeholder="3 bullet point highlights or short excerpt for readers..."
              className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
            />
          </div>

          {/* Source Attribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
                News Source Attribution
              </label>
              <input
                type="text"
                name="source_name"
                defaultValue="Times Bureau"
                className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] focus:outline-none focus:border-[#b71c1c] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
                Original Source URL (Optional)
              </label>
              <input
                type="url"
                name="source_url"
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
              />
            </div>
          </div>

          {/* TipTap Rich Text Editor Surface */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
              Article Content Body (Rich Text Editor) *
            </label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#e8e4d9]">
            <button
              type="submit"
              name="actionType"
              value="DRAFT"
              disabled={submitting}
              className="px-5 py-2.5 bg-[#efebe4] hover:bg-[#e2ddd3] text-[#1c1917] font-semibold rounded-xl text-xs transition border border-[#d6d0c4] flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </button>

            <button
              type="submit"
              name="actionType"
              value="PENDING"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit for Editor Review
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
