'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Sparkles, ArrowRight, Loader2, X, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signup, setToken, updateProfile } from '@/lib/api';

async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  if (!res.ok) throw new Error('사진 올리기 실패');
  const data = await res.json();
  return data.url;
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [form, setForm] = useState({ username: '', email: '', password: '', instagram: '', youtube: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhoto(URL.createObjectURL(file));
  };

  const handleNext = () => {
    if (!form.username.trim()) { setError('사용자명을 입력해주세요'); return; }
    if (!form.email.trim()) { setError('이메일을 입력해주세요'); return; }
    if (form.password.length < 6) { setError('비밀번호는 6자 이상이어야 해요'); return; }
    setError(null);
    setStep(2);
  };

  const startMagic = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await signup(form.email, form.password, form.username);
      setToken(res.token);

      // 사진이 있으면 올리기 후 avatar_url 저장
      if (photoFile) {
        const avatarUrl = await uploadPhoto(photoFile);
        await updateProfile({ avatar_url: avatarUrl });
      }

      // TODO: SNS 핸들 저장 → social_accounts API 연동
      router.push('/admin');
    } catch (e: any) {
      setIsGenerating(false);
      setError(e.message || '가입 중 오류가 발생했어요');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 animate-ping rounded-full"></div>
                <Loader2 className="w-12 h-12 animate-spin text-black" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-widest mb-2">Magic in progress</h2>
                <p className="text-gray-400 text-sm font-medium">계정을 만들고 있어요...</p>
              </div>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Step 01</div>
                <h1 className="text-4xl font-black tracking-tightest">나만의 페이지를<br />만들어볼게요.</h1>
              </div>

              {/* 프로필 사진 */}
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bw-border h-48 rounded-[32px] flex flex-col items-center justify-center gap-3 bg-gray-50 border-dashed hover:border-black cursor-pointer transition-all overflow-hidden group relative"
              >
                {photo ? (
                  <>
                    <img src={photo} className="w-full h-full object-cover" alt="Preview" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setPhoto(null); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-200 group-hover:text-black transition-colors" />
                    <span className="text-xs font-bold text-gray-400">프로필 사진 올리기</span>
                    <span className="text-[10px] text-gray-300">선택사항 — 나중에 설정 가능</span>
                  </>
                )}
              </div>

              {/* 계정 ��보 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-4 bw-border rounded-2xl bg-gray-50 focus-within:border-black transition-colors">
                  <span className="text-gray-300 font-black text-sm">@</span>
                  <input
                    type="text"
                    placeholder="사용자명 (영문, 숫자, _)"
                    className="bg-transparent outline-none font-bold text-sm flex-1"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bw-border rounded-2xl bg-gray-50 focus-within:border-black transition-colors">
                  <User size={16} className="text-gray-300 shrink-0" />
                  <input
                    type="email"
                    placeholder="이메일"
                    className="bg-transparent outline-none font-bold text-sm flex-1"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-3 p-4 bw-border rounded-2xl bg-gray-50 focus-within:border-black transition-colors">
                  <span className="text-gray-300 text-xs font-black">PW</span>
                  <input
                    type="password"
                    placeholder="비밀번호 (6자 이상)"
                    className="bg-transparent outline-none font-bold text-sm flex-1"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

              <button
                onClick={handleNext}
                className="w-full py-5 bg-black text-white rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Step 02</div>
                <h1 className="text-4xl font-black tracking-tightest">SNS 계정을<br />연결할까요?</h1>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 p-5 bw-border rounded-3xl bg-gray-50 focus-within:border-black transition-colors">
                  <Camera className="text-gray-300 shrink-0" />
                  <input
                    type="text"
                    placeholder="Instagram Handle (@username)"
                    className="bg-transparent outline-none font-bold text-sm flex-1"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-4 p-5 bw-border rounded-3xl bg-gray-50 focus-within:border-black transition-colors">
                  <Video className="text-gray-300 shrink-0" />
                  <input
                    type="text"
                    placeholder="YouTube Channel URL"
                    className="bg-transparent outline-none font-bold text-sm flex-1"
                    value={form.youtube}
                    onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                  />
                </div>
                <p className="text-[10px] text-gray-300 font-medium text-center">SNS 연결은 나중에 설정할 수도 있어요</p>
              </div>

              {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="py-5 px-6 border border-gray-200 rounded-full font-black text-sm hover:border-black transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={startMagic}
                  className="flex-1 py-5 bg-black text-white rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Sparkles size={18} /> Generate My Page
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
