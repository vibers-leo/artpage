import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import ArchiveClient from "@/components/templates/art-way/ArchiveClient";
import { AdminExhibitionButton } from "@/components/templates/art-way/AdminButtons";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const q = query(collection(db, "exhibitions"), orderBy("start_date", "desc"));
  const querySnapshot = await getDocs(q);
  const exhibitions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];

  // 2. 관리자 버튼은 클라이언트 컴포넌트에서 처리 (페이지 캐싱을 위해)

  return (
    <div className="max-w-screen-2xl mx-auto px-6 mt-8 py-12 md:py-20 relative">
      <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
        <h2 className="font-serif text-2xl md:text-3xl">Exhibition Archive</h2>

        {/* 3. 관리자에게만 보이는 등록 버튼 (클라이언트 사이드 체크) */}
        <AdminExhibitionButton />
      </div>

      {/* 4. 기존 모달 스타일 유지 */}
      <ArchiveClient initialData={exhibitions || []} />
    </div>
  );
}
