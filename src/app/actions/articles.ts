'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Article, ArticleStatus } from '@/types/news';
import slugify from 'slugify';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const IS_PLACEHOLDER_SUPABASE =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('placeholder') ||
  supabaseAnonKey.includes('placeholder');

// Rich, high-quality sample news dataset across all categories
let mockArticles: Article[] = [
  {
    id: 'art-bengaluru-tech',
    title: "Bengaluru Student's Distress Note Reveals Tech Campus High Stress Culture",
    slug: 'bengaluru-students-distress-note-reveals-tech-campus-culture',
    subtitle: 'High-level committee appointed to investigate academic pressure, curfew norms, and mental health counseling.',
    content: `
      <p>A disturbing note recovered from a prominent institute in Bengaluru has brought renewed focus onto academic pressure and mental wellness support systems across major technical universities in India.</p>
      <h2>Comprehensive Review Committee Formed</h2>
      <p>State education officials and university leadership held an emergency meeting on Monday to outline immediate reforms. A three-member independent committee will review existing workload guidelines, exam scheduling, and student counseling services.</p>
      <blockquote>"Student well-being and psychological support must take priority over rigid academic performance metrics," stated senior educational official standard committee spokesman.</blockquote>
      <p>Campus representatives announced round-the-clock anonymous helpline services and mandatory wellness breaks starting this week.</p>
    `,
    summary: 'Investigation launched into academic pressure following recovered student note at Bengaluru tech institute. Independent committee appointed.',
    featured_image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    source_name: 'Times Now Special Desk',
    category_id: 'India',
    author_id: 'author-1',
    status: 'PUBLISHED',
    is_featured: true,
    is_breaking: true,
    published_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    author: {
      id: 'author-1',
      username: 'priya_sharma',
      full_name: 'Priya Sharma',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-sensex-surge',
    title: 'Sensex Jumps Over 700 Points as Tech & Banking Stocks Surge',
    slug: 'sensex-jumps-over-700-points-tech-banking-stocks-surge',
    subtitle: 'Strong quarterly earnings and global market rallies boost domestic investor sentiment across key sectors.',
    content: `
      <p>Indian benchmark indices recorded remarkable gains on Monday, with the BSE Sensex soaring over 700 points to cross key resistance levels, driven by heavy buying in IT giants and major banking institutions.</p>
      <h2>Corporate Earnings Fuel Market Optimism</h2>
      <p>Positive Q1 earnings reports from blue-chip technology firms provided strong momentum, alongside favorable global macroeconomic signals from Asian and European exchanges.</p>
      <p>Market analysts predict sustained momentum in mid-cap IT and green energy stocks through the upcoming quarterly cycle.</p>
    `,
    summary: 'Market rally driven by strong corporate quarterly earnings, tech stock surges, and positive global cues.',
    featured_image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    source_name: 'Markets & Finance Bureau',
    category_id: 'Business',
    author_id: 'author-2',
    status: 'PUBLISHED',
    is_featured: false,
    is_breaking: false,
    published_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    author: {
      id: 'author-2',
      username: 'rohan_mehta',
      full_name: 'Rohan Mehta',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-ai-summit',
    title: 'Global Tech Innovation Summit 2026 Focuses on AI Safety & Next-Gen Robotics',
    slug: 'global-tech-innovation-summit-2026-ai-safety',
    subtitle: 'Delegates from 40 nations gather in Geneva to establish international AI governance accords.',
    content: `
      <p>Over 3,000 artificial intelligence researchers, policy analysts, and technology CEOs convened at the Geneva Tech Summit to finalize unified protocols for generative AI validation and autonomous machine safety.</p>
      <h2>Key Takeaways from the Accord</h2>
      <ul>
        <li>Mandatory watermarking for synthetic audiovisual content.</li>
        <li>Open safety evaluations prior to deploying frontier models exceeding compute thresholds.</li>
        <li>International framework for AI in medical diagnostics and power grid management.</li>
      </ul>
    `,
    summary: '40 nations ratify Geneva AI Safety Accord governing frontier models and robotic safety benchmarks.',
    featured_image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    source_name: 'Tech World Bureau',
    category_id: 'Tech',
    author_id: 'author-3',
    status: 'PUBLISHED',
    is_featured: false,
    is_breaking: false,
    published_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    author: {
      id: 'author-3',
      username: 'alex_chen',
      full_name: 'Alex Chen',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-world-cup',
    title: 'FIFA World Cup 2026 Stadium Renovations Completed Ahead of Schedule',
    slug: 'fifa-world-cup-2026-stadium-renovations-completed',
    subtitle: 'Host cities across North America prepare for historic expanded tournament featuring 48 nations.',
    content: `
      <p>Organizers confirmed that all major venue upgrades, high-speed transit connectors, and fan zone infrastructure have passed final technical inspections six months before kickoff.</p>
      <p>Ticket sales have broken previous records with fans from over 150 countries reserving seats for group stage matches.</p>
    `,
    summary: 'Stadium upgrades completed six months early for 48-team FIFA World Cup 2026.',
    featured_image_url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    source_name: 'Sports Desk',
    category_id: 'Sports',
    author_id: 'author-1',
    status: 'PUBLISHED',
    is_featured: false,
    is_breaking: false,
    published_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    author: {
      id: 'author-1',
      username: 'priya_sharma',
      full_name: 'Priya Sharma',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-ott-review',
    title: 'Friday OTT Blockbuster Releases: Epic Sci-Fi Thriller Breaks Streaming Records',
    slug: 'friday-ott-releases-sci-fi-thriller-breaks-streaming-records',
    subtitle: 'Critical acclaim and audience hype propel new cinematic mystery to top charts globally.',
    content: `
      <p>The highly anticipated streaming film premiered midnight Friday and achieved 45 million watch-hours within its first 24 hours, setting new viewership benchmarks across major digital platforms.</p>
      <p>Critics praised the visually stunning cinematography, intricate plot twists, and powerful lead performances.</p>
    `,
    summary: 'Record-breaking streaming numbers achieved by new Friday OTT sci-fi release.',
    featured_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    source_name: 'Entertainment Bureau',
    category_id: 'Entertainment',
    author_id: 'author-2',
    status: 'PUBLISHED',
    is_featured: false,
    is_breaking: false,
    published_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    author: {
      id: 'author-2',
      username: 'rohan_mehta',
      full_name: 'Rohan Mehta',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-crypto-bitcoin',
    title: 'Crypto Market Resurgence: Major Regulatory Clarity Boosts Institutional Adoption',
    slug: 'crypto-market-resurgence-regulatory-clarity-boosts-adoption',
    subtitle: 'New international clearing house guidelines pave way for pension funds and sovereign wealth investment.',
    content: `
      <p>Digital asset markets reached multi-year highs today as global regulators issued clear compliance frameworks for asset-backed tokens and decentralized finance protocols.</p>
    `,
    summary: 'Institutional crypto adoption accelerates following international regulatory compliance guidelines.',
    featured_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    source_name: 'Crypto & Tech Desk',
    category_id: 'Crypto',
    author_id: 'author-3',
    status: 'PUBLISHED',
    is_featured: false,
    is_breaking: false,
    published_at: new Date(Date.now() - 3600000 * 30).toISOString(),
    created_at: new Date(Date.now() - 3600000 * 32).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 30).toISOString(),
    author: {
      id: 'author-3',
      username: 'alex_chen',
      full_name: 'Alex Chen',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-pending-clean-energy',
    title: 'Clean Energy Accord: Solar Grid Expansion Project Proposed for Southern Region',
    slug: 'clean-energy-accord-solar-grid-expansion-project',
    subtitle: 'Projected to add 10 Gigawatts of renewable power to regional grid by late 2027.',
    content: `
      <p>A joint consortium of renewable energy firms has submitted plans for a mega-scale solar and battery storage park spanning 15,000 acres.</p>
    `,
    summary: '10 GW solar expansion project submitted for approval.',
    featured_image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    source_name: 'Green Energy Desk',
    category_id: 'World',
    author_id: 'author-1',
    status: 'PENDING',
    is_featured: false,
    is_breaking: false,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    author: {
      id: 'author-1',
      username: 'priya_sharma',
      full_name: 'Priya Sharma',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: 'art-rejected-sample',
    title: 'Draft Report on Local Infrastructure Updates in Urban Zones',
    slug: 'draft-report-local-infrastructure-updates',
    subtitle: 'Preliminary municipal budget allocations outlined for road resurfacing.',
    content: '<p>Initial budget allocation draft presented to municipal board.</p>',
    summary: 'Municipal infrastructure draft proposal.',
    featured_image_url: '',
    source_name: 'Civic Desk',
    category_id: 'India',
    author_id: 'author-1',
    status: 'REJECTED',
    rejection_reason: 'Please verify exact budget figures with municipal board secretary before resubmitting.',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    author: {
      id: 'author-1',
      username: 'priya_sharma',
      full_name: 'Priya Sharma',
      role: 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  }
];

export async function getArticles(statusFilter?: ArticleStatus | 'ALL') {
  if (!IS_PLACEHOLDER_SUPABASE) {
    try {
      const supabase = await createClient();
      let query = supabase.from('articles').select('*, author:profiles(*)').order('created_at', { ascending: false });

      if (statusFilter && statusFilter !== 'ALL') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Article[];
      }
    } catch {
      // Fallback to mock store
    }
  }

  if (!statusFilter || statusFilter === 'ALL') {
    return mockArticles;
  }
  return mockArticles.filter((a) => a.status.toUpperCase() === statusFilter.toUpperCase());
}

export async function getArticleBySlug(slug: string) {
  if (!IS_PLACEHOLDER_SUPABASE) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('articles')
        .select('*, author:profiles(*)')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return data as Article;
      }
    } catch {
      // Fallback
    }
  }

  return mockArticles.find((a) => a.slug === slug) || mockArticles[0];
}

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const content = formData.get('content') as string;
  const summary = formData.get('summary') as string;
  const featured_image_url = formData.get('featured_image_url') as string;
  const source_name = formData.get('source_name') as string;
  const actionType = formData.get('actionType') as 'DRAFT' | 'PENDING' | 'PUBLISHED';
  const role = formData.get('role') as string;

  const baseSlug = slugify(title, { lower: true, strict: true }) || 'news-article';
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

  let finalStatus: ArticleStatus = actionType || 'DRAFT';
  if (role === 'admin' || role === 'editor') {
    if (actionType === 'PUBLISHED') {
      finalStatus = 'PUBLISHED';
    }
  }

  const newArticle: Article = {
    id: `art-${Date.now()}`,
    title,
    slug,
    subtitle: subtitle || null,
    content,
    summary: summary || title.substring(0, 120),
    featured_image_url: featured_image_url || null,
    source_name: source_name || 'Times Now Staff Bureau',
    status: finalStatus,
    category_id: 'India',
    rejection_reason: null,
    is_featured: false,
    is_breaking: false,
    view_count: 0,
    published_at: finalStatus === 'PUBLISHED' ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author: {
      id: 'current-user-id',
      username: 'staff_writer',
      full_name: 'Current Staff Writer',
      role: (role as any) || 'author',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  };

  if (!IS_PLACEHOLDER_SUPABASE) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      await supabase.from('articles').insert({
        title,
        slug,
        subtitle,
        content,
        summary,
        featured_image_url,
        source_name,
        status: finalStatus,
        author_id: user?.id || null,
        published_at: finalStatus === 'PUBLISHED' ? new Date().toISOString() : null,
      });
    } catch {
      // Ignore
    }
  }

  mockArticles.unshift(newArticle);

  revalidatePath('/workspace');
  revalidatePath('/admin');
  revalidatePath('/admin/queue');
  revalidatePath('/');

  if (role === 'admin' || role === 'editor') {
    redirect('/admin');
  } else {
    redirect('/workspace');
  }
}

export async function reviewArticle(articleId: string, status: 'PUBLISHED' | 'REJECTED', rejectionReason?: string) {
  if (!IS_PLACEHOLDER_SUPABASE) {
    try {
      const supabase = await createClient();
      await supabase
        .from('articles')
        .update({
          status,
          rejection_reason: rejectionReason || null,
          published_at: status === 'PUBLISHED' ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', articleId);
    } catch {
      // Ignore
    }
  }

  const idx = mockArticles.findIndex((a) => a.id === articleId);
  if (idx !== -1) {
    mockArticles[idx] = {
      ...mockArticles[idx],
      status,
      rejection_reason: status === 'REJECTED' ? rejectionReason : null,
      published_at: status === 'PUBLISHED' ? new Date().toISOString() : mockArticles[idx].published_at,
      updated_at: new Date().toISOString(),
    };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/queue');
  revalidatePath('/workspace');
  revalidatePath('/');
  return { success: true };
}
