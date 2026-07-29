import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "juh_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret || secret.includes("PLACEHOLDER") || secret.length < 16) {
    return null;
  }
  return secret;
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

/** Safe diagnostics for the login page — never returns secret values. */
export function getAdminEnvStatus(): {
  configured: boolean;
  hasEmail: boolean;
  hasPassword: boolean;
  hasSecret: boolean;
  secretLongEnough: boolean;
  issues: string[];
} {
  const email = process.env.ADMIN_EMAIL?.trim() ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";

  const hasEmail = Boolean(email) && !email.includes("PLACEHOLDER");
  const hasPassword = Boolean(password) && !password.includes("PLACEHOLDER");
  const hasSecret = Boolean(secret) && !secret.includes("PLACEHOLDER");
  const secretLongEnough = secret.length >= 16;

  const issues: string[] = [];
  if (!hasEmail) issues.push("ADMIN_EMAIL missing or still PLACEHOLDER");
  if (!hasPassword) issues.push("ADMIN_PASSWORD missing or still PLACEHOLDER");
  if (!hasSecret) issues.push("ADMIN_SESSION_SECRET missing or still PLACEHOLDER");
  else if (!secretLongEnough) {
    issues.push(`ADMIN_SESSION_SECRET too short (${secret.length} chars; need 16+)`);
  }

  return {
    configured: hasEmail && hasPassword && hasSecret && secretLongEnough,
    hasEmail,
    hasPassword,
    hasSecret,
    secretLongEnough,
    issues,
  };
}

export function isAdminEnvConfigured(): boolean {
  return getAdminEnvStatus().configured;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (!isAdminEnvConfigured()) return false;
  const expectedEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase();
  // Trim env password — Vercel UI sometimes adds trailing whitespace/newlines
  const expectedPassword = process.env.ADMIN_PASSWORD!.trim();
  return email.trim().toLowerCase() === expectedEmail && password === expectedPassword;
}

function buildSessionToken(email: string, secret: string): string {
  const payload = `${email.trim().toLowerCase()}:${Date.now()}`;
  return `${payload}.${sign(payload, secret)}`;
}

function cookieOptions() {
  const secure =
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}

/** Set session on a Route Handler response (preferred on Vercel). */
export function applyAdminSessionCookie(response: NextResponse, email: string): void {
  const secret = getSecret();
  if (!secret) throw new Error("Admin session secret not configured");
  response.cookies.set(ADMIN_COOKIE_NAME, buildSessionToken(email, secret), cookieOptions());
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...cookieOptions(),
    maxAge: 0,
  });
}

/** Server Action / RSC cookie helper (logout, etc.). */
export async function createAdminSession(email: string): Promise<void> {
  const secret = getSecret();
  if (!secret) throw new Error("Admin session secret not configured");

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, buildSessionToken(email, secret), cookieOptions());
}

export async function destroyAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const secret = getSecret();
  if (!secret) return null;

  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!payload || !signature) return null;

  const expected = sign(payload, secret);
  try {
    const a = Buffer.from(signature, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const colon = payload.lastIndexOf(":");
  if (colon <= 0) return null;
  const email = payload.slice(0, colon);
  const created = Number(payload.slice(colon + 1));
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
