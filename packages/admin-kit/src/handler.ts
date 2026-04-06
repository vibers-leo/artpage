import type { AdminHandlerConfig, VibersAdminResponse } from "./types";
import { verifyAdminSecret } from "./auth";

export function createAdminHandler(config: AdminHandlerConfig) {
  async function GET(request: Request) {
    if (!verifyAdminSecret(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const resource = url.searchParams.get("resource");

    // resource 쿼리가 있으면 커스텀 리소스 핸들러로 위임
    if (resource && config.getResource) {
      try {
        const data = await config.getResource(resource, url.searchParams);
        return Response.json({ resource, data });
      } catch (err) {
        console.error(`[vibers-admin:${config.projectId}:${resource}]`, err);
        return Response.json({ error: "Resource fetch failed" }, { status: 500 });
      }
    }

    try {
      const [stats, recentActivity] = await Promise.all([
        config.getStats(),
        config.getRecentActivity(),
      ]);

      const response: VibersAdminResponse = {
        projectId: config.projectId,
        projectName: config.projectName,
        stats,
        recentActivity,
        health: "healthy",
      };

      return Response.json(response);
    } catch (err) {
      console.error(`[vibers-admin:${config.projectId}]`, err);
      return Response.json(
        {
          projectId: config.projectId,
          projectName: config.projectName,
          stats: { mau: 0, totalUsers: 0, contentCount: 0, recentSignups: 0 },
          recentActivity: [],
          health: "error",
        } satisfies VibersAdminResponse,
        { status: 200 }
      );
    }
  }

  async function POST(request: Request) {
    if (!verifyAdminSecret(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!config.handlePost) {
      return Response.json({ error: "Not implemented" }, { status: 501 });
    }

    const body = await request.json();
    const result = await config.handlePost(body);
    return Response.json(result);
  }

  return { GET, POST };
}
