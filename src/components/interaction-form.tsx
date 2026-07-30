"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createInteraction } from "@/actions/admin";
import { JosButton, JosField, JosSelect, JosTextarea } from "@/components/joeos/ui";

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
    <form action={onSubmit} className="jos-stack-dense">
      <JosField label="Type" htmlFor="type">
        <JosSelect id="type" name="type" required defaultValue="PHONE_CALL">
          <option value="PHONE_CALL">Phone call</option>
          <option value="TEXT">Text</option>
          <option value="VISIT">Visit</option>
          <option value="EMAIL">Email</option>
          <option value="TEST_RIDE">Test ride</option>
        </JosSelect>
      </JosField>
      <JosField label="Note" htmlFor="note">
        <JosTextarea id="note" name="note" rows={3} placeholder="What happened?" />
      </JosField>
      <JosButton type="submit" disabled={pending}>
        {pending ? "Saving…" : "Log interaction"}
      </JosButton>
      {message ? <p className="jos-status-ok">{message}</p> : null}
      {error ? <p className="jos-status-err">{error}</p> : null}
    </form>
  );
}
