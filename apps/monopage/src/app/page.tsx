'use client';

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl tracking-tight font-paperlogy">
          Monopage<span className="text-[var(--accent)]">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
            로그인
          </Link>
          <Link href="/onboard" className="px-5 py-2 bg-[var(--accent)] text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-[var(--accent)]/20 transition-all hover:scale-105 active:scale-95">
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="reveal flex-1 flex flex-col items-center justify-center px-6 py-24 text-center container mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-light)] border border-[var(--accent)] rounded-full text-xs font-semibold text-[var(--accent)] mb-8">
          <Sparkles size={14} className="text-[var(--accent)]" />
          개인 브랜딩의 새로운 기준
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6 font-paperlogy">
          나의 콘텐츠를<br />
          한 공간에
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-12 font-medium leading-relaxed">
          Instagram, YouTube, TikTok의 콘텐츠를 자동으로 수집하고 정렬합니다.
          별도의 관리 없이, 나만의 포트폴리오가 실시간으로 완성됩니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link href="/onboard" className="group px-8 py-4 bg-[var(--accent)] text-white rounded-lg text-base font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all hover:scale-105 active:scale-95">
            무료로 시작 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/" className="px-8 py-4 bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] rounded-lg text-base font-semibold hover:bg-[var(--background)] transition-colors">
            데모 보기
          </Link>
        </div>

        {/* Mockup Preview */}
        <div className="w-full max-w-4xl border border-[var(--border)] rounded-2xl p-8 md:p-12 bg-[var(--surface)] relative">
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-light)] to-[var(--border)]"></div>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-[var(--border)] rounded"></div>
                <div className="h-3 w-48 bg-[var(--border)] rounded opacity-50"></div>
              </div>
            </div>

            <div className="flex gap-2">
              {['포트폴리오', 'Instagram', 'YouTube'].map(tag => (
                <div key={tag} className="px-3 py-1 border border-[var(--border)] rounded-full text-xs font-medium text-[var(--text-secondary)] bg-[var(--background)]">
                  {tag}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-[var(--background)] border border-[var(--border)] rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="reveal py-20 border-t border-[var(--border)]">
        <div className="container mx-auto max-w-5xl px-6">
          <h2 className="text-4xl font-bold mb-16 text-center font-paperlogy">왜 Monopage를 선택할까?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '자동 수집', desc: '여러 SNS의 콘텐츠가 자동으로 모입니다' },
              { title: '스타일 커스텀', desc: '나의 개성에 맞게 디자인을 조정합니다' },
              { title: '실시간 동기화', desc: '새 게시물이 올라오면 즉시 업데이트됩니다' }
            ].map((feature, i) => (
              <div key={i} className="p-6 border border-[var(--border)] rounded-lg bg-[var(--surface)] hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-[var(--border)] text-center bg-[var(--surface)]">
        <p className="text-[var(--text-tertiary)] text-xs font-medium uppercase tracking-wider">
          © 2026 Monopage. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
