import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export type LeadNotifyPayload = {
  name: string;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  source?: string | null;
};

export function isEmailConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  return Boolean(key && to && !key.includes("PLACEHOLDER") && !to.includes("PLACEHOLDER"));
}

export async function notifyJoeOfLead(
  payload: LeadNotifyPayload,
): Promise<{ sent: boolean; reason?: string }> {
  if (!isEmailConfigured()) {
    return {
      sent: false,
      reason: "Email not configured (RESEND_API_KEY / LEAD_NOTIFY_EMAIL).",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
  const to = process.env.LEAD_NOTIFY_EMAIL!;

  await resend.emails.send({
    from,
    to,
    subject: `[${siteConfig.name}] New lead — ${payload.name}`,
    text: [
      `New lead`,
      `Name: ${payload.name}`,
      `Email: ${payload.email || "—"}`,
      `Phone: ${payload.phone || "—"}`,
      `Source: ${payload.source || "—"}`,
      "",
      payload.notes || "(no notes)",
    ].join("\n"),
  });

  return { sent: true };
}
