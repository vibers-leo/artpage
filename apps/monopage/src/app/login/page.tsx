'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';
import { login, setToken } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError('이메일과 비밀번호를 입력해주세요'); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await login(form.email, form.password);
      setToken(res.token);
      router.push('/admin');
    } catch (e: any) {
      setError(e.message || '이메일 또는 비밀번호가 올바르지 않아요');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full flex flex-col gap-8">
        <div>
          <Link href="/" className="font-extrabold text-xl tracking-tighter">
            Monopage<span className="text-gray-300">.</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tightest mt-6">다시 돌아오셨군요.</h1>
          <p className="text-gray-400 text-sm font-medium mt-2">로그인하고 내 페이지를 관리하세요.</p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-black transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full p-4 border border-gray-100 rounded-2xl text-sm font-bold outline-none focus:border-black transition-colors"
          />
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center -mt-4">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-5 bg-black text-white rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <>로그인 <ArrowRight size={18} /></>}
        </button>

        <p className="text-center text-sm text-gray-400">
          계정이 없으신가요?{' '}
          <Link href="/onboard" className="font-black text-black hover:underline">무료로 시작하기</Link>
        </p>
      </div>
    </div>
  );
}
