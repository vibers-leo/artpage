const SUPER_ADMINS = [
  "juuuno@gmail.com",
  "leo@vibers.co.kr",
];

export function isSuperAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return SUPER_ADMINS.includes(email.toLowerCase());
}

export function verifyAdminSecret(request: Request): boolean {
  const secret = process.env.VIBERS_ADMIN_SECRET;
  if (!secret) return false;
  const header = request.headers.get("x-vibers-admin-secret");
  return header === secret;
}
