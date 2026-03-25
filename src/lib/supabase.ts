// lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

// .env.local 파일에서 환경 변수를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 필수 환경 변수가 없으면 경고만 출력하고 오류를 발생시키지 않습니다.
// (Firebase 이전 작업 중이므로, Supabase를 사용하는 페이지에서 개별적으로 처리하도록 합니다.)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인하세요. Supabase 관련 기능이 작동하지 않을 수 있습니다."
  );
}

// Supabase 클라이언트 생성 (변수가 없으면 null을 허용하지 않으므로 빈 문자열 처리하거나 무시)
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
