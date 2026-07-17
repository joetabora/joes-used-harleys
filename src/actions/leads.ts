"use server";

import { revalidatePath } from "next/cache";
import { LeadType } from "@/generated/prisma/client";
import { notifyJoeOfLead } from "@/lib/email";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import {
  alertSchema,
  contactLeadSchema,
  preapprovalSchema,
} from "@/lib/validators";

export type ActionResult = {
  ok: boolean;
  message: string;
};

async function persistLead(input: {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  sourcePage?: string;
  bikeId?: string;
  type: LeadType;
}): Promise<ActionResult> {
  if (!isDatabaseConfigured() || !prisma) {
    return {
      ok: false,
      message:
        "Database is not configured yet. Set DATABASE_URL in .env.local (see .env.example).",
    };
  }

  const email = input.email || null;
  const phone = input.phone || null;
  if (!email && !phone) {
    return {
      ok: false,
      message: "Please provide an email or phone number so Joe can reach you.",
    };
  }

  await prisma.lead.create({
    data: {
      name: input.name,
      email,
      phone,
      message: input.message || null,
      sourcePage: input.sourcePage || null,
      bikeId: input.bikeId || null,
      type: input.type,
    },
  });

  const notify = await notifyJoeOfLead({
    name: input.name,
    email,
    phone,
    message: input.message,
    type: input.type,
    sourcePage: input.sourcePage,
  });

  revalidatePath("/admin/leads");

  return {
    ok: true,
    message: notify.sent
      ? "Got it — Joe will follow up soon."
      : "Got it — your message was saved. (Email notify is not configured yet.)",
  };
}

export async function createContactLead(
  raw: unknown,
): Promise<ActionResult> {
  const parsed = contactLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid form" };
  }

  const data = parsed.data;
  return persistLead({
    name: data.name,
    email: data.email || undefined,
    phone: data.phone || undefined,
    message: data.message || undefined,
    sourcePage: data.sourcePage,
    bikeId: data.bikeId || undefined,
    type: LeadType.CONTACT,
  });
}

export async function createPreapprovalLead(
  raw: unknown,
): Promise<ActionResult> {
  const parsed = preapprovalSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid form" };
  }

  const data = parsed.data;
  return persistLead({
    name: data.name,
    email: data.email || undefined,
    phone: data.phone || undefined,
    message: data.message,
    sourcePage: data.sourcePage,
    bikeId: data.bikeId || undefined,
    type: LeadType.PREAPPROVAL,
  });
}

export async function subscribeAlert(raw: unknown): Promise<ActionResult> {
  const parsed = alertSchema.safeParse(raw);
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

  const { email, model, maxPrice } = parsed.data;

  await prisma.alertSubscription.upsert({
    where: {
      email_model_maxPrice: {
        email,
        model: model || "",
        maxPrice: maxPrice ?? 0,
      },
    },
    create: {
      email,
      model: model || "",
      maxPrice: maxPrice ?? 0,
      active: true,
    },
    update: { active: true },
  });

  await persistLead({
    name: email,
    email,
    message: `Alert signup — model: ${model || "any"}, maxPrice: ${maxPrice ?? "any"}`,
    type: LeadType.ALERT,
    sourcePage: "/inventory",
  });

  revalidatePath("/admin/leads");

  return {
    ok: true,
    message: "You're on the list. Joe will ping you when a matching bike shows up.",
  };
}
