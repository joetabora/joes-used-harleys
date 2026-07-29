"use client";

import { useState, useTransition } from "react";
import { createContactLead } from "@/actions/leads";

export function LeadForm({ source }: { source?: string }) {
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
      notes: String(formData.get("notes") ?? ""),
      source,
    };

    startTransition(async () => {
      const result = await createContactLead(payload);
      if (result.ok) setMessage(result.message);
      else setError(result.message);
    });
  }

  const fieldClass =
    "w-full border border-chrome/25 bg-asphalt px-3 py-2.5 text-ink outline-none transition-colors placeholder:text-steel/60 focus:border-lamp";

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="font-label text-steel">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="font-label text-steel">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="font-label text-steel">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="notes" className="font-label text-steel">
          How can Joe help?
        </label>
        <textarea id="notes" name="notes" rows={5} className={fieldClass} />
      </div>
      <button type="submit" disabled={pending} className="joe-btn-primary w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </button>
      {message ? <p className="text-sm text-[#4F7A5A]">{message}</p> : null}
      {error ? <p className="text-sm text-leather">{error}</p> : null}
    </form>
  );
}
