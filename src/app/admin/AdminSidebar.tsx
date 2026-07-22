'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Inbox,
  Layers,
  Users,
  MessageSquare,
  Settings,
  PlusCircle,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

interface AdminSidebarProps {
  pendingCount: number;
}

export default function AdminSidebar({ pendingCount }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Articles', href: '/admin/articles', icon: FileText },
    { name: 'Review queue', href: '/admin/queue', icon: Inbox, badge: pendingCount },
    { name: 'Categories', href: '/admin/categories', icon: Layers },
    { name: 'Employees', href: '/admin/employees', icon: Users },
    { name: 'Comments', href: '/admin/comments', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#efebe4] border-r border-[#e2ddd3] flex flex-col justify-between shrink-0 h-screen sticky top-0 text-[#292524] select-none z-30">
      <div>
        {/* Top Newsroom Brand Header matching Meridian reference UI */}
        <Link href="/admin" className="p-5 border-b border-[#e2ddd3] flex items-center gap-3 block hover:bg-[#e7e2d7] transition">
          <div className="w-8 h-8 rounded bg-[#b71c1c] text-white flex items-center justify-center font-bold text-sm shadow-sm font-serif">
            M
          </div>
          <div>
            <span className="block font-bold text-xs tracking-wider uppercase text-[#1c1917]">
              Meridian
            </span>
            <span className="block text-[10px] tracking-widest text-[#78716c] uppercase font-semibold">
              NEWSROOM
            </span>
          </div>
        </Link>

        {/* Workspace Menu Options */}
        <div className="p-4">
          <span className="block text-[10px] font-bold text-[#78716c] uppercase tracking-wider mb-2 px-2">
            Workspace
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#e2ddd3] text-[#1c1917] font-bold shadow-xs'
                      : 'text-[#44403c] hover:bg-[#e7e2d7] hover:text-[#1c1917]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#b71c1c]' : 'text-[#78716c]'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#b71c1c] text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions Group */}
          <div className="mt-6 pt-4 border-t border-[#e2ddd3]">
            <span className="block text-[10px] font-bold text-[#78716c] uppercase tracking-wider mb-2 px-2">
              Quick actions
            </span>
            <div className="space-y-1 text-xs">
              <Link
                href="/admin/articles/new"
                className="flex items-center gap-2 px-3 py-2 text-[#44403c] hover:bg-[#e7e2d7] hover:text-[#1c1917] rounded-lg transition font-medium"
              >
                <PlusCircle className="w-4 h-4 text-[#78716c]" />
                <span>New article</span>
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-[#44403c] hover:bg-[#e7e2d7] hover:text-[#1c1917] rounded-lg transition font-medium"
              >
                <ExternalLink className="w-4 h-4 text-[#78716c]" />
                <span>View site</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Profile Pill */}
      <div className="p-4 border-t border-[#e2ddd3] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#d6d0c4] text-[#1c1917] font-bold text-xs flex items-center justify-center font-serif">
            AR
          </div>
          <div>
            <span className="block text-xs font-bold text-[#1c1917]">Ananya Rao</span>
            <span className="block text-[10px] text-[#78716c]">Admin · Signed in</span>
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="p-1.5 text-[#78716c] hover:text-[#b71c1c] hover:bg-[#e7e2d7] rounded-md transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </form>
      </div>
    </aside>
  );
}
