import { NextRequest, NextResponse } from "next/server";

function verifyAdminSecret(request: NextRequest): boolean {
  const secret = process.env.VIBERS_ADMIN_SECRET;
  if (!secret) return false;
  return request.headers.get("x-vibers-admin-secret") === secret;
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // matecheck는 Rails API(matecheck-api.vibers.co.kr) 기반
  // Next.js 레이어에 직접 DB 없음 → 최소 응답 반환
  return NextResponse.json({
    projectId: "matecheck",
    projectName: "메이트체크",
    stats: { totalUsers: 0, contentCount: 0, mau: 0, recentSignups: 0 },
    recentActivity: [],
    health: "healthy",
  });
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
