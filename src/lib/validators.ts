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
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  sourcePage: z.string().trim().max(500).optional(),
  bikeId: z.string().cuid().optional().or(z.literal("")),
});

export const preapprovalSchema = contactLeadSchema.extend({
  message: z
    .string()
    .trim()
    .min(1, "Tell us roughly what you're looking for")
    .max(4000),
});

export const alertSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  model: z.string().trim().max(80).optional().or(z.literal("")),
  maxPrice: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? Number(v) : undefined))
    .pipe(z.number().int().positive().max(500_000).optional()),
});

export const bikeFormSchema = z.object({
  title: z.string().trim().min(1).max(160),
  model: z.string().trim().min(1).max(80),
  year: z.coerce.number().int().min(1900).max(2100),
  mileage: z.coerce.number().int().min(0).max(2_000_000).optional().or(z.nan()),
  price: z.coerce.number().int().min(0).max(5_000_000).optional().or(z.nan()),
  vin: z.string().trim().max(32).optional().or(z.literal("")),
  description: z.string().trim().max(10_000).optional().or(z.literal("")),
  status: z.enum(["AVAILABLE", "PENDING", "SOLD"]),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase-kebab-case"),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const chatMessageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
  sessionId: z.string().trim().min(8).max(80),
});
