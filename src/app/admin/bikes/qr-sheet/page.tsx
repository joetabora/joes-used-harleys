import Link from "next/link";
import QRCode from "qrcode";
import { QrSheetPrintButton } from "@/components/joeos/qr-sheet-print-button";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadFloorInventory } from "@/lib/joeos/load-briefing";
import {
  QR_SHEET_COLS,
  buildQrCellLabel,
  buildQrSheetPayload,
  chunkForQrSheet,
  parseQrSheetRows,
  sortBikesForQrSheet,
  type QrSheetBike,
} from "@/lib/joeos/qr-sheet";
import { createMetadata } from "@/lib/seo";
import "./qr-sheet.css";

export const metadata = createMetadata({
  title: "Print QR sheets",
  description: "Letter-size ScanBike QR sheets for the current lot",
  path: "/admin/bikes/qr-sheet",
  noIndex: true,
});

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ rows?: string }>;
};

type SheetCell = QrSheetBike & {
  qrDataUrl: string;
  label: ReturnType<typeof buildQrCellLabel>;
};

export default async function BulkQrSheetPage({ searchParams }: Props) {
  await requireAdminOrRedirect();
  const sp = await searchParams;
  const rows = parseQrSheetRows(sp.rows);

  const { ready, bikes: floorBikes } = await loadFloorInventory();
  const eligible = sortBikesForQrSheet(
    floorBikes
      .filter((b) => b.hasQrIdentity)
      .map(
        (b): QrSheetBike => ({
          id: b.id,
          year: b.year,
          make: b.make,
          model: b.model,
          vin: b.vin ?? null,
          stockNumber: b.stockNumber ?? null,
        }),
      ),
  );

  const skipped = floorBikes.length - eligible.length;

  const cells: SheetCell[] = [];
  for (const bike of eligible) {
    const payload = buildQrSheetPayload(bike);
    if (!payload) continue;
    const qrDataUrl = await QRCode.toDataURL(payload, {
      type: "image/png",
      width: 280,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#FFFFFF" },
    });
    cells.push({
      ...bike,
      qrDataUrl,
      label: buildQrCellLabel(bike),
    });
  }

  const pages = chunkForQrSheet(cells, QR_SHEET_COLS, rows);
  const perPage = QR_SHEET_COLS * rows;

  return (
    <div className="qr-sheet-screen" data-product="scanbike-qr-sheet">
      <div className="qr-sheet-toolbar print:hidden">
        <div>
          <p className="jos-section" style={{ marginBottom: "0.25rem" }}>
            ScanBike QR sheets
          </p>
          <p>
            {ready
              ? `${cells.length} codes · ${pages.length || 0} letter page${pages.length === 1 ? "" : "s"} · ${QR_SHEET_COLS}×${rows} (${perPage}/page)`
              : "Database offline"}
            {skipped > 0 ? ` · ${skipped} skipped (no VIN/stock)` : ""}
          </p>
        </div>
        <div className="qr-sheet-toolbar-actions">
          <Link
            href="/admin/bikes/qr-sheet?rows=5"
            className={rows === 5 ? "jos-btn jos-btn-primary" : "jos-btn jos-btn-ghost"}
          >
            4×5
          </Link>
          <Link
            href="/admin/bikes/qr-sheet?rows=6"
            className={rows === 6 ? "jos-btn jos-btn-primary" : "jos-btn jos-btn-ghost"}
          >
            4×6
          </Link>
          <Link href="/admin/bikes" className="jos-btn jos-btn-ghost">
            Floor
          </Link>
          <QrSheetPrintButton />
        </div>
      </div>

      {!ready ? (
        <p className="qr-sheet-empty">Connect the database, then reopen this page.</p>
      ) : cells.length === 0 ? (
        <p className="qr-sheet-empty">
          No QR-ready bikes on the Floor. Run a Feed sync, then try again.
        </p>
      ) : (
        <div className="qr-sheet-preview">
          {pages.map((page, pageIndex) => (
            <section
              key={pageIndex}
              className="qr-sheet-page"
              data-rows={rows}
              aria-label={`QR sheet page ${pageIndex + 1} of ${pages.length}`}
            >
              {page.map((cell) => (
                <div className="qr-sheet-cell" key={cell.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cell.qrDataUrl} alt={`QR ${cell.label.primary}`} />
                  <p className="qr-sheet-stock">{cell.label.primary}</p>
                  <p className="qr-sheet-meta">{cell.label.secondary}</p>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
