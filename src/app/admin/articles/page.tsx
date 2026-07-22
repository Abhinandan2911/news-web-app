import Link from 'next/link';
import { getArticles } from '@/app/actions/articles';
import ArticlesTableClient from './ArticlesTableClient';
import { FileText, Plus } from 'lucide-react';

export default async function AdminArticlesPage() {
  const articles = await getArticles('ALL');

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e4d9] pb-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Articles & Content Catalog</h1>
          <p className="text-xs text-[#78716c] mt-0.5">
            Manage live news stories, retract published posts, or force-edit editorial content.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" /> Direct Publish Article
        </Link>
      </div>

      <ArticlesTableClient initialArticles={articles} />
    </div>
  );
}
