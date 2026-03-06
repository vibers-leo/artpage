-- =============================================
-- ArtPage: 클라이언트 관리 테이블
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- 1. clients 테이블 생성
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  thumbnail_url TEXT,
  website_url TEXT,
  template TEXT DEFAULT 'default',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'development')),
  category TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS 활성화
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- 3. 공개 읽기 정책 (랜딩 페이지에서 active 클라이언트 표시)
CREATE POLICY "Public can view active clients"
  ON clients FOR SELECT
  USING (status = 'active');

-- 4. 인증된 사용자 전체 접근 (어드민)
CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. 초기 시드 데이터 (기존 프로젝트)
INSERT INTO clients (name, slug, description, category, website_url, template, status, display_order)
VALUES
  ('아트현 (ArtHyun)', 'arthyun', '현대미술 갤러리의 전시 아카이빙과 작가 포트폴리오를 위한 종합 플랫폼', '갤러리', '/arthyun', 'arthyun', 'active', 1),
  ('아트웨이 (ArtWay)', 'artway', '예술 교육과 문화 프로그램을 연결하는 커뮤니티 중심 플랫폼', '문화단체', '/art-way', 'art-way', 'active', 2)
ON CONFLICT (slug) DO NOTHING;
