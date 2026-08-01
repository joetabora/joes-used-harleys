import Link from "next/link";
import { FloorShowroom } from "@/components/joeos/floor-showroom";
import { EmptyState, JosBody, JosSectionHeader } from "@/components/joeos/ui";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadFloorScorecards, pillsFromScorecard } from "@/lib/assets/load-scorecard";
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
  const [{ ready, bikes }, scorecards] = await Promise.all([
    loadFloorInventory(),
    loadFloorScorecards(),
  ]);

  const pills = Object.fromEntries(
    [...scorecards.entries()].map(([id, card]) => [id, pillsFromScorecard(card)]),
  );

  return (
    <div className="jos-stack-section">
      <JosSectionHeader
        section="Floor"
        title="Machine assets"
        action={
          <span className="flex flex-wrap gap-2">
            <Link
              href="/admin/bikes/qr-sheet"
              className="jos-btn jos-btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Print QR sheets
            </Link>
            <Link href="/admin/sync" className="jos-btn jos-btn-ghost">
              Feed
            </Link>
          </span>
        }
      />
      <JosBody className="max-w-xl text-sm -mt-2">
        Full dealership lot for ScanBike QR — Used HD, New HD, and Non-Harley. Public site stays
        used Harley only. Open a bike → ScanBike QR, or print letter sheets (4×5 / 4×6) for the
        whole lot.
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
        <FloorShowroom bikes={bikes} scorePills={pills} />
      )}
    </div>
  );
}
