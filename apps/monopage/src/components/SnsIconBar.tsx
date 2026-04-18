'use client';

import React from 'react';
import type { Theme } from '@/lib/themes';

interface SnsIconBarProps {
  links: { id: number; title: string; url: string }[];
  style?: 'circle' | 'pill';
  theme?: Theme;
}

const SNS_ICONS: Record<string, { icon: string }> = {
  instagram: { icon: '📸' },
  youtube: { icon: '▶️' },
  tiktok: { icon: '🎵' },
  twitter: { icon: '𝕏' },
  x: { icon: '𝕏' },
  facebook: { icon: 'f' },
  threads: { icon: '🧵' },
  github: { icon: '⌨️' },
  linkedin: { icon: '💼' },
  naver: { icon: 'N' },
  blog: { icon: 'N' },
  kakao: { icon: '💬' },
};

function detectSnsType(url: string): string | null {
  const lower = url.toLowerCase();
  for (const key of Object.keys(SNS_ICONS)) {
    if (lower.includes(key)) return key;
  }
  return null;
}

export function SnsIconBar({ links, style = 'circle', theme }: SnsIconBarProps) {
  const t = theme?.vars;
  const snsLinks = links
    .map(link => ({ ...link, snsType: detectSnsType(link.url) }))
    .filter(link => link.snsType !== null);

  if (snsLinks.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 w-full my-3">
      {snsLinks.map((link) => {
        const sns = SNS_ICONS[link.snsType!];
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className={`flex items-center justify-center hover:scale-110 active:scale-95 transition-transform ${
              style === 'pill' ? 'gap-1.5 px-3 py-1.5 rounded-full' : 'w-9 h-9 rounded-full'
            }`}
            style={{
              backgroundColor: t?.cardBg || '#f9fafb',
              border: `1px solid ${t?.cardBorder || '#f3f4f6'}`,
            }}
          >
            <span className="text-[14px] leading-none">{sns.icon}</span>
            {style === 'pill' && (
              <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: t?.textMuted || '#9ca3af' }}>
                {link.snsType}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
