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
  interactionFormSchema,
  joeBikeFieldsSchema,
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

/**
 * Update Joe-owned fields only. Dealership fields come from JoeOS sync.
 */
export async function updateJoeBikeFields(
  id: string,
  raw: unknown,
): Promise<AdminActionResult> {
  await requireAdmin();

  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  const existing = await prisma.bike.findUnique({ where: { id } });
  if (!existing) {
    return { ok: false, message: "Bike not found." };
  }

  const parsed = joeBikeFieldsSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid fields" };
  }

  const data = parsed.data;
  const joeRating =
    typeof data.joeRating === "number" && !Number.isNaN(data.joeRating)
      ? data.joeRating
      : null;

  await prisma.bike.update({
    where: { id },
    data: {
      featuredRank: data.featuredRank,
      status: data.status as BikeStatus,
      hidden: data.hidden,
      joeRating,
      perfectFor: data.perfectFor || null,
      favoriteFeature: data.favoriteFeature || null,
      idealRider: data.idealRider || null,
      thingsToMention: data.thingsToMention || null,
      thingsToCheck: data.thingsToCheck || null,
      whyIDLikeIt: data.whyIDLikeIt || null,
      whoShouldSkipIt: data.whoShouldSkipIt || null,
      conversationStarter: data.conversationStarter || null,
      walkaroundVideoUrl: data.walkaroundVideoUrl || null,
      buyingTips: data.buyingTips || null,
      seoHeadline: data.seoHeadline || null,
      seoDescription: data.seoDescription || null,
      personalPhotos: parsePhotoLines(data.personalPhotos),
      personalHeroImageUrl: data.personalHeroImageUrl || null,
      internalNotes: data.internalNotes || null,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/admin/bikes");
  revalidatePath(`/inventory/${id}`);
  revalidatePath(`/admin/bikes/${id}`);

  return { ok: true, message: "Joe content saved." };
}

export async function deleteBike(id: string): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike) return { ok: false, message: "Bike not found." };
  if (bike.source === "FEED") {
    return {
      ok: false,
      message: "FEED bikes cannot be deleted. Hide them or wait for sync to mark sold.",
    };
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
