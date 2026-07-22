'use client';

import { useState } from 'react';
import {
  Share2,
  Check,
  Copy,
  MessageCircle,
  Send,
  Rss,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';

interface ArticleShareFooterProps {
  title: string;
  slug: string;
}

export default function ArticleShareFooter({ title, slug }: ArticleShareFooterProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://timesnow.com/news/${slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-black text-white hover:bg-gray-800',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] text-white hover:bg-blue-700',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0A66C2] text-white hover:bg-blue-800',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-[#25D366] text-white hover:bg-emerald-600',
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#229ED9] text-white hover:bg-sky-600',
    },
  ];

  return (
    <div className="mt-10 pt-8 border-t-2 border-[#e8e4d9] space-y-6 font-serif">
      {/* Social Media Article Share Bar */}
      <div className="bg-[#f7f4ed] border border-[#e2ddd3] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-[#1c1917] flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#b71c1c]" /> Share This News Story
            </h4>
            <p className="text-xs text-[#78716c] mt-0.5">
              Help spread breaking updates across your social channels.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#efebe4] hover:bg-[#e2ddd3] text-[#1c1917] font-bold text-xs rounded-xl border border-[#d6d0c4] transition flex items-center gap-2 self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" /> Link Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#78716c]" /> Copy Article Link
              </>
            )}
          </button>
        </div>

        {/* Social Media Link Buttons */}
        <div className="flex flex-wrap gap-2.5">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-2 transition shadow-xs ${item.color}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Official Times Now Social Channels Footer */}
      <div className="bg-[#1c1917] text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-bold text-red-500 tracking-widest block mb-1">
            Official Channels
          </span>
          <h4 className="text-lg font-bold font-serif text-white">Follow Times Now Media Network</h4>
          <p className="text-xs text-gray-400 mt-0.5">Stay connected with live 24/7 breaking news feeds.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 text-white flex items-center justify-center transition"
            title="Follow on Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 text-white flex items-center justify-center transition"
            title="Follow on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-700 text-white flex items-center justify-center transition"
            title="Follow on LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 text-white flex items-center justify-center transition"
            title="Follow on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-red-600 text-white flex items-center justify-center transition"
            title="Subscribe on YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="/rss"
            className="w-9 h-9 rounded-full bg-gray-800 hover:bg-amber-600 text-white flex items-center justify-center transition"
            title="RSS Feed"
          >
            <Rss className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
