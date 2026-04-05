'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ProfileHeader } from '@/components/ProfileHeader';
import { LinkCard } from '@/components/LinkCard';
import {
  Plus, Save, Settings, Link as LinkIcon,
  ChevronLeft, Trash2, GripVertical, Check, X, Loader2, LogOut, Camera,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getMyProfile, updateProfile,
  getLinks, createLink, updateLink, deleteLink,
  clearToken, getToken,
} from '@/lib/api';

interface LinkItem { id: number; title: string; url: string; }
interface ProfileData { username: string; bio: string; avatar_url: string; }

export default function AdminDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({ username: '', bio: '', avatar_url: '' });
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [editingLink, setEditingLink] = useState<number | null>(null);
  const [newLink, setNewLink] = useState<{ title: string; url: string } | null>(null);

  const loadData = useCallback(async () => {
    if (!getToken()) { router.push('/login'); return; }
    try {
      const [p, l] = await Promise.all([getMyProfile(), getLinks()]);
      setProfile({ username: p.username || '', bio: p.bio || '', avatar_url: p.avatar_url || '' });
      setLinks(l);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { loadData(); }, [loadData]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateProfile({ bio: profile.bio, username: profile.username, avatar_url: profile.avatar_url });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink?.title || !newLink?.url) return;
    try {
      const url = newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`;
      const created = await createLink(newLink.title, url);
      setLinks([...links, created]);
      setNewLink(null);
    } catch (e: any) { setError(e.message); }
  };

  const handleUpdateLink = async (id: number) => {
    const link = links.find(l => l.id === id);
    if (!link) return;
    try {
      await updateLink(id, { title: link.title, url: link.url });
      setEditingLink(null);
    } catch (e: any) { setError(e.message); }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      await deleteLink(id);
      setLinks(links.filter(l => l.id !== id));
      if (editingLink === id) setEditingLink(null);
    } catch (e: any) { setError(e.message); }
  };

  const patchLink = (id: number, field: 'title' | 'url', value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('업로드 실패');
      const { url } = await res.json();
      await updateProfile({ avatar_url: url });
      setProfile(p => ({ ...p, avatar_url: url }));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const logout = () => { clearToken(); router.push('/'); };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
    </div>
  );

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden font-sans">
      {/* Editor Sidebar */}
      <aside className="w-[400px] border-r border-gray-100 flex flex-col p-8 bg-white z-10">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-gray-300 hover:text-black transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-black text-xs uppercase tracking-[0.3em]">Editor</h1>
          <button onClick={logout} className="text-gray-200 hover:text-black transition-colors">
            <LogOut size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-8 flex-1 overflow-y-auto pb-4">
          {/* 프로필 사진 */}
          <section>
            <label className="block text-[10px] font-black text-gray-300 uppercase mb-3 tracking-widest">Profile Photo</label>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            <div
              onClick={() => avatarInputRef.current?.click()}
              className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-200 hover:border-black transition-colors cursor-pointer overflow-hidden group"
            >
              {profile.avatar_url ? (
                <img src={profile.avatar_url} className="w-full h-full object-cover" alt="avatar" />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-2xl font-black text-gray-200">
                  {profile.username?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploadingPhoto
                  ? <Loader2 size={18} className="text-white animate-spin" />
                  : <Camera size={18} className="text-white" />}
              </div>
            </div>
          </section>

          {/* Username */}
          <section>
            <label className="block text-[10px] font-black text-gray-300 uppercase mb-3 tracking-widest">Username</label>
            <div className="flex items-center gap-2 p-4 border border-gray-100 rounded-2xl focus-within:border-black transition-colors">
              <span className="text-sm text-gray-300 font-bold">@</span>
              <input
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="flex-1 text-sm font-bold outline-none"
                placeholder="your_handle"
              />
            </div>
          </section>

          {/* Bio */}
          <section>
            <label className="block text-[10px] font-black text-gray-300 uppercase mb-3 tracking-widest">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full min-h-[100px] p-4 text-sm font-medium border border-gray-100 rounded-2xl focus:border-black outline-none transition-colors resize-none leading-relaxed"
              placeholder="Tell your story..."
            />
          </section>

          {/* Links */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Links</label>
              <button
                onClick={() => setNewLink({ title: '', url: '' })}
                className="flex items-center gap-1 text-[10px] font-black text-black hover:opacity-50 transition-opacity uppercase tracking-widest"
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {links.map(link => (
                <div key={link.id}>
                  {editingLink === link.id ? (
                    <div className="flex flex-col gap-2 p-3 border border-black rounded-2xl bg-gray-50">
                      <input
                        value={link.title}
                        onChange={(e) => patchLink(link.id, 'title', e.target.value)}
                        placeholder="링크 제목"
                        className="text-xs font-bold bg-white border border-gray-100 rounded-xl px-3 py-2 outline-none focus:border-black transition-colors"
                      />
                      <input
                        value={link.url}
                        onChange={(e) => patchLink(link.id, 'url', e.target.value)}
                        placeholder="https://..."
                        className="text-xs font-medium bg-white border border-gray-100 rounded-xl px-3 py-2 outline-none focus:border-black transition-colors"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleDeleteLink(link.id)}
                          className="flex items-center gap-1 text-[10px] font-black text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={10} /> 삭제
                        </button>
                        <button
                          onClick={() => handleUpdateLink(link.id)}
                          className="flex items-center gap-1 text-[10px] font-black text-black hover:opacity-50 transition-opacity"
                        >
                          <Check size={10} /> 완료
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 border border-gray-50 rounded-xl bg-gray-50/50 group">
                      <div className="flex items-center gap-3 min-w-0">
                        <GripVertical size={14} className="text-gray-200 shrink-0" />
                        <LinkIcon size={14} className="text-gray-300 shrink-0" />
                        <span className="text-xs font-bold truncate">{link.title}</span>
                      </div>
                      <button
                        onClick={() => setEditingLink(link.id)}
                        className="text-gray-200 hover:text-black transition-colors opacity-0 group-hover:opacity-100 shrink-0 ml-2"
                      >
                        <Settings size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* 새 링크 추가 폼 */}
              {newLink !== null && (
                <div className="flex flex-col gap-2 p-3 border border-black rounded-2xl bg-gray-50">
                  <input
                    autoFocus
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    placeholder="링크 제목"
                    className="text-xs font-bold bg-white border border-gray-100 rounded-xl px-3 py-2 outline-none focus:border-black transition-colors"
                  />
                  <input
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    placeholder="https://..."
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                    className="text-xs font-medium bg-white border border-gray-100 rounded-xl px-3 py-2 outline-none focus:border-black transition-colors"
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setNewLink(null)} className="flex items-center gap-1 text-[10px] font-black text-gray-400 hover:text-black transition-colors">
                      <X size={10} /> 취소
                    </button>
                    <button
                      onClick={handleAddLink}
                      disabled={!newLink.title || !newLink.url}
                      className="flex items-center gap-1 text-[10px] font-black text-black disabled:opacity-30 hover:opacity-50 transition-opacity"
                    >
                      <Check size={10} /> 추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SNS */}
          <section>
            <label className="block text-[10px] font-black text-gray-300 uppercase mb-3 tracking-widest">SNS Accounts</label>
            <button className="w-full py-4 border border-dashed border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-colors">
              Connect New Account
            </button>
          </section>
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center mb-3">{error}</p>}

        <div className="pt-6 border-t border-gray-50 mt-auto flex gap-3">
          <Link
            href={`/${profile.username}`}
            target="_blank"
            className="px-5 py-4 border border-gray-200 rounded-full text-xs font-black uppercase tracking-widest hover:border-black transition-colors"
          >
            미리보기
          </Link>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 py-4 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <><Check size={14} /> 저장됨!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </aside>

      {/* Live Preview */}
      <main className="flex-1 bg-gray-50 flex items-center justify-center p-12 overflow-y-auto">
        <div className="w-[375px] h-[768px] bg-white border-[8px] border-black rounded-[50px] shadow-2xl relative overflow-y-auto scrollbar-hide">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>
          <div className="px-8 py-20 flex flex-col items-center">
            <div className="inline-block px-3 py-1 bg-black text-white rounded-full text-[8px] font-black uppercase tracking-widest mb-10">
              Live Preview
            </div>
            <ProfileHeader username={profile.username} bio={profile.bio} avatarUrl={profile.avatar_url} />
            <div className="w-full space-y-2">
              {links.map((link) => (
                <LinkCard key={link.id} title={link.title} url={link.url} className="px-4 py-4" />
              ))}
            </div>
            <div className="mt-12 opacity-10 text-[8px] font-black uppercase tracking-widest text-center">
              Preview Mode
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
