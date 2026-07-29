import { PlaceholderNotice } from "@/components/placeholder-notice";
import { MorningBriefingView } from "@/components/joeos/morning-briefing";
import { isAdminEnvConfigured, getAdminSession, requireAdminOrRedirect } from "@/lib/auth";
import { loadMorningBriefing } from "@/lib/joeos/load-briefing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Briefing",
  description: "Morning briefing — sales command center",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  await requireAdminOrRedirect();
  const session = await getAdminSession();
  const { ready, briefing } = await loadMorningBriefing(session?.email);

  return (
    <div className="space-y-6">
      {!isAdminEnvConfigured() ? (
        <div className="joeos-panel p-4">
          <PlaceholderNotice title="Admin env incomplete">
            Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in .env.local.
          </PlaceholderNotice>
        </div>
      ) : null}
      <MorningBriefingView briefing={briefing} dbReady={ready} />
    </div>
  );
}
