import { getCommentsAction } from '@/app/actions/admin';
import CommentsClient from './CommentsClient';

export default async function AdminCommentsPage() {
  const comments = await getCommentsAction();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-[#e8e4d9] pb-4">
        <h1 className="text-2xl font-serif font-bold text-[#1c1917]">User Interaction & Comment Moderation</h1>
        <p className="text-xs text-[#78716c] mt-0.5">
          Review reader discussions, moderate flagged spam, and control public commenting.
        </p>
      </div>

      <CommentsClient initialComments={comments} />
    </div>
  );
}
