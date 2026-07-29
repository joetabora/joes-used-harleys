import { NextResponse } from "next/server";
import {
  applyAdminSessionCookie,
  isAdminEnvConfigured,
  verifyAdminCredentials,
} from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

/**
 * JoeOS admin login via Route Handler.
 * Sets the session cookie on the HTTP response (reliable on Vercel).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Enter a valid email and password." },
      { status: 400 },
    );
  }

  if (!isAdminEnvConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Admin env not configured on this deployment. Set ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET (16+ chars) for Production, then Redeploy.",
      },
      { status: 503 },
    );
  }

  if (!verifyAdminCredentials(parsed.data.email, parsed.data.password)) {
    return NextResponse.json(
      { ok: false, message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true, message: "Signed in." });
  applyAdminSessionCookie(response, parsed.data.email);
  return response;
}
