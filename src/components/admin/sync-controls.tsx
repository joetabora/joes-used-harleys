"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { runInventorySync } from "@/actions/sync";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <Button type="button" disabled={pending} onClick={() => run(false)}>
          {pending ? "Running…" : "Manual Sync"}
        </Button>
        <Button type="button" variant="outline" disabled={pending} onClick={() => run(true)}>
          Dry Run
        </Button>
      </div>
      {message ? <p className="text-sm text-green-600">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
