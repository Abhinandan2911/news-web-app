'use client';

import { useState } from 'react';
import { CommentItem, moderateCommentAction } from '@/app/actions/admin';
import { CheckCircle2, Flag, Trash2, MessageSquare } from 'lucide-react';

interface CommentsClientProps {
  initialComments: CommentItem[];
}

export default function CommentsClient({ initialComments }: CommentsClientProps) {
  const [comments, setComments] = useState(initialComments);

  async function handleModerate(id: string, status: 'APPROVED' | 'FLAGGED' | 'DELETED') {
    await moderateCommentAction(id, status);
    if (status === 'DELETED') {
      setComments(comments.filter(c => c.id !== id));
    } else {
      setComments(comments.map(c => c.id === id ? { ...c, status } : c));
    }
  }

  return (
    <div className="bg-[#fdfcf9] border border-[#e8e4d9] rounded-xl overflow-hidden shadow-xs">
      <table className="w-full text-left text-xs text-[#1c1917] font-serif border-collapse">
        <thead className="bg-[#f7f4ed] border-b border-[#e8e4d9] text-[11px] uppercase font-bold text-[#78716c] tracking-wider">
          <tr>
            <th className="p-4">Reader / Commenter</th>
            <th className="p-4">Article</th>
            <th className="p-4">Comment Body</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Moderation Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e8e4d9]">
          {comments.map((com) => (
            <tr key={com.id} className="hover:bg-[#fcfaf5] transition">
              <td className="p-4 font-bold text-sm text-[#1c1917]">{com.author_name}</td>
              <td className="p-4 text-[#44403c] text-xs max-w-xs">{com.article_title}</td>
              <td className="p-4 text-[#1c1917] text-xs max-w-md font-sans bg-[#f7f4ed]/50 p-2 rounded">
                "{com.content}"
              </td>
              <td className="p-4 font-sans">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                  com.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  com.status === 'FLAGGED' ? 'bg-red-100 text-red-800 border-red-300' :
                  'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {com.status}
                </span>
              </td>
              <td className="p-4 text-right space-x-2 whitespace-nowrap">
                {com.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleModerate(com.id, 'APPROVED')}
                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded"
                  >
                    Approve
                  </button>
                )}
                {com.status !== 'FLAGGED' && (
                  <button
                    onClick={() => handleModerate(com.id, 'FLAGGED')}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded"
                  >
                    Flag Spam
                  </button>
                )}
                <button
                  onClick={() => handleModerate(com.id, 'DELETED')}
                  className="px-2.5 py-1 bg-[#b71c1c] hover:bg-[#9a0007] text-white text-[11px] font-bold rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
