"use client";

import { useState, useTransition } from "react";

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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="jos-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="jos-field"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="jos-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="jos-field"
        />
      </div>
      <button type="submit" disabled={pending} className="jos-btn jos-btn-primary w-full">
        {pending ? "Signing in…" : "Unlock"}
      </button>
      {error ? <p className="text-sm text-[var(--jos-danger)]">{error}</p> : null}
    </form>
  );
}
