"use client";

import { useState, useTransition } from "react";
import { createContactLead, createPreapprovalLead } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Mode = "contact" | "preapproval";

export function LeadForm({
  mode = "contact",
  sourcePage,
  bikeId,
}: {
  mode?: Mode;
  sourcePage?: string;
  bikeId?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
      sourcePage,
      bikeId,
    };

    startTransition(async () => {
      const result =
        mode === "preapproval"
          ? await createPreapprovalLead(payload)
          : await createContactLead(payload);

      if (result.ok) {
        setMessage(result.message);
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">
          {mode === "preapproval"
            ? "What are you looking for / monthly budget?"
            : "How can Joe help?"}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required={mode === "preapproval"}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending
          ? "Sending…"
          : mode === "preapproval"
            ? "Request pre-approval help"
            : "Send message"}
      </Button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
