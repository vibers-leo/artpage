## 전략 문서 (개발 전 반드시 숙지)
- **전략 진단 리포트**: `data/STRATEGY_ANALYSIS.md`
- **PM 공통 지침**: 맥미니 루트 `pm.md`

### 전략 핵심 요약
- 실제 갤러리 운영 클라이언트 사이트 — 전시 관리 웹사이트
- Supabase SSR 기반 경량 솔루션
- 콘텐츠 기반 활성도 — 전시 일정 자동화 및 SNS 연동 필요

---

# Artpage (북촌 아트 스페이스)

## 프로젝트 개요
북촌 아트 스페이스 웹사이트. Supabase + Tiptap 에디터 기반.

## 기술 스택
- Framework: Next.js 16
- Language: TypeScript
- Package Manager: bun (권장) / npm

## 개발 규칙

### 코드 스타일
- 시맨틱 라인 브레이크: UI 텍스트는 의미 단위로 줄바꿈
- 한글 우선 원칙: 모든 UI 텍스트와 주석은 한국어
- TypeScript strict mode 사용

### 디자인 준수
- 반응형 브레이크포인트: 640, 768, 1024, 1280px
- 폰트: Pretendard (한글 기본)
- Tailwind CSS 유틸리티 클래스 사용
- 접근성: WCAG 2.1 AA 기준

### Git 규칙
- 커밋 메시지: 한글 (feat:, fix:, refactor:, chore: 접두사)
- 브랜치: main → feature/기능명
- PR 필수 (셀프 리뷰 가능)

### 배포
- 대상 서버: NCP (server.vibers.co.kr)
- Docker 컨테이너 기반 배포 예정
- CI/CD: GitHub Actions

## 주요 명령어
```bash
bun install        # 의존성 설치
bun dev            # 개발 서버
bun run build      # 빌드
bun test           # 테스트
```

## AI Recipe 이미지 API

이 프로젝트는 **AI Recipe 중앙 이미지 서비스**를 사용합니다.

### 사용 가능한 함수

```typescript
import { searchStockImage, generateAIImage } from '@/lib/ai-recipe-client';
```

### Stock Image 검색
```typescript
const image = await searchStockImage('bukchon art space exhibition', {
  orientation: 'landscape',
  size: 'large',
});
// → { url, provider, alt, photographer, ... }
```

### AI 이미지 생성
```typescript
const image = await generateAIImage('elegant art exhibition poster, korean traditional modern fusion', {
  size: 'large',
  provider: 'auto',
});
// → { url, prompt, provider }
```

### 주요 용도
- 전시 이미지
- 갤러리 홍보 비주얼
- 아티스트 프로필 배경

### 주의사항
- Server Action이나 API Route에서만 사용 (API 키 보호)
- Rate Limit: 1000회/일
- AI Recipe 서버 실행 필요: http://localhost:3300

## 상위 브랜드
- 회사: 계발자들 (Vibers)
- 도메인: vibers.co.kr
- 서버: server.vibers.co.kr
