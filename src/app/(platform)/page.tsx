// src/app/(platform)/page.tsx — 밝은 톤 랜딩 페이지
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Instagram,
  Globe,
  ShoppingBag,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PlatformHomePage() {
  const { locale } = useLanguage();

  return (
    <div
      className="bg-white text-gray-900 relative overflow-hidden"
      style={{ fontFamily: "'Pretendard', system-ui, sans-serif" }}
    >
      {/* 1. Hero Section — 밝고 환영하는 분위기 */}
      <section className="min-h-[100dvh] relative flex items-center">
        {/* 배경 — 부드러운 그라디언트 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-50 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gray-50 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 왼쪽 — 텍스트 */}
            <div className="pt-24 lg:pt-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-700 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                예술가를 위한 무료 플랫폼
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-gray-900"
                style={{ wordBreak: "keep-all" }}
              >
                모든 아티스트에겐
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                  자신만의 페이지가
                </span>
                <br />
                필요합니다
              </h1>

              <p
                className="text-lg md:text-xl text-gray-500 max-w-lg mb-10 leading-relaxed font-light"
                style={{ wordBreak: "keep-all" }}
              >
                전문적인 아티스트 페이지를 만들고,
                작품을 판매하며, 세상과 연결되세요.
                코딩은 필요 없습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  href="/create"
                  className="group relative px-8 py-4 bg-emerald-600 text-white text-base font-semibold rounded-full overflow-hidden transition-all hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-600/20"
                  style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <span className="flex items-center gap-2">
                    무료로 시작하기
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/arthyun"
                  className="group px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 transition-all flex items-center gap-2 rounded-full"
                >
                  데모 보기
                  <ArrowUpRight
                    size={16}
                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>

              {/* 메트릭스 */}
              <div className="flex gap-8 mt-14 pt-8 border-t border-gray-100">
                {[
                  { num: "2,847+", label: "생성된 페이지" },
                  { num: "4.87", label: "만족도" },
                  { num: "0원", label: "기본 비용" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-bold tracking-tight text-gray-900">{m.num}</p>
                    <p className="text-xs text-gray-400 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 오른쪽 — 비주얼 (카드 프리뷰) */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gray-100 bg-white ring-1 ring-black/5 shadow-2xl shadow-black/10">
                <Image
                  src="https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?q=80&w=800&auto=format&fit=crop"
                  alt="ArtPage 아티스트 갤러리 미리보기"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/20" />
                {/* 오버레이 UI 미리보기 */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-lg">
                    <p className="text-xs text-gray-400 mb-1 font-mono">arthyun.co.kr</p>
                    <p className="text-sm font-medium text-gray-900">Art Hyun - 예술로 여는 도시재생</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-full font-medium">전시 관리</span>
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full">작품 판매</span>
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full">다국어</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 플로팅 장식 요소 */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-emerald-50 border border-emerald-100 animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gray-50 border border-gray-100 animate-[float_8s_ease-in-out_infinite_1s]" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 핵심 기능 미리보기 */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="text-xs font-mono tracking-widest text-emerald-600 mb-4 uppercase">
                Core features
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900"
                style={{ wordBreak: "keep-all" }}
              >
                예술가에게 필요한
                <br />
                모든 것이 준비되어 있습니다
              </h2>
            </div>
            <Link
              href="/features"
              className="text-sm text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              자세히 보기
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI 자동 생성",
                desc: "이미지만 올리면 AI가 세계적 수준의 홈페이지를 만들어드립니다.",
              },
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
            ].map((feature) => (
              <Link
                key={feature.title}
                href="/features"
                className="group p-6 rounded-2xl border border-gray-100 bg-white ring-1 ring-black/5 hover:shadow-lg hover:shadow-black/5 hover:border-gray-200 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                  <feature.icon size={22} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p
                  className="text-sm text-gray-500 leading-relaxed"
                  style={{ wordBreak: "keep-all" }}
                >
                  {feature.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why ArtPage — 작품 중심 스토리텔링 */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-mono tracking-widest text-emerald-600 mb-4 uppercase">
              Why ArtPage
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900"
              style={{ wordBreak: "keep-all" }}
            >
              왜 아티스트에게
              <br />
              전용 플랫폼이 필요할까요?
            </h2>
          </div>

          <div className="space-y-24">
            {[
              {
                subtitle: "CURATED CONTROL",
                title: "알고리즘이 아닌,\n아카이빙",
                desc: "SNS의 획일적인 피드는 작품을 흘려보냅니다. ArtPage는 작가가 원하는 순서와 맥락으로 작품을 배치할 수 있는 큐레이션의 주권을 드립니다.",
                image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2971&auto=format&fit=crop",
                align: "right" as const,
              },
              {
                subtitle: "DIRECT CONNECTION",
                title: "팔로워가 아닌,\n멤버십",
                desc: "플랫폼의 팔로워가 아닌, 내 홈페이지의 진짜 팬을 만드세요. 데이터를 직접 소유하고 더 깊은 관계를 맺으세요.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2968&auto=format&fit=crop",
                align: "left" as const,
              },
              {
                subtitle: "ART BUSINESS HQ",
                title: "포트폴리오를 넘어,\n스튜디오",
                desc: "단순한 저장소가 아닙니다. 전시, 판매, 실험이 일어나는 당신만의 예술 비즈니스 본사(HQ)입니다.",
                image: "https://images.unsplash.com/photo-1520423465871-0866049020b7?q=80&w=2800&auto=format&fit=crop",
                align: "right" as const,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                  item.align === "left" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 텍스트 */}
                <div className="flex-1 space-y-6">
                  <span className="text-xs font-bold tracking-[0.3em] text-gray-400">
                    {item.subtitle}
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-bold leading-snug whitespace-pre-line text-gray-900"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-lg text-gray-500 leading-relaxed font-light"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* 이미지 */}
                <div className="flex-1 relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-xl shadow-black/5 group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Artist Showcase */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest text-emerald-600 mb-4 uppercase">
              Artist showcase
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-900"
              style={{ wordBreak: "keep-all" }}
            >
              이미 활동 중인 작가들
            </h2>
            <p
              className="text-gray-500 mt-4 max-w-lg mx-auto"
              style={{ wordBreak: "keep-all" }}
            >
              실제 ArtPage에서 운영 중인 아티스트 홈페이지를 살펴보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Art Hyun",
                slug: "arthyun",
                desc: "예술로 여는 도시재생 — 공공미술 전문",
                image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c9c4?q=80&w=800&auto=format&fit=crop",
                domain: "arthyun.co.kr",
                tag: "공공미술",
              },
              {
                name: "Artway Gallery",
                slug: "art-way",
                desc: "부산 동구 문화 예술 공간",
                image: "https://images.unsplash.com/photo-1544413164-5f1b361f5bfa?q=80&w=800&auto=format&fit=crop",
                domain: "artway.vibers.co.kr",
                tag: "갤러리",
              },
            ].map((site) => (
              <Link
                key={site.slug}
                href={`/${site.slug}`}
                className="group relative rounded-2xl overflow-hidden ring-1 ring-black/5 hover:ring-black/10 shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-200 text-[11px] font-medium rounded-full mb-3 backdrop-blur-sm">
                    {site.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-emerald-200 transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-sm text-white/70" style={{ wordBreak: "keep-all" }}>
                    {site.desc}
                  </p>
                  <p className="text-xs text-white/40 font-mono mt-2">{site.domain}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-gray-900"
            style={{ wordBreak: "keep-all" }}
          >
            당신만의 예술 세계를
            <br />
            만들어보세요
          </h2>
          <p
            className="text-lg text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed"
            style={{ wordBreak: "keep-all" }}
          >
            3분이면 완성됩니다. 신용카드도, 코딩 지식도 필요 없습니다.
          </p>

          <Link
            href="/create"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white text-lg font-bold rounded-full hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-600/20"
            style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            무료로 시작하기
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-xs text-gray-400 mt-6">
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
