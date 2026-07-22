import Link from 'next/link';
import { getArticles } from '@/app/actions/articles';
import AdminSidebar from './AdminSidebar';
import AdminTopHeader from './AdminTopHeader';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const articles = await getArticles('ALL');
  const pendingCount = articles.filter(a => a.status.toUpperCase() === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1917] flex font-sans antialiased">
      {/* Left Sidebar Component */}
      <AdminSidebar pendingCount={pendingCount} />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <AdminTopHeader />

        {/* Page Main Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
