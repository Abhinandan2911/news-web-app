import { getArticles } from '@/app/actions/articles';
import ReviewQueueClient from '../ReviewQueueClient';
import { Inbox, CheckCircle2 } from 'lucide-react';

export default async function AdminQueuePage() {
  const articles = await getArticles('ALL');
  const pendingArticles = articles.filter(a => a.status.toUpperCase() === 'PENDING');

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-[#e8e4d9] pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917] flex items-center gap-2">
            <Inbox className="w-6 h-6 text-[#b71c1c]" /> Approval Queue
          </h1>
          <p className="text-xs text-[#78716c] mt-0.5 font-serif">
            Review submitted news drafts from employee writers before publishing to readers.
          </p>
        </div>

        <span className="px-3 py-1 bg-[#b71c1c] text-white text-xs font-bold rounded-full">
          {pendingArticles.length} Pending Decision
        </span>
      </div>

      {/* Review Queue Client Component */}
      <ReviewQueueClient articles={articles} />
    </div>
  );
}
