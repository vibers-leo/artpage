# news-drafts — 소식 자동 등록 폴더

이 폴더에 `.md` 파일을 저장하면 **vibers.co.kr 소식 섹션에 자동으로 반영**됩니다.

## 파일명 규칙

```
YYYY-MM-DD_{프로젝트ID}_{한글제목슬러그}.md
```

예시:
- `2026-04-15_wayo_이벤트-CRUD-완성.md`
- `2026-04-15_semophone_시세조회-API-업데이트.md`
- `2026-04-15_vibers_통합어드민-와요연동.md`

## 파일 형식 (Frontmatter + 본문)

```markdown
---
title: 와요 이벤트 관리 기능 완성
type: update
clientId: wayo
tag: CRUD
color: "#34D399"
url: https://wayo.co.kr
size: md
---

와요의 이벤트 생성·수정·삭제·승인 기능이 완성됐습니다.
어드민에서 이벤트 상태를 한눈에 관리할 수 있습니다.

(이 아래 내용은 모달 상세 본문으로 표시됩니다)
```

## 필드 설명

| 필드 | 필수 | 설명 | 예시 |
|------|------|------|------|
| `title` | ✅ | 소식 제목 (70자 이내) | `세모폰 시세조회 API 오픈` |
| `type` | ✅ | `launch` / `update` / `insight` / `collab` | `update` |
| `clientId` | ✅ | 프로젝트 ID (clients 목록 참조) | `wayo` |
| `tag` | ✅ | 핵심 키워드 1개 | `#업데이트` |
| `color` | - | 브랜드 색상 (기본값: 프로젝트 색상) | `#34D399` |
| `url` | - | 관련 링크 | `https://wayo.co.kr` |
| `size` | - | `sm` / `md` / `lg` (기본값: `md`) | `md` |

## clientId 목록

| clientId | 서비스명 |
|----------|----------|
| `vibers` | 계발자들 (플랫폼 전체) |
| `faneasy` | 팬이지 |
| `wayo` | 와요 |
| `semophone` | 세모폰 |
| `myratingis` | 제평가는요? |
| `monopage` | 모노페이지 |
| `premiumpage` | 프리미엄페이지 |
| `vibefolio` | 바이브폴리오 |
| `ai-recipe` | AI 레시피 |
| `honsul` | 혼술 |
| `nusucheck` | 누수체크 |
| `mission7` | 미션세븐 |
| `dus` | 디어스 |

## 작성 규칙

- 첫 문단 (빈 줄 전) → 카드 미리보기 본문 (120자 이내 권장)
- 이후 내용 → 모달 상세 본문
- 실제 작업이 없으면 작성하지 않는다
- 한 세션에 여러 소식이면 파일을 여러 개 만든다
