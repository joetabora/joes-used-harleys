"use client";

import { useState, useTransition } from "react";
import { JosButton, JosField, JosInput } from "@/components/joeos/ui";

export function AdminLoginForm() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

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
    <form onSubmit={onSubmit} className="jos-stack-dense">
      <JosField label="Email" htmlFor="email">
        <JosInput
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
        />
      </JosField>
      <JosField label="Password" htmlFor="password">
        <JosInput
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </JosField>
      <JosButton type="submit" disabled={pending} className="w-full">
        {pending ? "Signing in…" : "Unlock"}
      </JosButton>
      {error ? <p className="jos-status-err">{error}</p> : null}
    </form>
  );
}
