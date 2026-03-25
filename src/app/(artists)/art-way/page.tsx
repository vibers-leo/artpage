import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where, limit } from "firebase/firestore";
// 🚨 주의: MainSlider가 있는 경로를 확인하세요. 
// 스크린샷 기준으로는 "@/components/ui/MainSlider" 가 맞습니다.
import MainSlider from "@/components/templates/art-way/MainSlider"; 

// 데이터가 계속 바뀌므로 캐싱하지 않음 (새로고침 시 즉시 반영)
export const dynamic = "force-dynamic";

export default async function HomePage() {
  console.log("--------------- [메인 페이지 로드 시작] ---------------");

  // 1. 메인 슬라이더용 전시 데이터 가져오기
  // (테이블에 is_main_slider 컬럼이 없으면 에러가 날 수 있으니 꼭 추가해주세요!)
  const qEx = query(
    collection(db, "exhibitions"),
    where("is_main_slider", "==", true),
    orderBy("created_at", "desc")
  );
  const snapEx = await getDocs(qEx);
  const exhibitions = snapEx.docs.map(doc => ({ id: doc.id, ...doc.data() }));


  // 2. 배경 유튜브 URL 가져오기
  const qBn = query(
    collection(db, "main_banner"),
    where("is_active", "==", true),
    limit(1)
  );
  const snapBn = await getDocs(qBn);
  const bannerData = snapBn.empty ? null : snapBn.docs[0].data();


  // 3. 데이터 가공
  const slides = exhibitions || [];

  return (
    // relative: 자식 요소들의 기준점
    // h-screen: 화면 꽉 채움
    // overflow-hidden: 영상이 튀어나가는 것 방지
    // bg-black: 영상 로딩 전 깜빡임 방지용 검은 배경
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* =========================================
          🖼️ [컨텐츠 레이어] (슬라이더 + 배경)
          MainSlider 내부에서 배경 영상과 컨텐츠를 모두 처리합니다.
      ========================================= */}
      <div className="relative z-10 h-full w-full pt-16">
        {slides.length > 0 ? (
          <MainSlider 
            exhibitions={slides} 
            fallbackYoutubeUrl={bannerData?.youtube_url}
          />
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