import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "juh_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.includes("PLACEHOLDER") || secret.length < 16) {
    return null;
  }
  return secret;
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function isAdminEnvConfigured(): boolean {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(
    email &&
      password &&
      !email.includes("PLACEHOLDER") &&
      !password.includes("PLACEHOLDER") &&
      getSecret(),
  );
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (!isAdminEnvConfigured()) return false;
  const expectedEmail = process.env.ADMIN_EMAIL!;
  const expectedPassword = process.env.ADMIN_PASSWORD!;
  return email === expectedEmail && password === expectedPassword;
}

export async function createAdminSession(email: string): Promise<void> {
  const secret = getSecret();
  if (!secret) throw new Error("Admin session secret not configured");

  const payload = `${email}:${Date.now()}`;
  const token = `${payload}.${sign(payload, secret)}`;
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const secret = getSecret();
  if (!secret) return null;

  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload, secret);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const [email, ts] = payload.split(":");
  const created = Number(ts);
  if (!email || !created || Date.now() - created > MAX_AGE_SECONDS * 1000) {
    return null;
  }

  return { email };
}

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function requireAdminOrRedirect(): Promise<{ email: string }> {
  const { redirect } = await import("next/navigation");
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session as { email: string };
}
