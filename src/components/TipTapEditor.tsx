'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '<p>Write your article content here...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="w-full h-64 bg-[#fdfcf9] border border-[#e8e4d9] rounded-lg animate-pulse flex items-center justify-center text-[#78716c] font-serif text-xs">
        Loading TipTap Editor...
      </div>
    );
  }

  return (
    <div className="border border-[#e2ddd3] rounded-xl overflow-hidden bg-[#fdfcf9] shadow-xs">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#efebe4] border-b border-[#e2ddd3]">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('bold') ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('italic') ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-[#d6d0c4] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('heading', { level: 1 }) ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('heading', { level: 2 }) ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-[#d6d0c4] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('bulletList') ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('orderedList') ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-[#e2ddd3] transition ${
            editor.isActive('blockquote') ? 'bg-[#b71c1c] text-white font-bold' : 'text-[#44403c]'
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-[#d6d0c4] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-[#e2ddd3] text-[#44403c] transition"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-[#e2ddd3] text-[#44403c] transition"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Surface */}
      <EditorContent editor={editor} className="text-[#1c1917] min-h-[300px] bg-[#fdfcf9]" />
    </div>
  );
}
