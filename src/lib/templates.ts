// 멀티테넌트 템플릿 레지스트리
// slug → 템플릿 컴포넌트 + 테마 설정 매핑

export type TemplateConfig = {
  slug: string;
  name: string;
  template: "arthyun" | "art-way";
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
