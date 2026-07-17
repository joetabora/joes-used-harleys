import Link from "next/link";
import { BikeEditorForm, DeleteBikeButton } from "@/components/bike-editor-form";
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
import { formatPrice } from "@/lib/format";
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

  const bikes = await prisma.bike.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Bikes</h1>
        <Link href="/admin/bikes/new" className={cn(buttonVariants())}>
          Add bike
        </Link>
      </div>

      {bikes.length === 0 ? (
        <PlaceholderNotice title="No bikes yet">
          Add your first real listing. Do not create sample inventory.
        </PlaceholderNotice>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike.id}>
                <TableCell>
                  <div className="font-medium">{bike.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {bike.year} {bike.model}
                  </div>
                </TableCell>
                <TableCell>{bike.status}</TableCell>
                <TableCell>{formatPrice(bike.price)}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Link
                    href={`/admin/bikes/${bike.id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                  >
                    Edit
                  </Link>
                  <DeleteBikeButton id={bike.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">Quick add</h2>
        <BikeEditorForm />
      </div>
    </div>
  );
}
