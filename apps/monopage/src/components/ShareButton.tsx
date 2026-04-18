'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode, X } from 'lucide-react';
import type { Theme } from '@/lib/themes';

interface ShareButtonProps {
  username: string;
  theme?: Theme;
}

export function ShareButton({ username, theme }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = theme?.vars;

  const url = `https://monopage.kr/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `@${username} — Monopage`, url }); }
      catch { /* cancelled */ }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
          style={{ backgroundColor: t?.cardBg || '#f3f4f6', color: t?.textMuted || '#9ca3af', border: `1px solid ${t?.cardBorder || '#f3f4f6'}` }}
        >
          <Share2 size={11} /> 공유
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
          style={{ backgroundColor: t?.cardBg || '#f3f4f6', color: t?.textMuted || '#9ca3af', border: `1px solid ${t?.cardBorder || '#f3f4f6'}` }}
        >
          <QrCode size={11} /> QR
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl w-full max-w-sm p-8 flex flex-col items-center gap-5"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors"
            >
              <X size={16} />
            </button>

            <div className="text-center">
              <h3 className="text-base font-bold mb-0.5">@{username}</h3>
              <p className="text-[11px] text-gray-400">이 페이지를 공유하세요</p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-gray-100">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&margin=8`}
                alt="QR Code"
                className="w-44 h-44"
                width={176}
                height={176}
              />
            </div>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {copied ? <><Check size={13} /> 복사됨!</> : <><Copy size={13} /> 링크 복사</>}
            </button>

            <p className="text-[10px] text-gray-300">{url}</p>
          </div>
        </div>
      )}
    </>
  );
}
