// src/app/(platform)/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Upload,
  Sparkles,
  Palette,
  Check,
  Instagram,
  Globe,
  ShoppingBag,
  Shield,
  Link2,
  CheckCircle2,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function PlatformHomePage() {
  const { locale } = useLanguage();

  return (
    <div className="bg-zinc-950 text-white relative overflow-hidden" style={{ fontFamily: "'Pretendard', system-ui, sans-serif" }}>
      {/* 노이즈 텍스처 오버레이 */}
      <div
        className="fixed inset-0 z-[60] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 1. Hero Section — Split Hero (왼쪽 텍스트 / 오른쪽 비주얼) */}
      <section className="min-h-[100dvh] relative flex items-center">
        {/* 배경 그라디언트 메시 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-900/20 blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-zinc-800/40 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 왼쪽 — 텍스트 */}
            <div className="pt-24 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                예술가를 위한 무료 플랫폼
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
                style={{ wordBreak: "keep-all" }}
              >
                이미지만 올리면,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                  AI가 홈페이지를
                </span>
                <br />
                만들어드립니다
              </h1>

              <p
                className="text-lg md:text-xl text-white/60 max-w-lg mb-10 leading-relaxed font-light"
                style={{ wordBreak: "keep-all" }}
              >
                예술가를 위한 무료 홈페이지.
                인스타 연동. 다국어 지원. 작품 판매까지.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  href="/create"
                  className="group relative px-8 py-4 bg-emerald-500 text-zinc-950 text-base font-semibold rounded-full overflow-hidden transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <span className="flex items-center gap-2">
                    무료로 시작하기
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/arthyun"
                  className="group px-8 py-4 text-base font-medium border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/80 transition-all flex items-center gap-2 rounded-full backdrop-blur-sm"
                >
                  데모 보기
                  <ArrowUpRight
                    size={16}
                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>

              {/* 메트릭스 */}
              <div className="flex gap-8 mt-14 pt-8 border-t border-white/10">
                {[
                  { num: "2,847+", label: "생성된 페이지" },
                  { num: "4.87", label: "만족도" },
                  { num: "0원", label: "기본 비용" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-bold tracking-tight">{m.num}</p>
                    <p className="text-xs text-white/40 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽 — 비주얼 (Glass Card Preview) */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40">
                <Image
                  src="https://picsum.photos/seed/artpage-hero/800/1000"
                  alt="ArtPage 미리보기"
                  fill
                  className="object-cover opacity-80"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
                {/* 오버레이 UI 미리보기 */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <p className="text-xs text-white/50 mb-1 font-mono">arthyun.co.kr</p>
                    <p className="text-sm font-medium text-white/90">Art Hyun - 예술로 여는 도시재생</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-full">전시 관리</span>
                      <span className="px-2 py-0.5 bg-white/10 text-white/60 text-[10px] rounded-full">작품 판매</span>
                      <span className="px-2 py-0.5 bg-white/10 text-white/60 text-[10px] rounded-full">다국어</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 플로팅 장식 요소 */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-[float_8s_ease-in-out_infinite_1s]" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. How it Works — 가로 스텝 */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-mono tracking-widest text-emerald-400 mb-4 uppercase">
              How it works
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ wordBreak: "keep-all" }}
            >
              3분이면 완성됩니다
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: Upload,
                title: "이미지를 올리세요",
                desc: "작품 사진이나 포트폴리오 이미지를 업로드하세요. 그것만으로 충분합니다.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "AI가 분석합니다",
                desc: "AI가 작품의 스타일, 색감, 분위기를 분석하고 최적의 디자인을 제안합니다.",
              },
              {
                step: "03",
                icon: Palette,
                title: "디자인을 선택하세요",
                desc: "여러 템플릿 중 마음에 드는 디자인을 고르세요. 커스터마이징도 가능합니다.",
              },
              {
                step: "04",
                icon: Check,
                title: "완성!",
                desc: "홈페이지가 즉시 생성됩니다. 도메인 연결부터 SEO까지 모두 자동입니다.",
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* 스텝 넘버 */}
                <span className="text-5xl font-bold text-white/[0.04] absolute top-4 right-4 font-mono">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon size={22} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                  {item.desc}
                </p>
                {/* 연결선 (마지막 제외) */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features — 벤토 그리드 */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="text-xs font-mono tracking-widest text-emerald-400 mb-4 uppercase">
                Features
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                style={{ wordBreak: "keep-all" }}
              >
                필요한 모든 것이
                <br />
                이미 준비되어 있습니다
              </h2>
            </div>
            <Link
              href="/features"
              className="text-sm text-white/50 hover:text-white flex items-center gap-1 transition-colors"
            >
              전체 기능 보기
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* 벤토 그리드 (비대칭 2fr 1fr 1fr) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 큰 카드 — AI 자동 생성 */}
            <div className="md:col-span-2 md:row-span-2 relative p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden group hover:border-white/10 transition-all">
              <div className="absolute top-0 right-0 w-2/3 h-full opacity-20">
                <Image
                  src="https://picsum.photos/seed/artpage-ai-gen/800/600"
                  alt="AI 자동 생성"
                  fill
                  className="object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <Sparkles size={22} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">AI 자동 생성</h3>
                <p className="text-white/50 leading-relaxed max-w-md text-base" style={{ wordBreak: "keep-all" }}>
                  이미지를 올리면 AI가 작품의 특성을 분석하여 세계적 수준의
                  홈페이지를 자동으로 만들어드립니다. 코딩 지식이 전혀 필요 없습니다.
                </p>
              </div>
            </div>

            {/* 작은 카드들 */}
            {[
              {
                icon: Instagram,
                title: "인스타그램 연동",
                desc: "인스타 계정만 연결하면 포스트가 자동으로 갤러리에 반영됩니다.",
              },
              {
                icon: Globe,
                title: "다국어 지원",
                desc: "한국어, 영어, 일본어, 중국어. AI가 자연스러운 번역을 제공합니다.",
              },
              {
                icon: ShoppingBag,
                title: "작품 판매",
                desc: "작품 등록부터 결제까지. 수수료 8%만으로 전문 쇼핑몰을 운영하세요.",
              },
              {
                icon: Shield,
                title: "전문가 보안 관리",
                desc: "SSL 인증서, 자동 백업, DDoS 방어. 보안은 저희가 책임집니다.",
              },
              {
                icon: Link2,
                title: "커스텀 도메인",
                desc: "나만의 도메인을 연결하세요. yourname.com으로 프로 작가처럼.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                  <feature.icon size={18} className="text-white/60 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Artist Showcase */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-900/10 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-emerald-400 mb-4 uppercase">
              Artist showcase
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ wordBreak: "keep-all" }}
            >
              이미 활동 중인 작가들
            </h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto" style={{ wordBreak: "keep-all" }}>
              실제 ArtPage에서 운영 중인 아티스트 홈페이지를 살펴보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Art Hyun",
                slug: "arthyun",
                desc: "예술로 여는 도시재생 — 공공미술 전문",
                image: "https://picsum.photos/seed/arthyun-showcase/800/500",
                domain: "arthyun.co.kr",
                tag: "공공미술",
              },
              {
                name: "Artway Gallery",
                slug: "art-way",
                desc: "부산 동구 문화 예술 공간",
                image: "https://picsum.photos/seed/artway-showcase/800/500",
                domain: "artway.vibers.co.kr",
                tag: "갤러리",
              },
            ].map((site) => (
              <Link
                key={site.slug}
                href={`/${site.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-medium rounded-full mb-3">
                    {site.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-300 transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-sm text-white/50" style={{ wordBreak: "keep-all" }}>
                    {site.desc}
                  </p>
                  <p className="text-xs text-white/30 font-mono mt-2">{site.domain}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing — 비교 테이블 */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-emerald-400 mb-4 uppercase">
              Pricing
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              style={{ wordBreak: "keep-all" }}
            >
              무료로 시작하세요
            </h2>
            <p className="text-white/50 mt-4 max-w-lg mx-auto" style={{ wordBreak: "keep-all" }}>
              작품이 팔릴 때만 수수료 8%. 나머지는 전부 무료입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* ArtPage 카드 (메인) */}
            <div className="lg:col-span-1 lg:row-span-1 relative p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm">
              <div className="absolute -top-3 left-6">
                <span className="px-3 py-1 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-full">
                  무료
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-2 mb-1">ArtPage</h3>
              <p className="text-white/50 text-sm mb-6">예술가 전용 플랫폼</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold tracking-tight">0</span>
                <span className="text-white/50">원/월</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "무제한 갤러리 페이지",
                  "무제한 대역폭",
                  "모든 프리미엄 템플릿",
                  "인스타그램 자동 연동",
                  "다국어 지원 (4개 언어)",
                  "작품 판매 기능",
                  "커스텀 도메인",
                  "SSL 보안 인증서",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-white/30 mb-6">작품 판매 시 수수료 8%</p>

              <Link
                href="/create"
                className="block w-full py-3.5 bg-emerald-500 text-zinc-950 text-center font-semibold rounded-full hover:bg-emerald-400 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                무료로 시작하기
              </Link>
            </div>

            {/* 비교 — 타 플랫폼 */}
            <div className="lg:col-span-2 p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-2 text-white/60">타 플랫폼 비교</h3>
              <p className="text-sm text-white/30 mb-8" style={{ wordBreak: "keep-all" }}>
                같은 기능을 다른 플랫폼에서 사용하면 얼마나 들까요?
              </p>

              <div className="space-y-4">
                {[
                  { name: "S사 (웹빌더)", monthly: "29,000", yearly: "348,000", missing: "작품 판매 별도" },
                  { name: "W사 (홈페이지)", monthly: "16,500", yearly: "198,000", missing: "다국어 유료" },
                  { name: "C사 (포트폴리오)", monthly: "22,000", yearly: "264,000", missing: "도메인 별도" },
                  { name: "직접 개발", monthly: "50,000+", yearly: "600,000+", missing: "관리 비용 별도" },
                ].map((comp) => (
                  <div
                    key={comp.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <div>
                      <p className="text-sm font-medium text-white/70">{comp.name}</p>
                      <p className="text-xs text-white/30 mt-0.5">{comp.missing}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white/60 line-through decoration-red-400/60">
                        월 {comp.monthly}원
                      </p>
                      <p className="text-xs text-white/30">연 {comp.yearly}원</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-400">ArtPage</p>
                    <p className="text-xs text-white/40 mt-0.5">호스팅 + 디자인 + 기능 모두 포함</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-400">0원</p>
                    <p className="text-xs text-white/40">영원히 무료</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Footer — Full-bleed */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        {/* 배경 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-900/20 blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
            style={{ wordBreak: "keep-all" }}
          >
            지금 바로
            <br />
            홈페이지를 만들어보세요
          </h2>
          <p
            className="text-lg text-white/50 max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ wordBreak: "keep-all" }}
          >
            3분이면 완성됩니다. 신용카드도, 코딩 지식도 필요 없습니다.
          </p>

          <Link
            href="/create"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 text-zinc-950 text-lg font-bold rounded-full hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-500/20"
            style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            무료로 시작하기
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-xs text-white/30 mt-6">
            가입 후 3분 내 홈페이지 완성 — 무료 계정으로 시작
          </p>
        </div>
      </section>

      {/* 플로팅 애니메이션 키프레임 */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
