"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import MainSlider from "@/components/MainSlider";
import ExhibitionCard from "@/components/ExhibitionCard";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useEffect, useState } from "react";
import MasonryGrid from "@/components/MasonryGrid";

// 데이터가 계속 바뀌므로 캐싱하지 않음 (새로고침 시 즉시 반영)
// export const dynamic = "force-dynamic";

export default function HomePage() {
  const { t } = useLanguage();
  const [exhibitions, setExhibitions] = useState<any[]>([]);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      console.log("--------------- [메인 페이지 로드 시작] ---------------");

      // 1. 메인 슬라이더용 전시 데이터 가져오기
      const { data: exData, error: exError } = await supabase
        .from("exhibitions")
        .select("*")
        .eq("is_main_slider", true) 
        .order("created_at", { ascending: false });

      if (exError) console.error("❌ 전시 데이터 에러:", exError.message);
      else {
        console.log(`✅ 전시 데이터: ${exData?.length}개 로드됨`);
        setExhibitions(exData || []);
      }

      // 2. 배경 유튜브 URL 가져오기
      const { data: bannerData, error: bnError } = await supabase
        .from("main_banner")
        .select("youtube_url")
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

      if (bnError) console.error("❌ 배너 데이터 에러:", bnError.message);
      console.log("✅ 배너 데이터:", bannerData);

      // 유튜브 ID 추출
      const getYoutubeId = (url: string | null | undefined) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
      };

      const ytId = getYoutubeId(bannerData?.youtube_url);
      console.log("🎥 추출된 유튜브 ID:", ytId);
      setYoutubeId(ytId);
    }

    fetchData();
  }, []);

  const slides = exhibitions;

  return (
    <>
      {/* =========================================
          📺 [1] 히어로 섹션 (풀스크린)
      ========================================= */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {youtubeId ? (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
               <iframe
                className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.3]"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&origin=http://localhost:3000`}
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 text-center flex flex-col items-center justify-center">
             {/* 비디오 없을 때 보여줄 기본 히어로 이미지 */}
             <div className="absolute inset-0 w-full h-full">
               <Image 
                 src="/hero.png" 
                 alt="Hero Background" 
                 fill 
                 className="object-cover opacity-60"
                 priority
               />
               <div className="absolute inset-0 bg-black/30" />
             </div>
          </div>
        )}

        {/* 히어로 텍스트 오버레이 */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white space-y-6">
            <span className="text-sm md:text-base tracking-[0.5em] font-light animate-fade-in-up uppercase">
              Seoul Artisan
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight animate-fade-in-up delay-100 uppercase">
              Brand Name
            </h1>
            <p className="max-w-lg text-center text-white/80 text-sm md:text-base leading-relaxed px-4 animate-fade-in-up delay-200">
              The harmony of tradition and modernity. <br/>
              Experience the new wave of Korean aesthetics.
            </p>
            
            {/* 스크롤 유도 아이콘 */}
            <div className="absolute bottom-10 animate-bounce">
              <span className="text-xs tracking-widest opacity-70">SCROLL DOWN</span>
            </div>
        </div>
      </section>

      {/* =========================================
          🖼️ [2] 컨텐츠 레이어 (메이슨리 그리드)
          유튜브 링크 밑에 있는 컴포넌트 요소
      ========================================= */}
      <MasonryGrid />

    </>
  );
}