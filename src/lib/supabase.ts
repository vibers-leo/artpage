// [DEPRECATED] DB는 자체 PostgreSQL(Prisma)로 마이그레이션 완료
// Storage 전용 클라이언트는 supabase-storage.ts 사용
// 하위 호환용 re-export
export { supabaseStorage as supabase } from "./supabase-storage";
