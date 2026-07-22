import { getArticleBySlug } from '@/app/actions/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NewsHeader from '@/components/NewsHeader';
import ArchivesSidebar from '@/components/ArchivesSidebar';
import DOMPurify from 'isomorphic-dompurify';
import { Clock, Share2, Bookmark, Sparkles, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ArticleShareFooter from './ArticleShareFooter';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917] flex flex-col font-sans">
      <NewsHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716c] hover:text-[#b71c1c] mb-6 font-serif"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home Feed
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR: Archives */}
          <ArchivesSidebar />

          {/* MAIN ARTICLE BODY */}
          <article className="flex-1 bg-[#fdfcf9] border border-[#e8e4d9] rounded-2xl p-6 sm:p-10 shadow-xs max-w-4xl">
            {/* Article Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1917] font-serif leading-tight">
              {article.title}
            </h1>

            {/* Subtitle / Deck */}
            {article.subtitle && (
              <p className="text-lg sm:text-xl text-[#44403c] font-serif mt-4 leading-relaxed font-normal">
                {article.subtitle}
              </p>
            )}

            {/* Author Meta Bar */}
            <div className="flex items-center justify-between py-4 my-6 border-y border-[#e8e4d9] text-xs text-[#78716c] font-serif">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b71c1c] text-white font-bold flex items-center justify-center font-serif text-sm">
                  {article.author?.full_name?.charAt(0) || 'T'}
                </div>
                <div>
                  <span className="font-bold text-[#1c1917] block">
                    By {article.author?.full_name || 'Times News Bureau'}
                  </span>
                  <span className="flex items-center gap-1 text-[#78716c]">
                    <Clock className="w-3.5 h-3.5" /> Published on {formatDate(article.published_at || article.created_at)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-[#78716c] hover:text-[#b71c1c] transition" title="Bookmark Article">
                  <Bookmark className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Featured Image Display */}
            {article.featured_image_url && (
              <div className="w-full h-80 sm:h-96 bg-[#efebe4] rounded-xl overflow-hidden mb-8 border border-[#e2ddd3]">
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* AI Summary Box */}
            {article.summary && (
              <div className="mb-8 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-950 font-serif">
                <strong className="text-amber-900 font-bold text-sm flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" /> Key Takeaways / AI Summary
                </strong>
                <p className="text-sm leading-relaxed">{article.summary}</p>
              </div>
            )}

            {/* Sanitized HTML Body */}
            <div
              className="prose prose-lg max-w-none text-[#292524] font-serif leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Social Media Share Footer Component */}
            <ArticleShareFooter title={article.title} slug={article.slug} />
          </article>
        </div>
      </main>
    </div>
  );
}
