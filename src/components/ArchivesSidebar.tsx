'use client';

import { Calendar, ChevronRight } from 'lucide-react';

interface ArchivesSidebarProps {
  selectedArchive?: string | null;
  onSelectArchive?: (archiveLabel: string | null) => void;
}

export default function ArchivesSidebar({ selectedArchive, onSelectArchive }: ArchivesSidebarProps) {
  const archivesList = [
    { label: 'July 2026', count: 4 },
    { label: 'June 2026', count: 12 },
    { label: 'May 2026', count: 18 },
    { label: 'April 2026', count: 15 },
    { label: 'March 2026', count: 22 },
    { label: 'February 2026', count: 19 },
    { label: 'January 2026', count: 25 },
    { label: 'December 2025', count: 30 },
    { label: 'November 2025', count: 21 },
    { label: 'October 2025', count: 16 },
    { label: 'September 2025', count: 28 },
    { label: 'August 2025', count: 14 },
  ];

  return (
    <aside className="w-full md:w-60 bg-white border border-gray-200 rounded-xl p-4 shadow-sm shrink-0 self-start">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-3">
        <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2 font-serif">
          <Calendar className="w-4 h-4 text-red-600" />
          Archives
        </h3>
        {selectedArchive && (
          <button
            onClick={() => onSelectArchive && onSelectArchive(null)}
            className="text-[11px] text-red-600 hover:underline font-semibold"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="space-y-1 text-sm max-h-[500px] overflow-y-auto pr-1">
        {archivesList.map((item) => {
          const isSelected = selectedArchive === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onSelectArchive && onSelectArchive(isSelected ? null : item.label)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition text-xs font-serif ${
                isSelected
                  ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                  : 'text-blue-700 hover:bg-gray-100 hover:underline'
              }`}
            >
              <span className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
                {item.label}
              </span>
              <span className="text-[10px] text-gray-400 font-sans">({item.count})</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
