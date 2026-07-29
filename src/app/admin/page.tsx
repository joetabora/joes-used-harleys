import { CommandCenter } from "@/components/joeos/command-center";
import { isAdminEnvConfigured, getAdminSession, requireAdminOrRedirect } from "@/lib/auth";
import { loadMorningBriefing } from "@/lib/joeos/load-briefing";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "JoeOS Command",
  description: "Sales command center",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  await requireAdminOrRedirect();
  const session = await getAdminSession();
  const { ready, briefing } = await loadMorningBriefing(session?.email);

  return (
    <div className="space-y-4">
      {!isAdminEnvConfigured() ? (
        <div className="jos-panel p-4">
          <p className="jos-label text-[var(--jos-warn)]">Admin env incomplete</p>
          <p className="jos-body mt-2 text-sm">
            Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.
          </p>
        </div>
      ) : null}
      <CommandCenter briefing={briefing} dbReady={ready} />
    </div>
  );
}
