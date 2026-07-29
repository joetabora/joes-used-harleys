import { z } from "zod";

export const contactLeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  source: z.string().trim().max(500).optional(),
});

/** Legacy / MANUAL invent path — prefer sync for FEED bikes. */
export const bikeFormSchema = z.object({
  year: z.coerce.number().int().min(1900).max(2100),
  make: z.string().trim().min(1).max(80),
  model: z.string().trim().min(1).max(80),
  mileage: z.coerce.number().int().min(0).max(2_000_000).optional().or(z.nan()),
  price: z.coerce.number().int().min(0).max(5_000_000).optional().or(z.nan()),
  description: z.string().trim().max(10_000).optional().or(z.literal("")),
  status: z.enum(["AVAILABLE", "PENDING", "SOLD"]),
  photos: z.string().trim().max(20_000).optional().or(z.literal("")),
});

/** Joe-owned fields editable on FEED bikes (sync never writes these). */
export const joeBikeFieldsSchema = z.object({
  featuredRank: z.coerce.number().int().min(0).max(10_000),
  status: z.enum(["AVAILABLE", "PENDING", "SOLD"]),
  hidden: z
    .union([z.boolean(), z.literal("true"), z.literal("false"), z.literal("on"), z.literal("")])
    .transform((v) => v === true || v === "true" || v === "on"),
  joeRating: z.coerce.number().int().min(1).max(10).optional().or(z.nan()),
  perfectFor: z.string().trim().max(2000).optional().or(z.literal("")),
  favoriteFeature: z.string().trim().max(2000).optional().or(z.literal("")),
  idealRider: z.string().trim().max(2000).optional().or(z.literal("")),
  thingsToMention: z.string().trim().max(4000).optional().or(z.literal("")),
  thingsToCheck: z.string().trim().max(4000).optional().or(z.literal("")),
  whyIDLikeIt: z.string().trim().max(4000).optional().or(z.literal("")),
  whoShouldSkipIt: z.string().trim().max(4000).optional().or(z.literal("")),
  conversationStarter: z.string().trim().max(2000).optional().or(z.literal("")),
  walkaroundVideoUrl: z.string().trim().max(2000).optional().or(z.literal("")),
  buyingTips: z.string().trim().max(10_000).optional().or(z.literal("")),
  seoHeadline: z.string().trim().max(200).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(500).optional().or(z.literal("")),
  personalPhotos: z.string().trim().max(20_000).optional().or(z.literal("")),
  personalHeroImageUrl: z.string().trim().max(2000).optional().or(z.literal("")),
  internalNotes: z.string().trim().max(10_000).optional().or(z.literal("")),
});

export const interactionFormSchema = z.object({
  leadId: z.string().cuid(),
  type: z.enum(["PHONE_CALL", "TEXT", "VISIT", "EMAIL", "TEST_RIDE"]),
  note: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const chatMessageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});
