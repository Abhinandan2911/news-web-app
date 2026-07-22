import Link from 'next/link';
import { getArticles } from '@/app/actions/articles';
import { logoutAction } from '@/app/actions/auth';
import { Plus, Newspaper, FileEdit, Clock, CheckCircle2, XCircle, LogOut, ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function WorkspaceDashboardPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917]">
      {/* Top Workspace Header */}
      <header className="border-b border-[#e8e4d9] bg-[#fdfcf9] sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-black font-serif text-[#1c1917]">
              <Newspaper className="w-6 h-6 text-[#b71c1c]" />
              <span>TIMES<span className="text-[#b71c1c]">NOW</span></span>
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#efebe4] border border-[#e2ddd3] text-[#44403c] font-semibold">
              Writer Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/workspace/new"
              className="px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Write New Article
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="px-3 py-2 text-[#78716c] hover:text-[#1c1917] hover:bg-[#efebe4] rounded-lg text-xs transition flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e8e4d9]">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1c1917]">Writer Dashboard</h1>
            <p className="text-[#78716c] text-xs font-serif mt-1">
              Draft news stories, submit for editor approval, and view rejection feedback.
            </p>
          </div>

          <Link
            href="/workspace/new"
            className="self-start md:self-auto px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-2"
          >
            <FileEdit className="w-4 h-4" />
            Create Article Draft
          </Link>
        </div>

        {/* Article Grid / Table */}
        {articles.length === 0 ? (
          <div className="p-12 text-center bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl">
            <FileEdit className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-[#1c1917]">No articles created yet</h3>
            <p className="text-[#78716c] text-xs font-serif mt-1 mb-6">Start writing your first news article now.</p>
            <Link
              href="/workspace/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold text-xs rounded-lg shadow-xs"
            >
              Write Article
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => {
              const statusUpper = article.status.toUpperCase();
              return (
                <div
                  key={article.id}
                  className="bg-[#fdfcf9] border border-[#e8e4d9] hover:border-[#d6d0c4] rounded-xl p-5 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Thumbnail Image */}
                    <div className="w-24 h-20 bg-[#efebe4] rounded-lg overflow-hidden shrink-0 border border-[#e2ddd3] flex items-center justify-center">
                      {article.featured_image_url ? (
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-[#a8a29e] text-xs gap-1">
                          <ImageIcon className="w-5 h-5 text-[#a8a29e]" />
                          <span>No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                        {statusUpper === 'PUBLISHED' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        )}
                        {statusUpper === 'PENDING' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3.5 h-3.5" /> Pending Review
                          </span>
                        )}
                        {statusUpper === 'DRAFT' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 border border-gray-300">
                            <FileEdit className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                        {statusUpper === 'REJECTED' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                            <XCircle className="w-3.5 h-3.5" /> Action Needed / Rejected
                          </span>
                        )}
                        <span className="text-xs text-[#78716c] font-serif">{formatDate(article.created_at)}</span>
                      </div>

                      <h2 className="text-lg font-serif font-bold text-[#1c1917] leading-snug hover:text-[#b71c1c] transition">
                        {article.title}
                      </h2>

                      {article.subtitle && (
                        <p className="text-xs text-[#78716c] font-serif mt-1 line-clamp-1">{article.subtitle}</p>
                      )}

                      {/* Rejection Feedback alert box */}
                      {statusUpper === 'REJECTED' && article.rejection_reason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 font-serif">
                          <strong className="font-bold text-[#b71c1c]">Editor Rejection Feedback: </strong>
                          {article.rejection_reason}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {statusUpper === 'PUBLISHED' && (
                      <Link
                        href={`/news/${article.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-[#efebe4] hover:bg-[#e2ddd3] text-[#1c1917] text-xs font-semibold rounded-lg transition flex items-center gap-1 border border-[#d6d0c4]"
                      >
                        View Live <ArrowUpRight className="w-3.5 h-3.5 text-[#b71c1c]" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
