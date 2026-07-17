"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createInteraction } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InteractionForm({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await createInteraction({
        leadId,
        type: String(formData.get("type") ?? ""),
        note: String(formData.get("note") ?? ""),
      });
      if (result.ok) {
        setMessage(result.message);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          required
          className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
          defaultValue="PHONE_CALL"
        >
          <option value="PHONE_CALL">Phone call</option>
          <option value="TEXT">Text</option>
          <option value="VISIT">Visit</option>
          <option value="EMAIL">Email</option>
          <option value="TEST_RIDE">Test ride</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" name="note" rows={3} placeholder="What happened?" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Log interaction"}
      </Button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
