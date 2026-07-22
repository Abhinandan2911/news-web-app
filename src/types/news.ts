export type UserRole = 'reader' | 'author' | 'editor' | 'admin';

export type ArticleStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'draft' | 'review' | 'published' | 'archived';

export interface Profile {
  id: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  content: string;
  summary?: string | null;
  featured_image_url?: string | null;
  source_name?: string | null;
  source_url?: string | null;
  category_id?: string | null;
  author_id?: string | null;
  status: ArticleStatus;
  is_featured?: boolean;
  is_breaking?: boolean;
  rejection_reason?: string | null;
  view_count?: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;

  // Joined fields
  author?: Profile | null;
  category?: Category | null;
}
