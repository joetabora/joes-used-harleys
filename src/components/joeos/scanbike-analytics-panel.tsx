import { JosData, JosKpi, JosLabel, JosPanel } from "@/components/joeos/ui";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

const SCAN_TYPES = [
  "SCAN_QR_OPEN",
  "SCAN_TIME_ON_PAGE",
  "SCAN_GALLERY_INTERACTION",
  "SCAN_VIDEO_PLAY",
  "SCAN_SHARE",
  "SCAN_TEST_RIDE_REQUEST",
  "SCAN_ASK_ASSOCIATE",
  "SCAN_FAVORITE",
  "SCAN_COMPARE",
  "SCAN_ESTIMATOR_OPEN",
] as const;

/**
 * Read-only ScanBike analytics panel for JoeOS Command.
 * Queries AnalyticsEvent with product SCANBIKE / SCAN_* types — no vehicle UI imports.
 */
export async function ScanBikeAnalyticsPanel() {
  if (!isDatabaseConfigured() || !prisma) {
    return (
      <JosPanel>
        <p className="jos-section mb-2">ScanBike</p>
        <JosData>Database not configured.</JosData>
      </JosPanel>
    );
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const [opens, leads, shares, byType] = await Promise.all([
      prisma.analyticsEvent.count({
        where: {
          createdAt: { gte: since },
          OR: [{ type: "SCAN_QR_OPEN" }, { product: "SCANBIKE", type: "SCAN_QR_OPEN" }],
        },
      }),
      prisma.lead.count({
        where: { product: "SCANBIKE", createdAt: { gte: since } },
      }),
      prisma.analyticsEvent.count({
        where: { createdAt: { gte: since }, type: "SCAN_SHARE" },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["type"],
        where: {
          createdAt: { gte: since },
          type: { in: [...SCAN_TYPES] },
        },
        _count: { _all: true },
      }),
    ]);

    return (
      <JosPanel>
        <p className="jos-section mb-3">ScanBike (7d)</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <JosLabel>QR opens</JosLabel>
            <JosKpi className="text-2xl">{opens}</JosKpi>
          </div>
          <div>
            <JosLabel>Leads</JosLabel>
            <JosKpi className="text-2xl">{leads}</JosKpi>
          </div>
          <div>
            <JosLabel>Shares</JosLabel>
            <JosKpi className="text-2xl">{shares}</JosKpi>
          </div>
        </div>
        {byType.length > 0 ? (
          <ul className="mt-3 space-y-1">
            {byType.map((row) => (
              <li key={row.type} className="jos-data">
                {row.type}: {row._count._all}
              </li>
            ))}
          </ul>
        ) : (
          <JosData className="mt-3">No ScanBike events yet.</JosData>
        )}
      </JosPanel>
    );
  } catch {
    return (
      <JosPanel>
        <p className="jos-section mb-2">ScanBike</p>
        <JosData>Analytics unavailable (migrate ScanBike schema if needed).</JosData>
      </JosPanel>
    );
  }
}
