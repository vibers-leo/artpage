'use client';

import React, { useEffect, useState } from 'react';
import { ProfileHeader } from '@/components/ProfileHeader';
import { LinkCard } from '@/components/LinkCard';
import { SnsGallery } from '@/components/SnsGallery';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { ShareButton } from '@/components/ShareButton';
import { getPublicProfile } from '@/lib/api';

interface ProfileViewProps {
  username: string;
}

export function ProfileView({ username }: ProfileViewProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPublicProfile(username)
      .then(setProfile)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (notFound) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-4xl font-black">404</p>
      <p className="text-gray-400 text-sm font-medium">@{username} 페이지를 찾을 수 없어요</p>
    </div>
  );

  const neonColor = profile.theme_config?.neon_color || '#000000';
  const bgTone = profile.theme_config?.bg_tone || '#ffffff';
  const posts = profile.social_accounts?.flatMap((sa: any) => sa.posts || []) || [];
  const portfolioItems = profile.portfolio_items || [];

  return (
    <div
      className="min-h-screen transition-colors duration-1000"
      style={{
        backgroundColor: bgTone,
        '--accent-neon': neonColor,
      } as React.CSSProperties}
    >
      <div className="max-w-xl mx-auto px-6 py-24 flex flex-col items-center">
        <ProfileHeader
          username={profile.username}
          bio={profile.bio || ''}
          avatarUrl={profile.avatar_url}
        />

        <div className="w-full space-y-3">
          {(profile.links || []).map((link: any) => (
            <LinkCard
              key={link.id}
              title={link.title}
              url={link.url}
              className="hover:border-[var(--accent-neon)] group transition-all"
            />
          ))}
        </div>

        {portfolioItems.length > 0 && <PortfolioGallery items={portfolioItems} />}

        {posts.length > 0 && <SnsGallery posts={posts} />}

        <ShareButton username={profile.username} />

        <div className="mt-12 opacity-20 text-center text-[10px] font-black uppercase tracking-widest">
          Created with Monopage
        </div>
      </div>
    </div>
  );
}
