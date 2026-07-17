import Link from "next/link";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isAdminEnvConfigured, requireAdminOrRedirect } from "@/lib/auth";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin",
  description: "Joe admin dashboard",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  await requireAdminOrRedirect();

  const dbReady = isDatabaseConfigured() && prisma;
  const bikeCount = dbReady ? await prisma!.bike.count() : 0;
  const leadCount = dbReady
    ? await prisma!.lead.count({ where: { status: "NEW" } })
    : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      {!isAdminEnvConfigured() ? (
        <PlaceholderNotice title="Admin env incomplete">
          Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in .env.local.
        </PlaceholderNotice>
      ) : null}
      {!dbReady ? (
        <PlaceholderNotice title="Database not connected">
          Set DATABASE_URL / DIRECT_URL to manage bikes and leads.
        </PlaceholderNotice>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bikes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{bikeCount}</p>
            <Link href="/admin/bikes" className="text-sm underline">
              Manage inventory
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New leads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-3xl font-semibold">{leadCount}</p>
            <Link href="/admin/leads" className="text-sm underline">
              Review leads
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
