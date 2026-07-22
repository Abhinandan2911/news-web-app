'use client';

import { useState } from 'react';
import { Article } from '@/types/news';
import { reviewArticle } from '@/app/actions/articles';
import { CheckCircle2, XCircle, Eye, AlertCircle, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { formatDate } from '@/lib/utils';

interface ReviewQueueClientProps {
  articles: Article[];
}

export default function ReviewQueueClient({ articles }: ReviewQueueClientProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [rejectingArticle, setRejectingArticle] = useState<Article | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  const pendingArticles = articles.filter(a => a.status.toUpperCase() === 'PENDING');
  const allOtherArticles = articles.filter(a => a.status.toUpperCase() !== 'PENDING');

  async function handleApprove(articleId: string) {
    setLoading(true);
    await reviewArticle(articleId, 'PUBLISHED');
    setSelectedArticle(null);
    setLoading(false);
  }

  async function handleRejectSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rejectingArticle || !rejectionReason.trim()) return;
    setLoading(true);
    await reviewArticle(rejectingArticle.id, 'REJECTED', rejectionReason);
    setRejectingArticle(null);
    setRejectionReason('');
    setSelectedArticle(null);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      {/* Pending Queue Section */}
      <section>
        {pendingArticles.length === 0 ? (
          <div className="p-8 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl text-center text-[#78716c]">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 opacity-80" />
            <p className="font-serif font-bold text-[#1c1917] text-base">Approval Queue is Clean</p>
            <p className="text-xs mt-1 font-serif">All submitted news articles have been reviewed by editors.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 bg-[#fdfcf9] border border-[#e8e4d9] hover:border-[#d6d0c4] rounded-xl transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Article Thumbnail Preview */}
                  <div className="w-24 h-20 bg-[#efebe4] rounded-lg overflow-hidden shrink-0 border border-[#e2ddd3] flex items-center justify-center">
                    {article.featured_image_url ? (
                      <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center text-[#a8a29e] text-xs gap-1">
                        <ImageIcon className="w-5 h-5" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 text-xs text-[#b71c1c] font-bold font-serif">
                      <span>Submitted by {article.author?.full_name || article.author?.username || 'Staff Writer'}</span>
                      <span>•</span>
                      <span className="text-[#78716c] font-normal">{formatDate(article.created_at)}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#1c1917] leading-snug">{article.title}</h3>
                    {article.subtitle && <p className="text-xs text-[#78716c] font-serif mt-1 line-clamp-1">{article.subtitle}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-3.5 py-2 bg-[#f4f0e8] hover:bg-[#e2ddd3] text-[#1c1917] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border border-[#e2ddd3]"
                  >
                    <Eye className="w-4 h-4 text-blue-700" /> Live Preview
                  </button>

                  <button
                    onClick={() => handleApprove(article.id)}
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                  </button>

                  <button
                    onClick={() => setRejectingArticle(article)}
                    disabled={loading}
                    className="px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Article Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-[#1c1917]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#e8e4d9] flex items-center justify-between bg-[#f7f4ed]">
              <span className="text-xs font-bold text-[#b71c1c] uppercase tracking-wider font-serif">
                Article Moderation & Live Reader Preview
              </span>
              <button onClick={() => setSelectedArticle(null)} className="p-1 text-[#78716c] hover:text-[#1c1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h1 className="text-2xl font-serif font-bold text-[#1c1917]">{selectedArticle.title}</h1>
              {selectedArticle.subtitle && <p className="text-base font-serif text-[#44403c]">{selectedArticle.subtitle}</p>}

              {selectedArticle.featured_image_url && (
                <div className="w-full h-64 bg-[#efebe4] rounded-xl overflow-hidden border border-[#e8e4d9]">
                  <img src={selectedArticle.featured_image_url} alt={selectedArticle.title} className="w-full h-full object-cover" />
                </div>
              )}

              {selectedArticle.summary && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r text-xs text-amber-900 font-serif">
                  <strong className="font-bold flex items-center gap-1 mb-1 text-amber-800">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Key Takeaway Summary:
                  </strong>
                  {selectedArticle.summary}
                </div>
              )}

              <div
                className="prose max-w-none text-xs text-[#292524] font-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }}
              />
            </div>

            <div className="p-4 border-t border-[#e8e4d9] bg-[#f7f4ed] flex justify-end gap-3">
              <button
                onClick={() => handleApprove(selectedArticle.id)}
                disabled={loading}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve & Publish
              </button>
              <button
                onClick={() => {
                  setRejectingArticle(selectedArticle);
                  setSelectedArticle(null);
                }}
                disabled={loading}
                className="px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject with Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Feedback Modal */}
      {rejectingArticle && (
        <div className="fixed inset-0 bg-[#1c1917]/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#b71c1c] font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Reject Submission with Feedback</span>
            </div>

            <p className="text-xs text-[#44403c] font-serif">
              Specify rejection details for <strong className="text-[#1c1917]">{rejectingArticle.title}</strong> so the author can address feedback.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <textarea
                required
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Please verify source statistics and fix main header typo before resubmitting."
                className="w-full p-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c] font-serif"
              />

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRejectingArticle(null)}
                  className="px-3.5 py-1.5 bg-[#e2ddd3] text-[#44403c] rounded-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !rejectionReason.trim()}
                  className="px-4 py-1.5 bg-[#b71c1c] hover:bg-[#9a0007] text-white rounded-md text-xs font-bold shadow-xs disabled:opacity-50"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
