"use server";

import { revalidatePath } from "next/cache";
import { notifyJoeOfLead } from "@/lib/email";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { contactLeadSchema } from "@/lib/validators";

export type ActionResult = {
  ok: boolean;
  message: string;
};

export async function createContactLead(raw: unknown): Promise<ActionResult> {
  const parsed = contactLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid form" };
  }

  if (!isDatabaseConfigured() || !prisma) {
    return {
      ok: false,
      message:
        "Database is not configured yet. Set DATABASE_URL in .env.local (see .env.example).",
    };
  }

  const data = parsed.data;
  const email = data.email || null;
  const phone = data.phone || null;
  if (!email && !phone) {
    return {
      ok: false,
      message: "Please provide an email or phone number so Joe can reach you.",
    };
  }

  await prisma.lead.create({
    data: {
      name: data.name,
      email,
      phone,
      notes: data.notes || null,
      source: data.source || null,
    },
  });

  const notify = await notifyJoeOfLead({
    name: data.name,
    email,
    phone,
    notes: data.notes,
    source: data.source,
  });

  revalidatePath("/admin/leads");

  return {
    ok: true,
    message: notify.sent
      ? "Got it — Joe will follow up soon."
      : "Got it — your message was saved. (Email notify is not configured yet.)",
  };
}
