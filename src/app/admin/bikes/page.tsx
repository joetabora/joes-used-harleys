import Link from "next/link";
import { DeleteBikeButton } from "@/components/bike-editor-form";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { requireAdminOrRedirect } from "@/lib/auth";
import { bikeLabel, formatPrice } from "@/lib/format";
import { daysBetween, bikeSeverity } from "@/lib/joeos/briefing";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Inventory",
  description: "Manage inventory",
  path: "/admin/bikes",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminBikesPage() {
  await requireAdminOrRedirect();

  if (!isDatabaseConfigured() || !prisma) {
    return (
      <div className="joeos-panel p-4">
        <PlaceholderNotice title="Database not connected">
          Connect Supabase before managing bikes.
        </PlaceholderNotice>
      </div>
    );
  }

  const bikes = await prisma.bike.findMany({
    orderBy: [{ featuredRank: "desc" }, { lastSeenAt: "desc" }],
  });
  const now = new Date();

  return (
    <div className="joeos-fade-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="joeos-label text-[var(--joeos-orange)]">Inventory</p>
          <h1 className="joeos-heading mt-1 text-3xl">Floor stock</h1>
          <p className="joeos-body mt-2 max-w-xl text-sm">
            Synced from the dealership feed. Edit Joe content per bike — never invent listings.
          </p>
        </div>
        <Link href="/admin/sync" className="joeos-btn joeos-btn-ghost">
          Sync
        </Link>
      </div>

      {bikes.length === 0 ? (
        <div className="joeos-panel p-4">
          <PlaceholderNotice title="No bikes yet">
            Run a Manual Sync from the Sync dashboard.
          </PlaceholderNotice>
        </div>
      ) : (
        <div className="joeos-panel overflow-x-auto">
          <table className="joeos-table">
            <thead>
              <tr>
                <th>Bike</th>
                <th>Age</th>
                <th>Status</th>
                <th>Source</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => {
                const days = daysBetween(bike.firstSeenAt, now);
                const severity = bikeSeverity(days);
                return (
                  <tr key={bike.id} className={bike.hidden ? "opacity-50" : undefined}>
                    <td>
                      <div className="font-medium text-[var(--joeos-bone)]">
                        {bikeLabel(bike)}
                      </div>
                      {bike.hidden ? (
                        <div className="joeos-data">Hidden</div>
                      ) : null}
                    </td>
                    <td>
                      <span
                        className={
                          severity === "hot"
                            ? "joeos-pill joeos-pill-hot"
                            : severity === "watch"
                              ? "joeos-pill joeos-pill-watch"
                              : "joeos-pill joeos-pill-muted"
                        }
                      >
                        {days}d
                      </span>
                    </td>
                    <td className="joeos-data">{bike.status}</td>
                    <td className="joeos-data">{bike.source}</td>
                    <td>{formatPrice(bike.price)}</td>
                    <td className="space-x-2 text-right">
                      <Link
                        href={`/admin/bikes/${bike.id}`}
                        className="joeos-btn joeos-btn-ghost"
                      >
                        Edit
                      </Link>
                      <DeleteBikeButton id={bike.id} source={bike.source} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
