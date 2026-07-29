import Link from "next/link";
import { DeleteBikeButton } from "@/components/bike-editor-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdminOrRedirect } from "@/lib/auth";
import { bikeLabel, formatPrice } from "@/lib/format";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Admin bikes",
  description: "Manage inventory",
  path: "/admin/bikes",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminBikesPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <PlaceholderNotice title="Database not connected">
        Connect Supabase before managing bikes.
      </PlaceholderNotice>
    );
  }

  const bikes = await prisma.bike.findMany({
    orderBy: [{ featuredRank: "desc" }, { lastSeenAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Bikes</h1>
          <p className="text-sm text-muted-foreground">
            Inventory comes from JoeOS sync. Edit Joe content per bike — do not invent listings.
          </p>
        </div>
        <Link href="/admin/sync" className={cn(buttonVariants({ variant: "outline" }))}>
          Sync dashboard
        </Link>
      </div>

      {bikes.length === 0 ? (
        <PlaceholderNotice title="No bikes yet">
          Run a Manual Sync from the Sync dashboard. Inventory is never invented.
        </PlaceholderNotice>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bike</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike.id} className={bike.hidden ? "opacity-60" : undefined}>
                <TableCell>
                  <div className="font-medium">{bikeLabel(bike)}</div>
                  {bike.hidden ? (
                    <div className="text-xs text-muted-foreground">Hidden</div>
                  ) : null}
                </TableCell>
                <TableCell>{bike.source}</TableCell>
                <TableCell>{bike.status}</TableCell>
                <TableCell>{bike.featuredRank}</TableCell>
                <TableCell>{formatPrice(bike.price)}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Link
                    href={`/admin/bikes/${bike.id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                  >
                    Edit Joe content
                  </Link>
                  <DeleteBikeButton id={bike.id} source={bike.source} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
