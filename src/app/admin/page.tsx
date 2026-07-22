import Link from 'next/link';
import { getArticles } from '@/app/actions/articles';
import { getActivityLogsAction } from '@/app/actions/admin';
import {
  FileText,
  Mail,
  Eye,
  Users,
  Plus,
  ArrowRight,
  CheckCircle2,
  Send,
  XCircle,
  Edit,
  Clock,
  Sparkles,
} from 'lucide-react';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardOverviewPage() {
  const articles = await getArticles('ALL');
  const activityLogs = await getActivityLogsAction();

  const publishedArticles = articles.filter((a) => a.status.toUpperCase() === 'PUBLISHED');
  const pendingArticles = articles.filter((a) => a.status.toUpperCase() === 'PENDING');
  const draftArticles = articles.filter((a) => a.status.toUpperCase() === 'DRAFT');

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[#78716c] font-medium font-serif">Good morning, Ananya</span>
          <h1 className="text-3xl font-serif text-[#1c1917] tracking-tight mt-0.5">Newsroom overview</h1>
        </div>

        <Link
          href="/admin/articles/new"
          className="self-start sm:self-auto px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-2"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>New article</span>
        </Link>
      </div>

      {/* Top 4 KPI Cards matching reference screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">PUBLISHED</span>
            <FileText className="w-4 h-4 text-[#78716c]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif font-semibold text-[#1c1917]">{publishedArticles.length}</span>
            <span className="block text-[11px] text-[#78716c] mt-0.5">Live on site</span>
          </div>
        </div>

        <div className="p-5 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">PENDING REVIEW</span>
            <Mail className="w-4 h-4 text-[#b71c1c]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif font-semibold text-[#b71c1c]">{pendingArticles.length}</span>
            <span className="block text-[11px] text-[#78716c] mt-0.5">Awaiting approval</span>
          </div>
        </div>

        <div className="p-5 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">TOTAL READS</span>
            <Eye className="w-4 h-4 text-[#78716c]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif font-semibold text-[#1c1917]">107.4k</span>
            <span className="block text-[11px] text-[#78716c] mt-0.5">Last 30 days</span>
          </div>
        </div>

        <div className="p-5 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">ACTIVE BYLINES</span>
            <Users className="w-4 h-4 text-[#78716c]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif font-semibold text-[#1c1917]">6</span>
            <span className="block text-[11px] text-[#78716c] mt-0.5">Publishing this week</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Review & Recent Activity (matching screenshot layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Review Box (2 cols) */}
        <div className="lg:col-span-2 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e4d9]">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#1c1917]">Pending review</h2>
                <p className="text-xs text-[#78716c] mt-0.5">
                  {pendingArticles.length} articles waiting for a decision
                </p>
              </div>

              <Link
                href="/admin/queue"
                className="text-xs font-semibold text-[#1c1917] hover:text-[#b71c1c] flex items-center gap-1 transition"
              >
                Open queue <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List of Pending Articles */}
            <AdminDashboardClient pendingArticles={pendingArticles} />
          </div>
        </div>

        {/* Recent Activity Timeline (1 col) matching reference screenshot */}
        <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs">
          <h2 className="text-lg font-serif font-bold text-[#1c1917] pb-4 border-b border-[#e8e4d9]">
            Recent activity
          </h2>

          <div className="mt-4 space-y-4 text-xs">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {log.action === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {log.action === 'submitted' && <Send className="w-4 h-4 text-blue-600" />}
                  {log.action === 'rejected' && <XCircle className="w-4 h-4 text-[#b71c1c]" />}
                  {log.action === 'published' && <Edit className="w-4 h-4 text-amber-600" />}
                </div>

                <div className="flex-1">
                  <p className="text-[#1c1917] font-semibold leading-tight">
                    <span className="font-bold text-[#1c1917]">{log.actor_name}</span>{' '}
                    <span className="text-[#78716c] font-normal">{log.action}</span>
                  </p>
                  <p className="text-[#44403c] font-serif font-bold text-xs mt-0.5 line-clamp-1">
                    {log.target_title}
                  </p>
                  <span className="text-[10px] text-[#a8a29e] block mt-0.5 font-serif">{log.time_ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Your Drafts / Pick up where you left off Section */}
      <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-4 mb-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1c1917]">Your drafts</h2>
            <p className="text-xs text-[#78716c] mt-0.5">Pick up where you left off.</p>
          </div>

          <Link
            href="/admin/articles"
            className="text-xs font-semibold text-[#1c1917] hover:text-[#b71c1c] flex items-center gap-1 transition"
          >
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {draftArticles.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#78716c]">
            No draft articles in progress. Start writing a new story.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {draftArticles.map((draft) => (
              <div
                key={draft.id}
                className="p-3.5 border border-[#e8e4d9] rounded-lg bg-[#f7f4ed] hover:border-[#d6d0c4] transition flex justify-between items-center"
              >
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#1c1917] line-clamp-1">{draft.title}</h4>
                  <span className="text-[10px] text-[#78716c] font-serif">Last edited 2 hours ago</span>
                </div>
                <Link
                  href="/workspace/new"
                  className="px-2.5 py-1 bg-[#efebe4] hover:bg-[#e2ddd3] text-[11px] text-[#1c1917] font-semibold rounded border border-[#d6d0c4]"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
