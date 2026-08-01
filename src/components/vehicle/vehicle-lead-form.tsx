"use client";

import { useState } from "react";

type Props = {
  bikeId: string;
  vin: string | null;
  stockNumber: string | null;
  title: string;
  kind: "test_ride" | "ask_associate";
  assoc?: string | null;
};

function sessionId(): string {
  const key = "sb_sid";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

export function VehicleLeadForm({ bikeId, vin, stockNumber, title, kind, assoc }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const label = kind === "test_ride" ? "Schedule a test ride" : "Ask a sales associate";
  const eventType = kind === "test_ride" ? "SCAN_TEST_RIDE_REQUEST" : "SCAN_ASK_ASSOCIATE";

  if (!open) {
    return (
      <button
        type="button"
        className={kind === "test_ride" ? "sb-btn sb-btn-primary" : "sb-btn sb-btn-secondary"}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
    );
  }

  return (
    <form
      className="sb-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setMessage(null);
        const fd = new FormData(e.currentTarget);
        const payload = {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          notes: String(fd.get("notes") || ""),
          bikeId,
          vin,
          stockNumber,
          title,
          kind,
          assoc: assoc || null,
        };

        try {
          const res = await fetch("/api/v/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = (await res.json()) as { ok: boolean; message: string };
          setOk(data.ok);
          setMessage(data.message);
          if (data.ok) {
            void fetch("/api/analytics/collect", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: eventType,
                bikeId,
                sessionId: sessionId(),
                path: window.location.pathname,
                product: "SCANBIKE",
              }),
            }).catch(() => {});
          }
        } catch {
          setOk(false);
          setMessage("Something went wrong. Please try again.");
        } finally {
          setPending(false);
        }
      }}
    >
      <strong>{label}</strong>
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        Message
        <textarea name="notes" placeholder="Preferred day/time or question" />
      </label>
      <button type="submit" className="sb-btn sb-btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Send"}
      </button>
      <button type="button" className="sb-btn sb-btn-secondary" onClick={() => setOpen(false)}>
        Cancel
      </button>
      {message ? (
        <p className={`sb-msg ${ok ? "sb-msg-ok" : "sb-msg-err"}`}>{message}</p>
      ) : null}
    </form>
  );
}
