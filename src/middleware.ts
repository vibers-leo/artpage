import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. 세션 쿠키 가져오기
  const session = request.cookies.get("session")?.value;

  // 2. 보호할 경로 설정 (/admin 으로 시작하는 모든 경로)
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 로그인이 안 되어 있으면 (세션 쿠키가 없으면) 로그인 페이지로 강제 이동
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. 이미 로그인된 상태에서 로그인 페이지 접근 시 대시보드로 리다이렉트 (추가 옵션)
  if (request.nextUrl.pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
