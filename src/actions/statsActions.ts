"use server";

import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, getCountFromServer, doc, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";

// [방문자 수 증가] (누구나 호출 가능 - 내부적으로 처리)
export async function incrementVisitor() {
  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const statRef = doc(db, "daily_stats", today);
    
    const docSnap = await getDoc(statRef);
    if (docSnap.exists()) {
      await updateDoc(statRef, { count: increment(1) });
    } else {
      await setDoc(statRef, { date: today, count: 1 });
    }
  } catch (error) {
    console.error("Increment visitor error:", error);
  }
}

// [대시보드 통계 조회] (관리자용)
export async function getDashboardStats() {
  try {
    // 1. 전체 전시 수
    const exhibitionColl = collection(db, "exhibitions");
    const exhibitionSnapshot = await getCountFromServer(exhibitionColl);
    const exhibitionCount = exhibitionSnapshot.data().count;

    // 2. 전체 미디어 수
    const mediaColl = collection(db, "media_releases");
    const mediaSnapshot = await getCountFromServer(mediaColl);
    const mediaCount = mediaSnapshot.data().count;

    // 3. 최근 30일 방문자 통계
    const q = query(collection(db, "daily_stats"), orderBy("date", "asc"), limit(30));
    const querySnapshot = await getDocs(q);
    const visitorStats = querySnapshot.docs.map(doc => doc.data());

    // 4. 오늘의 방문자 수
    const today = new Date().toISOString().split("T")[0];
    const todayStat = visitorStats.find((s: any) => s.date === today);

    return {
      exhibitionCount: exhibitionCount || 0,
      mediaCount: mediaCount || 0,
      todayVisitorCount: todayStat ? (todayStat as any).count : 0,
      visitorStats: visitorStats || [],
    };
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return {
      exhibitionCount: 0,
      mediaCount: 0,
      todayVisitorCount: 0,
      visitorStats: [],
    };
  }
}
