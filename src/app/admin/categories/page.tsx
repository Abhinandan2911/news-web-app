import { getCategoriesAction } from '@/app/actions/admin';
import CategoriesClient from './CategoriesClient';

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesAction();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-[#e8e4d9] pb-4">
        <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Taxonomy & Category Management</h1>
        <p className="text-xs text-[#78716c] mt-0.5">
          Organize public news structure, main section navigation, and story tagging systems.
        </p>
      </div>

      <CategoriesClient initialCategories={categories} />
    </div>
  );
}
