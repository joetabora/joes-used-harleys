"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          }),
        });

        const data = (await res.json().catch(() => null)) as {
          ok?: boolean;
          message?: string;
        } | null;

        if (!res.ok || !data?.ok) {
          setError(data?.message ?? `Login failed (${res.status}).`);
          return;
        }

        window.location.assign("/admin");
      } catch {
        setError("Network error during login. Try again.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {!error && pending ? null : null}
      <p className="text-xs text-muted-foreground">
        Uses /api/admin/login · cookie auth · after success you should land on /admin
      </p>
    </form>
  );
}
