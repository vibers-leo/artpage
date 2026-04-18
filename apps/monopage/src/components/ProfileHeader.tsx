'use client';

import React from 'react';
import type { Theme } from '@/lib/themes';

interface ProfileHeaderProps {
  username: string;
  bio: string;
  avatarUrl?: string;
  displayName?: string;
  theme?: Theme;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, bio, avatarUrl, displayName, theme }) => {
  const t = theme?.vars;

  return (
    <div className="flex flex-col items-center gap-3 mb-7 w-full">
      {/* 아바타 */}
      <div
        className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0"
        style={{ boxShadow: `0 0 0 2.5px ${t?.avatarRing || '#f3f4f6'}` }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={username} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-lg font-semibold"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)', color: '#fff' }}
          >
            {(username[0] || '?').toUpperCase()}
          </div>
        )}
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col items-center gap-[3px]">
        <h1
          className="text-[13px] font-semibold tracking-tight leading-tight"
          style={{ color: t?.text || '#0a0a0a' }}
        >
          {displayName || username}
        </h1>
        <p
          className="text-[10px] font-medium tracking-wide"
          style={{ color: t?.textMuted || '#9ca3af' }}
        >
          @{username}
        </p>
        {bio && (
          <p
            className="text-[12px] max-w-[260px] text-center leading-relaxed mt-2 font-normal"
            style={{ color: t?.textSub || '#6b7280' }}
          >
            {bio}
          </p>
        )}
      </div>
    </div>
  );
};
