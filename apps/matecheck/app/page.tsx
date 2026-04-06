"use client";

import Link from "next/link";
import { Heart, CheckCircle2, Calendar, Target, Wallet, RotateCcw, Star, ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: <CheckCircle2 size={24} />,
    title: "함께하는 미션",
    desc: "둘이서 함께 완수하는 일상 미션. 소소한 성취가 쌓여 큰 행복이 돼요.",
  },
  {
    icon: <Target size={24} />,
    title: "공동 목표",
    desc: "여행, 저축, 건강 — 파트너와 같은 방향을 바라보세요.",
  },
  {
    icon: <Calendar size={24} />,
    title: "함께 쓰는 캘린더",
    desc: "기념일부터 일정까지, 우리만의 타임라인을 만들어요.",
  },
  {
    icon: <Wallet size={24} />,
    title: "가계부 & 정산",
    desc: "지출을 함께 기록하고 투명하게 나눠요. 돈 얘기도 편하게.",
  },
  {
    icon: <RotateCcw size={24} />,
    title: "집안일 로테이션",
    desc: "청소, 설거지, 빨래 — 공평하게 나누는 우리집 룰.",
  },
  {
    icon: <Star size={24} />,
    title: "위시리스트",
    desc: "갖고 싶은 것, 해보고 싶은 것. 함께 꿈꾸는 리스트.",
  },
];

const stats = [
  { value: "2개", label: "서버 (API + DB)" },
  { value: "10+", label: "핵심 기능" },
  { value: "카카오", label: "소셜 로그인" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">MateCheck</span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-brand-300 mb-8">
            <Sparkles size={14} />
            <span>파트너와 연결된 일상 관리</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            우리 둘만의{" "}
            <span className="text-gradient">특별한 공간</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            미션, 목표, 일정, 가계부, 집안일까지.<br />
            파트너와 함께하는 모든 일상을 MateCheck에서.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl brand-gradient text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-500/30"
            >
              지금 시작하기
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-slate-300 font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              기능 살펴보기
            </Link>
          </div>

          {/* Floating card preview */}
          <div className="mt-20 relative">
            <div className="glass rounded-3xl p-6 max-w-sm mx-auto animate-float shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center">
                  <Heart size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">우리 집 Nest</p>
                  <p className="text-xs text-slate-400">2명 함께 중</p>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-brand-500/20 text-brand-300">활성</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "이번 주 미션", value: "3/5 완료", color: "bg-brand-500" },
                  { label: "공동 목표", value: "제주도 여행 78%", color: "bg-accent" },
                  { label: "오늘 집안일", value: "설거지 담당: 나", color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                    <span className="text-xs font-medium text-slate-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-gradient">{s.value}</p>
              <p className="text-sm text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              함께라서 <span className="text-gradient">더 재미있는</span> 기능들
            </h2>
            <p className="text-slate-400 text-lg">일상의 모든 것을 파트너와 연결하세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center mb-4 text-white">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto glass rounded-3xl p-12">
          <div className="text-4xl mb-4">💑</div>
          <h2 className="text-3xl font-bold mb-4">파트너를 초대해보세요</h2>
          <p className="text-slate-400 mb-8">
            가입하고 Nest를 만들면, 파트너에게 초대 링크를 보낼 수 있어요.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl brand-gradient text-white font-bold hover:opacity-90 transition-opacity"
          >
            무료로 시작하기 <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-slate-500 text-sm">
        <p>© 2026 MateCheck · <a href="https://vibers.co.kr" className="hover:text-slate-300 transition-colors">Vibers</a></p>
      </footer>
    </main>
  );
}
