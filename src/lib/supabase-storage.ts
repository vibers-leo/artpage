// Supabase Storage 전용 클라이언트
// DB는 자체 PostgreSQL(Prisma)로 마이그레이션 완료 — Storage만 유지

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase Storage 환경 변수가 설정되지 않았습니다. 이미지 업로드가 작동하지 않을 수 있습니다."
  );
}

export const supabaseStorage = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);
