"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BikeStatus } from "@/generated/prisma/client";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/auth";
import { slugify } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { adminLoginSchema, bikeFormSchema } from "@/lib/validators";

export type AdminActionResult = {
  ok: boolean;
  message: string;
};

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
    title: data.title,
    model: data.model,
    year: data.year,
    mileage,
    price,
    vin: data.vin || null,
    description: data.description || null,
    status: data.status as BikeStatus,
    slug: data.slug || slugify(`${data.year}-${data.model}-${data.title}`),
  };

  if (id) {
    await prisma.bike.update({ where: { id }, data: payload });
  } else {
    await prisma.bike.create({ data: payload });
  }

  revalidatePath("/inventory");
  revalidatePath("/admin/bikes");
  revalidatePath(`/inventory/${payload.slug}`);

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
  status: "NEW" | "CONTACTED" | "CLOSED",
): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  return { ok: true, message: "Lead updated." };
}

export async function addBikePhoto(input: {
  bikeId: string;
  url: string;
  alt?: string;
}): Promise<AdminActionResult> {
  await requireAdmin();
  if (!isDatabaseConfigured() || !prisma) {
    return { ok: false, message: "Database not configured." };
  }

  if (!input.url.startsWith("http")) {
    return {
      ok: false,
      message:
        "Photo URL must be a full https URL (upload to Supabase Storage, then paste the public URL).",
    };
  }

  const count = await prisma.bikePhoto.count({ where: { bikeId: input.bikeId } });
  await prisma.bikePhoto.create({
    data: {
      bikeId: input.bikeId,
      url: input.url,
      alt: input.alt || null,
      sortOrder: count,
    },
  });

  revalidatePath("/inventory");
  revalidatePath("/admin/bikes");
  return { ok: true, message: "Photo added." };
}
