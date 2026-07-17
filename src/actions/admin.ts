"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BikeStatus, InteractionType, LeadStatus } from "@/generated/prisma/client";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import {
  adminLoginSchema,
  bikeFormSchema,
  interactionFormSchema,
} from "@/lib/validators";

export type AdminActionResult = {
  ok: boolean;
  message: string;
};

function parsePhotoLines(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function adminLogin(raw: unknown): Promise<AdminActionResult> {
  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: "Enter a valid email and password." };
  }

  if (!verifyAdminCredentials(parsed.data.email, parsed.data.password)) {
    return { ok: false, message: "Invalid credentials or admin env not configured." };
  }

  await createAdminSession(parsed.data.email);
  redirect("/admin");
}

export async function adminLogout(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function upsertBike(
  raw: unknown,
  id?: string,
): Promise<AdminActionResult> {
  await requireAdmin();

  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  const parsed = bikeFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid bike" };
  }

  const data = parsed.data;
  const mileage =
    typeof data.mileage === "number" && !Number.isNaN(data.mileage)
      ? data.mileage
      : null;
  const price =
    typeof data.price === "number" && !Number.isNaN(data.price)
      ? data.price
      : null;

  const payload = {
    year: data.year,
    make: data.make,
    model: data.model,
    mileage,
    price,
    description: data.description || null,
    status: data.status as BikeStatus,
    photos: parsePhotoLines(data.photos),
  };

  let bikeId = id;
  if (id) {
    await prisma.bike.update({ where: { id }, data: payload });
  } else {
    const created = await prisma.bike.create({ data: payload });
    bikeId = created.id;
  }

  revalidatePath("/inventory");
  revalidatePath("/admin/bikes");
  if (bikeId) revalidatePath(`/inventory/${bikeId}`);

  return { ok: true, message: id ? "Bike updated." : "Bike created." };
}

export async function deleteBike(id: string): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  await prisma.bike.delete({ where: { id } });
  revalidatePath("/inventory");
  revalidatePath("/admin/bikes");
  return { ok: true, message: "Bike deleted." };
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return { ok: true, message: "Lead updated." };
}

export async function createInteraction(raw: unknown): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  const parsed = interactionFormSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid interaction",
    };
  }

  await prisma.interaction.create({
    data: {
      leadId: parsed.data.leadId,
      type: parsed.data.type as InteractionType,
      note: parsed.data.note || null,
    },
  });

  // Logging an interaction implies Joe has engaged — move NEW → CONTACTED
  const lead = await prisma.lead.findUnique({ where: { id: parsed.data.leadId } });
  if (lead?.status === "NEW") {
    await prisma.lead.update({
      where: { id: parsed.data.leadId },
      data: { status: "CONTACTED" },
    });
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { ok: true, message: "Interaction logged." };
}
