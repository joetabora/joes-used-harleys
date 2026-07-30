"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { runInventorySync } from "@/actions/sync";
import { JosButton } from "@/components/joeos/ui";

export function SyncControls() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run(dryRun: boolean) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await runInventorySync(dryRun);
        if (!result.ok) {
          setError(result.message);
        } else {
          setMessage(result.message);
        }
        router.refresh();
      } catch (err) {
        if (err && typeof err === "object" && "digest" in err) throw err;
        setError("Sync failed. Are you signed in?");
      }
    });
  }

  return (
    <div className="jos-stack-dense">
      <div className="flex flex-wrap gap-3">
        <JosButton disabled={pending} onClick={() => run(false)}>
          {pending ? "Running…" : "Manual Sync"}
        </JosButton>
        <JosButton variant="ghost" disabled={pending} onClick={() => run(true)}>
          Dry Run
        </JosButton>
      </div>
      {message ? <p className="jos-status-ok jos-data">{message}</p> : null}
      {error ? <p className="jos-status-err jos-data">{error}</p> : null}
    </div>
  );
}
