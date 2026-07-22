'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Save, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import TipTapEditor from '@/components/TipTapEditor';
import { createArticle } from '@/app/actions/articles';

export default function AdminNewArticlePage() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-1.5 hover:bg-[#e2ddd3] rounded-lg text-[#78716c] hover:text-[#1c1917] transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Article Creator</h1>
            <p className="text-xs text-[#78716c] mt-0.5 font-serif">
              Draft, compose, and publish news stories directly with editor access.
            </p>
          </div>
        </div>

        <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full font-semibold font-serif">
          Status: Editing Story
        </span>
      </div>

      {/* Main Form inside Admin Layout */}
      <form
        action={async (formData) => {
          setSubmitting(true);
          formData.set('content', content);
          formData.set('role', 'admin');
          await createArticle(formData);
        }}
        className="space-y-6 bg-[#fdfcf9] border border-[#e8e4d9] p-6 rounded-2xl shadow-xs"
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
            placeholder="e.g. Sensex Surges 700 Points Following Quarterly Earnings"
            className="w-full px-4 py-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-lg font-serif font-bold text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
          />
        </div>

        {/* Subtitle / Deck Headline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#78716c] mb-2 font-serif">
            Subtitle / Deck Headline
          </label>
          <input
            type="text"
            name="subtitle"
            placeholder="Brief subtitle summarizing key story outcome"
            className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
          />
        </div>

        {/* Featured Image URL with live preview */}
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
              <img src={imageUrl} alt="Upload Preview" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-[#1c1917]/80 px-2.5 py-1 rounded text-[10px] text-white font-serif">
                Featured Image Preview
              </span>
            </div>
          )}
        </div>

        {/* Key Highlights / AI Summary */}
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
            placeholder="Bullet point highlights or short reader summary..."
            className="w-full px-4 py-2.5 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs font-serif text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:border-[#b71c1c] transition"
          />
        </div>

        {/* News Source Attribution */}
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

        {/* Form Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-6 border-t border-[#e8e4d9]">
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
            className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit for Review
          </button>

          <button
            type="submit"
            name="actionType"
            value="PUBLISHED"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Direct Publish Live
          </button>
        </div>
      </form>
    </div>
  );
}
