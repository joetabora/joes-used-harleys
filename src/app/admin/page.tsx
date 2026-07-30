import { CommandCenter } from "@/components/joeos/command-center";
import { EmptyState } from "@/components/joeos/ui";
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
    <div className="jos-stack-dense">
      {!isAdminEnvConfigured() ? (
        <EmptyState label="Admin env incomplete" warn>
          Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.
        </EmptyState>
      ) : null}
      <CommandCenter briefing={briefing} dbReady={ready} />
    </div>
  );
}
