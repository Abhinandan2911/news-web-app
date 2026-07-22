'use server';

import { revalidatePath } from 'next/cache';
import { Category, Profile } from '@/types/news';

export interface CommentItem {
  id: string;
  article_title: string;
  author_name: string;
  content: string;
  status: 'APPROVED' | 'PENDING' | 'FLAGGED';
  created_at: string;
}

export interface ActivityLog {
  id: string;
  actor_name: string;
  action: 'approved' | 'submitted' | 'rejected' | 'published' | 'retracted';
  target_title: string;
  time_ago: string;
}

// In-memory admin state
let mockCategories: Category[] = [
  { id: 'cat-1', name: 'India', slug: 'india', description: 'National news, politics, and current affairs', icon: 'Flag', created_at: new Date().toISOString() },
  { id: 'cat-2', name: 'World', slug: 'world', description: 'International news and global affairs', icon: 'Globe', created_at: new Date().toISOString() },
  { id: 'cat-3', name: 'Tech', slug: 'tech', description: 'Technology, AI, gadgets, and startups', icon: 'Cpu', created_at: new Date().toISOString() },
  { id: 'cat-4', name: 'Business', slug: 'business', description: 'Markets, economy, finance, and corporate news', icon: 'TrendingUp', created_at: new Date().toISOString() },
  { id: 'cat-5', name: 'Sports', slug: 'sports', description: 'Cricket, football, Olympics, and sports events', icon: 'Trophy', created_at: new Date().toISOString() },
  { id: 'cat-6', name: 'Entertainment', slug: 'entertainment', description: 'Cinema, OTT releases, lifestyle, and culture', icon: 'Film', created_at: new Date().toISOString() },
  { id: 'cat-7', name: 'Crypto', slug: 'crypto', description: 'Web3, digital assets, and blockchain', icon: 'Coins', created_at: new Date().toISOString() },
];

let mockEmployees: Profile[] = [
  { id: 'emp-1', username: 'priya_sharma', full_name: 'Priya Nair', role: 'author', bio: 'Senior Tech & National Affairs Correspondent', created_at: '2025-01-10T10:00:00Z', updated_at: '2026-07-22T10:00:00Z' },
  { id: 'emp-2', username: 'rohan_mehta', full_name: 'Vikram Iyer', role: 'author', bio: 'Markets & Finance Specialist', created_at: '2025-03-15T10:00:00Z', updated_at: '2026-07-22T10:00:00Z' },
  { id: 'emp-3', username: 'ananya_rao', full_name: 'Ananya Rao', role: 'admin', bio: 'Lead Managing Editor', created_at: '2024-11-01T10:00:00Z', updated_at: '2026-07-22T10:00:00Z' },
  { id: 'emp-4', username: 'dev_bhatia', full_name: 'Dev Bhatia', role: 'editor', bio: 'Senior Business Copy Editor', created_at: '2025-05-20T10:00:00Z', updated_at: '2026-07-22T10:00:00Z' },
  { id: 'emp-5', username: 'meera_das', full_name: 'Meera Das', role: 'editor', bio: 'Chief Copy Editor', created_at: '2025-02-12T10:00:00Z', updated_at: '2026-07-22T10:00:00Z' },
];

let mockComments: CommentItem[] = [
  { id: 'com-1', article_title: "Bengaluru Student's Distress Note", author_name: 'Suresh K.', content: 'Crucial investigation. Academic pressure needs systemic reform across universities.', status: 'APPROVED', created_at: '2 hours ago' },
  { id: 'com-2', article_title: 'Sensex Jumps Over 700 Points', author_name: 'MarketTrader99', content: 'Great rally in tech stocks today! Earnings results were impressive.', status: 'APPROVED', created_at: '4 hours ago' },
  { id: 'com-3', article_title: 'Global Tech Innovation Summit 2026', author_name: 'AnonUser', content: 'Promote this spam site link: http://spam-example.com', status: 'FLAGGED', created_at: '5 hours ago' },
  { id: 'com-4', article_title: 'FIFA World Cup 2026 Renovations', author_name: 'FootballFanatic', content: 'Can not wait for the group stage matches next summer!', status: 'PENDING', created_at: '1 day ago' },
];

let mockActivityLogs: ActivityLog[] = [
  { id: 'act-1', actor_name: 'Meera Das', action: 'approved', target_title: "Mumbai's coastal road opens final stretch", time_ago: '5h ago' },
  { id: 'act-2', actor_name: 'Priya Nair', action: 'submitted', target_title: 'Karnataka unveils EV subsidy for commuters', time_ago: '2h ago' },
  { id: 'act-3', actor_name: 'Ananya Rao', action: 'rejected', target_title: 'Match report: Bengaluru derby stats', time_ago: '3d ago' },
  { id: 'act-4', actor_name: 'Vikram Iyer', action: 'submitted', target_title: 'Semiconductor plant in Gujarat begins pilot', time_ago: '3h ago' },
  { id: 'act-5', actor_name: 'Ananya Rao', action: 'published', target_title: 'India launches second lunar orbiter mission', time_ago: '7h ago' },
];

// Server actions for Category Management
export async function getCategoriesAction() {
  return mockCategories;
}

export async function addCategoryAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name,
    slug,
    description,
    icon: 'Folder',
    created_at: new Date().toISOString(),
  };

  mockCategories.push(newCat);
  revalidatePath('/admin/categories');
  return { success: true };
}

export async function deleteCategoryAction(id: string) {
  mockCategories = mockCategories.filter((c) => c.id !== id);
  revalidatePath('/admin/categories');
  return { success: true };
}

// Server actions for Employee Management
export async function getEmployeesAction() {
  return mockEmployees;
}

export async function updateUserRoleAction(id: string, newRole: 'reader' | 'author' | 'editor' | 'admin') {
  const emp = mockEmployees.find((e) => e.id === id);
  if (emp) {
    emp.role = newRole;
    emp.updated_at = new Date().toISOString();
  }
  revalidatePath('/admin/employees');
  return { success: true };
}

// Server actions for Comment Moderation
export async function getCommentsAction() {
  return mockComments;
}

export async function moderateCommentAction(id: string, status: 'APPROVED' | 'FLAGGED' | 'DELETED') {
  if (status === 'DELETED') {
    mockComments = mockComments.filter((c) => c.id !== id);
  } else {
    const com = mockComments.find((c) => c.id === id);
    if (com) {
      com.status = status;
    }
  }
  revalidatePath('/admin/comments');
  return { success: true };
}

// Server action for Recent Activity Logs
export async function getActivityLogsAction() {
  return mockActivityLogs;
}
