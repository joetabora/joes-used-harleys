import { AnalyticsReportView } from "@/components/joeos/analytics-report-view";
import { requireAdminOrRedirect } from "@/lib/auth";
import { loadAnalyticsReport } from "@/lib/admin/load-analytics-report";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Analytics",
  description: "Read-only site activity for JoeOS",
  path: "/admin/analytics",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  await requireAdminOrRedirect();
  const report = await loadAnalyticsReport();
  return <AnalyticsReportView report={report} />;
}
