"use client";

import { useState, useTransition } from "react";
import { subscribeAlert } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AlertSignupForm({ defaultModel = "" }: { defaultModel?: string }) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await subscribeAlert({
        email: String(formData.get("email") ?? ""),
        model: String(formData.get("model") ?? ""),
        maxPrice: String(formData.get("maxPrice") ?? ""),
      });
      if (result.ok) setMessage(result.message);
      else setError(result.message);
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="alert-email">Email</Label>
        <Input id="alert-email" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="alert-model">Model (optional)</Label>
          <Input
            id="alert-model"
            name="model"
            placeholder="Street Glide"
            defaultValue={defaultModel}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="alert-price">Max price (optional)</Label>
          <Input id="alert-price" name="maxPrice" type="number" min={0} placeholder="18000" />
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Get inventory alerts"}
      </Button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
