// 멀티테넌트 템플릿 레지스트리
// slug → 템플릿 컴포넌트 + 테마 설정 매핑

export type TemplateConfig = {
  slug: string;
  name: string;
  template: "arthyun" | "art-way" | "modern-art" | "classic-gallery" | "minimal-portfolio";
  // 테마
  theme: {
    bodyClass: string;
    bodyStyle: React.CSSProperties;
    footerClass: string;
  };
  // 기본 메타데이터
  meta: {
    title: string;
    description: string;
    domain: string;
  };
  // 연락처
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  // SNS
  social: {
    instagram?: string;
    blog?: string;
    youtube?: string;
  };
};

// AI 사이트 생성용 템플릿 ID 타입
export type GenerativeTemplateId = "modern-art" | "classic-gallery" | "minimal-portfolio";

// AI 생성 가능 템플릿 목록
export const GENERATIVE_TEMPLATES: {
  id: GenerativeTemplateId;
  name: string;
  description: string;
  goodFor: string[];
  preview: string; // 프리뷰 이미지 경로 (추후 추가)
}[] = [
  {
    id: "modern-art",
    name: "모던 아트",
    description: "깔끔한 흰색 배경, 대형 이미지 그리드, 산세리프 타이포그래피",
    goodFor: ["현대미술", "디지털 아트", "설치미술"],
    preview: "/templates/modern-art-preview.jpg",
  },
  {
    id: "classic-gallery",
    name: "클래식 갤러리",
    description: "어두운 배경, 우아한 세리프 폰트, 단일 이미지 포커스",
    goodFor: ["전통미술", "유화", "조각", "수채화"],
    preview: "/templates/classic-gallery-preview.jpg",
  },
  {
    id: "minimal-portfolio",
    name: "미니멀 포트폴리오",
    description: "울트라 미니멀, 메이슨리 그리드, 순수 작품 중심",
    goodFor: ["사진", "일러스트", "그래픽 디자인", "판화"],
    preview: "/templates/minimal-portfolio-preview.jpg",
  },
];

// 템플릿 설정 맵
export const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  arthyun: {
    slug: "arthyun",
    name: "Art Hyun",
    template: "arthyun",
    theme: {
      bodyClass:
        "font-sans text-gray-800 bg-white selection:bg-gray-900 selection:text-white",
      bodyStyle: {
        fontFamily:
          "'Pretendard Variable', Pretendard, var(--font-sans), system-ui, -apple-system, sans-serif",
      },
      footerClass: "py-24 bg-[#222222] text-gray-400 cursor-auto",
    },
    meta: {
      title: "Art Hyun | 예술로 여는 도시재생",
      description: "공공미술, 공공디자인, 벽화 전문 청년 사회적기업입니다.",
      domain: "https://arthyun.co.kr",
    },
    contact: {
      address: "부산광역시 금정구 금사로 130, 캠퍼스디 2관 camp2",
      phone: "010-7713-4750",
      email: "k-drawingboard@naver.com",
    },
    social: {
      instagram: "https://www.instagram.com/art_hyun/",
      blog: "https://blog.naver.com/arthyunn",
    },
  },
  "art-way": {
    slug: "art-way",
    name: "Artway Gallery",
    template: "art-way",
    theme: {
      bodyClass:
        "font-sans text-gray-900 bg-white selection:bg-black selection:text-white",
      bodyStyle: {
        fontFamily:
          "'Pretendard Variable', Pretendard, var(--font-sans), system-ui, -apple-system, sans-serif",
      },
      footerClass: "py-24 border-t border-gray-100 bg-white",
    },
    meta: {
      title: "Artway Gallery",
      description: "부산 동구 문화 예술 공간",
      domain: "https://artway.vibers.co.kr",
    },
    contact: {
      address: "부산광역시 동구 정공단로 9",
      phone: "0507-1369-8386",
      email: "artway_gallery@naver.com",
    },
    social: {
      instagram: "https://www.instagram.com/artwaygallery_story/",
      blog: "https://blog.naver.com/art_way_",
      youtube: "https://www.youtube.com/@artwaygallerybusan",
    },
  },
};

// slug로 템플릿 설정 조회
export function getTemplateConfig(slug: string): TemplateConfig | null {
  return TEMPLATE_CONFIGS[slug] ?? null;
}

// 유효한 slug인지 확인
export function isValidSlug(slug: string): boolean {
  return slug in TEMPLATE_CONFIGS;
}

// 모든 slug 목록
export function getAllSlugs(): string[] {
  return Object.keys(TEMPLATE_CONFIGS);
}
