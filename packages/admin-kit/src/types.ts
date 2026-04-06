export interface VibersAdminStats {
  mau: number;
  totalUsers: number;
  contentCount: number;
  recentSignups: number;
  revenue?: number;
}

export interface ActivityItem {
  id: string;
  type: "signup" | "content" | "payment" | "other";
  label: string;
  timestamp: string;
  meta?: Record<string, unknown>;
}

export interface VibersAdminResponse {
  projectId: string;
  projectName: string;
  stats: VibersAdminStats;
  recentActivity: ActivityItem[];
  health: "healthy" | "warning" | "error";
}

export interface AdminHandlerConfig {
  projectId: string;
  projectName: string;
  getStats: () => Promise<VibersAdminStats>;
  getRecentActivity: () => Promise<ActivityItem[]>;
  /** ?resource=xxx 쿼리 처리 — 프로젝트별 커스텀 리소스 */
  getResource?: (resource: string, params: URLSearchParams) => Promise<unknown>;
  handlePost?: (body: unknown) => Promise<unknown>;
}
