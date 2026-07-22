'use client';

import { useState } from 'react';
import { Article } from '@/types/news';
import { reviewArticle } from '@/app/actions/articles';
import { Eye, CheckCircle2, XCircle, X, Sparkles, AlertCircle } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';

interface AdminDashboardClientProps {
  pendingArticles: Article[];
}

export default function AdminDashboardClient({ pendingArticles }: AdminDashboardClientProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [rejectingArticle, setRejectingArticle] = useState<Article | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

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

  if (pendingArticles.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-[#78716c]">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-80" />
        No pending articles. All submissions have been processed.
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-[#e8e4d9]">
        {pendingArticles.map((article) => (
          <div key={article.id} className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-sm text-[#1c1917] hover:text-[#b71c1c] transition">
                {article.title}
              </h3>
              <p className="text-xs text-[#78716c] mt-0.5 font-serif">
                {article.author?.full_name || article.author?.username || 'Staff Writer'} ·{' '}
                <span className="font-bold text-[#44403c]">{article.category_id || 'India'}</span> · submitted 2h ago
              </p>
            </div>

            <button
              onClick={() => setSelectedArticle(article)}
              className="px-3.5 py-1.5 bg-[#f4f0e8] hover:bg-[#e2ddd3] text-[#1c1917] text-xs font-semibold rounded-md border border-[#e2ddd3] transition shrink-0"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Review / Preview Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-[#1c1917]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#e8e4d9] flex items-center justify-between bg-[#f7f4ed]">
              <span className="text-xs font-bold text-[#b71c1c] uppercase tracking-wider">
                Article Review & Moderation
              </span>
              <button onClick={() => setSelectedArticle(null)} className="p-1 text-[#78716c] hover:text-[#1c1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h1 className="text-2xl font-serif font-bold text-[#1c1917]">{selectedArticle.title}</h1>
              {selectedArticle.subtitle && (
                <p className="text-sm text-[#44403c] font-serif">{selectedArticle.subtitle}</p>
              )}

              {selectedArticle.featured_image_url && (
                <div className="w-full h-60 bg-[#efebe4] rounded-xl overflow-hidden border border-[#e8e4d9]">
                  <img src={selectedArticle.featured_image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              {selectedArticle.summary && (
                <div className="p-3.5 bg-amber-50 border-l-4 border-amber-500 rounded-r text-xs text-amber-900 font-serif">
                  <strong className="font-bold flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Key Summary:
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
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve & Publish
              </button>
              <button
                onClick={() => {
                  setRejectingArticle(selectedArticle);
                  setSelectedArticle(null);
                }}
                disabled={loading}
                className="px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject with Reason
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
              Specify rejection reasons for <strong className="text-[#1c1917]">{rejectingArticle.title}</strong> so the author can resolve issues.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <textarea
                required
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Please verify source statistics and fix main header typo before resubmitting."
                className="w-full p-3 bg-[#f7f4ed] border border-[#e2ddd3] rounded-xl text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c]"
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
                  Submit Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
