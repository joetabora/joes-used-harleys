"use client";

import { useEffect, useState } from "react";

const GARAGE_KEY = "scanbike_garage";

export function VehicleEngagementTools({
  bikeId,
  title,
}: {
  bikeId: string;
  title: string;
}) {
  const [inGarage, setInGarage] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(GARAGE_KEY);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      setInGarage(list.includes(bikeId));
    } catch {
      setInGarage(false);
    }
  }, [bikeId]);

  return (
    <section className="sb-section sb-tools">
      <h2>Tools</h2>

      <div className="sb-tool-card">
        <h3>Payment estimator</h3>
        <p>Estimate monthly payments from asking price. Not a credit decision.</p>
        {!paymentOpen ? (
          <button
            type="button"
            className="sb-btn sb-btn-secondary"
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={() => {
              setPaymentOpen(true);
              track("SCAN_ESTIMATOR_OPEN", bikeId, { kind: "payment" });
            }}
          >
            Open estimator
          </button>
        ) : (
          <p style={{ marginTop: "0.75rem" }}>
            Enter terms with a sales associate for an accurate quote. Online approvals are not
            offered here.
          </p>
        )}
      </div>

      <div className="sb-tool-card">
        <h3>Trade estimator</h3>
        <p>Start a trade conversation — no invented values.</p>
        {!tradeOpen ? (
          <button
            type="button"
            className="sb-btn sb-btn-secondary"
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={() => {
              setTradeOpen(true);
              track("SCAN_ESTIMATOR_OPEN", bikeId, { kind: "trade" });
            }}
          >
            Start trade inquiry
          </button>
        ) : (
          <p style={{ marginTop: "0.75rem" }}>
            Bring your current bike details to the desk for a real appraisal.
          </p>
        )}
      </div>

      <div className="sb-tool-card">
        <h3>Compare</h3>
        <p>Save this unit to compare later on this device.</p>
        <button
          type="button"
          className="sb-btn sb-btn-secondary"
          style={{ marginTop: "0.75rem", width: "100%" }}
          onClick={() => {
            toggleCompare(bikeId);
            track("SCAN_COMPARE", bikeId, {});
          }}
        >
          Add to compare list
        </button>
      </div>

      <div className="sb-tool-card">
        <h3>My Garage</h3>
        <p>{inGarage ? "Saved on this device." : "Save favorites privately on this device."}</p>
        <button
          type="button"
          className="sb-btn sb-btn-secondary"
          style={{ marginTop: "0.75rem", width: "100%" }}
          onClick={() => {
            const next = toggleGarage(bikeId);
            setInGarage(next);
            track("SCAN_FAVORITE", bikeId, { title, inGarage: next });
          }}
        >
          {inGarage ? "Remove from My Garage" : "Save to My Garage"}
        </button>
      </div>
    </section>
  );
}

function toggleGarage(bikeId: string): boolean {
  try {
    const raw = localStorage.getItem(GARAGE_KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    const idx = list.indexOf(bikeId);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(bikeId);
    localStorage.setItem(GARAGE_KEY, JSON.stringify(list));
    return list.includes(bikeId);
  } catch {
    return false;
  }
}

function toggleCompare(bikeId: string) {
  try {
    const key = "scanbike_compare";
    const raw = localStorage.getItem(key);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    if (!list.includes(bikeId)) list.push(bikeId);
    localStorage.setItem(key, JSON.stringify(list.slice(-4)));
  } catch {
    /* ignore */
  }
}

function track(type: string, bikeId: string, meta: Record<string, unknown>) {
  try {
    const key = "sb_sid";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      sessionStorage.setItem(key, id);
    }
    void fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        bikeId,
        sessionId: id,
        path: window.location.pathname,
        meta,
        product: "SCANBIKE",
      }),
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}
