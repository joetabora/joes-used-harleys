import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const response = NextResponse.redirect(new URL("/admin/login", siteUrl), 303);
  clearAdminSessionCookie(response);
  return response;
}
