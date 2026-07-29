import type { Prisma } from "@/generated/prisma/client";

/** Insert append-only price history before updating Bike.price. */
export async function recordPriceChange(
  tx: Prisma.TransactionClient,
  input: {
    bikeId: string;
    vin: string | null;
    previousPrice: number | null;
    newPrice: number | null;
    syncLogId?: string | null;
    changedAt?: Date;
  },
) {
  if (input.previousPrice === null) return;
  if (input.previousPrice === input.newPrice) return;

  await tx.bikePriceHistory.create({
    data: {
      bikeId: input.bikeId,
      vin: input.vin,
      previousPrice: input.previousPrice,
      newPrice: input.newPrice,
      changedAt: input.changedAt ?? new Date(),
      syncLogId: input.syncLogId ?? null,
    },
  });
}
