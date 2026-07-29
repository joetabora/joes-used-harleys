import { FloorShowroom } from "@/components/joeos/floor-showroom";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadFloorInventory } from "@/lib/joeos/load-briefing";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createMetadata({
  title: "JoeOS Floor",
  description: "Motorcycle floor showroom",
  path: "/admin/bikes",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminBikesPage() {
  await requireAdminOrRedirect();
  const { ready, bikes } = await loadFloorInventory();

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="jos-section">Floor</p>
          <h1 className="jos-heading mt-1 text-3xl">Machine assets</h1>
          <p className="jos-body mt-2 max-w-xl text-sm">
            Photo-first showroom of live stock. Synced from the dealership feed — never invented.
          </p>
        </div>
        <Link href="/admin/sync" className="jos-btn jos-btn-ghost">
          Feed
        </Link>
      </header>

      {!ready ? (
        <div className="jos-panel p-4">
          <p className="jos-label text-[var(--jos-warn)]">Database offline</p>
          <p className="jos-body mt-2">Connect Supabase before loading the floor.</p>
        </div>
      ) : bikes.length === 0 ? (
        <div className="jos-panel p-4">
          <p className="jos-heading text-lg">Floor empty</p>
          <p className="jos-body mt-2">Run a Manual Sync from FEED to mirror inventory.</p>
          <Link href="/admin/sync" className="jos-btn jos-btn-primary mt-4">
            Open feed
          </Link>
        </div>
      ) : (
        <FloorShowroom bikes={bikes} />
      )}
    </div>
  );
}
