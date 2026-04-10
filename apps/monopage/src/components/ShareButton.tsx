'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, QrCode, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  username: string;
}

export function ShareButton({ username }: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `https://monopage.kr/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `@${username} — Monopage`, url });
      } catch { /* user cancelled */ }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-8">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/5 hover:bg-black/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          <Share2 size={12} /> 공유
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-black/5 hover:bg-black/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          <QrCode size={12} /> QR
        </button>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm p-8 flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <h3 className="text-lg font-black mb-1">@{username}</h3>
                <p className="text-xs text-gray-400">이 페이지를 공유하세요</p>
              </div>

              {/* QR Code - using a simple SVG-based approach */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&margin=8`}
                  alt="QR Code"
                  className="w-48 h-48"
                  width={192}
                  height={192}
                />
              </div>

              {/* URL Copy */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
              >
                {copied ? <><Check size={14} /> 복사됨!</> : <><Copy size={14} /> 링크 복사</>}
              </button>

              <p className="text-[10px] text-gray-300 font-medium">{url}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
