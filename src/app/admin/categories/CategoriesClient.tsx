'use client';

import { useState } from 'react';
import { Category } from '@/types/news';
import { addCategoryAction, deleteCategoryAction } from '@/app/actions/admin';
import { Plus, Trash2, Layers, Tag } from 'lucide-react';

interface CategoriesClientProps {
  initialCategories: Category[];
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    await addCategoryAction(formData);

    const newSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setCategories([
      ...categories,
      { id: `cat-${Date.now()}`, name, slug: newSlug, description, created_at: new Date().toISOString() },
    ]);
    setName('');
    setDescription('');
  }

  async function handleDelete(id: string) {
    await deleteCategoryAction(id);
    setCategories(categories.filter((c) => c.id !== id));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create Category Form */}
      <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-5 shadow-xs">
        <h3 className="text-base font-serif font-bold text-[#1c1917] mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#b71c1c]" /> Add Main Category
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-[#78716c] mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Science & Space"
              className="w-full px-3 py-2 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-[#78716c] mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of news topics covered in this section."
              className="w-full px-3 py-2 bg-[#f7f4ed] border border-[#e2ddd3] rounded-lg text-xs text-[#1c1917] focus:outline-none focus:border-[#b71c1c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#b71c1c] hover:bg-[#9a0007] text-white font-bold text-xs rounded-lg shadow-xs transition"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="lg:col-span-2 bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl p-5 shadow-xs">
        <h3 className="text-base font-serif font-bold text-[#1c1917] mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#78716c]" /> Active News Categories ({categories.length})
        </h3>

        <div className="divide-y divide-[#e8e4d9]">
          {categories.map((cat) => (
            <div key={cat.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <span className="font-serif font-bold text-sm text-[#1c1917]">{cat.name}</span>
                <span className="ml-2 text-[10px] bg-[#efebe4] text-[#78716c] px-2 py-0.5 rounded font-mono">
                  /{cat.slug}
                </span>
                {cat.description && <p className="text-xs text-[#78716c] font-serif mt-0.5">{cat.description}</p>}
              </div>

              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 text-[#78716c] hover:text-[#b71c1c] hover:bg-[#f7f4ed] rounded transition"
                title="Delete Category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
