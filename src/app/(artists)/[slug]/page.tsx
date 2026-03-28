import { notFound } from "next/navigation";
import { getTemplateConfig } from "@/lib/templates";

import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export const dynamic = "force-dynamic";

export default async function SlugHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getTemplateConfig(slug);
  if (!config) notFound();

  if (config.template === "arthyun") {
    return <ArthyunHome />;
  }

  return <ArtWayHome />;
}

// ── arthyun 메인 페이지 ──
async function ArthyunHome() {
  const MainSlider = (await import("@/components/templates/arthyun/MainSlider")).default;
  const MainBackground = (await import("@/components/templates/arthyun/MainBackground")).default;
  const Image = (await import("next/image")).default;

  try {
    const slides: any[] = [];

    try {
      const q = query(
        collection(db, "portfolios"),
        where("is_featured", "==", true)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        snap.docs.forEach((doc) => {
          const data = doc.data();
          slides.push({
            id: doc.id,
            ...data,
            poster_url: data.thumbnail_url,
            artist: data.client || data.artist || "ART HYUN",
            start_date: data.completion_date || data.created_at?.substring(0, 10),
            end_date: null,
          });
        });
      }
    } catch (e) {
      console.error("Firebase featured portfolios fetch error:", e);
    }

    let mainSettings: any = null;
    try {
      const q = query(collection(db, "main_settings"), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        mainSettings = snap.docs[0].data();
      }
    } catch (e) {
      console.error("Firebase main_settings fetch error:", e);
    }

    return (
      <div className="relative w-full h-screen bg-black overflow-hidden">
        <MainBackground youtubeUrl={mainSettings?.youtube_url} />
        <div className="relative z-10 h-full w-full pt-16">
          {slides.length > 0 ? (
            <MainSlider exhibitions={slides} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/80 gap-8 text-center px-4 animate-fade-in">
              {mainSettings?.poster_url && (
                <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[50vh] flex items-center justify-center">
                  {mainSettings.link_url ? (
                    <a href={mainSettings.link_url} className="relative w-full h-full block hover:opacity-90 transition-opacity">
                      <Image src={mainSettings.poster_url} alt="Main Poster" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 90vw, 500px" priority />
                    </a>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image src={mainSettings.poster_url} alt="Main Poster" fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 90vw, 500px" priority />
                    </div>
                  )}
                </div>
              )}
              {mainSettings?.center_text ? (
                <p className="text-base md:text-xl font-medium tracking-widest leading-relaxed whitespace-pre-wrap drop-shadow-lg max-w-3xl">
                  {mainSettings.center_text}
                </p>
              ) : (
                !mainSettings?.poster_url && (
                  <>
                    <p className="text-lg font-light tracking-widest text-white/40">EXHIBITION PREPARING</p>
                    <p className="text-xs text-white/30">현재 진행 중인 전시가 준비 중입니다.</p>
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("CRITICAL ERROR:", error);
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white p-10 text-center">
        <h1 className="text-4xl font-serif mb-4">Art Hyun</h1>
        <p className="text-gray-400 mb-8">System Maintenance</p>
        <p className="text-xs text-red-500">{error.message}</p>
      </div>
    );
  }
}

// ── art-way 메인 페이지 ──
async function ArtWayHome() {
  const MainSlider = (await import("@/components/templates/art-way/MainSlider")).default;

  const q = query(
    collection(db, "exhibitions"),
    where("is_main_slider", "==", true),
    orderBy("created_at", "desc")
  );
  const snapEx = await getDocs(q);
  const exhibitions = snapEx.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const qBn = query(
    collection(db, "main_banner"),
    where("is_active", "==", true),
    limit(1)
  );
  const snapBn = await getDocs(qBn);
  const bannerData = snapBn.empty ? null : snapBn.docs[0].data();

  const slides = exhibitions || [];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative z-10 h-full w-full pt-16">
        {slides.length > 0 ? (
          <MainSlider exhibitions={slides} fallbackYoutubeUrl={bannerData?.youtube_url} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
            <p className="text-lg font-light tracking-widest">EXHIBITION PREPARING</p>
            <p className="text-xs">현재 진행 중인 전시가 준비 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
