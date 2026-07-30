import Link from "next/link";
import { FloorShowroom } from "@/components/joeos/floor-showroom";
import { EmptyState, JosBody, JosSectionHeader } from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadFloorInventory } from "@/lib/joeos/load-briefing";
import { createMetadata } from "@/lib/seo";

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
    <div className="jos-stack-section">
      <JosSectionHeader
        section="Floor"
        title="Machine assets"
        action={
          <Link href="/admin/sync" className="jos-btn jos-btn-ghost">
            Feed
          </Link>
        }
      />
      <JosBody className="max-w-xl text-sm -mt-2">
        Photo-first showroom of live stock. Synced from the dealership feed — never invented.
      </JosBody>

      {!ready ? (
        <EmptyState label="Database offline" warn>
          Connect Supabase before loading the floor.
        </EmptyState>
      ) : bikes.length === 0 ? (
        <EmptyState
          label="Floor empty"
          action={
            <Link href="/admin/sync" className="jos-btn jos-btn-primary">
              Open feed
            </Link>
          }
        >
          Run a Manual Sync from FEED to mirror inventory.
        </EmptyState>
      ) : (
        <FloorShowroom bikes={bikes} />
      )}
    </div>
  );
}
